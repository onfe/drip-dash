<template>
  <div class="login-wrap">
    <b-card class="login">
      <h2><DripDashLogo />&nbsp;DripDash</h2>
      <b-form @submit.prevent="login" @reset.prevent="reset">
        <b-form-group>
          <b-form-input
            id="input-1"
            v-model="form.username"
            required
            placeholder="Username"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" block class="login-btn" variant="primary">
          Login
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import DripDashLogo from "@/components/DripDashLogo.vue";
export default {
  name: "Login",
  components: {
    DripDashLogo
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      const { username, password } = this.form;
      this.$store.dispatch("auth/request", { username, password }).then(() => {
        this.$router.push({ path: "/" });
      });
    },
    reset() {
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  width: 20em;
  text-align: center;
}

h2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5em;
}

.login-btn {
  background-color: var(--accent) !important;
  border-color: var(--accent) !important;

  &:hover {
    background-color: var(--accent-darker) !important;
    border-color: var(--accent-darker) !important;
  }
}

.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
