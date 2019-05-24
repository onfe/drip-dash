<template>
  <div class="btn-power">
    <font-awesome-icon icon="power-off" />
  </div>
</template>

<script>
export default {
  name: "PowerButton",
  props: {}
};
</script>

<style scoped lang="scss">
.btn-power {
  svg {
    color: var(--gray);
  }
}
</style>
