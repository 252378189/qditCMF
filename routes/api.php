<?php

Route::namespace('Admin\User')->group(function () {
    Route::post('login', 'LoginController@login');
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('userInfo', 'UserController@getUserInfo');
        Route::get('logout', function () {
            \Illuminate\Support\Facades\Auth::logout();
        });
    });
});

Route::group(['middleware' => ['auth:api'], 'namespace' => 'Admin'], function () {

    /**
     * 用户管理模块
     */
    Route::group(['namespace'=>'User'],function () {
        // 用户管理
        Route::prefix('user')->group(function () {
            Route::post('disable', 'UserController@disable');//禁用用户
            Route::post('give/role', 'UserController@giveRole');//用户给予角色
            Route::get('/{id}/role', 'UserController@userRole');//用户所属角色
            Route::put('/{id}/role', 'UserController@userEditRole');//用户所属角色修改
        });
        Route::apiResources([
            'user' => 'UserController',    //用户管理
        ]);
    });
    /**
     * 系统设置模块
     */
    Route::group(['namespace' => 'System'], function () {
        // 菜单管理
        Route::prefix('menu')->group(function () {
            Route::get('tree', 'MenuController@getTree');
            Route::get('user/tree', 'MenuController@userTree');
            Route::get('/{id}/parent', 'MenuController@getParentId');
            Route::get('/{id}/children', 'MenuController@getChildren');
        });

        Route::prefix('config')->group(function () {
            Route::put('/', 'ConfigController@update');
            Route::get('/', 'ConfigController@index');
            Route::post('/', 'ConfigController@store');
            Route::post('/updateOrCreate', 'ConfigController@updateOrCreate');
        });

        Route::apiResources([
            'menu' => 'MenuController',    //菜单管理
            'friend_link' => 'FriendLinkController',    //友情链接
            'nav' => 'NavController',    //导航管理
            'seo' => 'SEOController',    //网页推广设置
        ]);
    });
    /**
     * 权限管理模块
     */
    Route::group(['namespace' => 'RBAC'], function () {
        // 角色管理
        Route::prefix('role')->group(function () {
            Route::post('disable', 'RoleController@disable');    //禁用权限
            Route::post('give_auth', 'RoleController@GiveAuth');     // 添加角色权限
            Route::get('/{id}/get_role_auth', 'RoleController@GetRoleHasAuth'); // 获取角色权限
        });

        // 权限管理
        Route::prefix('auth')->group(function () {
            Route::get('auth_tree', 'AuthController@authTree');//权限树结构
        });

        Route::apiResources([
            'auth' => 'AuthController',    //权限管理
            'role' => 'RoleController',    //角色管理
        ]);
    });
    /**
     * 文章管理模块
     */
    Route::group(['namespace' => 'Article'], function () {
        // 文章管理
        Route::prefix('article')->group(function () {
            //清除缓存
            Route::get('clean', 'ArticleController@clean');
            //网站地图
            Route::get('siteMap', 'ArticleController@siteMap');
        });
        // 回收站
        Route::prefix('recovery')->group(function () {
            Route::get('/', 'RecoveryController@index');
            Route::get('/{id}/recovery', 'RecoveryController@recoveryArticle');
            Route::delete('/{id}', 'RecoveryController@destroy');
        });

        Route::apiResources([
            'article' => 'ArticleController',    //文章管理
            'template' => 'ArticleTemplate',    //文章模板管理
            'category' => 'CategoryController',    //文章分类管理
        ]);
    });

    Route::group([], function (){ //功能路由
        /**
         * 文件上传
         */
        Route::post('upload', 'System\UploadController@upload');
        /**
         * 清除缓存
         */
        Route::get('clean','Article\ArticleController@clean');
        /**
         * 文章地图
         */
        Route::get('siteMap','Article\ArticleController@siteMap');
    });

});
