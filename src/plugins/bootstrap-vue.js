import Vue from "vue";

import {
  LayoutPlugin,
  CardPlugin,
  NavbarPlugin,
  PopoverPlugin,
  ButtonPlugin,
  FormInputPlugin,
  FormPlugin,
  FormGroupPlugin
} from "bootstrap-vue";

Vue.use(LayoutPlugin);
Vue.use(CardPlugin);
Vue.use(NavbarPlugin);
Vue.use(PopoverPlugin);
Vue.use(ButtonPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormPlugin);
Vue.use(FormGroupPlugin);

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
