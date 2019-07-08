<template>
  <b-navbar variant="white">
    <b-container class="px-3">
      <b-navbar-brand to="/">
        <DripDashLogo color="var(--accent)" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <BreadcrumbButton v-bind:bc="this.bc" />
      <UpdateCandy
        v-if="this.showUpdater"
        :updating="this.updating"
        :updated="this.updated"
      />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <Updated /> -->
          <!-- Left aligned nav items -->
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
    updated: Date,
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
