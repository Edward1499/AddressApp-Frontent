// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import {BootstrapVue} from 'bootstrap-vue'
import Vuex from 'vuex'
import store from "./store";
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import interceptor from '../config/interceptor'
const config = require('../config/dev.env')

Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue)

// Vue.use(vuetify);


axios.defaults.baseURL = config.VUE_APP_API_URL+'/api';
axios.defaults.headers.common = {
  "Accept": "application/json"
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  vuetify
})
