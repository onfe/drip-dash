<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "dripdash",
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
    }

    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch("auth/logout");
        }
        throw err;
      });
    });
  }
};
</script>
