<template>
  <a class="btn-icn">
    <font-awesome-icon v-if="isOK" class="state-icon ok" icon="check-circle" />
    <font-awesome-icon v-if="isKO" class="state-icon ko" icon="times-circle" />
    <font-awesome-icon
      v-if="!isKO && !isOK"
      class="state-icon unknown"
      :icon="['far', 'question-circle']"
    />
  </a>
</template>

<script>
export default {
  name: "TriStateIcon",
  props: {
    status: String
  },
  computed: {
    isOK: function() {
      return this.status == "ok";
    },
    isKO: function() {
      return this.status == "ko";
    }
  }
};
</script>

<style scoped lang="scss">
.state-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: bottom;
}

.ok {
  color: var(--success);
}

.unknown {
  color: var(--secondary);
}

.ko {
  color: var(--danger);
}
</style>
