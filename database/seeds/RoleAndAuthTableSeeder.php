<?php

use Illuminate\Database\Seeder;

class RoleAndAuthTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, 1, 'menu');
        $this->insert(2, 2, 'role');
        $this->insert(3, 3, 'user', 1, ["add","edit","delete","disable","userGiveRole","editUserRole"]);
        $this->insert(4, 4, 'auth');
        $this->insert(5, 5, 'article_list');
        $this->insert(6, 6, 'recovery',1, ["recovery","delete"]);
        $this->insert(7, 7, 'publish_article',1, []);
        $this->insert(8, 8, 'article_edit',1, []);
        $this->insert(9, 9, 'template');
        $this->insert(10, 10, 'category',1, []);
        $this->insert(11, 11, 'seo');
        $this->insert(12, 12, 'nav');
        $this->insert(13, 13, 'friend_link');
        $this->insert(14, 14, 'sitebase');
    }

    public function insert($id, $auth_id, $page, $role_id = 1, $extented = ["add", "edit", "delete"], $state = 1)
    {
        $extented = json_encode($extented);
        \Illuminate\Support\Facades\DB::table('role_and_auth')->insert([
            'id' => $id,
            'auth_id' => $auth_id,
            'page' => $page,
            'role_id' => $role_id,
            'extented' => $extented,
            'state' => $state,
        ]);
    }
}
