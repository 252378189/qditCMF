<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Base\StatusCode;
use App\Http\Controllers\Controller;
use App\Models\ConfigModel;
use Illuminate\Http\Request;

class ConfigController extends Controller
{

    /**
     * 响应关键字数据
     */
    public function index(Request $request)
    {
        $result = ConfigModel::with('hasFather')
            ->where('keyword', $request->keyword)
            ->first();
        if (empty($result)) {
            return [
                'status' => false,
                'message' => '没有基本信息',
                'data' => []
            ];
        }
        return [
            'status' => true,
            'message' => '成功获得所有数据',
            'data' => $result->value
        ];
    }

    /**
     * 插入新配置
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function store(Request $request)
    {
        ConfigModel::query()->create([
            'pid' => $request->input('pid', 0),
            'type' => $request->type,
            'keyword' => $request->keyword,
            'value' => $request->value,
            'desc' => $request->input('desc', '没有描述')
        ]);
        return ['status' => true, 'message' => '配置成功'];
    }

    /**
     * 修改配置项
     *
     * @param Request $request
     * @param         $id
     *
     * @return array
     */
    public function update(Request $request)
    {
        $m = ConfigModel::query()->where('keyword', $request->keyword)->first();
        $m->pid = $request->input('pid', 0);
        $m->type = $request->type;
        $m->keyword = $request->keyword;
        $m->value = $request->value;
        $m->desc = $request->input('desc', '没有描述');
        $m->save();
        return ['status' => true, 'message' => '配置已修改'];
    }

    /**
     * 更新或者插入
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateOrCreate(Request $request)
    {
        ConfigModel::query()->updateOrCreate([
            'keyword' => $request->keyword,
        ], [
            'pid' => $request->input('pid', 0),
            'type' => $request->type,
            'keyword' => $request->keyword,
            'value' => $request->value,
            'desc' => $request->input('desc', '没有描述')
        ]);
        return $this->Json(StatusCode::SUCCESS);
    }
}
