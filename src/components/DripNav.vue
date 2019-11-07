<template>
  <b-navbar class="navbar" variant="white" toggleable="md">
    <b-container class="nav-cont">
      <b-navbar-brand to="/" class="logo">
        <DripDashLogo color="var(--accent)" />
      </b-navbar-brand>
      <BreadcrumbButton @toggle="switcher" v-bind:bc="this.bc" class="bc-btn" />

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
    <QuickSwitch :active="isSwitching" />
  </b-navbar>
</template>

<script>
import BreadcrumbButton from "@/components/BreadcrumbButton.vue";
import DripDashLogo from "@/components/DripDashLogo.vue";
import NavIcon from "@/components/NavIcon.vue";
import PowerButton from "@/components/PowerButton.vue";
import UpdateCandy from "@/components/UpdateCandy.vue";
import QuickSwitch from "@/components/QuickSwitch.vue";

export default {
  name: "DripNav",
  props: {
    updated: [Date, Number],
    updating: Boolean
  },
  computed: {
    showUpdater() {
      return !!this.updated;
    },
    bc() {
      return this.$store.state.nav.bc;
    }
  },
  data() {
    return {
      isSwitching: false
    };
  },
  methods: {
    switcher(e) {
      this.isSwitching = e;
    }
  },
  components: {
    BreadcrumbButton,
    DripDashLogo,
    NavIcon,
    PowerButton,
    UpdateCandy,
    QuickSwitch
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

.nav-cont {
  display: flex;
  flex-direction: row;
}

.navbar {
  flex-direction: column;
}
</style>
