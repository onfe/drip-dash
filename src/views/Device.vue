<template>
  <div class="dashboard">
    <DripNav
      v-bind:bc="['DripDash', 'Device', `${this.device.name} Dashboard`]"
    />
  </div>
</template>

<script>
import DripNav from "@/components/DripNav.vue";

export default {
  name: "device",
  metaInfo: function() {
    return {
      title: this.$store.state.device.name
    };
  },
  computed: {
    deviceID: function() {
      return this.$route.params.deviceName;
    },
    device: function() {
      return this.$store.state.device;
    }
  },
  created: function() {
    this.$store.dispatch("device/set", this.deviceID);
  },
  components: {
    DripNav
  }
};
</script>
