<?php

namespace App\Http\Controllers\Admin\Article;

use App\Http\Controllers\Base\StatusCode;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Traits\Filter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * 文章回收站
 *
 * Class RecoveryController
 *
 * @category RecoveryController
 * @package  App\Http\Controllers\Article
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class RecoveryController extends Controller
{
    use Filter;

    /**
     * 获得被软删除的文章
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $query = Article::onlyTrashed();
        if (isSuperManager()) {
            $query = $query->where('user_id', Auth::id());
        }
        $data =  $this->filter($query);
        return $this->Json(StatusCode::SUCCESS, $data);
    }

    /**
     * 恢复被软删除的文章
     *
     * @param integer $id 文章id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function recoveryArticle($id)
    {
        Article::withTrashed()->where('id', $id)->restore();
        return $this->Json(StatusCode::SUCCESS);
    }

    /**
     * 彻底删除文章
     *
     * @param int $id 文章id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        Article::withTrashed()->where('id', $id)->forceDelete();
        return $this->Json(StatusCode::SUCCESS);
    }
}
