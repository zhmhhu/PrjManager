import Vue from 'vue'
import Vuex from 'vuex'

import app from '../modules/app';
import count from '../modules/count'
import tagsView from '../modules/tagsView'
import user from '../modules/user'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mainReginHeight: 0,
        userName: null,
        userAvatar: null,
        baseURL:"/api"
    },
    mutations: {
        RE_MAINREGION_HEIGHT: function (_state, height) {
            _state.mainReginHeight = height;
        },
        setUserName: function (_state, name) {
            _state.userName = name;
        },
        setUserAvatar: function (_state, avatar) {
            _state.userAvatar = avatar;
        }
    },
    actions: {
        reMainRegionHeight: function (context, height) {
            context.commit('RE_MAINREGION_HEIGHT', height);
        }
    },
	getters: {
        mainRegionBodyHeight: function (state) {
            return state.mainReginHeight - 40 - 0;
        },
        getUserName: function (state) {
            return state.userName;
        },
        getUserAvatar: function (state) {
            return state.userAvatar;
        }
    },
    modules: {
        app,
        count,
        tagsView,
        user,
    }
})