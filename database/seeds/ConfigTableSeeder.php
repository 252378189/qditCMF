<?php

use Illuminate\Database\Seeder;

class ConfigTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->insert(1, 0, 'json', 'admin_base', [
            "article_total" => 0,
            "pv" => 0,
            "search" => 0,
            "submit" => 0,
            "monday" => 0,
            "tuesday" => 0,
            "wednesday" => 0,
            "thursday" => 0,
            "friday" => 0,
            "saturday" => 0,
            "sunday" => 0
        ], '后台首页配置项');
        $this->insert(2, 0, 'json', 'sitebase',
            [
                "site_name" => "网站名称",
                "icp" => "网站icp备案号",
                "qq" => "网站联系人qq",
                "phone" => "网站联系人手机号码",
                "tel" => "网站联系人电话",
                "email" => "网站联系人邮箱",
                "postNum" => "网站联系人所在邮编地址",
                "jsSlot" => [ //js代码插槽
                    ["code" => "<scritp>console.log('输出')<\/scritp>"]
                ],
                "items" => [
                    [
                        "address" => "网址搭建人所在地址", "tel" => '联系电话', "index" => 1, "status" => 1
                    ],
                ]
            ],
            '前端页面配置');
        $this->insert(3, 0, 'json', 'about',['content' => '关于我们'], '关于我们');

    }

    public function insert($id, $pid, $type, $keyword, $value, $desc = '没有描述', $user_id = null)
    {
        if ($type == 'json') {
            $value = json_encode($value);
        }
        \Illuminate\Support\Facades\DB::table('config')->insert([
            'id' => $id,
            'pid' => $pid,
            'type' => $type,
            'keyword' => $keyword,
            'value' => $value,
            'desc' => $desc,
            'user_id' => $user_id,
        ]);
    }
}
