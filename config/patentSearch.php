<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/3/27
 * Time: 8:42
 */
return [
    'default' => 'innojoy',
    'drive' => [
        'innojoy' => [ //大为专利查询
            'drive' => \App\Services\PatentSearch\Drive\Innojoy::class,
        ],
    ],
    //允许匿名用户查询次数
    'number' => 25
];