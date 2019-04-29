<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/4/17
 * Time: 8:58
 */

namespace App\Http\Controllers\Base;


class StatusCode
{
    const SUCCESS = ['code' => 0, 'msg' => '请求成功'];

    const ERROR = ['code' => 2, 'msg' => '请求失败'];

    const NOT_HAS_AUTH = ['code' => 1, 'msg' => '请求失败，没有权限'];

    const NOT_FOUND_MODEL = ['code' => 3, 'msg' => '没有找到相应的数据'];

    const EXIST_RELATION = ['code' => 4, 'msg' => '存在关联数据'];

    const LOGIN_FAIL = ['code' => 5, 'msg' => '登录失败'];

    const CODE_ERROR = ['code' => -2, 'msg' => '验证码错误'];

    const USER_NOT_USE = ['code' => -1, 'msg' => '用户不可使用'];

    const PASSWORD_ERROR = ['code' => 6, 'msg' => '密码错误'];


}