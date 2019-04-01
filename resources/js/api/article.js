import axios from '@/libs/axios';

/**
 * 添加文章
 *
 * @param data
 * @returns {*}
 */
export const article_add = (data) => {
    return axios.request({
        url: '/article',
        data,
        method: 'post'
    })
};

/**
 * 网站地图
 *
 * @returns {*}
 */
export const siteMap = () => {
    return axios.request({
        url: '/site_map',
        method: 'get'
    })
};

/**
 * 清除文章缓存
 *
 * @returns {*}
 */
export const clean = () => {
    return axios.request({
        url: '/article/clean',
        method: 'get'
    })
};

/**
 * 获取文章数据
 *
 * @param id
 * @returns {*}
 */
export const article_get = (id) => {
    return axios.request({
        url: '/article/' + id,
        method: 'get'
    })
};

/**
 * 修改文章数据
 *
 * @param id
 * @param data
 * @returns {*}
 */
export const article_edit = (id, data) => {
    return axios.request({
        url: '/article/' + id,
        data,
        method: 'put'
    })
};

/**
 * 删除文章
 *
 * @param id
 * @returns {*}
 */
export const article_del = (id) => {
    return axios.request({
        url: '/article/' + id,
        method: 'delete'
    })
};

/**
 * 模板删除
 *
 * @param id
 * @returns {*}
 */
export const template_del = (id) => {
    return axios.request({
        url: '/template/' + id,
        method: 'delete'
    })
};

/**
 *
 * 模板添加
 *
 * @param data
 * @returns {*}
 */
export const template_add = (data) => {
    return axios.request({
        url: '/template',
        data,
        method: 'post'
    })
};

/**
 * 获得模板数据
 *
 * @param id
 * @returns {*}
 */
export const template_get = (id) => {
    return axios.request({
        url: '/template/' + id,
        method: 'get'
    })
};

/**
 * 修改模板数据
 * @param id
 * @param data
 * @returns {*}
 */
export const template_edit = (id, data) => {
    return axios.request({
        url: '/template/' + id,
        data,
        method: 'put'
    })
};

/**
 *  模板列表
 *
 * @returns {*}
 */
export const template_getList = () => {
    return axios.request({
        url: '/template/list',
        method: 'get'
    })
};

/**
 * 分类列表
 *
 * @returns {*}
 */
export const category_List = () => {
    return axios.request({
        url: '/category/list',
        method: 'get'
    })
};

/**
 * 分类列表
 *
 * @param id
 * @returns {*}
 */
export const category_del = (id) => {
    return axios.request({
        url: '/category/' + id,
        method: 'delete'
    })
};

/**
 * 分类添加
 *
 * @param data
 * @returns {*}
 */
export const category_add = (data) => {
    return axios.request({
        url: '/category',
        data,
        method: 'post'
    })
};

/**
 * 分类修改
 *
 * @param data
 * @param id
 * @returns {*}
 */
export const category_edit = (data, id) => {
    return axios.request({
        url: '/category/' + id,
        data,
        method: 'put'
    })
};

/**
 * 回收文章
 *
 * @param id
 * @returns {*}
 */
export const recovery_article = (id) => {
    return axios.request({
        url: '/recovery/recovery/'+id,
        method: 'get'
    })
};

/**
 * 彻底删除文章
 *
 * @param id
 * @returns {*}
 */
export const recovery_del = (id) => {
    return axios.request({
        url: '/recovery/del/'+id,
        method: 'get'
    })
};




