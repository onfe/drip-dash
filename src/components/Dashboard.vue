<template>
  <b-container>
    <b-row class="eq-height">
      <b-col cols="8">
        <RTTempCard class="block-card" />
      </b-col>
      <b-col>
        <b-card class="block-card" title="At a Glance">
          Everything is a-ok!
        </b-card>
      </b-col>
    </b-row>
    <br />
    <b-row class="eq-height">
      <b-col cols="3">
        <RTStatCard class="block-card" field="humidity" title="Humidity" unit="%"/>
      </b-col>
      <b-col cols="3">
        <RTStatCard class="block-card" field="light" title="Light" unit="Lux"/>
      </b-col>
      <b-col cols="6">
        <RTWaterLevelCard />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RTTempCard from "@/components/chart/RTTemp.vue";
import RTWaterLevelCard from "@/components/chart/RTWaterLevel.vue";
import RTStatCard from "@/components/RTStat.vue";

export default {
  name: "Dashboard",
  props: {},
  methods: {},
  created: function() {
    this.$store.dispatch("device/update");
    const that = this;
    this.refreshInterval = setInterval(() => {
      that.$store.dispatch("device/update");
    }, this.$store.getters["settings/apiIntervalms"]);
  },
  components: {
    RTTempCard,
    RTStatCard,
    RTWaterLevelCard
  }
};
</script>

<style lang="scss">
.eq-height {
  display: flex;
}

.block-card {
  width: 100%;
  height: 100%;
}
</style>
