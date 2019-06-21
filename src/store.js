import Vue from "vue";
import Vuex from "vuex";
import authentication from "./stores/authentication.js";
import devices from "./stores/devices.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authentication,
    devices: devices
  },
  strict: process.env.NODE_ENV !== "production"
});
