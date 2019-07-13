<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: { //Chart.js options
        scales: {
          yAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              suggestedMin: 20,
              suggestedMax: 35
            },
            scaleLabel: {
              display: true,
              labelString: "Water Temperature (°C)"
            }
          }],
          xAxes: [ {
            type: "time",
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style></style>
