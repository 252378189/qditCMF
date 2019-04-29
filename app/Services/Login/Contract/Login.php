<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/3/15
 * Time: 16:26
 */

namespace App\Services\Login\Contract;


use App\Models\User;
use Illuminate\Support\Facades\Hash;

abstract class Login
{
    protected $userModel;

    /**
     * 接口返回状态码
     *
     * @var array
     */
    protected $StatusCode = [
        'success' => 0,      // 成功
        'error' => -1,     // 失败
    ];

    /**
     * 创建 token
     *
     *
     * @return mixed
     */
    public function createToken()
    {
        $name = $this->userModel->name;
        $password = $this->userModel->password;
        $id = $this->userModel->id;
        $token = sha1(md5($name . $password . $id));
        User::query()->where('id', $id)->update([
            'token' => $token
        ]);
        return $token;
    }

    /**
     * openId 登录
     *
     * @param $type
     * @param $openId
     *
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function authOpenIdLogin($type, $openId)
    {
        $user = User::query()
            ->where($type . "_openid", $openId)
            ->first();
        if (is_null($user)) {
            return $this->loginError($type, $openId);
        }

       return $this->loginSuccess($type);

    }

    /**
     * 响应登录成功消息
     *
     * @param $type
     *
     * @return array
     */
    public function loginSuccess($type)
    {
        return [
            'msg' => '登陆成功',
            'code' => $this->StatusCode['success'],
            'Authorization' => $this->createToken(),
            'user' => $this->userModel,
            'type' => $type
        ];
    }

    /**
     * 响应错误消息
     *
     * @param $type
     * @param $openId
     *
     * @return array
     */
    public function loginError($type, $openId)
    {
        return [
            'code' => -3,
            'msg' => '登录失败',
            'type' => $type . 'Login',
            'openId' => $openId,
        ];
    }

    /**
     * 用户模型登录
     *
     * @param $user
     * @param $password
     *
     * @return array
     */
    public function UserModelLogin($user, $password)
    {
        if ($user->password == md5($password)) {
            return $this->loginSuccess('normal');
        } else {
            return [
                'code' => -4,
                'msg' => '密码错误'
            ];
        }

    }

    /**
     * 账号是否注册
     *
     * @param $phone
     *
     * @return bool|\Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|null|object
     */
    public function isRegister($phone)
    {
        $user = User::query()
            ->where('phone', $phone)
            ->first();
        if (is_null($user)) {
            return false;
        }
        return $user;
    }

    /**
     * 新增注册用户
     *
     * @param $filedValue
     *
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model
     */
    public function register($filedValue)
    {
        $data = User::query()
            ->create([
                'name' => $filedValue['name'],
                'password' => md5($filedValue['password']),
                'phone' => $filedValue['phone'],
                'avatar' => $filedValue['avatar'],
                'email' => $filedValue['email'],
            ]);
        return $data;
    }

    abstract function handleLogin();
}