<template>
  <div class="page-head">
    <p class="page-title">{{ props.title }}</p>
    <div class="action-btn">
      <slot name="buttons"></slot>
      <!-- 插槽，通过name属性指定插槽名称，子组件可以使用#插槽名称来访问插槽内容
       如knowledge.vue中使用#buttons插槽，新增按钮 -->
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "页面标题",
  },
}); //props，用于接收props，用于接收父组件传递的title属性，如knowledge.vue中使用<PageHead title="知识文章" >
</script>
<style>
.page-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.page-title {
  font-size: 23px;
  font-weight: bold;
  color: #1f2937;
}
.action-btn {
  display: flex;
  align-items: center;
}
</style>
