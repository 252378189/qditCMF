<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConfigTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config', function (Blueprint $table) {
            $table->increments('id');
            $table->string('pid')->nullable()->comment('父级编号');
            $table->string('keyword')->nullable()->comment('关键字');
            $table->string('type')->nullable()->comment('值类型');
            $table->text('value')->nullable()->comment('值');
            $table->string('desc')->nullable()->comment('描述');
            $table->integer('user_id')->nullable()->comment('用户Id(用户专属配置)');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('base_datas');
    }
}
