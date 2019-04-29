<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Controller;
use App\Models\FriendLink;
use App\Traits\RestFul;

/**
 * 友情链接控制器
 *
 * Class FriendLinkController
 *
 * @category FriendLinkController
 * @package  App\Http\Controllers\Admin\System
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class FriendLinkController extends Controller
{
    use RestFul;

    /**
     * 返回操作模型
     *
     * @return string
     */
    public function getModel()
    {
        return FriendLink::class;
    }

    /**
     * 添加操作,字段认证规则
     *
     * @return array
     */
    public function addRule()
    {
        return[
            'name' => 'required',
            'url' => 'required',
        ];
    }

    /**
     * 修改操作,字段认证规则
     *
     * @return array
     */
    public function editRule()
    {
        return[
            'name' => 'required',
            'url' => 'required',
        ];
    }
}
