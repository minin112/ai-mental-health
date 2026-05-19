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
const props = defineProps({
  title: {
    type: String,
    default: "页面标题",
  },
});
//props 父传给子数据
//父组件通过title属性传递页面标题，子组件通过{{ props.title }}来访问
</script>
<style>
.page-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 17px;
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
