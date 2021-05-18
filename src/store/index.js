import Vue from "vue";
import Vuex from "vuex";
import RegisteredModules from "./Register";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { 
    MiniDrawer: true,
  },
  mutations: {
    SetMiniDrawer(state, value) {
      state.MiniDrawer = value
    },
  },
  actions: {},
  modules: {
    ...RegisteredModules
  },
});
