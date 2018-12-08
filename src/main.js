// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'babel-polyfill'
import {store} from './store/store'
import APIService from '@/common/api.service'
import './plugins/froala.plugin'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(Vuetify)
APIService.init()
Vue.use(InfiniteLoading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
