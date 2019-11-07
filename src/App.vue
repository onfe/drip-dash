<template>
  <div id="app">
    <DripNav />
    <router-view />
  </div>
</template>

<script>
const axios = require("axios");
import DripNav from "@/components/DripNav.vue";

export default {
  name: "dripdash",
  components: {
    DripNav
  },
  metaInfo: {
    title: "Home",
    titleTemplate: "%s :: DripDash"
  },
  created: function() {
    // if we're authenticated, set the header in axios.
    if (this.$store.getters["auth/isAuthenticated"]) {
      let token = this.$store.state.auth.token;
      console.log(`Loaded authorization token. (${token.substr(0, 4)}...)`);
      axios.defaults.headers.common["Authorization"] = token;
      this.$store.dispatch("auth/refresh");
    }

    var that = this;
    axios.interceptors.response.use(undefined, function(error) {
      var err = error.response;
      return new Promise(function() {
        if (
          err &&
          err.status === 401 &&
          err.config &&
          !err.config.__isRetryRequest
        ) {
          // if you ever get an unauthorized 401 response, logout the user.
          that.$store.dispatch("auth/logout").then(() => {
            that.$router.push("/login");
          });
        }
        throw err;
      });
    });
  }
};
</script>

<style lang="scss">
// unscoped styles to modify html, body.
body {
  min-height: 100%;
  background-color: var(--light);
}

html {
  height: 100%;
}

:root {
  --accent: #0db8b0;
  --accent-darker: #009f97;
}
</style>
