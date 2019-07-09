<template>
  <span>{{ foreward }} {{ timeText }}</span>
</template>

<script>
import ta from "time-ago";

export default {
  name: "TimeAgo",
  props: {
    time: Date,
    text: String,
    short: Boolean,
    dynamic: Boolean
  },
  data: function() {
    return {
      t: this.time,
      timeText: "",
      updateInter: this.interval || 5000
    };
  },
  methods: {
    update() {
      if (Date.now() - this.t < 1000) {
        this.timeText = "now";
      } else {
        this.timeText = ta.ago(this.t);
      }
    }
  },
  computed: {
    foreward: function() {
      return this.text || "Updated";
    }
  },
  mounted() {
    this.update();
    if (this.dynamic) {
      setInterval(() => {
        this.update();
      }, this.updateInter);
    }
  }
};
</script>
