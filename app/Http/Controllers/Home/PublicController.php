<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/3/28
 * Time: 9:43
 */

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Base\HomeBaseController;

use App\Models\Contact;
use App\Models\FriendLink;
use App\Models\Fun;
use App\Models\Nav;
use Illuminate\Http\Request;


/**
 * 页面公共部分接口
 *
 * Class PublicController
 *
 * @category PublicController
 * @package  App\Http\Controllers\Home
 * @author   ALG <513051043@qq.com>
 * @license  四川猪太帅科技公司 http://www.51zts.com
 * @link     接口文档链接
 */
class PublicController extends HomeBaseController
{
    /**
     * 友情链接
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function friendLink()
    {
        $query = FriendLink::query()
            ->orderBy('created_at', 'desc')
            ->limit(12);
        $result = $this->baseCachePolicy($query, 'friend_link');
        return $this->returnData($result);
    }

    /**
     * 获得导航信息
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function nav()
    {
        $result = $this->baseCachePolicy(new Nav(), 'nav', [], 'seo');
        return $this->returnData($result);
    }

    /**
     * 网站基本信息
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function siteBase()
    {
        $result = $this->getConfig('site_base', 'sitebase');
        return $this->returnData($result[0]['value']);
    }

    /**
     * 关于我们
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function aBout()
    {
        $result = $this->getConfig('about', 'about');
        return $this->returnData($result[0]['value']);
    }

    /**
     * 功能介绍
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function fun()
    {
        $result = $this->baseCachePolicy(new Fun(), 'fun');
        return $this->returnData($result);
    }

    /**
     * 新增联系我们表单提交记录
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \App\Exceptions\FromVerif
     */
    public function contactAdd(Request $request)
    {
        $filedValue =  $this->formVerif($request, [
            'company'=>'nullable',
            'content'=>'required',
            'phone'=>'required',
            'name'=>'required',
            'qq'=>'nullable',
        ]);
        $filedValue['status'] = 0;
        $res = Contact::query()->create($filedValue);
        TotalLogIncrementColumn('submit');
        return $this->returnMsg($res);
    }
}