<template>
  <div class="device">
    <router-link
      class="left"
      :to="{ name: 'device', params: { deviceName: device.name } }"
    >
      <TriStateIcon :status="device.status" class="pad-right" />
      <span class="d-name">{{ device.name }}</span>
      <span v-if="device.name != device.progName" class="d-id small"
        >({{ device.progName }})</span
      >
    </router-link>
    <div class="right">
      <TimeAgo
        v-if="!device.onlineNow"
        class="online small"
        :time="device.online"
      />
      <span v-else class="online small">Device online</span>
      <Renamer :startText="device.name" @save="rename" />
      <NavIcon icon="ellipsis-v" />
    </div>
  </div>
</template>

<script>
import NavIcon from "@/components/NavIcon.vue";
import TriStateIcon from "@/components/TriStateIcon.vue";
import TimeAgo from "@/components/TimeAgo.vue";
import Renamer from "@/components/Renamer.vue";

export default {
  name: "DeviceListItem",
  components: {
    NavIcon,
    TriStateIcon,
    TimeAgo,
    Renamer
  },
  props: {
    device: Object
  },
  methods: {
    rename: function(name) {
      console.log(name);
      const data = { id: this.device.progName, name: name };
      this.$store.dispatch("devices/rename", data);
    }
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

.small {
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
