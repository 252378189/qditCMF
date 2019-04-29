<?php

use Illuminate\Database\Seeder;

class NavTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, '首页', '/', 1);
    }

    public function insert($id, $name, $link, $seo_id, $nav_banner = null)
    {
        \Illuminate\Support\Facades\DB::table('navs')->insert([
            'id' => $id,
            'name' => $name,
            'link' => $link,
            'seo_id' => $seo_id,
            'nav_banner' => $nav_banner,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
    }
}
