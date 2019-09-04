<template>
  <b-container>
    <b-row class="eq-height autospace">
      <b-col md="8">
        <RTTempCard class="block-card" />
      </b-col>
      <b-col md="4">
        <AtAGlance class="block-card"/>
      </b-col>
      <b-col cols="6" md="3">
        <RTStatCard
          class="block-card fix"
          field="humidity"
          title="Humidity"
          unit="%"
        />
      </b-col>
      <b-col cols="6" md="3">
        <RTStatCard class="block-card fix" field="light" title="Light" unit="Lux" />
      </b-col>
      <b-col md="6">
        <RTWaterLevelCard class="wl"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RTTempCard from "@/components/chart/RTTemp.vue";
import RTWaterLevelCard from "@/components/chart/RTWaterLevel.vue";
import RTStatCard from "@/components/RTStat.vue";
import AtAGlance from "@/components/glances/AtAGlanceCard.vue";

export default {
  name: "Dashboard",
  props: {},
  methods: {},
  data() {
    return {
      refreshInterval: ""
    };
  },
  created: function() {
    this.$store.dispatch("device/update");
    const that = this;
    this.refreshInterval = setInterval(() => {
      that.$store.dispatch("device/update");
    }, this.$store.getters["settings/apiIntervalms"]);
  },
  beforeDestroy: function() {
    clearInterval(this.refreshInterval);
  },
  components: {
    RTTempCard,
    RTStatCard,
    RTWaterLevelCard,
    AtAGlance
  }
};
</script>

<style lang="scss">
.eq-height {
  display: flex;
}

.autospace > [class*="col"] {
  margin-bottom: 15px;

  @include sm {
    margin-bottom: 30px;
  }
}

.block-card {
  width: 100%;
  height: 100%;
}

.fix {
  height: 16em;
}

.wl {
  height: 15em;
}
</style>
