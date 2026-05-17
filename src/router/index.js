import { createRouter, createWebHistory } from "vue-router";
import BackendLayout from "@/components/BackendLayout.vue";

//路由配置
const backendRoutes = [
  {
    path: "/back",
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
];
//创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: backendRoutes,
});
//导出路由实例，以便在 main.js 中通过 app.use(router) 挂载到 Vue
export default router;
