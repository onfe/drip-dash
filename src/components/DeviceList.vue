<template>
  <b-container>
    <b-card title="Devices">
      <div
        class="looper"
        v-for="device in this.$store.state.devices.list"
        v-bind:id="device.progName"
        v-bind:key="device.progName"
      >
        <DeviceListItem :device="device" />
      </div>
    </b-card>
  </b-container>
</template>

<script>
import DeviceListItem from "@/components/DeviceListItem.vue";

export default {
  name: "DeviceList",
  components: {
    DeviceListItem
  },
  created: function() {
    this.$store.dispatch("devices/get");

    setInterval(
      function() {
        this.$store.dispatch("devices/get");
      }.bind(this),
      1000
    );
  }
};
</script>
