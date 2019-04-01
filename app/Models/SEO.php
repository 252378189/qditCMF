<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 页面关键字表模型
 *
 * Class SEO
 *
 * @category SEO
 * @package  App\Models
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class SEO extends Model
{
    /**
     * 置操作表
     *
     * @var string
     */
    protected $table = 's_e_o_s';

    /**
     * 全字段可写
     *
     * @var array
     */
    protected $guarded = [];

}
