import axios from '@/libs/axios';

export const menu_add = (data) => {
    return axios.request({
        url: '/menu/add',
        data,
        method: 'post'
    })
};
export const menu_edit = (data) => {
    return axios.request({
        url: '/menu/edit',
        data,
        method: 'post'
    })
};
export const menu_detail = (id) => {
    return axios.request({
        url: '/menu/' + id,
        method: 'get'
    })
};
export const config_get = (keyword) => {
    return axios.request({
        url: '/config?keyword=' + keyword,
        method: 'get'
    })
};
export const configUpdateOrCreate = (data) => {
    return axios.request({
        url: '/config/updateOrCreate',
        data,
        method: 'post'
    })
};
export const config_add = (data) => {
    return axios.request({
        url: '/config',
        data,
        method: 'post'
    })
};
export const config_update = (id, data) => {
    return axios.request({
        url: '/config/' + id,
        data,
        method: 'put'
    })
};



/**
 * 清除缓存
 *
 * @returns {*}
 */
export const clean = () => {
    return axios.request({
        url: '/clean',
        method: 'get'
    })
};

/**
 * 清除缓存
 *
 * @returns {*}
 */
export const sitemap = () => {
    return axios.request({
        url: '/sitemap',
        method: 'get'
    })
};
