<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1,'默认账号','123456', '13686840083', '513051043@qq.com');
    }

    public function insert($id, $userName, $passWord, $phone, $email, $sex = 1, $state = 1, $avatar = null)
    {
        \Illuminate\Support\Facades\DB::table('users')->insert([
           'id'=>$id,
           'username'=>$userName,
           'password'=>md5($passWord),
           'phone'=>$phone,
           'email'=>$email,
           'sex'=>$sex,
           'state'=>$state,
           'avatar'=>$avatar,
            'created_at'=>date('Y-m-d H:i:s'),
            'updated_at'=>date('Y-m-d H:i:s'),
        ]);
    }
}
