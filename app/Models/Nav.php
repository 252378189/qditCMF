<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 导航表模型
 *
 * Class Nav
 *
 * @category Nav
 * @package  App\Models
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class Nav extends Model
{
    /**
     * 转换数据类型
     *
     * @var array
     */
    protected $casts = ['nav_banner' => 'array'];

    /**
     * 置操作表
     *
     * @var string
     */
    protected $table = 'navs';

    /**
     * 全表可写
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * 关联到seo信息
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function seo()
    {
        return $this->hasOne(SEO::class, 'id', 'seo_id');
    }
}
