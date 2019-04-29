<?php

namespace App\Http\Controllers\Admin\Article;

use App\Http\Controllers\Base\StatusCode;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Category;
use App\Traits\RestFul;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    use RestFul;

    /**
     * 返回操作模型
     *
     * @return string
     */
    public function getModel()
    {
        return Category::class;
    }

    /**
     * 添加操作,字段认证规则
     *
     * @return array
     */
    public function addRule()
    {
        return [
            'name' => 'required',
            'pid' => 'nullable'
        ];
    }

    /**
     * 修改操作,字段认证规则
     *
     * @return array
     */
    public function editRule()
    {
        return [
            'name' => 'required',
        ];
    }

    /**
     * 创建资源
     *
     * @return mixed
     * @throws \App\Exceptions\FromVerif
     */
    public function store()
    {
        $validatedData = $this->formVerif($this->addRule());

        $data = Category::query()->create($validatedData);
        if ($data) {
            return $this->Json(StatusCode::SUCCESS, ['data' => $data]);
        }
        return $this->Json(StatusCode::ERROR, []);
    }

    /**
     * 分类列表
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $data =Category::with('children')->where('pid', 0)->get();
        return $this->Json(StatusCode::SUCCESS, ['data' => $data]);
    }

    /**
     * 删除分类前判断一下分类下是否还有文章
     *
     * @param int $id 分类id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $data = Category::with(['hasArticle', 'children'])
            ->where('id', $id)
            ->first()
            ->toArray();
        if (empty($data['has_article']) && empty($data['children'])) {
            Category::destroy($id);
            return $this->Json(StatusCode::SUCCESS);
        }
        return $this->Json(StatusCode::SUCCESS,['msg'=>'当前分类下还有分类数据或者文章数据,删除分类!']);
    }
}
