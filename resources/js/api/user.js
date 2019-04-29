import axios from "@/libs/axios";
//import {getToken} from "@/libs/util";

export const login = (data) => {
    return axios.request({
        url: 'login?type=normal',
        data,
        method: 'post'
    })
};

export const logout = (token) => {
    return axios.request({
        url: 'logout?token' + token,
        method: 'get'
    })
};

export const userInfo = () => {
    return axios.request({
        url: 'userInfo',
        method: 'get',
    })
};

export const addAuth = (data) => {
    return axios.request({
        url: 'auth',
        data,
        method: 'post',
    })
};
export const editAuthCreate = (id) => {
    return axios.request({
        url: 'auth/' + id,
        method: 'get',
    })
};
export const editAuth = (data, id) => {
    return axios.request({
        url: 'auth/' + id,
        data,
        method: 'put',
    })
};
export const delAuth = (id) => {
    return axios.request({
        url: 'auth/' + id,
        method: 'delete',
    })
};
export const addUser = (data) => {
    return axios.request({
        url: 'user',
        data,
        method: 'post',
    })
};
export const editUser = (data, id) => {
    return axios.request({
        url: 'user/' + id,
        data,
        method: 'put',
    })
};
export const editCreateUser = (id) => {
    return axios.request({
        url: 'user/' + id,
        method: 'get',
    })
};
export const delUser = (id) => {
    return axios.request({
        url: 'user/' + id,
        method: 'delete',
    })
};
export const DisableUser = (data) => {
    return axios.request({
        url: 'user/disable',
        data,
        method: 'post',
    })
};
export const addRole = (data) => {
    return axios.request({
        url: 'role',
        data,
        method: 'post',
    })
};
export const editRole = (data, id) => {
    return axios.request({
        url: 'role/' + id,
        data,
        method: 'put',
    })
};
export const editCreateRole = (id) => {
    return axios.request({
        url: 'role/' + id,
        method: 'get',
    })
};
export const delRole = (id) => {
    return axios.request({
        url: 'role/' + id,
        method: 'delete',
    })
};
export const DisableRole = (data) => {
    return axios.request({
        url: 'role/disable',
        data,
        method: 'post',
    })
};
export const AuthTree = () => {
    return axios.request({
        url: 'auth/auth_tree',
        method: 'get',
    })
};
export const RoleGiveAuth = (data) => {
    return axios.request({
        url: 'role/give_auth',
        data,
        method: 'post',
    })
};
/**
 * 获取角色拥有的权限+菜单
 * @param id    角色ID
 */
export const getRoleHasAuth = (id) => {
    return axios.request({
        url: 'role/' + id + '/get_role_auth',
        method: 'get',
    })
};
export const roleList = () => {
    return axios.request({
        url: 'role',
        method: 'get',
    })
};
export const userGiveRole = (data) => {
    return axios.request({
        url: 'user/give/role',
        data,
        method: 'post',
    })
};
export const userGiveRoleCreate = (id) => {
    return axios.request({
        url: 'user/' + id + '/role',
        method: 'get',
    })
};
export const userGiveRoleEdit = (data, id) => {
    return axios.request({
        url: 'user/' + id + 'give/role',
        data,
        method: 'put',
    })
};


