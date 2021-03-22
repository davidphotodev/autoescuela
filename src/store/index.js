import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	layout: 'dashboard-layout',
    showProfile: false,
    user: {},
    show: false,
    access_token: "",
  },
  mutations: {
    SET_LOADING(state){
      state.show = !state.show ;
    },
    SET_TOKEN(state, newToken){
      state.access_token = newToken ;
    },
  	SET_LAYOUT(state, newLayout){
  		state.layout = newLayout
  	},
    SET_USER(state, newUser){
      state.user = newUser
    },
    SET_SHOWPROFILE(state, newShowProfile){
      state.showProfile = newShowProfile
    }
  },
  actions: {
    SET_LOADING ({commit}) {
      commit('SET_LOADING')
    },
    login({commit, state}, payload){
      return new Promise((resolve, reject) => {
        let token = "";
        this._vm.$api({
          method: 'post',
          url: 'users/login',
          data: payload
        }).then( res => {
          commit('SET_TOKEN', res.data.stsTokenManager.accessToken);
          token = res.data.stsTokenManager.accessToken;
          commit('SET_USER', res.data);
        }).then(() => {
          this._vm.$api.get(`user-data/search/userId/${state.user.uid}`).then(res => {
            let user = state.user;            
            let subscription = Object.values(res.data)[0].subscriptionId;
            if (typeof subscription != 'undefined') {
              user.isSubscription = subscription.length > 0;
            }else{
              user.isSubscription = false;
            }
            user.userData = Object.values(res.data)[0];
            commit('SET_USER', Object.assign(user, Object.values(res.data)[0]));
            resolve('success')
          })
        }).catch( error => {
          M.toast({html: 'Datos inválidos', classes: 'blue-grey lighten-5 black-text'});
          console.log(error);
        });
      })
    },
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
