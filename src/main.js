import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'

//挂载路由实例到 Vue 应用实例
createApp(App).use(ElementPlus).use(router).mount('#app')
