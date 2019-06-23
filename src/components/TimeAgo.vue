<template>
  <span>Last online {{ timeText }}</span>
</template>

<script>
import ta from "time-ago";

export default {
  name: "TimeAgo",
  props: {
    time: Date
  },
  computed: {
    timeText: function() {
      console.log(this.time);
      return ta.ago(this.time);
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
