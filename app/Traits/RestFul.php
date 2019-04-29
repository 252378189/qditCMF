<?php
/**
 * Created by PhpStorm.
 * User: ALG
 * Date: 2019/4/17
 * Time: 9:01
 */

namespace App\Traits;



use App\Http\Controllers\Base\StatusCode;

use Illuminate\Http\Request;


trait RestFul
{
    use Filter;

    protected $model = null;

    /**
     * 初始化模型
     *
     * RestFul constructor.
     *
     * @throws \Exception
     */
    public function __construct()
    {
        try {
            $this->model = $this->getModel();
        } catch (\Exception $e) {
            throw new \Exception('模型不能转为Builder');
        }
    }

    /**
     * 获取列表
     *
     *
     * @return mixed
     */
    public function index()
    {
        return $this->filter($this->model);
    }

    /**
     * 获取
     *
     * @param int $id 资源Id
     *
     * @return mixed
     */
    public function show($id)
    {
        $data = $this->model::find($id);
        return $this->Json(StatusCode::SUCCESS, ['data' => $data]);
    }

    /**
     * 创建资源
     *
     * @return mixed
     * @throws \App\Exceptions\FromVerif
     */
    public function store()
    {
        $validatedData = $this->formVerif($this->addRule());

        $status = $this->model::create($validatedData);
        if ($status) {
            return $this->Json(StatusCode::SUCCESS, []);
        }
        return $this->Json(StatusCode::ERROR, []);
    }

    /**
     * 修改
     *
     * @param int $id 资源Id
     *
     * @return mixed
     * @throws \App\Exceptions\FromVerif
     */
    public function update($id)
    {
        $validatedData = $this->formVerif($this->editRule());

        $status = $this->model::findOrFail($id)->update($validatedData);
        if ($status) {
            return $this->Json(StatusCode::SUCCESS);
        }
        return $this->Json(StatusCode::ERROR);
    }

    /**
     * 删除
     *
     * @param $id
     *
     * @return mixed
     */
    public function destroy($id)
    {
        $status = $this->model::destroy($id);
        if ($status) {
            return $this->Json(StatusCode::SUCCESS);
        }
        return $this->Json(StatusCode::ERROR);
    }

    protected abstract function getModel();

    protected abstract function addRule();

    protected abstract function editRule();
}