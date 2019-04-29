<?php

use Illuminate\Database\Seeder;

class MenuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, 0, '系统设置', 'el-icon-setting');
        $this->insert(2, 1, '菜单管理', null, '/menu');

        $this->insert(3, 0, '用户管理', 'el-icon-menu');
        $this->insert(4, 3, '角色管理', null, '/role');
        $this->insert(5, 3, '用户管理', null, '/user');
        $this->insert(6, 3, '权限管理', null, '/auth');

        $this->insert(7, 0, '文章管理', 'el-icon-location');
        $this->insert(8, 7, '文章列表', null, '/article_list');
        $this->insert(9, 7, '回收站', null, '/recovery');
        $this->insert(10, 7, '发布文章', null, '/publish_article');
        $this->insert(11, 7, '文章编辑', null, '/article_edit', 0);
        $this->insert(12, 7, '模板管理', null, '/template');
        $this->insert(13, 7, '文章分类', null, '/category');

        $this->insert(14, 0, '网站运营', 'el-icon-service');
        $this->insert(15, 14, '网站SEO', null, '/seo');
        $this->insert(16, 14, '网站导航', null, '/nav');
        $this->insert(17, 14, '友情链接', null, '/friend_link');
        $this->insert(18, 14, '网站信息', null, '/sitebase');
    }

    public function insert($id, $pid, $name, $icon, $url= null, $state = 1, $sort = 1000)
    {

        \Illuminate\Support\Facades\DB::table('menus')->insert([
           'id'=>$id,
           'pid'=>$pid,
           'name'=>$name,
           'icon'=>$icon,
           'url'=>$url,
           'sort'=>$sort,
           'state'=>$state,
            'created_at'=>date('Y-m-d H:i:s'),
            'updated_at'=>date('Y-m-d H:i:s')
        ]);
    }
}
