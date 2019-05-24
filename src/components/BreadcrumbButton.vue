<template>
  <b-button class="bc-btn" variant="outline-light">
    <div class="bc-btn">
      <div class="bc-mini">DripDash › Devices</div>
      <div class="bc-main">Jupiter Dashboard</div>
      <div class="bc-icn"><font-awesome-icon icon="angle-down" /></div>
    </div>
  </b-button>
</template>

<script>
export default {
  name: "BreadcrumbButton",
  props: {}
};
</script>

<style scoped lang="scss">
.bc-mini {
  padding: 0;
  margin: 0;
  font-size: 0.7em;
  color: var(--gray);
  grid-area: crumb;
}

.bc-main {
  padding: 0;
  margin: 0;
  font-size: 1.25em;
  color: var(--dark);
  grid-area: main;
}

.bc-icn {
  grid-area: icon;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 8px;

  svg {
    color: var(--dark);
  }
}

.bc-btn {
  display: grid;
  grid-template-areas: "crumb icon" "main icon";
  padding: 0 4px;
  text-align: left;
}
</style>
