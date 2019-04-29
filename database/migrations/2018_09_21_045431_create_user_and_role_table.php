<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserAndRoleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_and_role', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('role_id')->unsigned()->comment('角色ID');
            $table->integer('user_id')->unsigned()->comment('后台用户id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_and_role');
    }
}
