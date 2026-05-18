<template>
  <div class="navbar">
    <!-- 左边导航栏 -->
    <div class="flex-box">
      <el-button>
        <el-icon><Expand /></el-icon>
      </el-button>
      <p class="page-title">导航栏</p>
    </div>
    <!-- 右边头像下拉菜单 -->
    <div class="flex-box">
      <el-dropdown @command="handleCommand">
        <div class="flex-box">
          <el-avatar :src="iconUrl" />
          <p class="user-neme">admin</p>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user-center">个人中心</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
const handleCommand = (command) => {
  if (command === "logout") {
    // router.push("/login");
  }
};
const iconUrl = new URL(
  "@/assets/images/AIjiqiren-icon-AI-2d.png",
  import.meta.url,
).href;
</script>

<style lang="scss" scoped>
.navbar {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background-color: white;
  box-shadow: 0 1px 4px rgb(0, 21, 41, 0.08); //阴影效果
  border-bottom: 1px solid #e5e7eb;
  .flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-title {
    margin-left: 20px;
    font-size: 23px;
    font-weight: bold;
    color: #1f2937;
  }
  .user-neme {
    margin-left: 10px;
    font-size: 15px;
    font-weight: normal;
    color: #909399;
  }
}
</style>
