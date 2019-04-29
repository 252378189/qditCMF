<?php

namespace App\Http\Controllers\Admin\Article;

use App\Http\Controllers\Base\StatusCode;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Models\Nav;
use App\Traits\Filter;
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
class ArticleController extends Controller
{
    use  Filter;

    /**
     * 添加文章
     *
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function store()
    {
        //验证表单字段
        $article = $this->formVerif([
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
        Article::query()->create($article);
        TotalLogIncrementColumn('article_total');
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 返回文章列表
     *
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $query = Article::with('hasCategory')->orderBy('created_at', 'desc');
        if (isSuperManager()) {  //是否是超管
            $query = $query->where('user_id', \Illuminate\Support\Facades\Auth::id());
        }
        $data = $this->filter($query);
        return $this->Json(StatusCode::SUCCESS, $data);
    }

    /**
     * 获得文章详细
     *
     * @param int $id 文章id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $data = Article::with('HasTemplate')->find($id);
        $category = Category::query()
            ->where('id', $data->c_id)
            ->first();
        $pid = $this->getPid($category->id);
        $data->c_id = [$pid, $category->id];
        //临时隐藏一些字段方便后续调用
        return $this->Json(StatusCode::SUCCESS, ['data' => $data->makeHidden(['status', 'other'])]);
    }

    /**
     * 删除文章
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        Article::destroy($id);
        return $this->Json(StatusCode::SUCCESS);
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
    public function update($id)
    {
        //验证表单字段
        $filedValue = $this->formVerif([
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
        Article::query()
            ->where('id', $id)
            ->update($filedValue);
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 清除缓存
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function clean()
    {
        $cache_arr = Redis::keys($this->cache_prefix . "*");
        foreach ($cache_arr as $item) {
            Redis::del($item);
        }
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 网站地图
     */
    public function siteMap()
    {
        $url = [];
        $navs = Nav::all();
        foreach ($navs as $nav) {
            if ($nav->link == '/') {
                continue;
            }
            $url[] = url($nav->link);
        }
        $articles = Article::all()->pluck('id');
        foreach ($articles as $article) {
            //todo  文章的 访问地址 需要重新定义
            $url[] = url('todo', $article);
        }
        $stream = fopen("sitemap.txt", "w+");
        foreach ($url as $item) {
            fwrite($stream, "{$item}\r\n");
        }
        fclose($stream);
        return $this->Json(StatusCode::SUCCESS);
    }
}
