<template>
  <b-card title="Water Temperature">
    <RTLineChart
      :chartData="dataset"
    />
  </b-card>
</template>

<script>
import RTLineChart from "@/components/chart/RTLineChart.vue";

export default {
  name: "RTWaterTempCard",
  props: {},
  computed: {
    dataset () {
      if (this.$store.state.device.data.length > 0) {
        return {
          datasets: [
            {
              borderColor: 'rgba(13, 184, 176, 1)',
              backgroundColor: 'rgba(13, 184, 176, 0.3)',
              data: this.$store.getters['device/getData']('waterTemp', 60).map(d => {
                console.log({x: d.timestamp, y: d.field})
                return {x: d.timestamp, y: d.field};
              })
            }
          ]
        }
      } else {
        return {}
      }
    }
  },
  components: {
    RTLineChart
  }
};
</script>
