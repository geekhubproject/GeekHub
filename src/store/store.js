import Vue from 'vue'
import Vuex from 'vuex'

import login from './modules/login.module'
import home from './modules/home.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    login,
    home
  }
})
