<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/3/27
 * Time: 8:42
 */
return [
    'default' => 'bj',
    'drive' => [
        'bj' => [ //大为专利查询
            'drive' => \App\Services\trademarkSearch\Drive\BJ::class,
        ],
    ],
    //允许匿名用户查询次数
    'number' => 25
];