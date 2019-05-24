<template>
  <b-navbar variant="white">
    <b-container>
      <b-navbar-brand to="/">
        <DripDashLogo color="var(--accent)" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <BreadcrumbButton />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <Updated /> -->
          <!-- Left aligned nav items -->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <!-- Right aligned nav items -->
          <NavIcon icon="ellipsis-v" />
          <NavIcon icon="cog" />
          <NavIcon icon="power-off" />
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import BreadcrumbButton from "@/components/BreadcrumbButton.vue";
import DripDashLogo from "@/components/DripDashLogo.vue";
import NavIcon from "@/components/NavIcon.vue";

export default {
  name: "DripNav",
  props: {},
  components: {
    BreadcrumbButton,
    DripDashLogo,
    NavIcon
  }
};
</script>
