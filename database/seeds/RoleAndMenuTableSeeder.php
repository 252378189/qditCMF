<?php

use Illuminate\Database\Seeder;

class RoleAndMenuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, 1);
        $this->insert(2, 2);
        $this->insert(3, 3);
        $this->insert(4, 4);
        $this->insert(5, 5);
        $this->insert(6, 6);
        $this->insert(7, 7);
        $this->insert(8, 8);
        $this->insert(9, 9);
        $this->insert(10, 10);
        $this->insert(11, 11);
        $this->insert(12, 12);
        $this->insert(13, 13);
        $this->insert(14, 14);
        $this->insert(15, 15);
        $this->insert(16, 16);
        $this->insert(17, 17);
        $this->insert(18, 18);
    }

    public function insert($id, $menu_id, $role_id = 1)
    {
        \Illuminate\Support\Facades\DB::table('role_and_menus')->insert([
            'id'=>$id,
            'menu_id'=>$menu_id,
            'role_id'=>$role_id,
        ]);
    }
}
