<template>
  <el-dialog
    :title="isEdit ? '编辑文章' : '新增文章'"
    v-model="dialogVisible"
    width="50%"
    @close="handleClose"
  >
    <el-form :model="formData" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入文章标题"
          maxlength="200"
          show-word-limit
          clearable
        />
      </el-form-item>
      <el-form-item label="文章分类" prop="categoryId">
        <el-select v-model="formData.categoryId" placeholder="请选择文章分类">
          <el-option
            v-for="item in props.categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary">
        <el-input
          type="textarea"
          v-model="formData.summary"
          placeholder="请输入文章摘要（可选）"
          maxlength="1000"
          show-word-limit
          clearable
          :rows="4"
        />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select
          v-model="formData.tagArray"
          placeholder="请选择文章标签（可选多选）"
          multiple
          filterable
          allow-create
          style="width: 100%"
        >
          <el-option
            v-for="tag in commonTags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片">
        <div class="cover-upload">
          <el-upload
            class="avatar-uploader"
            action="#"
            :before-upload="beforeUpload"
            :http-request="handleUploadRequest"
            :show-file-list="false"
            accept="image/*"
          >
            <div v-if="!imgUrl" class="cover-placeholder">
              <p>点击上传封面图片</p>
            </div>
            <img v-else :src="imgUrl" alt="封面图片" class="cover-image" />
          </el-upload>
          <div v-if="imgUrl" class="cover-remove">
            <el-button type="danger" size="mini" @click="handleRemove"
              >移除封面</el-button
            >
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <RichTextEditor
          v-model="formData.content"
          placeholder="请输入文章内容、支持富文本格式\n\n可以使用加粗等格式来丰富内容"
          :maxlength="5000"
          @change="handleContentChange"
          @created="handleEditorCreated"
          min-height="300px"
        />
      </el-form-item>
    </el-form>
    <div v-if="btnPreview">
      <h3>内容预览</h3>
      <div v-html="formData.content"></div>
    </div>
    <template #footer>
      <el-button @click="btnPreview = !btnPreview">{{
        btnPreview ? "关闭预览" : "预览效果"
      }}</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">{{
        isEdit ? "更新文章" : "新增文章"
      }}</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, computed, watch, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { uploadFile, createArticle, updateArticle } from "@/api/admin";
import { fileBaseUrl } from "@/config/index";
import RichTextEditor from "@/components/RichTextEditor.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  article: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue", "success"]);
const dialogVisible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const isEdit = computed(() => !!props.article?.id); //是否有id，有则等于布尔值true

//监听编辑数据
watch(
  () => props.article,
  (newval) => {
    nextTick(() => {
      Object.assign(formData, newval); //对象属性合并
      //使用现有id
      businessId.value = newval.id;
      //封面URL
      imgUrl.value = `${fileBaseUrl}${newval.coverImage}`;
    });
  },
);

const handleClose = () => {
  //重置表单
  formRef.value.resetFields();
  //重置ID
  businessId.value = null;
  //重置标签
  formData.tagArray = [];
  //重置封面图片
  handleRemove();
  emit("update:modelValue", false);
};

const formData = reactive({
  title: "",
  content: "",
  coverImage: "",
  categoryId: "",
  summary: "",
  tags: "",
  id: "",
});
const rules = reactive({
  title: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
    {
      min: 1,
      max: 200,
      message: "文章标题长度必须在 1 到 200 个字符之间",
      trigger: "blur",
    },
  ],
  categoryId: [
    { required: true, message: "请选择文章分类", trigger: "change" },
  ],
  content: [
    { required: true, message: "请输入文章内容", trigger: "blur" },
    { max: 5000, message: "文章内容最多5000个字符", trigger: "blur" },
  ],
});
const commonTags = [
  "情绪管理",
  "焦虑",
  "抑郁",
  "压力",
  "睡眠",
  "冥想",
  "正念放松",
  "心理健康",
  "自我成长",
  "人际关系",
  "工作压力",
  "学习方法",
  "生活技巧",
];

//上传封面
const imgUrl = ref("");
const beforeUpload = (file) => {
  //针对上传的文件进行校验
  console.log(file);
  const isImage = file.type.startsWith("image/");
  //校验文件大小
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isImage) {
    ElMessage.error("请上传图片文件");
    return false;
  }
  if (!isLt5M) {
    ElMessage.error("上传图片大小不能超过 5MB");
    return false;
  }
  return isImage;
};
const businessId = ref(null);
const handleUploadRequest = async ({ file }) => {
  //UUID生成
  businessId.value = crypto.randomUUID();
  const fileRes = await uploadFile(file, { businessId: businessId.value });

  //拼接完整的图片URL
  imgUrl.value = `${fileBaseUrl}${fileRes.filePath}`;
  formData.coverImage = fileRes.filePath;
};
//移除封面
const handleRemove = () => {
  imgUrl.value = "";
  formData.coverImage = "";
};

//富文本
const handleContentChange = (data) => {
  formData.content = data.html;
};

const editorInstance = ref(null);
const handleEditorCreated = (editor) => {
  editorInstance.value = editor;
  if (formData.content && editor) {
    nextTick(() => {
      editor.setHtml(formData.content);
    });
  }
};

//预览效果
const btnPreview = ref(false);

//提交文章
const formRef = ref(null);
const loading = ref(false);
const handleSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;

    loading.value = true;
    const submitData = {
      ...formData,
      tags: formData.tagArray.join(","),
    };
    delete submitData.tagArray;

    if (!isEdit.value) {
      //若是新增
      submitData.id = businessId.value;
      createArticle(submitData).then((res) => {
        loading.value = false;
        emit("success");
      });
    } else {
      //若是编辑
      updateArticle(props.article.id, submitData).then((res) => {
        loading.value = false;
        emit("success");
      });
    }
  });
};
</script>
<style scoped lang="scss">
.cover-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  height: 128px;
  color: #8b949e;
  background-color: #f5f7fa;
}
.cover-image {
  width: 200px;
  height: 120px;
  display: block;
}

// 打开弹窗流程
// 1. 用户点击"新增"按钮
//         ↓
// 2. 父组件 dialogVisible = true
//         ↓
// 3. 通过 props 传递给子组件 modelValue = true
//         ↓
// 4. 子组件 computed.get() 返回 true
//         ↓
// 5. el-dialog 的 v-model 收到 true，弹窗打开
//  关闭弹窗流程
//  1. 用户点击弹窗关闭按钮（或右上角 ×）
//         ↓
// 2. el-dialog 的 v-model 被设为 false
//         ↓
// 3. 触发 computed.set(false)
//         ↓
// 4. emit("update:modelValue", false) 通知父组件
//         ↓
// 5. 父组件收到事件，dialogVisible = false
//         ↓
// 6. 子组件 props.modelValue = false
//         ↓
// 7. computed.get() 返回 false，弹窗关闭
</style>
