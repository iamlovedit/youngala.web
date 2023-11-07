import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from '@/router/routes'


const appRouter = createRouter({
    history: createWebHistory(),
    routes: constantRoute
})

export default appRouter