<template>
  <div>
    <PageHead title="情绪日志" />
    <TableSearch :formItem="formItem" @search="handleSearch" />
    <el-table :data="tableData" width="100%">
      <el-table-column prop="id" label="ID" width="90"></el-table-column>
      <el-table-column prop="userId" label="会话ID" width="90">
        <template #default="scope">
          <el-avatar>{{ scope.row.nickname }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="diaryDate" label="记录日期" width="130">
      </el-table-column>
      <el-table-column label="情绪评分" width="">
        <template #default="scope">
          <el-rate v-model="scope.row.moodScore" disabled max="10"></el-rate>
        </template>
      </el-table-column>
      <el-table-column label="生活指标" width="150">
        <template #default="scope">
          <div>
            <p>睡眠：{{ scope.row.sleepQuality }} / 5</p>
            <p>压力：{{ scope.row.stressLevel }} / 5</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="emotionTriggers"
        label="情绪触发因素"
        width="130"
      />
      <el-table-column prop="diaryContent" label="内容日记" width="200" />
      <el-table-column label="操作" width="220" fixed="right">
        <template #default="scope">
          <el-button text type="primary" @click="viewSessionDetail(scope.row)"
            >详情</el-button
          >

          <el-button text type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 25px"
      layout="prev, pager, next"
      :total="pagination.total"
      :page-size="pagination.size"
      @change="handleChange"
    />
    <!-- 详情弹窗 -->
    <el-dialog
      v-model="detaileDialogVisible"
      title="情绪日志详情"
      width="800px"
      :close-on-click-modal="false"
    >
      <div v-if="currentDetail.id">
        <div class="detail-section">
          <h4>用户信息</h4>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="用户名">{{
              currentDetail.username
            }}</el-descriptions-item>
            <el-descriptions-item label="昵称">{{
              currentDetail.nickname
            }}</el-descriptions-item>
            <el-descriptions-item label="用户ID">{{
              currentDetail.userId
            }}</el-descriptions-item>
            <el-descriptions-item label="记录日期">{{
              currentDetail.diaryDate
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="detail-section">
          <h4>情绪状态</h4>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="情绪评分">
              <el-rate v-model="currentDetail.moodScore" disabled max="10" />
            </el-descriptions-item>
            <el-descriptions-item label="主要情绪">
              <el-tag :type="getEmotionTagType(currentDetail.dominantEmotion)">
                {{ currentDetail.dominantEmotion || "-" }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item label="睡眠质量"
              >{{ currentDetail.sleepQuality || "-" }}/5</el-descriptions-item
            >
            <el-descriptions-item label="压力水平"
              >{{ currentDetail.stressLevel || "-" }}/5</el-descriptions-item
            >
          </el-descriptions>
        </div>
        <div class="detail-section">
          <h4>日记内容</h4>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="情绪触发因素">{{
              currentDetail.emotionTriggers || "无"
            }}</el-descriptions-item>
            <el-descriptions-item label="内容日记">{{
              currentDetail.diaryContent || "无"
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <!-- <div class="detail-section">
          <h4>AI情绪分析结果</h4>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="主要情绪">
              <el-tag :type="getAiEmotionTagType(aiData.primaryEmotion)">
                {{ aiData.primaryEmotion }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item label="情绪强度">
              <el-progress
                :percentage="aiData.emotionScore"
                :color="getEmotionScoreColor(aiData.emotionScore)"
                :stroke-width="8"
              ></el-progress>
            </el-descriptions-item>
            <el-descriptions-item label="风险等级">
              <el-tag :type="getAiEmotionTagType(aiData.riskLevel)">
                {{ aiData.riskLevel }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item label="情绪性质">
              <el-tag :type="aiData.isNegative ? 'danger' : 'success'">
                {{ aiData.isNegative ? '负面情绪' : '正面情绪' }}</el-tag
              >
            </el-descriptions-item>
          </el-descriptions>
        </div> -->
      </div>
      <template #footer>
        <el-button @click="detaileDialogVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import PageHead from "@/components/PageHead.vue";
import TableSearch from "@/components/TableSearch.vue";
import { getEmotionalPage, deleteEmotional } from "@/api/admin";
import { ElMessageBox, ElMessage } from "element-plus";

const formItem = [
  {
    comp: "input",
    prop: "userId",
    label: "用户ID",
    placeholder: "请输入用户ID",
  },
  {
    comp: "select",
    prop: "moodScreRange",
    label: "情绪评分",
    placeholder: "请选择情绪评分范围",
    options: [
      {
        label: "低分（1-3）",
        value: "1-3",
      },
      {
        label: "中分（4-6）",
        value: "4-6",
      },
      {
        label: "高分（7-10）",
        value: "7-10",
      },
    ],
  },
];

const tableData = ref([]);

//分页参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});
const handleChange = (page) => {
  pagination.currentPage = page;
  handleSearch();
};
const handleSearch = async (formData) => {
  const params = {
    ...pagination,
    ...formData,
  };

  const { records, total } = await getEmotionalPage(params);

  tableData.value = records;
  console.log(tableData.value);
  pagination.total = total;
};

//详情弹窗
const detaileDialogVisible = ref(false);
const currentDetail = ref(null);
const aiData = ref(null);
const viewSessionDetail = (row) => {
  currentDetail.value = row;
  if (row.aiEmotionAnalysis) {
    aiData.value = JSON.parse(row.aiEmotionAnalysis);
    console.log(aiData.value);
  } else {
    aiData.value = null;
  }
  detaileDialogVisible.value = true;
};

const handleDelete = (row) => {
  ElMessageBox.confirm("确认删除该条记录吗？", "确认删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    deleteEmotional(row.id).then(() => {
      ElMessage.success("删除成功");
      handleSearch();
    });
  });
};

onMounted(() => {
  handleSearch();
});

//映射方法
const getEmotionTagType = (emotion) => {
  const emotionTypes = {
    快乐: "success",
    平静: "info",
    兴奋: "warning",
    愤怒: "danger",
    悲伤: "info",
    焦虑: "warning",
  };
  return emotionTypes[emotion] || "info";
};

const getAiEmotionTagType = (emotion) => {
  const emotionTagMap = {
    快乐: "success",
    平静: "success",
    兴奋: "warning",
    满足: "success",
    愤怒: "danger",
    悲伤: "info",
    焦虑: "warning",
    恐惧: "danger",
    沮丧: "info",
    压力: "warning",
  };
  return emotionTagMap[emotion] || "info";
};

const getEmotionScoreColor = (score) => {
  if (score >= 80) return "#f56c6c";
  if (score >= 60) return "#e6a23c";
  if (score >= 40) return "#909399";
  return "#67c23a";
};

const getRiskLevelTagType = (riskLevel) => {
  const riskTagMap = {
    0: "success",
    1: "info",
    2: "warning",
    3: "danger",
  };
  return riskTagMap[riskLevel] || "info";
};

const getRiskLevelText = (riskLevel) => {
  const riskTextMap = {
    0: "正常",
    1: "关注",
    2: "预警",
    3: "危机",
  };
  return riskTextMap[riskLevel] || "未知风险等级";
};
</script>
