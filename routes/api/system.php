<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/11/6
 * Time: 17:39
 */

/**
 * 系统设置模块
 */
Route::group(['namespace' => 'System'], function () {

    // 菜单管理
    Route::prefix('menu')->group(function () {
        Route::get('list', 'MenuController@getList');
        Route::get('tree', 'MenuController@getTree');
        Route::get('user/tree', 'MenuController@userTree');
        Route::get('/{id}', 'MenuController@get');
        Route::post('add', 'MenuController@add');
        Route::post('edit', 'MenuController@edit');
        Route::get('del/{id}', 'MenuController@delete');
        Route::get('parent/{id}', 'MenuController@getParentId');
        Route::get('children/{id}', 'MenuController@getChildren');
    });

    // 友情链接管理
    Route::prefix('friend_link')->group(function () {
        Route::get('/', 'FriendLinkController@getList');
        Route::get('/{id}', 'FriendLinkController@get');
        Route::post('/', 'FriendLinkController@add');
        Route::put('/{id}', 'FriendLinkController@edit');
        Route::delete('/{id}', 'FriendLinkController@delete');
    });

    Route::prefix('config')->group(function () {
        Route::put('/', 'ConfigController@update');
        Route::get('/', 'ConfigController@index');
        Route::post('/', 'ConfigController@store');
        Route::post('/updateOrCreate', 'ConfigController@updateOrCreate');
    });

    //前端导航管理
    Route::prefix('nav')->group(function () {
        Route::get('/', 'NavController@getList');
        Route::get('/{id}', 'NavController@get');
        Route::put('/{id}', 'NavController@edit');
        Route::post('/', 'NavController@add');
        Route::delete('/{id}', 'NavController@delete');
    });

    //网页推广设置
    Route::prefix('seo')->group(function () {
        Route::get('/', 'SEOController@getList');
        Route::get('/{id}', 'SEOController@get');
        Route::put('/{id}', 'SEOController@edit');
        Route::post('/', 'SEOController@add');
        Route::delete('/{id}', 'SEOController@delete');
    });
});

Route::group(['namespace' => 'RBAC'], function () {
    // 角色管理
    Route::prefix('role')->group(function () {
        Route::get('list', 'RoleController@getList')->name('role_list');
        Route::post('add', 'RoleController@add');
        Route::post('edit/{id}', 'RoleController@edit');
        Route::get('/{id}', 'RoleController@get');
        Route::get('del/{id}', 'RoleController@delete');
        Route::post('del/disable', 'RoleController@disable');    //禁用权限
        Route::post('give_auth', 'RoleController@GiveAuth');     // 添加角色权限
        Route::get('get_role_auth/{id}', 'RoleController@GetRoleHasAuth'); // 获取角色权限
    });

    // 权限管理
    Route::prefix('auth')->group(function () {
        Route::get('list', 'AuthController@getList');
        Route::get('tree', 'AuthController@tree');
        Route::post('add', 'AuthController@add');
        Route::get('auth_tree', 'AuthController@authTree');//权限树结构
        Route::get('/{id}', 'AuthController@get');
        Route::get('del/{id}', 'AuthController@delete');
        Route::post('edit/{id}', 'AuthController@edit');
    });

});