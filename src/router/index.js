/*
 * @Author: zhaomin 
 * @Date: 2018-05-30 15:45:34 
 * @Last Modified by: zhaomin
 * @Last Modified time: 2018-05-30 15:46:17
 * @description: 系统通用route，供各个页面使用
 */

export const loginRouter = {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
        title: '登录'
    },
    component: () => import('@/views/project/Login.vue')
};

export const _404Router = {
    path: '/404',
    name: '404',
    hidden: true,
    meta: {
        title: '404'
    },
    component: () => import('@/views/project/404.vue')
};

const infoSetRouter = {
    path:'/infoset',
    name:'infoset',
    hidden:true,
    component: () => import('@/views/InfoSet.vue')
}

export const routers = [loginRouter, infoSetRouter];