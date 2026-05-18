<template>
  <!-- 动态组件渲染 -->
  <el-form ref="ruleformRef" :model="formData">
    <el-row :gutter="24">
      <template v-for="item in formItemAttrs" :key="item.prop">
        <el-col v-bind="item.col">
          <el-form-item :label="item.label" :prop="item.prop">
            <component
              v-model="formData[item.prop]"
              :is="isComp(item.comp)"
              :placeholder="item.placeholder"
            >
              <template v-if="item.comp === 'select'">
                <el-option label="全部" value="全部" />
                <el-option
                  v-for="opt in item.options"
                  :key="opt.value"
                  :label="opt.label"
                  :value="opt.value"
                />
              </template>
            </component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <el-row>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset(ruleformRef)"> 重置</el-button>
    </el-row>
  </el-form>
</template>
<script setup>
import { ref, reactive, computed } from "vue";

const props = defineProps({
  formItem: {
    type: Array,
    default: () => [],
  },
}); //props接受父组件传递的formItem数组，用于动态渲染表单组件
const emit = defineEmits(["search"]);

const formItemAttrs = computed(() => {
  const { formItem } = props;
  formItem.forEach((item) => {
    item.col = { xs: 24, sm: 12, md: 8, lg: 6, xl: 6 };
  });
  return formItem;
}); //返回带col属性的formItem数组，用于动态渲染表单组件

const ruleformRef = ref(null); //ruleformRef，用于获取表单实例，用于校验表单数据是否符合要求
const formData = reactive({}); //formData，用于存储表单数据，用于提交表单数据
const isComp = (comp) => {
  return {
    input: "el-input",
    select: "el-select",
  }[comp];
}; //映射函数，根据comp属性返回对应的element组件名称

const handleSearch = () => {
  emit("search", formData); //触发search事件，将formData作为参数传递给父组件knowledge.vue
};
const handleReset = (ruleEl) => {
  if (!ruleEl) return;
  ruleEl.resetFields(); //重置表单数据
  emit("search", formData); //重置后又重新搜索
};
</script>
<style></style>
