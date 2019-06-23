<template>
  <b-container>
    <b-card>
      <div
        class="device"
        v-for="device in this.$store.state.devices.list"
        v-bind:id="device.progName"
        v-bind:key="device.progName"
      >
        <div class="left">
          <TriStateIcon :status="device.status" class="pad-right" />
          <span class="d-name">{{ device.name }}</span>
        </div>
        <div class="right">
          <TimeAgo
            v-if="!device.onlineNow"
            class="online"
            :time="device.online"
          />
          <span v-else class="online">Device online</span>
          <NavIcon icon="pencil-alt" />
          <NavIcon icon="ellipsis-v" />
        </div>
      </div>
    </b-card>
  </b-container>
</template>

<script>
import NavIcon from "@/components/NavIcon.vue";
import TriStateIcon from "@/components/TriStateIcon.vue";
import TimeAgo from "@/components/TimeAgo.vue";

export default {
  name: "DeviceList",
  components: {
    NavIcon,
    TriStateIcon,
    TimeAgo
  },
  created: function() {
    this.$store.dispatch("devices/get");

    setInterval(
      function() {
        this.$store.dispatch("devices/get");
      }.bind(this),
      1000
    );
  }
};
</script>

<style scoped lang="scss">
.device {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.online {
  font-size: 0.85em;
  margin: 0 0.5em;
  color: var(--secondary);
}

.right,
.left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.pad-right {
  padding-right: 1em;
}
</style>
