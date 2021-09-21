import axios from 'axios';

export default {
  namespaced: true,
  state: {
    loggedInUser:
      localStorage.getItem('userInfo') !== null
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
  },
  getters: {
    loggedInUser: state => state.loggedInUser,
  },
  mutations: {
    setUser(state, data) {
      state.loggedInUser = data;
    },
    setLogout(state) {
      state.loggedInUser = null;
      localStorage.clear();
    },
  },
  actions: {
    login({commit}, data) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        commit("setUser", data);
    },
    setUser({commit}, data) {
        commit('setUser', data);
    },
    signUserUp({commit}, data) {
      
    },
    signOut({commit}) {
        commit('setLogout');
    },
  }
};
