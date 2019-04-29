<?php

use Illuminate\Database\Seeder;

class SEOTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, '页面关键字', '页面描述', '页面标题', '首页TDK设置');
    }

    public function insert($id, $keyword, $desc, $title, $name)
    {
        \Illuminate\Support\Facades\DB::table('s_e_o_s')->insert([
            'id' => $id,
            'keywords' => $keyword,
            'desc' => $desc,
            'title' => $title,
            'name' => $name,
        ]);
    }
}
