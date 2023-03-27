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
        console.log(this.users);
      });
    },

    showUser(id) {
      axios.get(`/users/${id}`).then((response) => {
        this.currentUser = response.data;
        document.querySelector("#user-details").showModal();
      });
    },
    updateUser() {
      console.log(this.currentUser),
        axios.patch(`/users/${this.currentUser.id}`, this.currentUser).then((response) => {
          console.log("Success!", response);
          var index = this.users.indexOf(this.currentUser);
          this.users.splice(index, 1);
          this.users.push(response.data);
        });
    },
    deleteuser(user) {
      axios.delete(`/users/${user.id}`).then((response) => {
        console.log(response);
        var index = this.users.indexOf(user);
        this.users.splice(index, 1);
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
  <div class="container">
    <div class="row">
      <div class="col-sm" v-for="user in users" v-bind:key="user.id">
        <div class="card" style="width: 18rem">
          <img class="card-img-top" v-bind:src="user.profile_pic" v-bind:alt="user.name" style="max-width: 250px" />
          <h3>{{ user.name }}</h3>
          <div>
            <button class="button" v-on:click="showUser(user.id)">Patient Info</button>
          </div>

          <div>
            <button class="btn btn-success" v-on:click="textRemind(user)">Send Reminder</button>
          </div>
        </div>
      </div>
    </div>

    <dialog id="user-details">
      <form method="dialog">
        <h1>User Info</h1>
        <p>Name: {{ currentUser.name }}</p>
        <p>Age: {{ currentUser.age }}</p>
        <p>Injury Diagnosis: {{ currentUser.injury_diagnosis }}</p>
        <p>Phone: {{ currentUser.phone }}</p>
        <div>
          <router-link v-bind:to="`/programs/${currentUser.id}`">Programs</router-link>
        </div>
        <div>
          <router-link v-bind:to="`/exercise_programs/${currentUser.id}`">New Program</router-link>
        </div>
        <h1>Edit Patient Info</h1>
        <p>
          Name:
          <input v-model="currentUser.name" type="text" />
        </p>
        <p>
          Age:
          <input v-model="currentUser.age" type="text" />
        </p>
        <p>
          Injury Diagnosis:
          <input v-model="currentUser.injury_diagnosis" type="text" />
        </p>
        <p>
          Phone:
          <input v-model="currentUser.phone" type="text" />
        </p>
        <p>
          Profile Picture:
          <input v-model="currentUser.profile_pic" type="text" />
        </p>
        <button class="btn btn-success" v-on:click="updateUser()">Update Info</button>
        <button class="btn btn-danger" v-on:click="deleteUser(currentUser)">Delete Patient</button>
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

<style>
.button {
  background-color: #8860d0;
}
</style>

-->

<!-- <div v-for="program in user.programs" v-bind:key="program.id"></div> -->
