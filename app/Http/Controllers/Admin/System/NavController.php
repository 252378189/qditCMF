<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Base\StatusCode;
use App\Http\Controllers\Controller;
use App\Models\Nav;
use App\Traits\RestFul;

/**
 * 前端导航列表控制器
 *
 * Class NavController
 *
 * @category NavController
 * @package  App\Http\Controllers\Admin\System
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class NavController extends Controller
{
    use RestFul;

    /**
     * 返回操作模型
     *
     * @return string
     */
    public function getModel()
    {
        return Nav::class;
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
            'link' => 'required',
            'seo_id' => 'nullable',
            'nav_banner' => 'nullable',
        ];
    }

    /**
     * 修改操作,字段认证规则
     *
     * @return array
     */
    public function editRule()
    {
        return [
            'name' => 'required',
            'link' => 'required',
            'seo_id' => 'nullable',
            'nav_banner' => 'nullable',
        ];
    }

    /**
     * 导航列表
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $data = $this->filter(Nav::query()->with('seo'));
        return $this->Json(StatusCode::SUCCESS, $data);
    }

}
