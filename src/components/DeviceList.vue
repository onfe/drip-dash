<template>
  <b-container>
    <b-card>
      <div v-for="device in this.$store.state.devices.devices">{{ device.progName }}</div>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "DeviceList",
  created: function() {
    this.$store.dispatch("devices/get");
  }
};
</script>
