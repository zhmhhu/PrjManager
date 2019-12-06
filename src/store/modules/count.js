import Vue from "vue";
import Vuex from 'vuex'

const count = {
    state: {
        count: 10
    },
    mutations: {
        INCREMENT(state) {
            state.count++
        },
        DECREMENT(state) {
            state.count--
        }
    },
    actions: {
        increment: ({ commit }) => {
            commit('INCREMENT')
        },
        decrement: ({ commit }) => {
            commit('DECREMENT')
        }
    },
    getters: {
        getCount: state => {
            return state.count
        }
    }
}

export default count