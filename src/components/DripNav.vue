<template>
  <b-navbar variant="white" toggleable="md">
    <b-container>
      <b-navbar-brand to="/" class="logo">
        <DripDashLogo color="var(--accent)" />
      </b-navbar-brand>
      <BreadcrumbButton v-bind:bc="this.bc" class="bc-btn" />

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <UpdateCandy
            v-if="this.showUpdater"
            :updating="this.updating"
            :updated="this.updated"
          />
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <!-- Right aligned nav items -->
          <NavIcon icon="ellipsis-v" />
          <NavIcon icon="cog" />
          <PowerButton />
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import BreadcrumbButton from "@/components/BreadcrumbButton.vue";
import DripDashLogo from "@/components/DripDashLogo.vue";
import NavIcon from "@/components/NavIcon.vue";
import PowerButton from "@/components/PowerButton.vue";
import UpdateCandy from "@/components/UpdateCandy.vue";

export default {
  name: "DripNav",
  props: {
    bc: Array,
    updated: [Date, Number],
    updating: Boolean
  },
  computed: {
    showUpdater: function() {
      return !!this.updated;
    }
  },
  components: {
    BreadcrumbButton,
    DripDashLogo,
    NavIcon,
    PowerButton,
    UpdateCandy
  }
};
</script>

<style scoped lang="scss">
.bc-btn {
  flex-grow: 1;
  margin: 0 0.5em;
}

.logo {
  margin-right: 0;
}

@include md {
  .bc-btn {
    flex-grow: 0;
    margin: 0;
  }

  .logo {
    margin-right: 1rem;
  }
}
</style>
