<template>
  <b-container>
    <b-row class="eq-height">
      <b-col cols="8">
        <RTWaterTemp class="block-card" />
      </b-col>
      <b-col>
        <b-card class="block-card" title="At a Glance"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RTWaterTemp from "@/components/RTWaterTemp.vue";

export default {
  name: "Dashboard",
  props: {},
  methods: {},
  components: {
    RTWaterTemp
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
