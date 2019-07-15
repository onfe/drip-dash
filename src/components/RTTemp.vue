<template>
  <b-card title="Temperature">
    <RTLineChart
      class="rtline"
      scale="Temperature (°C)"
      :fields="['waterTemp', 'airTemp']"
      :labels="['Water Temperature', 'Air Temperature']"
      :legend="true"
    />
  </b-card>
</template>

<script>
import RTLineChart from "@/components/chart/RTLineChart.vue";

export default {
  name: "RTTempCard",
  props: {},
  components: {
    RTLineChart
  }
};
</script>

<style lang="scss" scoped>
.rtline {
  position: relative;
  height: 20em;
}
</style>
