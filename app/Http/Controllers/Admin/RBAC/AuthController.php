<?php

namespace App\Http\Controllers\Admin\RBAC;

use App\Http\Controllers\Base\StatusCode;
use App\Models\Auth;
use App\Models\Menu;
use App\Traits\RestFul;
use App\Http\Controllers\Controller;

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
class AuthController extends Controller
{
    use RestFul;

    /**
     * 返回操作模型
     *
     * @return string
     */
    public function getModel()
    {
        return Auth::class;
    }

    /**
     * 添加操作,字段认证规则
     *
     * @return array
     */
    public function addRule()
    {
        return [
            'menu_id' => 'required|numeric',
            "name" => 'required',
            "description" => 'nullable',
            "keyword" => 'required',
            "sort" => 'nullable|numeric',
            "type" => 'nullable|numeric',
            "extented" => 'nullable',
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
            'menu_id' => 'required|numeric',
            "name" => 'required',
            "description" => 'nullable',
            "keyword" => 'required',
            "sort" => 'nullable|numeric',
            "type" => 'nullable|numeric',
            "extented" => 'nullable',
        ];
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
        return $this->Json(StatusCode::SUCCESS, ['data'=> $tree]);
    }

}
