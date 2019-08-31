<template>
  <Glance title="Connection" :text="this.state.text" :state="this.state.icon"/>
</template>

<script>
import Glance from "@/components/glances/Glance.vue";

export default {
  name: "ConnectionGlance",
  components: {
    Glance
  },
  computed: {
    rssi() {
      return this.$store.getters["device/getLatest"]("rssi").field;
    },
    state() {
      if (this.rssi <= -75) {
        return {
          icon: "warn",
          text: "The Wi-Fi Signal to this device is poor."
        };
      } else {
        return {
          icon: "ok",
          text: ""
        };
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
