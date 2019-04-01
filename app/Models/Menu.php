<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * 查询表模型
 *
 * Class Menu
 *
 * @category Menu
 * @package  App\Models
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class Menu extends Model
{
    // 批量赋值黑名单
    protected $guarded = [];

    // 子菜单
    public function SubMenu()
    {
        return $this->hasMany('App\Models\Menu','pid');
    }

    // 父级菜单
    public function Parent()
    {
        return $this->belongsTo('App\Models\Menu','pid');
    }

    // 拥有的权限
    public function HasAuth(){
        return $this->hasMany('App\Models\Auth','menu_id');
    }

    protected static function boot()
    {
        parent::boot();
        // 默认以sort倒序排序
        static::addGlobalScope('sort', function (Builder $builder) {
            $builder->orderBy('sort', 'desc');
        });
    }
}
