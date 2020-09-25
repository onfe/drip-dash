<script>
import { Line, mixins } from "vue-chartjs";
import ta from "time-ago";
const { reactiveData } = mixins;

export default {
  extends: Line,
  mixins: [reactiveData],
  props: {
    fields: Array,
    labels: Array,
    scale: String,
    data: Array
  },
  data() {
    return {
      chartData: { datasets: this.datasets }
    };
  },
  watch: {
    datasets: function(o, n) {
      this.chartData = { datasets: n };
    }
  },
  computed: {
    getLegend() {
      return {
        display: this.fields.length > 1
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
              },
              time: {
                unit: "minute",
                displayFormats: {
                  minute: "YYYY-MM-DDTHH:mm:ss.sssZ"
                },
                stepSize: 2
              },
              ticks: {
                callback: function(value) {
                  if (Date.now() - Date.parse(value) < 10000) {
                    return "now";
                  } else {
                    return ta.ago(value, true);
                  }
                }
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
      var sets = [];
      this.fields.forEach((field, i) => {
        var data = this.data.map(d => {
          return { x: d.timestamp, y: d[field] };
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
    console.log(this.chartData, this.options)
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style></style>
