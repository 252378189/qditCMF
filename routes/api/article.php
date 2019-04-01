<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/11/22
 * Time: 15:49
 */

Route::group(['namespace' => 'Article'], function () {
    // 文章管理
    Route::prefix('article')->group(function () {
        Route::get('list', 'ArticleController@getList');
        Route::get('clean', 'ArticleController@clean');
        Route::post('/', 'ArticleController@add');
        Route::put('/{id}', 'ArticleController@edit');
        Route::get('/{id}', 'ArticleController@get');
        Route::delete('/{id}', 'ArticleController@delete');
    });
    // 回收站
    Route::prefix('recovery')->group(function () {
        Route::get('list', 'RecoveryController@getList');
        Route::get('recovery/{id}', 'RecoveryController@recoveryArticle');
        Route::get('del/{id}', 'RecoveryController@delete');
    });
    //文章模板管理
    Route::prefix('template')->group(function () {
        Route::get('list', 'ArticleTemplate@getList');
        Route::post('/', 'ArticleTemplate@add');
        Route::put('/{id}', 'ArticleTemplate@edit');
        Route::get('/{id}', 'ArticleTemplate@get');
        Route::delete('/{id}', 'ArticleTemplate@delete');
    });
    Route::prefix('category')->group(function () {
        Route::get('list', 'CategoryController@getList');
        Route::post('/', 'CategoryController@add');
        Route::put('/{id}', 'CategoryController@edit');
        Route::get('/{id}', 'CategoryController@get');
        Route::delete('/{id}', 'CategoryController@delete');
    });
});