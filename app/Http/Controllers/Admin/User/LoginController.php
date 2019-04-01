<?php

namespace App\Http\Controllers\Admin\User;


use App\Http\Controllers\Base\BaseController;
use App\Models\User;
use App\Services\Login\LoginService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends BaseController
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
        $this->formVerif($request, [
            'phone' => 'required|size:11',
            'password' => 'required|string|min:6',
        ]);
        $response = $login->login($request->get('type', 'normal'));
        return response()->json($response);
    }

    /**
     * @param \Illuminate\Http\Request $request
     */
    public function logout(Request $request)
    {
        User::query()->where('id', Auth::id())->update([
            'token' => null
        ]);
    }

}
