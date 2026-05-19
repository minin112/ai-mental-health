<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch"></TableSearch>
    <!-- 父组件通过@search事件监听子组件emits传递的查询参数 -->
  </div>
</template>
<script setup>
import PageHead from "@/components/PageHead.vue";
import TableSearch from "@/components/TableSearch.vue";

const formItem = [
  {
    comp: "input",
    prop: "title",
    label: "文章标题",
    placeholder: "请输入文章标题",
  },
  {
    comp: "select",
    prop: "categoryId",
    label: "文章分类",
    placeholder: "请选择文章分类",
    options: [
      {
        label: "心理健康基础",
        value: 1,
      },
      {
        label: "情绪管理",
        value: 2,
      },
    ],
  },
];
const handleSearch = (formData) => {
  console.log(formData, "查询参数");
};
</script>
