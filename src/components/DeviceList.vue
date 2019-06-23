<template>
  <b-container>
    <b-card title="Devices">
      <div
        class="looper"
        v-for="device in this.$store.state.devices.list"
        v-bind:id="device.progName"
        v-bind:key="device.progName"
      >
        <DeviceListItem :device="device" />
      </div>
    </b-card>
  </b-container>
</template>

<script>
import DeviceListItem from "@/components/DeviceListItem.vue";

export default {
  name: "DeviceList",
  components: {
    DeviceListItem
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
