<template>
  <div class="dashboard">
    <DripNav />
    <DripDash />
    <h1>This is a protected dashboard page</h1>
    <b-button @click="onClick">Attempt secure API</b-button>
  </div>
</template>

<script>
import DripNav from "@/components/DripNav.vue";
import DripDash from "@/components/DripDash.vue";

export default {
  name: "dashboard",
  metaInfo: {
    title: "Dashboard"
  },
  components: {
    DripNav,
    DripDash
  },
  methods: {
    onClick() {
      console.log("ohno");
      const axios = require("axios");
      axios({ url: "api/private/test", data: {}, method: "GET" })
        .then(resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
