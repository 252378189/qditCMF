// 系统设置模块
export default [
    {
        path: '/menu', name: 'menu', component: resolve => require(['@/view/system/menu/menu'], resolve)
    },
    {
        path: '/config', name: 'config', component: resolve => require(['@/view/system/config/list'], resolve)
    },
    {
        path: '/seo', name: 'seo', component: resolve => require(['@/view/webSite/seo/seo'], resolve)
    },
    {
        path: '/friend_link',
        name: 'friend_link',
        component: resolve => require(['@/view/webSite/FriendLink/FriendLink'], resolve)
    },
    {
        path: '/nav', name: 'nav', component: resolve => require(['@/view/webSite/HomeNav/nav'], resolve)
    },
    {
        path: '/sitebase',
        name: 'sitebase',
        component: resolve => require(['@/view/webSite/sitebase/siteBase'], resolve)
    },
]