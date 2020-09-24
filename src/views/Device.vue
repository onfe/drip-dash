<template>
  <div class="dashboard">
    <span class="spacer"></span>
    <b-container>
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
    RTStat
  },
  data() {
    return {
      device: {
        latest: {}
      }
    }
  },
  apollo: {
    device: {
      query: gql`
        query($id: String!) {
          device(id: $id) {
            id
            name
            latest {
              humidity
              light
              airTemp
              waterTemp
              ph
            }
          }
        }
      `,
      variables() {
        return {
          id: this.$route.params.id
        }
      },
      pollInterval: 2000,
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
