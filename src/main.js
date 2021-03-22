import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'
import * as firebase from "firebase/app";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VuePaginate from 'vue-paginate'
import VeeValidate from 'vee-validate';
Vue.use(VuePaginate)
Vue.use(VeeValidate);
Vue.config.productionTip = false

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKu2XkayCy0WLIfWXNUSMt_4PGxby0yew",
  authDomain: "autoescuela-ab84a.firebaseapp.com",
  databaseURL: "https://autoescuela-ab84a.firebaseio.com",
  projectId: "autoescuela-ab84a",
  storageBucket: "autoescuela-ab84a.appspot.com",
  messagingSenderId: "42721272278",
  appId: "1:42721272278:web:ce81e1be182db2454bc477",
  measurementId: "G-KMY474FLWQ"
};


firebase.initializeApp(firebaseConfig);


Vue.use({
    install (Vue) {
      
    Vue.prototype.$api = axios.create({
      baseURL: 'https://apiauto.jumo.cat/api/v1/',
      params: {
        access_token: store.state.access_token
      }
    })

    Vue.prototype.$api.interceptors.request.use(function (config) {
      config.params = {access_token: store.state.access_token};      
      store.dispatch('SET_LOADING');
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    Vue.prototype.$api.interceptors.response.use(function (response) {
      store.dispatch('SET_LOADING');
      return response;
    }, function (error) {
      console.log(store.dispatch('SET_LOADING'));
      return Promise.reject(error);
    });

    Vue.prototype.$api2 = axios.create({
      baseURL: 'https://apiauto.jumo.cat/api/v1/'
    })

    Vue.prototype.$api2.interceptors.request.use(function (config) {
      config.params = {access_token: store.state.access_token};      
      return config;
    }, function (error) {
      return Promise.reject(error);
    });

    Vue.prototype.$api3 = axios.create({
      baseURL: 'https://apiauto.jumo.cat/api/v1/'
    })

  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
