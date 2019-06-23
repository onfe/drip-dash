<template>
  <b-navbar variant="white">
    <b-container class="px-3">
      <b-navbar-brand to="/">
        <DripDashLogo color="var(--accent)" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <BreadcrumbButton v-bind:bc="this.bc" />

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

export default {
  name: "DripNav",
  props: {
    bc: Array
  },
  components: {
    BreadcrumbButton,
    DripDashLogo,
    NavIcon,
    PowerButton
  }
};
</script>
