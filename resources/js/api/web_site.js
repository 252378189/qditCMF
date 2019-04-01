import axios from '@/libs/axios';

/**
 * 添加友情链接
 *
 * @param data
 * @returns {*}
 */
export const friend_add = (data) => {
    return axios.request({
        url: '/friend_link',
        data,
        method: 'post'
    })
};

/**
 * 修改友情链接
 *
 * @param id
 * @param data
 * @returns {*}
 */
export const friend_edit = (id, data) => {
    return axios.request({
        url: '/friend_link/' + id,
        data,
        method: 'put'
    })
};

/**
 * 获得友情链接详情
 *
 * @param id
 * @returns {*}
 */
export const friend_get = (id) => {
    return axios.request({
        url: '/friend_link/' + id,
        method: 'get'
    })
};

/**
 * 删除友情链接
 * @param id
 * @returns {*}
 */
export const friend_del = (id) => {
    return axios.request({
        url: '/friend_link/' + id,
        method: 'delete'
    })
};

/**
 * 添加seo信息
 *
 * @param data
 * @returns {*}
 * @constructor
 */
export const SeoAdd = (data) => {
    return axios.request({
        url: '/seo',
        data,
        method: 'post'
    })
};

/**
 * seo信息列表
 *
 * @returns {*}
 * @constructor
 */
export const SeoList = () => {
    return axios.request({
        url: '/seo',
        method: 'get'
    })
};

/**
 * 获得seo信息
 *
 * @param id
 * @returns {*}
 * @constructor
 */
export const SeoGet = (id) => {
    return axios.request({
        url: '/seo/' + id,
        method: 'get'
    })
};

/**
 * 修改seo信息
 * @param id
 * @param data
 * @returns {*}
 * @constructor
 */
export const SeoEdit = (id, data) => {
    return axios.request({
        url: '/seo/' + id,
        data,
        method: 'put'
    })
};

/**
 * seo信息删除
 * @param id
 * @returns {*}
 * @constructor
 */
export const SeoDelete = (id) => {
    return axios.request({
        url: '/seo/' + id,
        method: 'delete'
    })
};

/**
 * 导航信息添加
 *
 * @param data
 * @returns {*}
 * @constructor
 */
export const NavAdd = (data) => {
    return axios.request({
        url: '/nav',
        data,
        method: 'post'
    })
};

/**
 * 获得导航信息
 *
 * @param id
 * @returns {*}
 * @constructor
 */
export const NavGet = (id) => {
    return axios.request({
        url: '/nav/' + id,
        method: 'get'
    })
};

/**
 * 修改导航信息
 *
 * @param id
 * @param data
 * @returns {*}
 * @constructor
 */
export const NavEdit = (id, data) => {
    return axios.request({
        url: '/nav/' + id,
        data,
        method: 'put'
    })
};
/**
 * 删除导航信息
 * @param id
 * @returns {*}
 * @constructor
 */
export const NavDelete = (id) => {
    return axios.request({
        url: '/nav/' + id,
        method: 'delete'
    })
};

