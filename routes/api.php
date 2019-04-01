<?php

Route::namespace('Admin\User')->group(function () {
    Route::post('login', 'LoginController@login');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('user', 'UserController@getUserInfo');
        Route::get('logout', function () {
            \Illuminate\Support\Facades\Auth::logout();
        });
    });
});

Route::group(['middleware' => ['auth:api'], 'namespace' => 'Admin'], function () {
    // 用户管理
    require_once base_path('routes/api/user.php');
    //系统管理
    require_once base_path('routes/api/system.php');
    //内容管理
    require_once base_path('routes/api/article.php');
    //文件上传
    Route::post('upload', 'System\UploadController@upload');
    /**
     * 清除缓存
     */
    Route::get('clean','Article\ArticleController@clean');
    /**
     * 文章地图
     */
    Route::get('sitemap','Article\ArticleController@siteMap');
});
