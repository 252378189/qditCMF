<?php

use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1,0, '新闻资讯');
        $this->insert(2,1, '技术资讯');
    }

    public function insert($id, $pid, $name)
    {
        \Illuminate\Support\Facades\DB::table('categories')->insert([
            'id' => $id,
            'pid' => $pid,
            'name' => $name,
            'created_at'=>date('Y-m-d H:i:s'),
            'updated_at'=>date('Y-m-d H:i:s')
        ]);
    }
}
