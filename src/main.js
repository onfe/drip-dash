import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import "./plugins/font-awesome-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueMeta from "vue-meta";

Vue.config.productionTip = false;
Vue.use(VueMeta);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
