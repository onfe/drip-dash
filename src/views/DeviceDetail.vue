<template>
  <div class="dashboard">
    <DripNav
      v-bind:bc="[
        'DripDash',
        'Device',
        this.device.name,
        this.$utils.toTitleCase(this.detail)
      ]"
      :updated="this.$store.state.device.updated"
      :updating="this.$store.state.device.updating"
    />
    <span class="spacer"></span>
    TODO: Make the detail page
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
      return this.$route.params.id;
    },
    device: function() {
      return this.$store.state.device;
    },
    detail: function() {
      return this.$route.params.detail;
    }
  },
  created: function() {
    this.$store.dispatch("device/set", this.deviceID);
    this.$store.dispatch("device/update");
  },
  components: {
    DripNav
  }
};
</script>

<style scoped lang="scss">
.spacer {
  display: block;
  height: 30px;
}
</style>
