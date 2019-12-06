/*
 * @Author: zhaomin 
 * @Date: 2018-05-30 15:46:47 
 * @Last Modified by: zhaomin
 * @Last Modified time: 2018-05-30 15:50:29
 * @description: project子页的route
 */
import Vue from 'vue'
import Router from 'vue-router'

const _import = file => () => import('@/views/project/' + file + '.vue')
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)



import Home from '@/views/project/Home.vue'
import Jianyi from '@/views/project/project/jianyi.vue'

import Page4 from '@/views/project/nav1/Page4.vue'
import Page5 from '@/views/project/nav1/Page5.vue'
import Page6 from '@/views/project/nav1/Page6.vue'



//所有用户都可以访问的路由
export const constantRouterMap = [
    {path: '/login', component: _import('Login'), hidden: true},
    {path: '/404', component: _import('404'), hidden: true},
    {
        path: '/',
        component: Home,
        redirect: 'desk',
        hidden: true
    }, {
        path: '/',
        component: Home,
        name: '桌面',
        leaf: true,//只有一个节点
        iconCls: 'el-icon-menu',//图标样式class
        children: [{
            path: '/desk',
            component: _import('dashboard/index'),
            name: '个人桌面',
            meta: {title: 'dashboard', icon: 'dashboard', noCache: true}
        }]
    }, {
        path: '/',
        component: Home,
        name: '参建单位及人员',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            {path: '/buildUser', iconCls: 'fa fa-id-card', component: _import('base/buildUser'), name: '建设单位及人员'},
            {path: '/designUser', iconCls: 'fa fa-id-card', component: _import('base/designUser'), name: '设计单位及人员'},
            {
                path: '/superviseUser',
                iconCls: 'fa fa-id-card',
                component: _import('base/superviseUser'),
                name: '监理单位及人员'
            },
            {
                path: '/constructUser',
                iconCls: 'fa fa-id-card',
                component: _import('base/constructUser'),
                name: '施工单位及人员'
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '项目过程',
        iconCls: 'fa fa-briefcase',//图标样式class
        meta: {roles: ['admin', 'editor']}, // you can set roles in root nav
        children: [
            {
                path: './',
                name: '前期工作',
                iconCls: 'fa fa-desktop',//图标样式class,
                component:{template:"<router-view></router-view>"},
                children: [
                    {path: '/jianyi', iconCls: 'fa fa-id-card', component: Jianyi,name: '项目建议书'},
                    {path: '/keyan', iconCls: 'fa fa-id-card', component: _import('project/keyan'), name: '项目可研'},
                    {path: '/chushe',iconCls: 'fa fa-id-card',component: _import('project/chushe'), name: '项目初设'}
                ]
            }, {
                path: '/',
                name: '项目招投标',
                iconCls: 'fa fa-object-group',//图标样式class
                meta: {roles: ['admin']}, // you can set roles in root nav
                children: [
                    {
                        path: '/designBid',
                        iconCls: 'fa fa-industry',
                        component: _import('process/designBid'),
                        name: '设计招投标',
                        meta: {roles: ['admin']}
                    },
                    {
                        path: '/superviseBid',
                        iconCls: 'fa fa-industry',
                        component: _import('process/superviseBid'),
                        name: '监理招投标',
                        meta: {roles: ['admin']}
                    },
                    {
                        path: '/constructBid',
                        iconCls: 'fa fa-industry',
                        component: _import('process/constructBid'),
                        name: '施工招投标',
                        meta: {roles: ['admin']}
                    },
                    {
                        path: '/otherBid',
                        iconCls: 'fa fa-industry',
                        component: _import('process/otherBid'),
                        name: '其他招投标',
                        meta: {roles: ['admin']}
                    }


                ]
            },
            {
                path: '/',
                name: '项目进展',
                iconCls: 'fa fa-object-group',//图标样式class
                meta: {roles: ['admin']}, // you can set roles in root nav
                children: [

                    {
                        path: '/jihuazijin',
                        iconCls: 'fa fa-industry',
                        component: {template: '<div>开工情况</div>'},
                        name: '开工情况',
                        meta: {roles: ['admin']}
                    },
                    {
                        path: '/zhiliang',
                        iconCls: 'fa fa-industry',
                        component: {template: '<div>施工会审</div>'},
                        name: '施工会审',
                        meta: {roles: ['admin']}
                    },
                    {
                        path: '/anquan',
                        iconCls: 'fa fa-industry',
                        component: {template: '<div>设计交底</div>'},
                        name: '设计交底',
                        meta: {roles: ['admin']}
                    },
                    {
                        path: '/jiandu',
                        iconCls: 'fa fa-industry',
                        component: {template: '<div>设计变更</div>'},
                        name: '设计变更',
                        meta: {roles: ['admin']}
                    }
                ]
            },
            {
                path: '/jungong',
                name: '竣工验收',
                iconCls: 'el-icon-menu',//图标样式class
                component: _import('project/jungong'),

            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '进度管理',
        iconCls: 'fa fa-id-card-o',
        meta: {roles: ['admin']},
        children: [
            {
                path: '/Shenqing',
                iconCls: "fa fa-balance-scale",
                component: _import("process/Shenqing"),
                name: '进度计划',
                meta: {roles: ['admin']}
            },
            {
                path: '/Process',
                iconCls: "fa fa-certificate",
                component: _import("process/Process"),
                name: '施工进度',
                meta: {roles: ['admin']}
            },
            {
                path: '/jiance',
                iconCls: "fa fa-certificate",
                component: _import("process/jiance"),
                name: '监理记录',
                meta: {roles: ['admin']}
            },
            {
                path: '/eventHandling',
                iconCls: "fa fa-certificate",
                component: _import("process/eventHandling"),
                name: '施工记录',
                meta: {roles: ['admin']}
            },
        ]
    },
     {
        path: '/',
        component: Home,
        name: '质量管理',
        iconCls: 'fa fa-briefcase',//图标样式class
        meta: {roles: ['admin', 'editor']}, // you can set roles in root nav
        children: [
            {
                path: '/jiance',
                name: '质量检测',
                iconCls: 'fa fa-object-group',//图标样式class
                meta: {roles: ['admin']}, // you can set roles in root nav
                children: [

                    {
                        path: '/shigongzijian',
                        iconCls: 'fa fa-industry',
                        component: {template: '<div>施工自检</div>'},
                        name: '施工自检',
                        meta: {roles: ['admin']}
                    },
                    {
                        path: '/pingxingjiance',
                        iconCls: 'fa fa-industry',
                        component: {template: '<div>监理平行检测</div>'},
                        name: '监理平行检测',
                        meta: {roles: ['admin']}
                    },
                    {
                        path: '/disanfang',
                        iconCls: 'fa fa-industry',
                        component: {template: '<div>第三方检测</div>'},
                        name: '第三方检测',
                        meta: {roles: ['admin']}
                    },
                ]
            },
            {
                path: '/quexian',
                name: '质量缺陷备案',
                iconCls: 'el-icon-menu',//图标样式class
                component: _import('project/quexian'),
            },
            {
                path: '/problem',
                name: '质量问题处理',
                iconCls: 'el-icon-menu',//图标样式class
                component: _import('project/problem'),
            }

        ]
    },
    {
        path: '/',
        component: Home,
        name: '安全管理',
        iconCls: 'fa fa-id-card-o',
        meta: {roles: ['admin']},
        children: [
            {
                path: '/standingBook',
                iconCls: "fa fa-balance-scale",
                component: _import("safe/standingBook"),
                name: '安全台账',
                meta: {roles: ['admin']}
            },
            {
                path: '/safe/problem',
                iconCls: "fa fa-certificate",
                component: _import("safe/problem"),
                name: '安全问题处理',
                meta: {roles: ['admin']}
            },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '资金管理',
        iconCls: 'fa fa-id-card-o',
        meta: {roles: ['admin']},
        children: [
            {
                path: '/capitaldaowei',
                iconCls: "fa fa-balance-scale",
                component: _import("capital/capitaldaowei"),
                name: '资金到位情况',
                meta: {roles: ['admin']}
            },
            {
                path: '/capitalpay',
                iconCls: "fa fa-certificate",
                component: _import("capital/capitalpay"),
                name: '资金支付情况',
                meta: {roles: ['admin']}
            },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'fa fa-id-card-o',
        meta: {roles: ['admin']},
        children: [
            {path: '/system', iconCls: 'el-icon-setting', component: _import('system/system1'), name: '系统设置1'},
        ]
    }
];

export default new Router({
    // base:"/htprj/",   //build时使用
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})