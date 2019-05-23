<template>
  <b-container>
    <b-navbar>
      <b-navbar-brand to="/">
        <DripDashLogo color="#0DB8B0" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <BreadcrumbButton />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <Updated />
          <!-- Left aligned nav items -->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <!-- Right aligned nav items -->
          <ViewButton />
          <SettingsButton />
          <PowerButton />
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>

<script>
import BreadcrumbButton from "@/components/BreadcrumbButton.vue";
import DripDashLogo from "@/components/DripDashLogo.vue";

export default {
  name: "DripNav",
  props: {},
  components: {
    BreadcrumbButton,
    DripDashLogo
  }
};
</script>
