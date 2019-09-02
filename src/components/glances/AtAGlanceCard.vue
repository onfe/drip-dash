<template>
  <b-card title="At a Glance">
    <div class="glance" v-for="glance in this.$store.state.device.glances">
      <Glance :title="glance.title" :text="glance.text" :state="glance.state"/>
    </div>
  </b-card>
</template>

<script>
import Glance from "@/components/glances/Glance.vue";

export default {
  name: "AtAGlanceCard",
  components: {
    Glance
  }
}
</script>

<style lang="scss" scoped>
.glance {
  padding-bottom: 0.5em;
}
</style>
