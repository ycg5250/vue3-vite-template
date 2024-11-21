import { createStore } from 'vuex';

export default createStore({
  state: {
    isDarkMode: false,
  },
  mutations: {
    setDarkMode(state, payload) {
      state.isDarkMode = payload;
    },
  },
  actions: {},
  getters: {
    isDarkMode(state) {
      return state.isDarkMode;
    },
  },
  modules: {},
});
