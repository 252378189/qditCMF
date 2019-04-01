<?php

namespace App\Http\Controllers\Admin\Article;

use App\Http\Controllers\Base\BaseController;
use App\Models\Article;
use App\Models\Category;
use App\Models\Nav;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

/**
 * 文章管理控制器
 *
 * Class ArticleController
 *
 * @category ArticleController
 * @package  App\Http\Controllers\Article
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class ArticleController extends BaseController
{
    /**
     * 控制器模型
     *
     * @var string
     */
    protected $model = Article::class;

    /**
     * 添加文章
     *
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function add(Request $request)
    {
        //验证表单字段
        $article = $this->formVerif($request, [
            'title' => 'required', //文章标题
            'content' => 'required', //文章内容
            'cover' => 'nullable', //文章封面
            'desc' => 'nullable', //文章描述
            'template_id' => 'nullable', //模板Id
            'top' => 'nullable', //置顶
            'recommend' => 'nullable', //推荐
            'c_id' => 'required', //文章分类
            'keyword' => 'required', //文章关键字
        ]);
        $article['c_id'] = array_pop($article['c_id']);
        $article['author'] = \Illuminate\Support\Facades\Auth::user()->username; //作者默认当前登录人员
        $article['user_id'] = \Illuminate\Support\Facades\Auth::id(); //用户默认当前用户Id
        $res = $this->model::query()->create($article);
        TotalLogIncrementColumn('article_total');
        return $this->returnMsg($res);
    }

    /**
     * 返回文章列表
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getList(Request $request)
    {
        $query = $this->model::with('hasCategory')->orderBy('created_at', 'desc');
        if (isSuperManager()) {  //是否是超管
            $query = $query->where('user_id', \Illuminate\Support\Facades\Auth::id());
        }
        return $this->filter($query, $request);
    }

    /**
     * 获得文章详细
     *
     * @param int $id 文章id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function get($id)
    {
        $data = $this->model::with('HasTemplate')->find($id);
        $category = Category::query()
            ->where('id', $data->c_id)
            ->first();
        $pid = $this->getPid($category->id);
        $data->c_id = [$pid, $category->id];
        //临时隐藏一些字段方便后续调用
        return $this->returnData($data->makeHidden(['status', 'other'])->toArray());
    }

    /**
     * 找分类的父Id
     *
     * @param $id
     *
     * @return mixed
     */
    public function getPid($id)
    {
        $pid = Category::query()
            ->where('id', $id)
            ->first(['id', 'pid'])
            ->toArray();
        //如果不是最顶级
        if ($pid['pid'] != 0) {
            return $this->getPid($pid['pid']);
        }
        return $pid['id'];
    }

    /**
     * 修改文章
     *
     * @param  integer                 $id      文章id
     * @param \Illuminate\Http\Request $request 请求体
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function edit($id, Request $request)
    {
        //验证表单字段
        $filedValue = $this->formVerif($request, [
            'title' => 'required', //文章标题
            'content' => 'required', //文章内容
            'cover' => 'nullable', //文章封面
            'desc' => 'nullable', //文章描述
            'template_id' => 'nullable', //模板Id
            'top' => 'nullable', //置顶
            'recommend' => 'nullable', //推荐
            'c_id' => 'required', //文章分类
            'keyword' => 'required', //文章关键字
        ]);
        $filedValue['c_id'] = array_pop($filedValue['c_id']);
        $res = $this->model::query()
            ->where('id', $id)
            ->update($filedValue);
        return $this->returnMsg($res);
    }

    /**
     * 清除缓存
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function clean()
    {
        $cache_prefix = 'app_web:'; //Redis缓存前缀
        $cache_arr = Redis::keys($cache_prefix . "*");
        foreach ($cache_arr as $item) {
            Redis::del($item);
        }
        return $this->returnMsg(true);
    }

    /**
     * 网站地图
     */
    public function siteMap()
    {
        dd(1);
        $url = [];
        $navs = Nav::all();
        foreach ($navs as $nav) {
            if ($nav->link =='/'){
                continue;
            }
            $url[] = url($nav->link).'.html';
        }
        $articles =  Article::all()->pluck('id');
        foreach ($articles as $article) {
            $url[] = url('read',cmf_url_encrypt($article)).'.html';
        }
        $stream = fopen("sitemap.txt", "w+");
        foreach ($url as $item) {
            fwrite($stream, "{$item}\r\n");
        }
        fclose($stream);
        return $this->returnMsg(true);
    }
}
