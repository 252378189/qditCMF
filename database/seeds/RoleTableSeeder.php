<?php

use Illuminate\Database\Seeder;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, '超管', '系统超级管理员');
    }

    public function insert($id, $name, $description, $state = 1, $sort = 1000)
    {
        \Illuminate\Support\Facades\DB::table('roles')->insert([
            'id'=>$id,
            'name'=>$name,
            'description'=>$description,
            'state'=>$state,
            'sort'=>$sort,
            'created_at'=>date('Y-m-d H:i:s'),
            'updated_at'=>date('Y-m-d H:i:s')
        ]);
    }
}
