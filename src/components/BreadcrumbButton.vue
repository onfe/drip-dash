<template>
  <b-button class="bc-btn" variant="outline-light">
    <div class="bc-btn">
      <div class="bc-mini">
        {{ crumbs }}
      </div>
      <div class="bc-main">{{ text }}</div>
      <div class="bc-icn"><font-awesome-icon icon="angle-down" /></div>
    </div>
  </b-button>
</template>

<script>
export default {
  name: "BreadcrumbButton",
  props: {
    bc: Array
  },
  computed: {
    crumbs() {
      return this.bc.slice(0, -1).join(" › ");
    },
    text() {
      return this.bc[this.bc.length - 1];
    }
  }
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
  align-items: flex-end;
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
  min-width: 12rem;
}
</style>
