<template>
  <div class="dashboard">
    <DripNav />
    <br />
    <DripDash />
  </div>
</template>

<script>
import DripNav from "@/components/DripNav.vue";
import DripDash from "@/components/DripDash.vue";

export default {
  name: "dashboard",
  metaInfo: {
    title: "Dashboard"
  },
  components: {
    DripNav,
    DripDash
  }
};
</script>
