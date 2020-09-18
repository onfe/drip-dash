import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/font-awesome-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/utils";
import VueMeta from "vue-meta";

Vue.config.productionTip = false;
Vue.use(VueMeta);

window._dripdash = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
