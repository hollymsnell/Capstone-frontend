<script>
import axios from "axios";
export default {
  data: function () {
    return {
      users: [],
      currentUser: {},
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

    showUser(id) {
      axios.get(`/users/${id}`).then((response) => {
        this.currentUser = response.data;
        document.querySelector("#user-details").showModal();
      });
    },
    textRemind(user) {
      var phone = {
        phone: user.phone,
      };
      axios.post("/textremind", phone).then((response) => {
        console.log(response);
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
    <div>
      <button class="btn btn-info" v-on:click="showUser(user.id)">Patient Info</button>
    </div>
    <div>
      <button class="btn btn-success" v-on:click="textRemind(user)">Send Reminder</button>
    </div>

    <dialog id="user-details">
      <form method="dialog">
        <h1>User Info</h1>
        <p>Name: {{ currentUser.name }}</p>
        <div>
          <router-link v-bind:to="`/programs/${currentUser.id}`">Programs</router-link>
        </div>
        <div>
          <router-link v-bind:to="`/exercise_programs/${currentUser.id}`">New Program</router-link>
        </div>
        <div>
          <button>Close</button>
        </div>
        <!-- <p>Instructions: {{ currentExercise.instructions }}</p>
        <p>Frequency: {{ currentExercise.frequency }}</p>
        <p>Image Source: {{ currentExercise.image }}</p>
        <h1>Edit Exercise</h1>
        <p>
          Name:
          <input v-model="currentExercise.name" type="text" />
        </p>
        <p>
          Instructions:
          <input v-model="currentExercise.instructions" type="text" />
        </p>
        <p>
          Frequency:
          <input v-model="currentExercise.frequency" type="text" />
        </p>
        <p>
          Image:
          <input v-model="currentExercise.image" type="text" />
        </p>
        <button v-on:click="updateExercise()">Update</button>
        <button v-on:click="deleteExercise(currentExercise)">Delete</button>
        <button>Close</button> -->
      </form>
    </dialog>
  </div>
</template>

<style></style>
-->

<!-- <div v-for="program in user.programs" v-bind:key="program.id"></div> -->
