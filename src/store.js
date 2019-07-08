import Vue from "vue";
import Vuex from "vuex";
import authentication from "./stores/authentication.js";
import devices from "./stores/devices.js";
import device from "./stores/device.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authentication,
    devices: devices,
    device: device
  },
  strict: process.env.NODE_ENV !== "production"
});
