<?php

namespace App\Http\Controllers\Admin\RBAC;

use App\Http\Controllers\Base\StatusCode;
use App\Models\RoleAndMenu;
use App\Models\Role;
use App\Models\RoleAndAuth;
use App\Traits\Filter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * 角色管理控制器
 *
 * Class RoleController
 *
 * @category RoleController
 * @package  App\Http\Controllers\User
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class RoleController extends Controller
{
    use Filter;

    /**
     * 添加角色
     *
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function store()
    {
        $field = $this->formVerif([
            'name' => 'required|max:255',
            'description' => 'nullable',
            'sort' => 'nullable',
            'state' => 'nullable',
        ]);
        Role::query()->create($field);
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 角色信息
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $data = Role::with('HasAuth')->find($id);
        return $this->Json(StatusCode::SUCCESS, ['data'=>$data]);
    }

    /**
     * 修改角色信息
     *
     * @param                          $id
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function update($id)
    {
        $field = $this->formVerif([
            'name' => 'required|max:255',
            'description' => 'nullable',
            'sort' => 'nullable',
            'state' => 'nullable',
        ]);
        Role::query()->find($id)->update($field);
        //所有关联权限状态也跟着同步
        RoleAndAuth::query()->where('role_id', $id)->update(['state' => $field['state']]);
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 角色列表
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $data =  $this->filter(Role::query());
        return $this->Json(StatusCode::SUCCESS, $data);
    }

    /**
     * 删除角色
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        Role::destroy($id);
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 禁用角色信息
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function disable(Request $request)
    {
        //状态设置为禁用
        Role::query()->whereIn('id', $request->all())->update(['state' => Role::DISABLE]);
        //所有关联权限状态也设置为禁用
        RoleAndAuth::query()->whereIn('role_id', $request->all())->update(['state' => Role::DISABLE]);
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 给角色信息赋予权限
     *
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function GiveAuth()
    {
        $validatedData = $this->formVerif([
            'roles' => 'required',
            'menu' => 'required',
            'auth' => 'nullable',
        ]);
        $roles = $validatedData['roles'];
        $auths = $validatedData['auth'];
        $menus = $validatedData['menu'];

        DB::beginTransaction();
        try {
            foreach ($roles as $role) {
                 $role_auth = [];
                 $role_menu = [];
                foreach ($auths as $auth) {
                    $role_auth[] = [
                        'role_id' => $role,
                        'page' => str_replace('/', '', $auth['url']),
                        'auth_id' => $auth['id'],
                        'extented' => json_encode($auth['extented']),
                        'state' => 1
                    ];
                }
                foreach ($menus as $menu) {
                    $role_menu[] =['role_id'=>$role, 'menu_id'=>$menu];
                }

                RoleAndMenu::query()->where('role_id',$role)->delete();
                RoleAndMenu::query()->insert($role_menu);

                RoleAndAuth::query()->where('role_id', $role)->delete();
                RoleAndAuth::query()->insert($role_auth);
            }
            DB::commit();
        } catch (\Exception $exception) {
            $msg = $exception->getMessage();
            DB::rollBack();
            return $this->Json(StatusCode::ERROR, ['msg'=>$msg]);
        }
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 获取角色权限
     *
     * @param $role
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function GetRoleHasAuth($role)
    {
        $auth = RoleAndAuth::with('Auth')
            ->where(['role_id' => $role, 'state' => 1])
            ->select('auth_id', 'extented', 'page')
            ->get();
        $menu = $auth->map(function ($value) {
            $result = [];
            $result['page'] = '/' . $value->page;
            $result['menu_id'] = $value->auth[0]->menu_id;
            return $result;
        });
        return $this->Json(StatusCode::SUCCESS, ['menu' => $menu, 'auth' => $auth]);
    }
}
