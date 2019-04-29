<?php

namespace App\Http\Controllers\Admin\User;

use App\Http\Controllers\Base\StatusCode;
use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\RoleAndAuth;
use App\Models\User;
use App\Models\UserAndRole;
use App\Traits\RestFul;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use RestFul;

    /**
     * 返回操作模型
     *
     * @return string
     */
    public function getModel()
    {
        return User::class;
    }

    /**
     * 添加操作,字段认证规则
     *
     * @return array
     */
    public function addRule()
    {
        return[
            'username' => 'required',
            'password' => 'required',
            'phone' => 'required|numeric',
            'email' => 'required',
            'avatar' => 'required',
            'sex' => 'required',
            'state' => 'nullable',
            'options' => 'nullable',
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
            'username' => 'required',
            'password' => 'nullable',
            'phone' => 'required|numeric',
            'email' => 'required',
            'avatar' => 'required',
            'sex' => 'required',
            'state' => 'nullable',
            'options' => 'nullable',
        ];
    }

    /**
     * 获取用户信息
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserInfo()
    {
        $user = Auth::user()->toArray();
        if ($user) {
            $user['auth'] = $this->getAuth(Auth::id());
            $user['access'] = $this->getAccess($user['auth']);
            return $this->Json(StatusCode::SUCCESS, ['user' => $user]);
        } else {
            return $this->Json(StatusCode::ERROR, ['msg' => '获取用户信息失败']);
        }
    }

    /**
     * 获得用户可访问页面
     *
     * @param array auth 用户的权限
     *
     * @return array
     */
    public function getAccess($auth)
    {
        $result = [];
        $page = array_keys($auth);
        foreach ($page as $item) {
            $result[] = '/' . $item;
        }
        return $result;
    }

    /**
     * 返回页面具体权限
     *
     * @param int id 用户id
     *
     * @return array
     */
    public function getAuth($id)
    {

        $roleId = UserAndRole::query()
            ->where('user_id', $id)
            ->get()
            ->pluck('role_id')
            ->toArray();

        $auth = RoleAndAuth::query()
            ->whereIn('role_id', $roleId)
            ->get()
            ->toArray();

        $result = [];
        foreach ($auth as $item) {
            //返回没有被禁用的权限
            if ($item['state'] == RoleAndAuth::NORMAL) {
                $result[$item['page']] = $item['extented'];
            }
        }
        return $result;
    }

    /**
     * 添加用户
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function store()
    {
        $validatedData = $this->formVerif($this->addRule());
        $validatedData['password'] = Hash::make($validatedData['password']);
        User::query()->create($validatedData);
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 修改用户信息
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function update($id)
    {
        $validatedData = $this->formVerif($this->editRule());
        if (array_key_exists('password', $validatedData)) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }
        User::query()->find($id)->update($validatedData);
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 禁用用户账号
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function disable(Request $request)
    {
        User::query()
            ->whereIn('id', $request->all())
            ->update(['state' => 0]);

        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 用户赋予角色
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function giveRole(Request $request)
    {
        $roles = $request->all();
        $users = array_pop($roles);
        //所有选择的用户ID
        foreach ($users['ids'] as $user) {
            //选择的角色名称
            foreach ($roles as $item) {
                $roleId = Role::query()->where('name', $item)->first(['id'])->id;
                $userData = User::query()->find($user);
                $user_ids = UserAndRole::query()->where('role_id', $roleId)->get()->pluck('user_id');
                //如果当前用户不拥有选择的角色
                foreach ($user_ids as $uid) {
                    if ($uid != $userData->id) {
                        $userData->roles()->attach($roleId);
                    }
                }
            }
        }
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 根据用户ID 查找该用户所有的用户组返回用户组名称
     *
     * @param integer $id 用户ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userRole($id)
    {
        $roles = User::with('roles')
            ->where('id', $id)->first()
            ->roles->toArray();
        $roleName = [];
        foreach ($roles as $item) {
            $roleName[] = $item['name'];
        }
        return $this->Json(StatusCode::SUCCESS, ['data' => $roleName]);
    }

    /**
     * 修改单一用户的所属用户组
     *
     * @param \Illuminate\Http\Request $request 请求体
     * @param integer                  $id      用户ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userEditRole(Request $request, $id)
    {
        $user = User::query()->find($id);
        $roles = $request->all();
        $roleId = Role::query()->whereIn('name', $roles)->get()->pluck('id');
        $user->roles()->sync($roleId);
        return $this->Json(StatusCode::SUCCESS);
    }
}
