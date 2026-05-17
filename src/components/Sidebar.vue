<template>
    <el-aside width="260px">
   <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
</template>

<script>
import { ref } from 'vue'

const handleOpen=()=>{}
const handleClose=()=>{}
</script>