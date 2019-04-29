<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2018/12/15
 * Time: 16:24
 */

namespace App\Traits;

use App\Http\Controllers\Base\StatusCode;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

trait Filter
{
    /**
     * 列表筛选
     *
     * @param                          $model
     *
     * @return mixed
     */
    public function filter($model)
    {
        if (!$model instanceof Builder) {
            $model = $model::query();
        }
        try {
            $page = request()->input('page', 1);
            $limit = request()->input('limit', 10);
            $orderBy = explode(',', request()->input('orderBy', 'id,desc'));
            $search = request()->input('search', false);
            $where = request()->input('where', false);
            if (request()->isMethod('get')) {
                $search = $search ? json_decode($search, true) : false;
                $where = $where ? json_decode($where, true) : false;
            }
            if ($where) {
                $where = array_filter($where, function ($var) {
                    return $var !== '' || $var !== null;
                });
                foreach ($where as $k => $v) {
                    if (is_array($v)) {
                        $model = $model->whereIn($k, $v);
                        unset($where[$k]);
                    }
                }
                if (count($where) > 0) {
                    $model = $model->where($where);
                }
            }
            if ($search && $search['value'] !== '' && $search['value'] !== null) {
                $model = $model->where($search['field'], 'like', '%' . $search['value'] . '%');
            }
            $count = $model->count();
            $data = $model->skip(($page - 1) * $limit)->take($limit)->orderBy($orderBy[0], $orderBy[1])->get();
            if ($data) {
                return ['data' => $data, 'count' => $count];
            }
            return StatusCode::NOT_FOUND_MODEL;
        } catch (QueryException $exception) {
            return ['msg' => $exception->getMessage()];
        }
    }

}