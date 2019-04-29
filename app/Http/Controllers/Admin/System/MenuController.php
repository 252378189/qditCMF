<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Base\StatusCode;
use App\Models\RoleAndMenu;
use App\Models\User;
use App\Traits\RestFul;
use Illuminate\Http\Request;
use App\Models\Menu;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

/**
 * Class MenuController
 *
 * @category MenuController
 * @package  App\Http\Controllers\System
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class MenuController extends Controller
{
    use RestFul;

    /**
     * 返回操作模型
     *
     * @return string
     */
    protected function getModel()
    {
       return Menu::class;
    }

    /**
     * 添加操作,字段认证规则
     *
     * @return array
     */
    public function addRule()
    {
        return[
            'name' => 'required|max:255',
            'pid' => 'required|numeric',
            'state' => 'required|numeric',
            'icon' => 'nullable',
            'sort' => 'nullable',
            'url' => 'nullable',
        ];
    }

    /**
     * 修改操作,字段认证规则
     * @return array
     */
    public function editRule()
    {
        return[
            'name' => 'required|max:255',
            'pid' => 'required|numeric',
            'state' => 'required|numeric',
            'icon' => 'nullable',
            'sort' => 'nullable|numeric',
            'url' => 'nullable',
        ];
    }

    /**
     * 菜单列表
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $data =  $this->filter(Menu::query()->withCount('SubMenu as children_count'));
        return $this->Json(StatusCode::SUCCESS, $data);
    }

    /**
     * 获得树形结构
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTree()
    {
        $tree = Menu::query()->with('SubMenu.SubMenu')
            ->where('pid', 0)
            ->get()
            ->toArray();
        return $this->Json(StatusCode::SUCCESS, ['data'=>$tree]);
    }

    /**
     * 根据ID查找父类id 级联菜单回显使用
     *
     * @param Request $id 请求中传入子类ID递归找出父ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getParentId($id)
    {
        static $result = [];
        // 当前所在位置 调试值1
        $pid = Menu::query()->where('id', $id)->get(['id', 'pid'])->toArray();
        //如果不是最顶级
        if ($pid[0]['pid'] != 0) {
            //加入ID
            $result[] = $pid[0]['id'];
            $this->getParentId($pid[0]['pid']);
        } else {
            //加入最顶级ID
            $result[] = $pid[0]['id'];
        }
        return $this->Json(StatusCode::SUCCESS,['data'=>array_reverse($result)]);

    }

    /**
     * 根据父ID 查询子集菜单
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getChildren($id)
    {
        $data = Menu::query()
            ->withCount('SubMenu as children_count')
            ->where('pid', $id)
            ->get()->toArray();
        return $this->Json(StatusCode::SUCCESS,['data'=>$data]);
    }

    /**
     * 获取用户可见菜单
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userTree()
    {
        $userId = Auth::id();
        $user = User::query()
            ->where('id', $userId)
            ->first();
        $data = $user->roles()->get()->toArray();
        $roleID = [];
        //得到当前用户所有角色ID
        foreach ($data as $role) {
            $roleID[] = $role['pivot']['role_id'];
        }
        $uniq_menu_id = RoleAndMenu::query()
            ->whereIn('role_id', $roleID)
            ->get()->pluck('menu_id')->unique()
            ->toArray();

        //查询出菜单内容
        $query = Menu::with(
            ['subMenu' => function ($query) use ($uniq_menu_id) {
                $query->with(['subMenu' => function ($subQuery) use ($uniq_menu_id) {
                    $subQuery->whereIn('id', $uniq_menu_id)->where('state', 1);
                }])->whereIn('id', $uniq_menu_id)->where('state', 1);
            }]
        )->where('pid', 0)
            ->where('state', 1)
            ->get()
            ->toArray();
        return $this->Json(StatusCode::SUCCESS, ['data' => $query]);
    }

}
