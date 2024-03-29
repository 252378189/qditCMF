<?php

namespace App\Http\Controllers\Admin\Article;

use App\Http\Controllers\Base\StatusCode;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Traits\RestFul;
use App\Models\ArticleTemplate as Template;

/**
 * 文章模板管理
 *
 * Class ArticleTemplate
 *
 * @category ArticleTemplate
 * @package  App\Http\Controllers\Article
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class ArticleTemplate extends Controller
{
    use RestFul;

    /**
     * 返回操作模型
     *
     * @return string
     */
    public function getModel()
    {
        return Template::class;
    }

    /**
     * 添加操作字段认证规则
     *
     * @return array
     */
    public function addRule()
    {
        return [
            'name' => 'required',
            'path' => 'required',
        ];
    }

    /**
     * 修改字段认证规则
     *
     * @return array
     */
    public function editRule()
    {
        return [
            'name' => 'required',
            'path' => 'required',
        ];
    }

    /**
     * 删除模板信息,如果模板关联到文章,吧文章的模板置为默认模板
     *
     * @param int $id 模板记录id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        if ($id == 1) {
            return $this->Json(StatusCode::ERROR, ['msg' => '默认模板不允许删除']);
        }
        $result = Article::query()
            ->where('template_id', $id)
            ->get()
            ->isEmpty();
        if (!$result) {
            //当前要删除的模板关联到的文章设置为默认模板
            Article::query()
                ->where('template_id', $id)
                ->update(['template_id' => 1]);
        }
        Template::destroy($id);
        return $this->Json(StatusCode::SUCCESS);
    }
}
