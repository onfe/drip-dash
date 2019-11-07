<template>
  <div class="dashboard">
    <br />
    <DeviceList />
  </div>
</template>

<script>
import DeviceList from "@/components/DeviceList.vue";

export default {
  name: "dashboard",
  metaInfo: {
    title: "Dashboard"
  },
  components: {
    DeviceList
  },
  created() {
    this.$store.dispatch("nav/setBc", ["DripDash", "Home", "Summary"]);
  }
};
</script>
