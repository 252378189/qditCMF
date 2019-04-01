<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/3/15
 * Time: 15:48
 */

/**
 * 是否超管
 *
 * @return bool
 */
function isSuperManager()
{
    $user = \App\Models\User::query()
        ->with(['Roles'])
        ->where('id', \Illuminate\Support\Facades\Auth::id())
        ->first()
        ->toArray()['roles'];
    $roleName = collect($user)->pluck('name')->toArray();
    if (!in_array('超管', $roleName)) { //不是超管
        return true;
    }
    return false;
}

/**
 * 每日统计字段自增
 *
 * @param $column
 */
function TotalLogIncrementColumn($column)
{
    $result = \App\Models\ConfigModel::query()->where('keyword', 'admin_base')->first();
    $arr = (array)$result->value;

    /**
     * 字段自增
     */
    $arr[$column] = ++$arr[$column];

    /**
     * 对应的星期几也自增
     */
    $weekArray = array("sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday");
    $arr[$weekArray[date("w")]] = ++$arr[$weekArray[date("w")]];

    \App\Models\ConfigModel::query()->where('keyword', 'admin_base')->update([
        'value' => json_encode($arr)
    ]);
}
