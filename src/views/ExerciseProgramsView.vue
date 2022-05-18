<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Create New Program",
      exercisePrograms: [],
      newExerciseProgram: {},
      newProgram: {},
      exercises: [],
      searchText: "",
      program: {},
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
    createProgram() {
      this.newProgram.user_id = this.$route.params.id;
      console.log(this.exercisePrograms);
      axios.post("/programs", this.newProgram).then((response) => {
        this.program = response.data;
        this.createExerciseProgram();
        console.log(response);
      });
    },
    createExerciseProgram() {
      var exercises = {
        user_id: this.$route.params.id,
        program_id: this.program.id,
        exercises: this.exercisePrograms,
      };
      axios.post("/exercise_programs", exercises).then((response) => {
        this.exercisePrograms.push(response.data);
        this.$router.push(`/programs/${this.$route.params.id}`);
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
    <h1>{{ message }}</h1>
  </div>
  <form>
    Program Title:
    <input type="text" v-model="newProgram.title" />
    <div>
      Difficulty Rating:
      <input type="text" v-model="newProgram.user_rating" />
    </div>
    <input
      class="form-control me-2"
      type="search"
      placeholder="Search by Exercise Name"
      aria-label="Search by Exercise Name"
      v-model="searchText"
    />
    <div v-for="exercise in filterExercises()" v-bind:key="exercise.id">
      <h3>{{ exercise.name }}</h3>
      <p>{{ exercise.instructions }}</p>
      <img v-bind:src="exercise.image" v-bind:alt="exercise.name" style="max-width: 250px" />
      <div>
        <button class="btn btn-warning" v-on:click.prevent="exercisePrograms.push(exercise)">Add to Program</button>
      </div>
    </div>
  </form>
  <button class="btn btn-success" v-on:click="createProgram()">Create</button>
</template>

<style></style>
