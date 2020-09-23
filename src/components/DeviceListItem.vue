<template>
  <ListItem :to="{ name: 'device', params: { id: device.id } }">
    <div class="left">
      <TriStateIcon status="ok" class="tristate" />
      <span class="d-name">{{ device.name || device.id }}</span>
      <span v-if="device.name" class="d-id small"> ({{ device.name }}) </span>
    </div>
    <div class="right">
      <TimeAgo
        v-if="!device.onlineNow"
        class="online small"
        :time="device.online"
        text="Online"
      />
      <span v-else class="online small">Device online</span>
      <Renamer
        class="rname-sa"
        :startText="device.name || device.id"
        @save="rename"
      />
      <NavIcon icon="ellipsis-v" />
      <!-- TODO add renamer to dropdown under sm breakpoint -->
    </div>
  </ListItem>
</template>

<script>
import NavIcon from "@/components/NavIcon.vue";
import TriStateIcon from "@/components/StateIcon.vue";
import TimeAgo from "@/components/TimeAgo.vue";
import Renamer from "@/components/Renamer.vue";
import ListItem from "@/components/ListItem.vue";

export default {
  name: "DeviceListItem",
  components: {
    ListItem,
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
  margin-right: 1rem;
}
</style>
