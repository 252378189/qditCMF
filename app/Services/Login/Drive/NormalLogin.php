<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/3/15
 * Time: 17:56
 */

namespace App\Services\Login\Drive;


use App\Services\Login\Contract\Login;

class NormalLogin extends Login
{
    /**
     * @return array
     */
    public function handleLogin()
    {
        $phone = request()->get('phone', null);
        $password = request()->get('password', null);
        if (is_null($password) || is_null($phone)) {
            return [
                'code' => -4,
                'type' => 'normal',
                'msg' => '登录失败'
            ];
        }
        $this->userModel = $this->isRegister($phone);
        if ($this->userModel == false) {
            return [
                'code' => -4,
                'type' => 'normal',
                'msg' => '账号不存在'
            ];
        }
        return $this->UserModelLogin($this->userModel, $password);
    }
}