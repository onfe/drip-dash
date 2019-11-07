import Vue from "vue";
import Vuex from "vuex";
import authentication from "./stores/authentication.js";
import devices from "./stores/devices.js";
import device from "./stores/device.js";
import settings from "./stores/settings.js";
import nav from "./stores/nav.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authentication,
    devices: devices,
    device: device,
    settings: settings,
    nav: nav
  },
  strict: process.env.NODE_ENV !== "production"
});
