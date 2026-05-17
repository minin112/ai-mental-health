import {createRouter, createWebHistory} from 'vue-router'
import backendLayout from '@/components/backendLayout.vue'

//路由配置
const backendRoutes = [
    {
        path: '/back',
        component: backendLayout
    }
   ]
//创建路由实例
const router=createRouter({
    history: createWebHistory(),
    routes: backendRoutes
})
//导出路由实例，以便在 main.js 中通过 app.use(router) 挂载到 Vue 
export default router