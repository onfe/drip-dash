<template>
  <div id="power-ctrl">
    <NavIcon id="power-dropdown-btn" icon="power-off" />
    <b-popover
      target="power-dropdown-btn"
      triggers="click"
      :show.sync="popoverShow"
      placement="bottomleft"
      container="my-container"
      ref="popover"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <div>
        <font-awesome-icon icon="sign-out-alt" />
        <font-awesome-icon icon="sync-alt" />
        <font-awesome-icon icon="plug" />
      </div>
    </b-popover>
  </div>
</template>

<script>
import NavIcon from "@/components/NavIcon.vue";

export default {
  name: "DripDash",
  props: {},
  components: {
    NavIcon
  },
  methods: {
    onClose() {
      this.popoverShow = false;
    },
    onShow() {
      // This is called just before the popover is shown
    },
    onShown() {
      // Called just after the popover has been shown
    },
    onHidden() {
      // Called just after the popover has finished hiding
    }
  }
};
</script>
