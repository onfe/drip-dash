<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveData } = mixins;

export default {
  extends: Line,
  mixins: [reactiveData],
  props: {
    fields: Array,
    labels: Array,
    interval: Number,
    legend: Boolean,
    scale: String
  },
  data() {
    return {
      chartData: {datasets: this.datasets}
    };
  },
  watch: {
    datasets: function(o, n) {
      this.chartData = {datasets: n}
    }
  },
  computed: {
    getLegend() {
      console.log(typeof this.legend)
      var disp = this.legend
      return {
        display: disp
      };
    },
    getScaleLabel() {
      return {
        display: this.scale ? this.scale : false,
        labelString: this.scale
      };
    },
    options() {
      return {
        //Chart.js options
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true
              },
              scaleLabel: this.getScaleLabel
            }
          ],
          xAxes: [
            {
              type: "time",
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: this.getLegend,
        responsive: true,
        maintainAspectRatio: false
      };
    },
    datasets() {
      console.log("exec");
      var sets = [];
      this.fields.forEach((field, i) => {
        var data = this.$store.getters["device/getData"](field, this.interval).map(
          d => {
            return { x: d.timestamp, y: d.field };
          });

        var label = this.labels[i] || "";

        var borderColor = this.$store.state.settings.chartColors[i % 5];

        sets.push({
          borderColor: borderColor,
          backgroundColor: borderColor + "4D",
          label: label,
          data: data
        });

      });

      return sets;
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style></style>
