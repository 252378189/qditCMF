<?php

use Illuminate\Database\Seeder;

class FriendLinkTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, '驱动IT', 'http://www.qudongit.com');
    }

    public function insert($id, $name, $url)
    {
        \Illuminate\Support\Facades\DB::table('friend_links')->insert([
            'id'=>$id,
            'name'=>$name,
            'url'=>$url,
            'created_at'=>date('Y-m-d H:i:s'),
            'updated_at'=>date('Y-m-d H:i:s'),
        ]);
    }
}
