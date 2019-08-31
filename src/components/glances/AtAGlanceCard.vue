<template>
  <b-card title="At a Glance">
    <ConnectionGlance />
  </b-card>
</template>

<script>
import ConnectionGlance from "@/components/glances/ConnectionGlance.vue";

export default {
  name: "AtAGlanceCard",
  components: {
    ConnectionGlance
  }
}
</script>

<style lang="scss" scoped>
</style>
