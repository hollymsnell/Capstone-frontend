<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

<template>
  <div class="login">
    <form v-on:submit.prevent="submit()">
      <h1>Login</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label for="exampleInputEmail1">Email:</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="newSessionParams.email"
          placeholder="Enter email"
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="newSessionParams.password"
          placeholder="Password"
        />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<style>
.login {
  width: 500px;
  margin-left: 50px;
}
</style>
