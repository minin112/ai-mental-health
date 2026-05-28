import { createRouter, createWebHistory } from "vue-router";
import BackendLayout from "@/components/BackendLayout.vue";
import AuthLayout from "@/components/AuthLayout.vue";
import FrontendLayout from "@/components/FrontendLayout.vue";
import consultation from "@/views/consultation.vue";
import home from "@/views/home.vue";
import emtionDiary from "@/views/emtionDiary.vue";
import frontendknowledge from "@/views/frontendknowledge.vue";

//路由配置
const backendRoutes = [
  {
    path: "/back",
    redirect: "/back/dashboard",//已登陆情况下默认跳转
    component: BackendLayout,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard.vue"),
        meta: {
          title: "数据分析",
          icon: "PieChart",
        },
      },
      {
        path: "knowledge",
        component: () => import("@/views/knowledge.vue"),
        meta: {
          title: "知识文章",
          icon: "Document",
        },
      },
      {
        path: "consultations",
        component: () => import("@/views/consultations.vue"),
        meta: {
          title: "咨询记录",
          icon: "ChatLineSquare",
        },
      },
      {
        path: "emotional",
        component: () => import("@/views/emotional.vue"),
        meta: {
          title: "情绪日志",
          icon: "ChatDotRound",
        },
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        component: () => import("@/views/login.vue"),
        meta: {
          title: "登录",
        },
      },
      {
        path: "register",
        component: () => import("@/views/register.vue"),
        meta: {
          title: "注册",
        },
      },
    ],
  },
];
const frontendRoutes = [
  {
    path: "/",
    component: FrontendLayout,
    children: [
      {
        path: "",
        component: () => import("@/views/home.vue"),
      },
      {
        path: "consultation",
        component: () => import("@/views/consultation.vue"),      
      },
      {
        path: "emtionDiary",
        component: () => import("@/views/emtionDiary.vue"),
       
      },
      {
        path: "frontendknowledge",
        component: () => import("@/views/frontendknowledge.vue"),
        
      },
    ],
  },
];
//创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [...backendRoutes, ...frontendRoutes],
});

//路由前置守卫
router.beforeEach((to, from, next) => {
  const token=localStorage.getItem("token");
  //如果token存在，说明已登录，直接放行
  if(token){
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    //如果是后台用户
    if(userInfo.userType==2){
      if(to.path.startsWith("/back")){
        next();
      }else{
        next("/back/dashboard");
      }}
      //如果是普通用户
    else if(userInfo.userType==1){
      if(to.path.startsWith("/back")||to.path.startsWith("/auth")){
        next("/");
      }else{
        next();
      }
    }
  
  }else{
        if(to.path.startsWith("/back")){
        next("/auth/login");
      }else{
        next();
      }

  }
})

//导出路由实例，以便在 main.js 中通过 app.use(router) 挂载到 Vue
export default router;
