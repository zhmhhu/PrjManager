import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import count from './modules/count'
import tagsView from './modules/tagsView'
import user from './modules/user'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    }
}

const store =  new Vuex.Store({
    modules:{
        count,
        tagsView,
        user
    }
})


export default store