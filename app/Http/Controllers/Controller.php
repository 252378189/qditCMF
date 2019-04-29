<?php

namespace App\Http\Controllers;

use App\Models\ConfigModel;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\FromVerif;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * 缓存前缀
     *
     * @var string
     */
    protected $cache_prefix = 'qditCMF:';

    /**
     * 缓存时间
     *
     * @var string
     */
    protected $cache_time = '900';

    /**
     * 基础缓存策略
     *
     * @param string $model     模型
     * @param string $cacheName 缓存名
     * @param array $where 过滤条件
     * @param string $with 预加载模型名词
     *
     * @return mixed
     */
    public function baseCachePolicy($model, $cacheName, $where = [], $with = null)
    {
        $result = Redis::get($this->cache_prefix . $cacheName);
        if (empty($result)) { //缓存中没有数据,则存入数据
            if (!is_null($with)) {
                $model = $model::with($with);
            }
            if (!empty($where)) {
                $model = $model::where($where);
            }
            $data = $model->get()->toArray();
            $cache_Str = serialize($data);//编码压入
            Redis::setex($this->cache_prefix . $cacheName, $this->cache_time, $cache_Str);
            return $data;
        } else {//缓存中有数据
            //解码返回
            return unserialize($result);
        }
    }

    /**
     * 根据keyword返回配置表的信息数据
     *
     * @param string $cacheName
     * @param string $keyword
     *
     * @return mixed
     */
    public function getConfig($cacheName, $keyword)
    {
        return $this->baseCachePolicy(new ConfigModel(), $cacheName, ['keyword' => $keyword]);
    }

    /**
     * 自定义验证规则
     *
     * @param array $rule 验证规则
     *
     * @return array 返回验证的数据
     * @throws \App\Exceptions\FromVerif 如果验证失败抛出异常
     */
    public function formVerif($rule){
        //验证提交数据
        $validator = Validator::make(request()->all(), $rule);
        //如果验证出错返回验证错误数据的第一条
        if ($validator->fails()) {
            throw  new FromVerif($validator->errors()->first());
        }
        return $validator->validate();
    }


    /**
     * 返回Json
     *
     * @param array $status
     * @param array $data
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function Json(array $status, array $data = [])
    {
        $json = array_merge($status, $data);
        return response()->json($json);
    }
}
