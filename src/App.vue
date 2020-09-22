<template>
  <div id="app">
    <DripNav />
    <router-view />
  </div>
</template>

<script>
import DripNav from "@/components/DripNav.vue";
import gql from "graphql-tag";

export default {
  name: "dripdash",
  components: {
    DripNav
  },
  metaInfo: {
    title: "Home",
    titleTemplate: "%s :: DripDash"
  },
  data() {
    return {
      self: {
        unloaded: true
      }
    };
  },
  mounted: function() {
    // if we still have a current (in-date) token, check it's valid.
    if (this.$store.getters["user/isAuthenticated"]) {
      this.$apollo.query({
        query: gql` query {
          self {
            id
          }
        }`
      }).then(pl => {
        if (pl.data.self) {
          // The token was accepted by the server. Refresh to get newer token.
          this.$store.dispatch("user/refresh");
        } else {
          // The token was invalidated by the server. Require log-in.
          this.$store.dispatch("user/logout");
        }
      });
    }
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
