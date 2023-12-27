// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import api from './router/api'
import locale from 'element-ui/lib/locale/lang/en'
import directive from './utils/directive/directive'


axios.defaults.baseURL = 'http://localhost:8089/api'
Vue.use(directive)
Vue.use(ElementUI,{locale})
Vue.config.productionTip = false

Vue.prototype.$axios = axios 
Vue.prototype.qs = qs 
Vue.prototype.$moment = moment
Vue.prototype.$post = api.postFn
Vue.prototype.$get = api.getFn
Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

