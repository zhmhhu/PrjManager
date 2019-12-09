/**********用store统一管理菜单 by hjw***********/
import axios from "axios";
import Cookies from "vue-cookies";
import { toHierarchy } from '@/common/js/hierarchy'

const toComponent = function (item) {
    var componentPath = item.component,
        COMPONENT_TYPE = 100,
        IFRAME_TYPE = 200,
        WINDOW_TYPE = 300;
    if (item.disabled && item.disabled == "true") {
        item.disabled = true;
    } else {
        item.disabled = false;
    }
    if (item.component && item.type === COMPONENT_TYPE) {
        console.log('@/views/' + componentPath + '.vue');
        item.component = require('@/views/' + componentPath + '.vue');
    } else if (item.component && item.type === IFRAME_TYPE) {
        item.component = {
            template: "<div style='overflow: hidden;height:100%;'><iframe width='100%' height='100%' frameBorder='0' src='" + componentPath + "'></iframe></div>"
        }
    } else if (item.component && item.type === WINDOW_TYPE) {
        item.component = {
            template: componentPath
        }
    } else {
        item.component = {
            template: "<div>Unknown type or not set component property</div>"
        }
    };
};

const app = {
    state: {
        userId: null,
        menu: [],
        router: [],
        baseURL:"/api"
    },
    mutations: {
        updateUserId(state, id) {
            state.userId = id
        },
        updateMenu(state, menu) {
            state.menu = menu;
        },
        updateRouter(state, route) {
            state.router = route;
        }
    },
    actions: {
        UpdateMenu(context) {
            return new Promise((resolve, reject) => {
                axios.get(context.state.baseURL + "/current").then(res => {
                    let userId = res;
                    context.commit("updateUserId",userId);
                    axios.get(context.state.baseURL + "/menu/user", {
                        params: {
                            userId: userId
                        }
                    }).then(res => {
                        res.forEach(v => {
                            toComponent(v);
                        });
                        let route = toHierarchy(res,"menuId");
                        console.log(route)
                        context.commit('updateRouter', route);
                        context.commit("updateMenu", route)
                        resolve();
                    })
                })
            })
        }
    },
    getters: {
        getRouter(state) {
            //用于路由和菜单跳转
            return state.router;
        },
        getMenu(state) {
            //用于菜单管理模块
            return state.menu;
        }
    }
}

export default app;