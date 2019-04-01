<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 友情链接表模型
 *
 * Class FriendLink
 *
 * @category FriendLink
 * @package  App\Models
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class FriendLink extends Model
{
    /**
     * 置操作表
     *
     * @var string
     */
    protected $table = 'friend_links';

    /**
     * 全字段可写
     *
     * @var array
     */
    protected $guarded = [];
}
