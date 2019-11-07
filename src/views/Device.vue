<template>
  <div class="dashboard">
    <!-- <DripNav
      :updated="this.$store.state.device.updated"
      :updating="this.$store.state.device.updating"
    /> -->
    <span class="spacer"></span>
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "@/components/Dashboard.vue";

export default {
  name: "device",
  metaInfo: function() {
    return {
      title: this.$store.state.device.name
    };
  },
  computed: {
    deviceID: function() {
      return this.$route.params.id;
    },
    device: function() {
      return this.$store.state.device;
    }
  },
  created: function() {
    this.$store.dispatch("device/set", this.deviceID);
    this.$store.dispatch("device/update");
    this.$store.dispatch("nav/setBc", [
      "DripDash",
      "Device",
      this.$store.state.device.name
    ]);
  },
  components: {
    Dashboard
  }
};
</script>

<style scoped lang="scss">
.spacer {
  display: block;
  height: 30px;
}
</style>
