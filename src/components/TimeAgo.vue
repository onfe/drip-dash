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
