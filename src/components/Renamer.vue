<template>
  <div v-bind:class="{ expanded: this.expanded }" class="cont">
    <NavIcon @click="toggle" :icon="this.mainIcon" />
    <span v-bind:class="{ expanded: this.expanded }" class="renamer">
      <b-form-input v-model="text" class="renamer-input" placeholder="Rename" ref="name">
      </b-form-input>
      <NavIcon v-if="this.expanded" @click="exit" icon="times" />
    </span>
    <!-- <NavIcon v-if="this.expanded" @click="save" icon="save" /> -->
  </div>
</template>

<script>
import NavIcon from "@/components/NavIcon.vue";

export default {
  name: "Renamer",
  props: {
    startText: String
  },
  components: {
    NavIcon
  },
  computed: {
    mainIcon: function() {
      return !this.expanded ? "pencil-alt" : "save";
    }
  },
  data() {
    return {
      expanded: false,
      text: this.startText
    };
  },
  methods: {
    toggle: function() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.$refs.name.$el.focus();
      } else {
        // save
        this.$emit("save", this.text);
      }
    },
    exit: function() {
      this.expanded = false;
    }
  }
};
</script>

<style scoped lang="scss">
.renamer {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  width: 1px;
  overflow: hidden;
  transition: all 0.25s ease-in-out;

  &.expanded {
    width: 12.4em;
  }
}

.cont {
  display: flex;
  padding: 2px;
  flex-direction: row;
  align-items: center;
  transition: all 0.25s ease-in-out;
  border-radius: 0.25em;
  border: 1px solid transparent;

  &.expanded {
    border-color: #ced4da;
    background: var(--light);
  }
}

.renamer-input {
  font-size: 0.85em;
  border: 0;
  width: 12em;
  background: transparent;

  &:focus,
  :active {
    outline-color: transparent !important;
    outline-style: none !important;
    outline: none !important;
    box-shadow: none;
  }
}
</style>
