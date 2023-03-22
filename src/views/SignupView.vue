<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Name:</label>
          <input type="text" class="form-control" v-model="newUserParams.name" placeholder="Name" />
        </div>
        <div class="form-group col-md-6">
          <label>Age:</label>
          <input type="integer" class="form-control" v-model="newUserParams.age" placeholder="Age" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Email:</label>
          <input type="email" class="form-control" id="inputEmail4" v-model="newUserParams.email" placeholder="Email" />
        </div>
        <div class="form-group col-md-6">
          <label>Password:</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword4"
            v-model="newUserParams.password"
            placeholder="Password"
          />
        </div>
        <div class="form-group col-md-6">
          <label>Password confirmation:</label>
          <input
            type="password"
            class="form-control"
            v-model="newUserParams.password_confirmation"
            placeholder="Password Confirmation"
          />
        </div>
        <div class="form-group col-md-6">
          <label>Profile Picture:</label>
          <input type="text" class="form-control" v-model="newUserParams.profile_pic" placeholder="Profile Pic" />
        </div>
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>
