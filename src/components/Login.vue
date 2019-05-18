<template>
  <div class="hello">
    <b-card title="Login">
      <b-form @submit="onSubmit" @reset="onReset">
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
        <b-button block variant="primary">Login</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
    }
  },
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
