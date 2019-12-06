/*
 * @Author: zhaomin 
 * @Date: 2018-05-30 16:21:22 
 * @Last Modified by: zhaomin
 * @Last Modified time: 2018-05-30 16:22:53
 * @description: project子页的基本路由
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


export const routers = [loginRouter, _404Router];