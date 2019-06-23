<template>
  <div id="power-ctrl">
    <NavIcon id="power-menu-btn" icon="power-off" />
    <b-popover
      target="power-menu-btn"
      triggers="click"
      placement="bottomleft"
      container="my-container"
      ref="popover"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <div class="power-menu">
        <b-button
          v-on:click="signOut"
          class="pm-option"
          block
          variant="outline-secondary"
        >
          <font-awesome-icon icon="sign-out-alt" /> Sign Out
        </b-button>
        <b-button class="pm-option" block variant="outline-secondary">
          <font-awesome-icon icon="sync-alt" /> Restart Elf
        </b-button>
        <b-button class="pm-option" block variant="outline-secondary">
          <font-awesome-icon icon="plug" /> Shutdown Elf
        </b-button>
      </div>
    </b-popover>
  </div>
</template>

<script>
import NavIcon from "@/components/NavIcon.vue";

export default {
  name: "PowerButton",
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
    },
    signOut() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped lang="scss">
.pm-option {
  text-align: left;
}
</style>
