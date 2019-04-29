<?php

namespace App\Http\Controllers\Admin\User;


use App\Http\Controllers\Base\StatusCode;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Login\LoginService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * 用户登录
     *
     * @param \Illuminate\Http\Request         $request
     * @param \App\Services\Login\LoginService $login
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function login(Request $request, LoginService $login)
    {
        $this->formVerif([
            'phone' => 'required|size:11',
            'password' => 'required|string|min:6',
        ]);
        $response = $login->login($request->get('type', 'normal'));
        return $this->Json(StatusCode::SUCCESS, $response);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        User::query()->where('id', Auth::id())->update([
            'token' => null
        ]);
        return $this->Json(StatusCode::SUCCESS);
    }

}
