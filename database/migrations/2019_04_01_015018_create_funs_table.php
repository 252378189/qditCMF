<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFunsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('funs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->comment('功能介绍标题');
            $table->string('desc')->comment('功能介绍描述');
            $table->text('photos')->comment('功能介绍图片');
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
        Schema::dropIfExists('funs');
    }
}
