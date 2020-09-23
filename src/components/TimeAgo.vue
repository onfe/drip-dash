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
      updateInter: this.$store.getters["settings/uiIntervalms"]
    };
  },
  methods: {
    update() {
      if (Date.now() - this.t < 5000) {
        this.timeText = "just now";
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
