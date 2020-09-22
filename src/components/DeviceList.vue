<template>
  <b-container>
    <b-card title="Devices">
      <div
        class="looper"
        v-for="device in this.self.devices"
        v-bind:id="device.name"
        v-bind:key="device.name"
      >
        <DeviceListItem :device="device" />
      </div>
    </b-card>
  </b-container>
</template>

<script>
import DeviceListItem from "@/components/DeviceListItem.vue";
import gql from "graphql-tag";

export default {
  name: "DeviceList",
  components: {
    DeviceListItem
  },
  data() {
    return {
      refreshInterval: "",
      self: {}
    };
  },
  apollo: {
    self: gql`
    query {
      self {
        id
        devices {
          id
          name
          nickname
        }
      }
    }
    `
  }
};
</script>
