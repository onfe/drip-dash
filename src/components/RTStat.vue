<template>
  <b-card :title="this.title" class="rtstat">
    <div class="wrap">
      <h1 class="display-3">
        {{this.stat.field}}
        <span class="lead"> {{this.unit}} </span>
      </h1>
    </div>
  </b-card>
</template>

<script>

export default {
  name: "RTStatCard",
  props: {
    field: String,
    title: String,
    unit: String
  },
  computed: {
    stat() {
      return this.$store.getters["device/getLatest"](this.field) || {};
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.rtstat {
  position: relative;
}

.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 2.5em;
}

</style>
