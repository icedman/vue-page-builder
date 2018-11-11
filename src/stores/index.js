import Vue from 'vue'
import Vuex from 'vuex'

import tree from './tree'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    [tree.name]: tree
  }
})
