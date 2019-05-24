<template>
  <b-container>
    DripDash.vue
    <h1>This is a protected dashboard page</h1>
    <b-button @click="onClick">Attempt secure API</b-button>
  </b-container>
</template>

<script>
export default {
  name: "DripDash",
  props: {},
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
