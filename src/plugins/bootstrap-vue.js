import Vue from "vue";

import {
  LayoutPlugin,
  CardPlugin,
  NavbarPlugin,
  ButtonPlugin,
  ButtonGroupPlugin,
  FormInputPlugin,
  FormPlugin,
  FormGroupPlugin,
  SpinnerPlugin,
  FormCheckboxPlugin,
  AlertPlugin
} from "bootstrap-vue";

Vue.use(LayoutPlugin);
Vue.use(CardPlugin);
Vue.use(NavbarPlugin);
Vue.use(ButtonPlugin);
Vue.use(ButtonGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormPlugin);
Vue.use(FormGroupPlugin);
Vue.use(SpinnerPlugin);
Vue.use(FormCheckboxPlugin);
Vue.use(AlertPlugin);

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
