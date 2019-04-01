<?php

namespace App\Http\Controllers\Admin\RBAC;

use App\Models\Auth;
use App\Models\Menu;
use Illuminate\Http\Request;
use App\Http\Controllers\Base\BaseController;

/**
 * 权限控制器
 *
 * Class AuthController
 *
 * @category AuthController
 * @package  App\Http\Controllers\User
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class AuthController extends BaseController
{
    protected $model = Auth::class;

    /**
     * 添加权限
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        $field = $this->formVerif($request, [
            'menu_id' => 'required|numeric',
            "name" => 'required',
            "description" => 'nullable',
            "keyword" => 'required',
            "sort" => 'nullable|numeric',
            "type" => 'nullable|numeric',
            "extented" => 'nullable',
        ]);
        $res = $this->model::create($field);
        return $this->returnMsg($res);
    }

    /**
     * 修改操作
     *
     * @param                          $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function edit($id, Request $request)
    {
        $field = $this->formVerif($request, [
            'menu_id' => 'required|numeric',
            "name" => 'required',
            "description" => 'nullable',
            "keyword" => 'required',
            "sort" => 'nullable|numeric',
            "type" => 'nullable|numeric',
            "extented" => 'nullable',
        ]);
        $res = $this->model::where('id', $id)->update($field);
        return $this->returnMsg($res);
    }

    /**
     * 返回权限树形结构
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authTree()
    {
        $tree = Menu::with('SubMenu.SubMenu.HasAuth')->where('pid', 0)->get();
        $tree->map(
            function ($value) {
                $value->SubMenu->map(
                    function ($val) {
                        if (count($val->SubMenu) == 0) {
                            return $val->load('HasAuth');
                        } else {
                            return $val;
                        }
                    }
                );
                return $value;
            }
        );
        return $this->returnData($tree);
    }

}
