<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 文章分类模型
 *
 * Class Category
 *
 * @category Category
 * @package  App\Models
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class Category extends Model
{
    /**
     * 全字段可写
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * 追加一个字段方便前端树形框操作
     *
     * @var array
     */
    protected $appends = ['label','value'];

    /**
     * 置操作表
     *
     * @var string
     */
    protected $table = 'categories';

    /**
     * 关联父类
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany(Category::class, 'pid');
    }

    /**
     * 分类关联文章
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function HasArticle()
    {
        return $this->hasMany(Article::class, 'c_id', 'id');
    }

    /**
     * label和名称做一个绑定方便前端操作
     *
     *
     * @return mixed
     */
    public function getLabelAttribute()
    {
        return $this->name;
    }


    /**
     * value和名称做一个绑定方便文章发布和编辑时候的级联选择器操作
     *
     *
     * @return mixed
     */
    public function getValueAttribute()
    {
        return $this->id;
    }
}
