<?php

use Illuminate\Database\Seeder;

class ArticleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, '文章标题', '默认账号', 0,
            '文章描述', '网站关键字', '文章封面', 1,
            1, 1, '文章内容', 2, 1
        );
    }

    public function insert(
        $id,
        $title,
        $author,
        $click,
        $desc,
        $keyword,
        $cover,
        $top,
        $recommend,
        $template_id,
        $content,
        $c_id,
        $user_id
    ) {
        \Illuminate\Support\Facades\DB::table('articles')->insert([
           'id'=>$id,
           'title'=>$title,
           'author'=>$author,
           'click'=>$click,
           'desc'=>$desc,
           'keyword'=>$keyword,
           'cover'=>$cover,
           'top'=>$top,
           'recommend'=>$recommend,
           'template_id'=>$template_id,
           'content'=>$content,
           'c_id'=>$c_id,
           'user_id'=>$user_id,
            'created_at'=>date('Y-m-d H:i:s'),
            'updated_at'=>date('Y-m-d H:i:s'),
        ]);
    }
}
