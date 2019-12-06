import axios from 'axios';

let base = 'api';

export const requestLogin = params => { return axios.post(`${base}/login`, params,{
    headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const querywaterService = params => { return axios.get(`${base}/querywaterService!daminspect`, { params: params }); };

export const getPrjListPage = params => { return axios.get(`${base}/user/prjpage`, { params: params }); };

export const loginByUsername = params => { return axios.get(`${base}/login/login`, { params: params }); };

export const logout = params => { return axios.get(`${base}/login/logout`, { params: params }); };

export const getUserInfo = params => { return axios.get(`${base}/user/info`, { params: params }); };

export const getUnitListPage = params => { return axios.get(`${base}/unit/info`, { params: params }); };

