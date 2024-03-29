<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 角色表模型
 *
 * Class Role
 *
 * @category Role
 * @package  App\Models
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class Role extends Model
{
    //
    const NORMAL = 1;
    const DISABLE = 0;
    //字段操作白名单
    protected $fillable = ['name','sort','description','state'];
    ## region 访问器
    // 添加到序列化中
    protected $appends = ['state_name'];
    // 数据映射
    private $maps = [
        // 用户状态
        'state' =>  [
            '0' =>  '禁用',
            '1' =>  '正常'
        ],
    ];

    public function getStateNameAttribute()
    {
        $attr = 'state';
        return $this->maps[$attr][$this->attributes[$attr]];
    }
    ## endregion

    //关联到权限
    public function HasAuth(){
        return $this->belongsToMany(Auth::class,'role_and_auth')->withPivot('extented');
    }
//    public function HasMenu(){
//        return $this->belongsToMany(Menu::class,'role_and_menu');
//    }
}
