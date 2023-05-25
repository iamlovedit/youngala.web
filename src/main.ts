import { createApp } from 'vue'
import '@arco-design/web-vue/dist/arco.css';
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue'
import './style.css'
import router from './router'

const app = createApp(App)
app.use(ArcoVue)
app.use(router)
app.mount('#app')
