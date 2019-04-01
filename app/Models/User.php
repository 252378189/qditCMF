<?php

namespace App\Models;


use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * 用户表模型
 *
 * Class User
 *
 * @category User
 * @package  App\Models
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class User extends Authenticatable
{
    use Notifiable;

    /**
     * 全字段可写
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * 隐藏属性
     *
     * @var array
     */
    protected $hidden = [
        'password', 'deleted_at', 'token'
    ];


    /**
     * 属性类型转换
     *
     * @var array
     */
    protected $casts = [
        'options' => 'array',
    ];


    ## region 模型关联
    // 用户拥有的权限
    public function HasAuth()
    {
        return $this->hasManyThrough(RoleAndAuth::class,
            UserAndRole::class,
            'user_id',
            'role_id');
    }

    //用户拥有的角色
    public function Roles()
    {
        return $this->belongsToMany(Role::class, 'user_and_role');
    }

    ## endregion


    ## region 访问器
    // 添加到序列化中
    protected $appends = ['sex_name', 'state_name'];

    // 数据映射
    private $maps = [
        // 性别
        'sex' => [
            '0' => '未填写',
            '1' => '男',
            '2' => '女'
        ],
        // 用户状态
        'state' => [
            '0' => '禁用',
            '1' => '正常'
        ],
    ];


    public function getSexNameAttribute()
    {
        $attr = 'sex';
        return $this->maps[$attr][$this->attributes[$attr]];
    }
    public function getStateNameAttribute()
    {
        $attr = 'state';
        return $this->maps[$attr][$this->attributes[$attr]];
    }

    ## endregion

}
