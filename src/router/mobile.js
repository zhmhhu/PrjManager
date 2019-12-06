import Vue from 'vue'
import Router from 'vue-router'
import Main from 'mobile/pages/main.vue'
import Tool from 'mobile/pages/tool.vue'
import My from 'mobile/pages/my.vue'


import ComponentsRouter from './modules/components'

//指定同一个chunkName打包后会打到同一个js中去
const MemoNew = ()=>import(/* webpackChunkName: 'memo' */'mobile/pages/tool/memo/memonew.vue');
const MemoList = ()=>import(/* webpackChunkName: 'memo' */'mobile/pages/tool/memo/memolist.vue');

const Loadmore = ()=>import(/* webpackChunkName: 'Loadmore' */'mobile/pages/tool/Loadmore.vue');
const MyInfo =() =>import(/* webpackChunkName: 'MyInfo' */'mobile/pages/my/MyInfo.vue');
const OtherTest = () => import(/* webpackChunkName: 'Other' */'mobile/pages/tool/OtherTest.vue');
/**
 * 图表
 */
const chartBox = r => require.ensure([], () => r(require('mobile/pages/tool/chart/chartBox')), 'chartBox')
const CustomerCategory = r => require.ensure([], () => r(require('mobile/pages/tool/chart/CustomerCategory')), 'CustomerCategory')
const MonthlySalesStatistics = r => require.ensure([], () => r(require('mobile/pages/tool/chart/MonthlySalesStatistics')), 'MonthlySalesStatistics')
const MonthlyTask = r => require.ensure([], () => r(require('mobile/pages/tool/chart/MonthlyTask')), 'MonthlyTask')
const OppFunnel = r => require.ensure([], () => r(require('mobile/pages/tool/chart/OppFunnel')), 'OppFunnel')
const SaleRank = r => require.ensure([], () => r(require('mobile/pages/tool/chart/SaleRank')), 'SaleRank')
/*sassTest*/
const SassTest = r => require.ensure([], () => r(require('mobile/pages/tool/SassTest')), 'SassTest')


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', component: Main
    },
    {
      path: '/main', component: Main
    }, {
      path: '/tool', component: Tool
    }, {
      path: '/my', component: My
    }, {
      path: '/tool/memonew', component: MemoNew
    }, {
      path: '/tool/memolist', component: MemoList
    },
    {
      path: '/tool/loadmore', component: Loadmore
    },
    {
      path: '/my/myinfo', component: MyInfo
    },
    {
      path: '/tool/otherTest', component: OtherTest
    },
    {
      path: '/tool/sassTest', component: SassTest
    },
    {
      path: '/chartBox',
      name: 'chartBox',
      component: chartBox,
      children: [
        {
          name:'',
          path:'',
          component: CustomerCategory
        },
        {
          name: 'CustomerCategory',
          path: 'CustomerCategory',
          component: CustomerCategory
        },
        {
          name: 'MonthlySalesStatistics',
          path: 'MonthlySalesStatistics',
          component: MonthlySalesStatistics
        },
        {
          name: 'MonthlyTask',
          path: 'MonthlyTask',
          component: MonthlyTask
        },
        {
          name: 'OppFunnel',
          path: 'OppFunnel',
          component: OppFunnel
        },
        {
          name: 'SaleRank',
          path: 'SaleRank',
          component: SaleRank
        }
      ]
    },
    ...ComponentsRouter
  ]
})
