<template>
  <div class="dashboard">
    <h1>This is a protected dashboard page</h1>
    <b-button @click="onClick">Attempt secure API</b-button>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  metaInfo: {
    title: "Dashboard"
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
