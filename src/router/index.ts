import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/Home.vue'),
            name: 'home'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/authorize/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/authorize/Register.vue')
        },
        {
            path: '/families',
            component: () => import('@/views/families/Index.vue'),
            children: [
                {
                    path: '',
                    name: 'families',
                    component: () => import('@/views/families/Browser.vue')
                },
                {
                    path: ':id',
                    name: 'familyDetail',
                    component: () => import('@/views/families/Detail.vue')
                },
                {
                    path: 'search',
                    name: 'familySearch',
                    component: () => import('@/views/families/Search.vue')
                }
            ]
        },
        {
            path: '/packages',
            component: () => import('@/views/packages/Index.vue'),
            children: [
                {
                    path: '',
                    name: 'packages',
                    component: () => import('@/views/packages/Browser.vue')
                },
                {
                    path: ':id',
                    name: 'packageDetail',
                    component: () => import('@/views/packages/Detail.vue'),
                },
                {
                    path: 'search',
                    name: 'search',
                    component: () => import('@/views/packages/Search.vue')
                }
            ]
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/errors/404.vue')
        }
    ]
})

export default router