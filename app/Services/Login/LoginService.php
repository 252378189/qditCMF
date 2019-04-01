<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/3/15
 * Time: 16:26
 */

namespace App\Services\Login;


use App\Services\Login\Drive\NormalLogin;

class LoginService
{

    public function login($type)
    {
        if ($type == 'normal') {
            return (new NormalLogin())->handleLogin();
        }
        if ($type == 'wx') {
            //todo 第三方 微信登录
        }
        if ($type == 'wb') {
            //todo 第三方 web登录
        }
        if ($type == 'qq') {
            //todo 第三方 qq登录
        }
    }
}