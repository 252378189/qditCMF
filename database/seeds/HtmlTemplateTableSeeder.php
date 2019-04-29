<?php

use Illuminate\Database\Seeder;

class HtmlTemplateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, '默认模板', 'article/read');
    }

    public function insert($id, $name, $path)
    {
        \Illuminate\Support\Facades\DB::table('html_templates')->insert([
            'id' => $id,
            'name' => $name,
            'path' => $path,
        ]);
    }
}
