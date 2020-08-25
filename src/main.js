import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import store from './store/index'
import AuthService from './auth/AuthService.js'


Vue.prototype.$auth = new AuthService();
Vue.prototype.$darkmode = false
Vue.prototype.$store = store
Vue.prototype.$http = axios
Vue.prototype.$mode = true
if(process.env.NODE_ENV == 'development'){
  axios.defaults.baseURL = `http://127.0.0.1:5000/`;

} else{
  axios.defaults.baseURL = `https://casting-app.netlify.app`;
}


Vue.use(Vuex)
import './assets/styles/main.css';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
