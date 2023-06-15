export const constantRoute = [
    {
        path: '/',
        component: () => import('@/views/Home.vue'),
        name: 'home',
        meta: {
            title: '首页',
            hidden: false,
        }
    },
    {
        path: '/admin',
        name: 'admin',
        meta: {
            title: '管理后台',
            hidden: true
        },
        component: () => import('@/views/administrator/Index.vue'),
        children: [

        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            hidden: true
        },
        component: () => import('@/views/authorize/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册',
            hidden: true
        },
        component: () => import('@/views/authorize/Register.vue')
    },
    {
        path: '/family',
        component: () => import('@/views/families/Index.vue'),
        meta: {
            title: '族库',
            hidden: false,
        },
        children: [
            {
                path: '',
                name: 'families',
                component: () => import('@/views/families/Browser.vue')
            },
            {
                path: ':id(\\d+)',
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
        path: '/package',
        component: () => import('@/views/packages/Index.vue'),
        meta: {
            title: '节点包',
            hidden: false,
        },
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
        path: '/:catch(.*)',
        name: '404',
        meta: {
            title: '',
            hidden: true
        },
        component: () => import('@/views/errors/404.vue')
    },
    {
        path: '/403',
        name: '403',
        meta: {
            title: '',
            hidden: true
        },
        component: () => import('@/views/errors/403.vue')
    }
]