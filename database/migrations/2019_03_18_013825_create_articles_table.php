<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->comment('文章标题');
            $table->string('author')->comment('文章作者名称');
            $table->integer('click')->default(0)->comment('文章点击量');
            $table->text('desc')->nullable()->comment('文章描述');
            $table->string('keyword')->nullable()->comment("文章关键字 ','号隔开");
            $table->string('cover')->nullable()->comment('封面');
            $table->tinyInteger('top')->default(0)->comment('文章置顶 0不置顶1置顶');
            $table->tinyInteger('recommend')->default(0)->comment('文章推荐 0不推荐 1推荐');
            $table->integer('template_id')->default(1)->comment('文章模板ID,不填写为默认模板');
            $table->mediumText('content')->comment('文章内容');
            $table->tinyInteger('c_id')->comment('文章分类Id');
            $table->integer('user_id')->comment('文章发布者');
            $table->softDeletes();
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
        Schema::dropIfExists('articles');
    }
}
