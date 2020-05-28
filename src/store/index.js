import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TYPE = {
  SET_TOKEN : 'SET_TOKEN',
  SET_LOGIN_STATE : 'SET_LOGIN_STATE',
  REMOVE_TOKEN : 'REMOVE_TOKEN',
}

const state = {
  userInfo: {},
  isLogin: false
}

const mutations = { 
  [TYPE.SET_TOKEN](state, payload) {
    state.userInfo = payload;
  },
  [TYPE.SET_LOGIN_STATE](state, payload) {
    state.isLogin = payload;
  },
  [TYPE.REMOVE_TOKEN]() {
    state.userInfo = {};
    state.isLogin = false;
  }
}
const actions = {
  saveToken({commit}, token) {
    commit(TYPE.SET_TOKEN, token)
  },
  saveLoginState({commit}, isLogin) {
    commit(TYPE.SET_LOGIN_STATE, isLogin)
  },
  clearMsg({commit}) {
    commit(TYPE.REMOVE_TOKEN)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {}
})
