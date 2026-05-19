<template>
  <el-aside :width="isCollapse ? '64px' : '264px'">
    <el-menu
      :collapse="isCollapse"
      :collapse-transition="false"
      default-active="2"
      class="menu-style"
    >
      <div class="brand">
        <el-image
          style="width: 50px; height: 50px; margin-right: 10px"
          type="primary"
          :src="iconUrl"
          alt="logo"
        />
        <div v-show="!isCollapse" class="info-card">
          <h1 class="brand-title">心理健康AI助手</h1>
          <p class="brand-subtitle">管理后台</p>
        </div>
      </div>
      <el-menu-item
        v-for="item in router.options.routes[0].children"
        :key="item.path"
        :index="item.path"
        @click="selectMenu"
      >
        <el-icon class="menu-icon"><component :is="item.meta.icon" /></el-icon>
        <span class="menu-title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/admin";

const iconUrl = new URL(
  "@/assets/images/AIjiqiren-icon-AI-2d.png",
  import.meta.url,
).href;

const router = useRouter();
console.log(router, "router");

const selectMenu = (key) => {
  console.log(key, "key");
  const currentRoute = router.options.routes[0]; ///back
  router.push(`${currentRoute.path}/${key.index}`); //得到/back/knowledge跳转
}; //点击菜单跳转不同页面

const isCollapse = computed(() => useAdminStore().isCollapse); //监听isCollapse变化，更新菜单宽度
</script>

<style lang="scss" scoped>
.menu-style {
  height: 100%;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #fff;
    border-bottom: 1px solid #e4e7ed;
    .info-card {
      .brand-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 5px;
        color: #303133;
      }
      .brand-subtitle {
        font-size: 14px;
        font-weight: normal;
        color: #909399;
      }
    }
  }
  .menu-icon {
    font-size: 19px;
    margin-right: 5px;
  }
  .menu-title {
    font-size: 15px;
    font-weight: normal;
    color: #303133;
  }
}
</style>
