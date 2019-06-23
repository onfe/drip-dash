<template>
  <div class="dashboard">
    <DripNav v-bind:bc="['DripDash', 'Device', this.device]" />
  </div>
</template>

<script>
import DripNav from "@/components/DripNav.vue";

export default {
  name: "device",
  metaInfo: function() {
    return {
      title: this.device
    };
  },
  computed: {
    device: function() {
      return this.$route.params.deviceName;
    }
  },
  components: {
    DripNav
  }
};
</script>
