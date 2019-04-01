<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/3/28
 * Time: 9:47
 */

namespace App\Http\Controllers\Base;

use App\Models\ConfigModel;
use Illuminate\Support\Facades\Redis;

/**
 * 前端基础控制器
 *
 * Class HomeBaseController
 *
 * @category HomeBaseController
 * @package  App\Http\Controllers\Base
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class HomeBaseController extends BaseController
{
    /*
     * 缓存前缀
     */
    protected $cache_prefix = 'app_web:';

    /*
     * 缓存时间
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
}