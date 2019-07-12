<template>
  <div class="dashboard">
    <DripNav
      v-bind:bc="['DripDash', 'Home', 'Summary']"
      :updated="this.$store.state.devices.updated"
      :updating="this.$store.state.devices.updating"
    />
    <br />
    <DeviceList />
  </div>
</template>

<script>
import DripNav from "@/components/DripNav.vue";
import DeviceList from "@/components/DeviceList.vue";

export default {
  name: "dashboard",
  metaInfo: {
    title: "Dashboard"
  },
  components: {
    DeviceList,
    DripNav
  }
};
</script>
