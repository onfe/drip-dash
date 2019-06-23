<template>
  <b-container>
    <b-card title="Devices">
      <div
        class="device"
        v-for="device in this.$store.state.devices.list"
        v-bind:id="device.progName"
        v-bind:key="device.progName"
      >
        <router-link
          class="left"
          :to="{ name: 'device', params: { deviceName: device.name } }"
        >
          <TriStateIcon :status="device.status" class="pad-right" />
          <span class="d-name">{{ device.name }}</span>
        </router-link>
        <div class="right">
          <TimeAgo
            v-if="!device.onlineNow"
            class="online"
            :time="device.online"
          />
          <span v-else class="online">Device online</span>
          <Renamer :startText="device.name" @save="rename"/>
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
import Renamer from "@/components/Renamer.vue";

export default {
  name: "DeviceList",
  components: {
    NavIcon,
    TriStateIcon,
    TimeAgo,
    Renamer
  },
  methods: {
    rename: function(e) {
      console.log(e);
    }
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
  margin-left: -0.5em;
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

.left {
  text-decoration: none;
  color: var(--dark);
  border-radius: 0.5em;
  padding: 0.5em;
  transition: all 0.15s ease-in-out;

  &:hover {
    background: var(--light);
  }
}

.pad-right {
  padding-right: 1em;
}
</style>
