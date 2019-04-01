<?php

Route::get('manage', function () {
    return view('admin');
});

Route::group(['namespace' => 'Home'], function () {
    /**
     * 公共部分接口
     */
    Route::group(['prefix' => 'public'], function () {
        /**
         * 友情链接
         */
        Route::get('friend_link', 'PublicController@friendLink');
        /**
         * 导航
         */
        Route::get('nav', 'PublicController@nav');
        /**
         * 网站基础信息
         */
        Route::get('site_base', 'PublicController@siteBase');
        /**
         * 关于我们
         */
        Route::get('about', 'PublicController@aBout')->middleware('pv');
        /**
         * 功能介绍
         */
        Route::get('fun', 'PublicController@fun');

    });

    /**
     * 文章接口
     */
    Route::group(['prefix' => 'article'], function () {
        /**
         * 精选文章列表
         */
        Route::get('choice', 'ArticleController@choiceArticle');
        /**
         * 获得文章分类
         */
        Route::get('category', 'ArticleController@category')->middleware('pv');
        /**
         * 文章内容
         */
        Route::get('content/{id}', 'ArticleController@articleContent')->middleware('pv');
        /**
         * 获得文章列表
         */
        Route::get('list/{c_Id?}', 'ArticleController@articleList');
    });
});

