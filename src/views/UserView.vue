<script>
import axios from "axios";
export default {
  data: function () {
    return {
      users: [],
    };
  },
  created: function () {
    this.indexUsers();
  },
  methods: {
    indexUsers: function () {
      axios.get("/users").then((response) => {
        console.log("users index", response.data);
        this.users = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>Patient List</h1>
  </div>
  <div v-for="user in users" v-bind:key="user.id">
    <h3>{{ user.name }}</h3>
    <div v-for="program in user.programs" v-bind:key="program.id">
      <router-link to="/exercise_programs">View Program</router-link>
    </div>
  </div>
</template>

<style></style>
