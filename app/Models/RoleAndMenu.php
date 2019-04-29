<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoleAndMenu extends Model
{
    /**
     * 置操作表
     *
     * @var string
     */
    protected $table = 'role_and_menus';

    /**
     * 全字段可写
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * 关联到角色
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function role()
    {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }

    /**
     * 关联到角色权限
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function roleAndAuth()
    {
        return $this->hasOne(RoleAndAuth::class, 'role_id', 'role_id');
    }
}
