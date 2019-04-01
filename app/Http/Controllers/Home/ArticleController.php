<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/3/28
 * Time: 11:04
 */

namespace App\Http\Controllers\Home;


use App\Http\Controllers\Base\HomeBaseController;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;

/**
 * 文章接口
 *
 * Class ArticleController
 *
 * @category ArticleController
 * @package  App\Http\Controllers\Home
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class ArticleController extends HomeBaseController
{
    /**
     * 文章列表
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $c_Id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleList(Request $request, $c_Id = null)
    {
        $page = $request->get('page', 1);
        $pageSize = $request->get('size', 6);
        $query = Article::query()
            ->select('id', 'title', 'desc', 'keyword', 'created_at', 'cover')
            ->orderBy('created_at', 'desc')
            ->limit(6)
            ->skip(($page - 1) * $pageSize)
            ->take($pageSize);
        if ($c_Id) {
            $query = $query->where('c_id', $c_Id);
        }
        $article = $query->get();
        return $this->returnData($article);
    }

    /**
     * 精选文章列表
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function choiceArticle()
    {
        $query = Article::query()
            ->select('id', 'cover', 'title', 'created_at')
            ->orderByRaw('click desc,top desc,recommend desc,created_at desc')
            ->limit(9);
        $article = $this->baseCachePolicy($query, 'choice_article');
        return $this->returnData($article);
    }

    /**
     * 文章内容
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function articleContent($id)
    {
        $article = Article::query()
            ->where('id', $id)
            ->first();
        $article->increment('click');
        return $this->returnData($article);
    }

    /**
     * 获得文章分类
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function category()
    {
        $category = Category::query()
            ->where('pid', '>', 0)
            ->get();
        return $this->returnData($category);
    }
}