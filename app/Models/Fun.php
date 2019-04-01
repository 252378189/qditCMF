<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fun extends Model
{
    /**
     * 全表可写
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * 置操作表
     *
     * @var string
     */
    protected $table = 'funs';

    public function getPhotosAttribute($value)
    {
        return json_decode($value);
    }
}
