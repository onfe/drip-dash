<template>
  <div class="dashboard">
    <DripNav v-bind:bc="['DripDash', 'Home', 'Summary']" />
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
