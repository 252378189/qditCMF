import system from './system/system'
import rbac from './system/rbac'
import user from './system/user'
import article from './article/article'

export default [
    {
        path: '/', component:resolve=>require(['@/view/home'],resolve),
        children: [
            {
                path: '/',name:'home', component:resolve=>require(['@/components/Hello'],resolve)
            },
            ...system,
            ...rbac,
            ...user,
            ...article,
        ]
    },
    {
        path: '/login', name:'login',component:resolve=>require(['@/view/login'],resolve)
    },
    {
        path: '/500',name: 'error_500',component: resolve=>require(['@/view/error/500.vue'],resolve)
    },
    {
        path: '/401',name: 'error_401',component: resolve=>require(['@/view/error/401.vue'],resolve)
    },
    {   // 404
        path: '*',name: 'error_404',component: resolve=>require(['@/view/error/404.vue'],resolve)
    }
];