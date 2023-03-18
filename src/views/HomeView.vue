<script>
import axios from "axios";
export default {
  data: function () {
    return {
      exercises: [],
      className: "red",
      newExercise: {},
      currentExercise: {},
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
  },
};
</script>

<template>
  <div class="home">
    <h1>TherapE</h1>
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
    <div v-for="exercise in exercises" v-bind:key="exercise.id">
      <h3>{{ exercise.name }}</h3>
      <p>{{ exercise.instructions }}</p>
      <img v-bind:src="exercise.image" v-bind:alt="exercise.name" style="max-width: 250px" />
      <div>
        <button class="btn btn-info" v-on:click="showExercise(exercise)">More Info</button>
      </div>
    </div>

    <dialog id="exercise-details">
      <form method="dialog">
        <h1>Exercise Info</h1>
        <p>Name: {{ currentExercise.name }}</p>
        <p>Instructions: {{ currentExercise.instructions }}</p>
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
        <button class="btn btn-success" v-on:click="updateExercise()">Update</button>
        <button class="btn btn-danger" v-on:click="deleteExercise(currentExercise)">Delete</button>
        <button class="btn btn-dark">Close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
