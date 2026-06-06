<template>
  <div class="container">
    <div class="title">
      <div class="back-home">
        <router-link to="/">
          <el-icon><Back /></el-icon>
          返回首页
        </router-link>
      </div>
      <div class="title-text">
        <h2>登录您的账户</h2>
        <p>输入您的登录信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="用户名或邮箱" prop="username">
          <el-input
            v-model="formData.username"
            size="large"
            placeholder="请输入用户名或邮箱"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            size="large"
            placeholder="请输入密码"
            type="password"
            show-password
          />
        </el-form-item>
        <el-button
          class="btn"
          type="primary"
          size="large"
          @click="submitForm(ruleFormRef)"
          >登录账户</el-button
        >
      </el-form>
      <div class="footer">
        <p>还没有账户？<router-link to="/auth/register">去注册</router-link></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { login } from "@/api/admin";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

const ruleFormRef = ref(); //得到表单实例
const formData = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
//登录提交，formEl为ruleFormRef.value
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    //验证表单数据
    if (valid) {
      login(formData).then((data) => {
        //判断token是否存在
        if (!data.token) {
          return console.error("登录失败");
        }
        //登录成功，保存token和用户信息
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
        //根据用户角色决定跳转路径
        if (data.userInfo.userType === 2) {
          router.push("/back/dashboard");
        } else {
          router.push("/");
        }
      });
    }
  });
};
</script>
<style scoped lang="scss">
.container {
  width: 384px;
  .title {
    .back-home {
      margin-bottom: 60px;
    }
    .title-text {
      text-align: center;
      h2 {
        font-size: 36px;
        margin-bottom: 10px;
      }
      p {
        font-size: 18px;
        color: #6b7280;
      }
    }
  }
  .form-container {
    margin-top: 15px;
    .btn {
      margin-top: 30px;
      width: 100%;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
