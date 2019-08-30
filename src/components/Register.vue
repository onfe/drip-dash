<template>
  <div class="login-wrap">
    <b-card class="register">
      <h2><DripDashLogo />&nbsp;DripDash</h2>
      <p>
        Welcome to DripDash, your new aquaponics dashboard. <br />
        Let's get you registered. It'll only take a moment.
      </p>
      <b-form @submit.prevent="register" @reset.prevent="reset">
        <b-form-group>
          <b-form-input
            id="input-1"
            v-model="form.username"
            required
            placeholder="Username"
          ></b-form-input>
        </b-form-group>
        <p class="small">
          Passwords with upper and lowercase characters, numbers and symbols are
          typically more secure.
        </p>
        <b-form-group>
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="Password"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input
            id="input-3"
            v-model="form.passwordConf"
            type="password"
            required
            placeholder="Confirm Password"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" block class="login-btn" variant="primary">
          Register
        </b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import DripDashLogo from "@/components/DripDashLogo.vue";
export default {
  name: "Register",
  components: {
    DripDashLogo
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        passwordConf: ""
      }
    };
  },
  methods: {
    register() {
      const { username, password, passwordConf } = this.form;
      this.$store
        .dispatch("auth/create", { username, password, passwordConf })
        .then(() => {
          this.$router.push({ path: "/" });
        });
    },
    reset() {
      // Reset our form values
      this.form.username = "";
      this.form.password = "";
      this.form.passwordconf;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.register {
  width: 28em;
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

.small {
  font-size: 0.85em;
  color: var(--secondary);
}
</style>
