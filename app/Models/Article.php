<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * 文章模型
 *
 * Class Article
 *
 * @category Article
 * @package  App\Models
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class Article extends Model
{
    /**
     * 启用软删除
     */
    use SoftDeletes;

    /**
     * 应该被调整为日期的属性
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * 设置操作表
     *
     * @var string
     */
    protected $table = 'articles';

    /**
     * 类型转换
     *
     * @var array
     */
    protected $casts = [
        'top' => 'string',
        'recommend' => 'string',
    ];


    /**
     * 该表所有字段允许赋值
     *
     * @var array
     */
    protected $guarded = [];


    /**
     * 追加一个文章状态的字段
     *
     * @var array
     */
    protected $appends = ['status', 'other'];

    /**
     * 状态访问器针对各个关键字段设置√×,节省前端页面空间
     *
     * @param $value
     *
     * @return mixed
     */
    public function getStatusAttribute($value)
    {
        if (empty($this->desc)) {
            $value['desc'] = ['status' => '×', 'color' => 'red'];
        } else {
            $value['desc'] = ['status' => '√', 'color' => 'green'];
        }
        if (empty($this->cover)) {
            $value['cover'] = ['status' => '×', 'color' => 'red'];
        } else {
            $value['cover'] = ['status' => '√', 'color' => 'green'];
        }
        if (empty($this->keyword)) {
            $value['keyword'] = ['status' => '×', 'color' => 'red'];
        } else {
            $value['keyword'] = ['status' => '√', 'color' => 'green'];
        }
        return $value;
    }

    /**
     * 其他选项访问器针对各个关键字段设置√×,节省前端页面空间
     *
     * @param $value
     *
     * @return mixed
     */
    public function getOtherAttribute($value)
    {
        if ($this->top == 0) {
            $value['top'] = ['status' => '×', 'color' => 'red'];
        } else {
            $value['top'] = ['status' => '√', 'color' => 'green'];
        }
        if ($this->recommend == 0) {
            $value['recommend'] = ['status' => '×', 'color' => 'red'];
        } else {
            $value['recommend'] = ['status' => '√', 'color' => 'green'];
        }
        return $value;
    }

    /**
     * 关联到文章模板
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function HasTemplate()
    {
        return $this->hasOne(ArticleTemplate::class, 'id', 'template_id');
    }

    /**
     * 关联到分类
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function hasCategory()
    {
        return $this->hasOne(Category::class, 'id', 'c_id');
    }
}
