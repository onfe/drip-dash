import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import store from "./store";


Vue.use(Router);
Vue.use(store);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      // Lazy load when required
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/isAuthenticated"]) {
      // We need authentication, and we have it. continue.
      return next();
    }
    // We need authentication, and we don't have it. redirect.
    return next("/login");
  }
  // No authentication flag on this route. continue.
  return next();
});

export default router;
