<template>
  <router-link
    class="device"
    :to="{ name: 'device', params: { id: device.progName } }"
  >
    <div class="left">
      <TriStateIcon :status="device.status" class="tristate" />
      <span class="d-name">{{ device.name }}</span>
      <span v-if="device.name != device.progName" class="d-id small">
        ({{ device.progName }})
      </span>
    </div>
    <div class="right">
      <TimeAgo
        v-if="!device.onlineNow"
        class="online small"
        :time="device.online"
        text="Online"
      />
      <span v-else class="online small">Device online</span>
      <Renamer class="rname-sa" :startText="device.name" @save="rename" />
      <NavIcon icon="ellipsis-v" />
      <!-- TODO add renamer to dropdown under sm breakpoint -->
    </div>
  </router-link>
</template>

<script>
import NavIcon from "@/components/NavIcon.vue";
import TriStateIcon from "@/components/StateIcon.vue";
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
      let pl = { id: this.device.progName, name: name };
      this.$store.dispatch("devices/rename", pl);
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
  text-decoration: none;
  border-radius: 0.5em;
  transition: all 0.15s ease-in-out;
  padding: 0 0.5em;
  min-height: 3.5em;

  &:hover {
    background: var(--light);
  }
}

.d-id {
  display: none;

  @include md {
    display: inline;
  }
}

.small {
  font-size: 0.85em;
  margin: 0 0.5em;
  color: var(--secondary);
}

.rname-sa {
  display: none;

  @include sm {
    display: flex;
  }
}

.right,
.left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.left {
  color: var(--dark);
}

.tristate {
  padding-right: 1em;
}
</style>
