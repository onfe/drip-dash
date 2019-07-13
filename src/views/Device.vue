<template>
  <div class="dashboard">
    <DripNav
      v-bind:bc="['DripDash', 'Device', `${this.device.name} Dashboard`]"
      :updated="this.$store.state.device.updated"
      :updating="this.$store.state.device.updating"
    />
    <br />
    <Dashboard />
  </div>
</template>

<script>
import DripNav from "@/components/DripNav.vue";
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
  },
  components: {
    DripNav,
    Dashboard
  }
};
</script>
