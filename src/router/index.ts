import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/Home.vue'),
            name: 'home'
        },
        {
            path: '/packages',
            name: 'packages',
            component: () => import('../views/packages/index.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/authorize/login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/authorize/register.vue')
        },
        {
            path: '/library',
            name: 'library',
            component: () => import('../views/families/index.vue')
        }
    ]
})

export default router