<template>
  <div class="container">
    <div class="title">
      <div class="title-text">
        <h2>创建您的账户</h2>
        <p>请填写注册信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form
        label-position="top"
        :model="formData"
        :rules="rules"
        ref="submitformRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            size="large"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.email"
            placeholder="请输入邮箱"
            size="large"
          />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="formData.nickname"
            placeholder="请输入昵称（可选）"
            size="large"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入手机号（可选）"
            size="large"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            size="large"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            placeholder="请确认密码"
            size="large"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="btn"
            type="primary"
            size="large"
            @click="submitForm(submitformRef)"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
      <div class="footer">
        <p>已有帐户？<router-link to="/auth/login">去登录</router-link></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { register } from "@/api/frontend";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const formData = reactive({
  username: "",
  email: "",
  nickname: "",
  phone: "",
  password: "",
  confirmPassword: "",
  gender: 0,
  userType: 1, //用户类型 1:普通用户 2:管理员
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮箱格式",
      trigger: ["blur", "change"],
    },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== formData.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

// 提交表单
const router = useRouter();
const submitformRef = ref(null); //点击提交判断表单是否正确、一件重置功能
const submitForm = async (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    register(formData).then(({ data }) => {
      console.log(data);
      if (!data) {
        ElMessage.success("注册成功");
        //注册成功后，跳转到登录页
        router.push("/auth/login");
      }
      if (data.code === "BUSINESS_ERROR") {
        ElMessage.error(data.message);
      }
    });
  });
};
// "id": 7921,
// "username": "fkasjfja",
// "email": "fhaha@qq.com",
// "nickname": "minin",
// "phone": "15058373333",
// "gender": 0,
// "genderDisplayName": "未知",
// "userType": 1,
</script>
<style scoped lang="scss">
.container {
  width: 384px;
  .flex-box {
    display: flex;
    align-items: center;
  }
  .title {
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
    margin-top: 30px;
    .btn {
      margin-top: 40px;
      width: 100%;
    }
    .footer {
      padding: 30px;
      text-align: center;
    }
  }
}
</style>
