<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 角色关联权限表模型
 *
 * Class RoleAndAuth
 *
 * @category RoleAndAuth
 * @package  App\Models
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class RoleAndAuth extends Model
{
    //
    const NORMAL = 1;
    const DISABLE = 0;

    protected $table = 'role_and_auth';
    //设置黑名单自带
    protected $guarded = [];
    protected $hidden = ['created_at','updated_at'];
    protected $casts = ['extented' => 'array'];


    public function Auth(){
        return $this->hasMany('App\Models\Auth','id','auth_id');
    }
}
