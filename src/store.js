import Vue from "vue";
import Vuex from "vuex";
import authentication from "./stores/authentication.js";
console.log(authentication);

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authentication
  },
  strict: process.env.NODE_ENV !== "production"
});
