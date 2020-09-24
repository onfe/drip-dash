<template>
  <b-container>
    <b-row class="eq-height autospace">
      <b-col md="8">
        <router-link
          class="block-link"
          :to="{
            name: 'deviceDetail',
            params: { device: this.$route.params.id, detail: 'temperature' }
          }"
        >
          <RTTempCard class="block-card" />
        </router-link>
      </b-col>
      <!-- <b-col md="4">
        <AtAGlance class="block-card" />
      </b-col>
      <b-col cols="6" md="3">
        <router-link
          class="block-link"
          :to="{
            name: 'deviceDetail',
            params: { device: this.$route.params.id, detail: 'humidity' }
          }"
        >
          <RTStatCard
            class="block-card fifteen"
            field="humidity"
            title="Humidity"
            unit="%"
          />
        </router-link>
      </b-col>
      <b-col cols="6" md="3">
        <router-link
          class="block-link"
          :to="{
            name: 'deviceDetail',
            params: { device: this.$route.params.id, detail: 'light' }
          }"
        >
          <RTStatCard
            class="block-card fifteen"
            field="light"
            title="Light"
            unit="Lux"
          />
        </router-link>
      </b-col>
      <b-col md="6">
        <router-link
          class="block-link"
          :to="{
            name: 'deviceDetail',
            params: { device: this.$route.params.id, detail: 'water level' }
          }"
        >
          <RTWaterLevelCard class="fifteen" />
        </router-link>
      </b-col>
      <b-col md="8">
        <router-link
          class="block-link"
          :to="{
            name: 'deviceDetail',
            params: { device: this.$route.params.id, detail: 'beds' }
          }"
        >
          <BedStatusCard class="seventeen" />
        </router-link>
      </b-col>
      <b-col md="4">
        <ControlCard class="seventeen" />
      </b-col> -->
    </b-row>
  </b-container>
</template>

<script>
import RTTempCard from "@/components/chart/RTTemp.vue";
// import RTWaterLevelCard from "@/components/chart/RTWaterLevel.vue";
// import RTStatCard from "@/components/RTStat.vue";
// import AtAGlance from "@/components/glances/AtAGlanceCard.vue";
// import ControlCard from "@/components/ControlCard.vue";
// import BedStatusCard from "@/components/BedStatusCard.vue";

export default {
  name: "Dashboard",
  props: {},
  methods: {},
  data() {
    return {
      refreshInterval: ""
    };
  },
  components: {
    RTTempCard
    // RTStatCard,
    // RTWaterLevelCard,
    // AtAGlance,
    // BedStatusCard,
    // ControlCard
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

.block-link {
  color: inherit;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
}

.fifteen {
  height: 15em;
}

.seventeen {
  height: 17em;
}
</style>
