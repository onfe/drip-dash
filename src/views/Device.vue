<template>
  <div class="dashboard">
    <span class="spacer"></span>
    <b-container>
      <AtAGlance
        :glances="this.device.glances"
      />
      <br />
      <b-card>
        <RTLineChart
          :fields="['waterTemp', 'airTemp']"
          :labels="['Water Temperature', 'Air Temperature']"
          scale="Temperature (°C)"
          :data="this.device.data"
        />
      </b-card>
      <br />
      <RTStat 
        :data="this.device.latest.humidity"
        title="Humidity"
        unit="%"
      />
      <br />
      <RTStat 
        :data="this.device.latest.light"
        title="Light"
        unit="lux"
      />
      <br />
      <RTStat 
        :data="this.device.latest.airTemp"
        title="Air Temperature"
        unit="°C"
      />
      <br />
      <RTStat 
        :data="this.device.latest.waterTemp"
        title="Water Temperature"
        unit="°C"
      />
      <br />
      <RTStat 
        :data="this.device.latest.light"
        title="pH"
        unit=""
      />
    </b-container>
  </div>
</template>

<script>
// import Dashboard from "@/components/Dashboard.vue";
import RTStat from "@/components/RTStat.vue";
import AtAGlance from "@/components/glances/AtAGlanceCard.vue";
import RTLineChart from "@/components/charts/RTLineChart.vue";
import gql from "graphql-tag";

export default {
  name: "device",
  metaInfo: function() {
    return {
      title: this.device.name || this.device.id
    };
  },
  components: {
    // Dashboard
    RTStat,
    AtAGlance,
    RTLineChart
  },
  data() {
    return {
      device: {
        latest: {},
        glances: [],
        data: []
      }
    }
  },
  apollo: {
    device: {
      query: gql`
        query($id: String!, $from: DateTime!) {
          device(id: $id) {
            id
            name
            glances {
              title
              text
              status
            }
            latest {
              humidity
              light
              airTemp
              waterTemp
              ph
            },
            data(from: $from) {
              id
              timestamp
              waterTemp
              airTemp
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id,
          from: new Date(Date.now() - 1000 * 60 * 5)
        }
      },
      pollInterval: 2000,
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
.spacer {
  display: block;
  height: 30px;
}
</style>
