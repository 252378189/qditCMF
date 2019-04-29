<?php

use Illuminate\Database\Seeder;

class UserAndRoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, 1, 1);
    }

    public function insert($id, $role_id, $user_id)
    {
        \Illuminate\Support\Facades\DB::table('user_and_role')->insert([
            'id' => $id,
            'role_id' => $role_id,
            'user_id' => $user_id,
        ]);
    }
}
