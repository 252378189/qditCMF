// 文章内容模块的路由
export default [
    {
        path: '/article_list',name:'article_list', component:resolve=>require(['@/view/article/article'],resolve)
    },
    {
        path: '/recovery',name:'recovery', component:resolve=>require(['@/view/article/recovery'],resolve)
    },
    {
        path: '/publish_article',name:'publish_article', component:resolve=>require(['@/view/article/publish'],resolve)
    },
    {
        path: '/article_edit',name:'article_edit', component:resolve=>require(['@/view/article/edit'],resolve)
    },
    {
        path: '/template',name:'template', component:resolve=>require(['@/view/article/ArticleTemplate/template'],resolve)
    },
    {
        path: '/category',name:'category', component:resolve=>require(['@/view/article/category'],resolve)
    },
]