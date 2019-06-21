<template>
  <div class="hello">
    <b-card title="Login">
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
        <b-button type="submit" block variant="primary">Login</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Login",
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
<style scoped lang="scss"></style>
