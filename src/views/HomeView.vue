<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "TherapE",
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
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <!-- <h2 v-bind:class="className">{{ exercises }} count: {{ exercises.length }}</h2> -->
    <h2>Create New Exercise</h2>
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
    </p>
  </div>
</template>

<style></style>
