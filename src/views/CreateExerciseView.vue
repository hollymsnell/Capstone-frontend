<script>
import axios from "axios";

export default {
  data: function () {
    return {
      errors: [],
      newExercise: {},
      exercises: [],
    };
  },

  methods: {
    submit: function () {
      axios
        .post("/exercises", this.newExercise)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/home");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    createExercise() {
      axios.post("/exercises", this.newExercise).then((response) => {
        this.exercises.push(response.data);
      });
    },
  },
};
</script>

<template>
  <div class="add">
    <!-- <form v-on:submit.prevent="submit()" -->
    <h1>Create New Exercise</h1>
    <p>
      <label>Name:</label>
      <input type="text" v-model="newExercise.name" />
    </p>
    <p>
      <label>Instructions:</label>
      <input type="text" v-model="newExercise.instructions" />
    </p>
    <p>
      <label>Frequency:</label>
      <input type="text" v-model="newExercise.frequency" />
    </p>
    <p>
      <label>Image:</label>
      <input type="text" v-model="newExercise.image" />
    </p>
    <button class="btn btn-primary" v-on:click="createExercise()">Create</button>
    <div v-for="exercise in exercises" v-bind:key="exercise.id">
      <h3>{{ exercise.name }}</h3>
      <p>{{ exercise.instructions }}</p>
      <img v-bind:src="exercise.image" v-bind:alt="exercise.name" style="max-width: 250px" />
    </div>
    <!-- </form> -->
  </div>
</template>

<style></style>
