/*
 * @Author: zhaomin 
 * @Date: 2018-05-30 16:23:25 
 * @Last Modified by: zhaomin
 * @Last Modified time: 2019-12-06 00:21:51
 * @description: 
 */

import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import Router from 'vue-router'
import store from '../../store/project/index'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import { routers } from '../../router/project/index'
import axios from "axios"

// mock生成测试数据
// import Mock from '../../mock'
// Mock.bootstrap();


Vue.use(ElementUI)
Vue.use(Router)
Vue.use(Vuex)
Vue.use(VueCookies)



	/* eslint-disable no-new */
	var router = new Router({
		hashbang: true,
		history: false,
		routes: [...routers]
	});

	router.afterEach(to => {
		console.log("go to path:" + to.path);
  });
  
  new Vue({
    router,
    store,
    created() {
      Vue.prototype.$http = axios;
      this.$http.interceptors.response.use(response => {
        console.log('-----')
        console.log(response.data)
				return response.data
			}, error => {
				if (error && error.response && error.response.status == "401") {
          this.$cookies.remove("userName");
          this.$cookies.remove("token");
          //应该清除router路由信息，不然菜单会有问题
          this.$router.options.routes = [];
					this.$router.push({ path: "/login" });
				}
				return Promise.reject(error)
      });
      if (VueCookies.get("token")) {
        axios.defaults.headers["Authorization"] = VueCookies.get("token");
        store.dispatch("UpdateMenu").then(() => {
          this.$router.addRoutes(this.$store.getters.getRouter);
          this.$router.options.routes.push(...this.$store.getters.getRouter) 
        });
      } else {
        this.$cookies.remove("userName");
        this.$cookies.remove("token");
        //应该清除router路由信息，不然菜单会有问题
        this.$router.options.routes = [];
        this.$router.push({ path: "/login" });
      }
    },
    render: h => h(App)
  }).$mount('#app');
// }
