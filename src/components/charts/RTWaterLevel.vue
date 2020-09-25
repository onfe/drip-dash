<template>
  <b-card title="Water Levels">
    <RTLineChart
      class="rtline"
      scale="Level (cm)"
      :fields="[
        ['beds', 0, 'level'],
        ['beds', 1, 'level'],
        ['beds', 2, 'level']
      ]"
      :labels="['Bed 1', 'Bed 2', 'Bed 3']"
      :legend="true"
      :interval="60"
    />
  </b-card>
</template>

<script>
import RTLineChart from "@/components/chart/RTLineChart.vue";

export default {
  name: "RTWaterLevelCard",
  props: {},
  components: {
    RTLineChart
  }
};
</script>

<style lang="scss" scoped>
.rtline {
  position: relative;
  height: 10em;
}
</style>
