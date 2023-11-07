import { createApp } from 'vue'
import '@arco-design/web-vue/dist/arco.css';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App.vue'
import '@/style.css'
import appRouter from '@/router'
import pinia from '@/stores'

const app = createApp(App)
app.use(pinia)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.use(appRouter)
app.mount('#app')
