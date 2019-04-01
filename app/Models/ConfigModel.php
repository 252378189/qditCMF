<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 配置表模型
 *
 * Class ConfigModel
 *
 * @category ConfigModel
 * @package  App\Models
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class ConfigModel extends Model
{
    //设置该模型操作表
    public $table = 'config';

    //设置白名单字段
    protected $fillable = ['pid','type','keyword','value','desc'];

    //该模型不需要自动维护时间戳
    public $timestamps = false;

    public function Childs()
    {
        return $this->hasMany('App\Models\ConfigModel','pid');
    }
    //设置模型关联
    public function hasFather () {
        return $this->belongsTo(ConfigModel::class,'pid','id');
    }

    public function getValueAttribute($value){
        if ($this->type == 'json'){
            return json_decode($value);
        }
        return $value;
    }

    public function setValueAttribute($value){
        if($this->attributes['type'] == 'json'){
            $this->attributes['value'] = json_encode($value);
        }else{
            $this->attributes['value'] = $value;
        }
    }
}
