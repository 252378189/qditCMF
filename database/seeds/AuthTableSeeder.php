<?php

use Illuminate\Database\Seeder;

class AuthTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, 2, '菜单管理', '对菜单的所有权限控制', 'menu_all_controller');
        $this->insert(2, 4, '角色管理', '角色的全部控制权限', 'role_all_controller');
        $this->insert(3, 4, '用户管理', '用户的全部控制权限', 'user_all_controller',
            [
                "type"=>true,
                "data"=>[
                    [
                        "value"=>"add",
                        "label"=> "添加"
                    ],
                    [
                        "value"=>"edit",
                        "label"=> "编辑"
                    ],
                    [
                        "value"=>"delete",
                        "label"=> "删除"
                    ],
                    [
                        "value"=>"disable",
                        "label"=> "禁用用户"
                    ],
                    [
                        "value"=>"userGiveRole",
                        "label"=> "给予用户权限"
                    ],
                    [
                        "value"=>"editUserRole",
                        "label"=> "编辑用户权限"
                    ]
                ]
            ]
        );
        $this->insert(4, 6, '权限管理', '权限的全部控制权限', 'auth_all_controller');
        $this->insert(5, 8, '内容管理', '文章的全部控制权限', 'article_all_controller');
        $this->insert(6, 9, '内容回收', '文章回收站的全部控制权限', 'recovery_all_controller', [
            "type"=>true,
            "data"=>[
                [
                    'value'=>'recovery',
                    'label'=>'文章回收'
                ],
                [
                    'value'=>'delete',
                    'label'=>'删除'
                ]
            ]
        ]);

        $this->insert(7, 10, '文章发布', '文章发布视图的控制权限', 'article_publish_controller', null);
        $this->insert(8, 11, '文章编辑', '文章编辑权限', 'article_edit_control', null);
        $this->insert(9, 12, '模板管理', '模板管理的全部权限', 'template_all_controller');
        $this->insert(10, 13, '文章分类', '文章分类权限控制', 'category_all_controller', null);
        $this->insert(11, 15, '网站SEO', '网站SEO权限管理', 'seo_all_controller');
        $this->insert(12, 16, '网站导航', '网站导航权限管理', 'nav_all_controller');
        $this->insert(13, 17, '友情链接', '友情链接权限管理', 'friend_all_controller');
        $this->insert(14, 18, '网站信息', '网站信息权限管理', 'site_all_controller');
    }

    public function insert(
        $id,
        $menuId,
        $name,
        $description,
        $keyword,
        $extented =   [
            "type"=> true,
            "data"=> [
                [
                    "value"=>"add",
                    "label"=> "添加"
                ],
                [
                    "value"=>"edit",
                    "label"=> "编辑"
                ],
                [
                    "value"=>"delete",
                    "label"=> "删除"
                ],
            ]
    ],
        $type = 1,
        $default = 0,
        $sort = 1000)
    {
        if(is_array($extented)) {
            $extented = json_encode($extented);
        }

        \Illuminate\Support\Facades\DB::table('authorities')->insert([
           'id' =>$id,
           'menu_id' =>$menuId,
           'name' =>$name,
           'description' =>$description,
           'keyword' =>$keyword,
           'extented' =>$extented,
           'type' =>$type,
           'default' =>$default,
           'sort' =>$sort,
           'created_at'=>date('Y-m-d:H:i:s'),
           'updated_at'=>date('Y-m-d:H:i:s'),
        ]);
    }
}
