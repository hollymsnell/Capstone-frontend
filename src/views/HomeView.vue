<script>
import axios from "axios";
export default {
  data: function () {
    return {
      exercises: [],
      className: "red",
      newExercise: {},
      currentExercise: {},
      searchText: "",
    };
  },
  created: function () {
    this.indexExercises();
  },
  methods: {
    indexExercises: function () {
      axios.get("/exercises").then((response) => {
        console.log("exercises index", response);
        this.exercises = response.data;
      });
    },
    createExercise() {
      axios.post("/exercises", this.newExercise).then((response) => {
        this.exercises.push(response.data);
      });
    },
    showExercise(exercise) {
      axios.get(`/exercises/${exercise.id}`).then((response) => {
        this.currentExercise = response.data;
        document.querySelector("#exercise-details").showModal();
      });
    },
    updateExercise() {
      console.log(this.currentExercise),
        axios.patch(`/exercises/${this.currentExercise.id}`, this.currentExercise).then((response) => {
          console.log("Success!", response);
          var index = this.exercises.indexOf(this.currentExercise);
          this.exercises.splice(index, 1);
          this.exercises.push(response.data);
        });
    },
    deleteExercise(exercise) {
      axios.delete(`/exercises/${exercise.id}`).then((response) => {
        console.log(response);
        var index = this.exercises.indexOf(exercise);
        this.exercises.splice(index, 1);
      });
    },
    filterExercises() {
      return this.exercises.filter((exercise) => {
        var lowercaseTitle = exercise.name.toLowerCase();
        var lowercaseSearchText = this.searchText.toLowerCase();
        return lowercaseTitle.includes(lowercaseSearchText);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>TherapE</h1>
  </div>
  <input
    class="form-control me-2"
    type="search"
    placeholder="Search by Exercise Name"
    aria-label="Search by Exercise Name"
    v-model="searchText"
  />
  <div v-for="exercise in filterExercises()" v-bind:key="exercise.id">
    <!-- <h3>{{ exercise.name }}</h3>
    <p>{{ exercise.instructions }}</p>
    <img v-bind:src="exercise.image" v-bind:alt="exercise.name" style="max-width: 250px" /> -->
  </div>
  <!-- <h2>Create New Exercise</h2>
    <p>
      Name:
      <input type="text" v-model="newExercise.name" />
    </p>
    <p>
      Instructions:
      <input type="text" v-model="newExercise.instructions" />
    </p>
    <p>
      Frequency:
      <input type="text" v-model="newExercise.frequency" />
    </p>
    <p>
      Image:
      <input type="text" v-model="newExercise.image" />
    </p> -->
  <!-- <button class="btn btn-primary" v-on:click="createExercise()">Create</button> -->
  <div class="container">
    <div class="row">
      <div class="col-sm" v-for="exercise in filterExercises()" v-bind:key="exercise.id">
        <div class="card h-100" style="width: 18rem">
          <img class="card-img-top" v-bind:src="exercise.image" v-bind:alt="exercise.name" style="max-width: 250px" />
          <h3 class="card-title">{{ exercise.name }}</h3>

          <div>
            <button class="btn btn-info" v-on:click="showExercise(exercise)">More Info</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <dialog id="exercise-details">
    <form method="dialog">
      <h1>Exercise Info</h1>
      <p>Name: {{ currentExercise.name }}</p>
      <p>Instructions: {{ currentExercise.instructions }}</p>
      <p>Frequency: {{ currentExercise.frequency }}</p>

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
      <button class="btn btn-success" v-on:click="updateExercise()">Update</button>
      <button class="btn btn-danger" v-on:click="deleteExercise(currentExercise)">Delete</button>
      <button class="btn btn-dark">Close</button>
    </form>
  </dialog>
</template>

<style>
.card {
  background-color: #8860d0;
  padding: 30px;
}
.col-sm {
  margin: 35px;
}
</style>
