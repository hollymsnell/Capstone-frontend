<script>
import axios from "axios";

export default {
  data: function () {
    return {
      programs: [],
      currentProgram: {},
    };
  },
  created: function () {
    this.showProgram();
  },
  methods: {
    showProgram() {
      axios.get(`/programs/${this.$route.params.id}`).then((response) => {
        this.programs = response.data;
        console.log(response.data);
      });
    },
    updateProgram() {
      console.log(this.currentProgram),
        axios.patch(`/programs/${this.currentProgram.id}`, this.currentProgram).then((response) => {
          console.log("Success!", response);
          var index = this.programs.indexOf(this.currentProgram);
          this.programs.splice(index, 1);
          this.programs.push(response.data);
        });
    },
    destroyProgram() {
      axios.delete(`/programs/${this.program.id}`).then((response) => {
        console.log(response);
        this.$router.push("/programs");
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <div v-for="program in programs" v-bind:key="program.id">
      <h3>{{ program.title }}</h3>
      <p>{{ program.user_rating }}</p>
      <div v-for="exercise in program.exercises" v-bind:key="exercise.id">
        <h3>{{ exercise.name }}</h3>
        <p>{{ exercise.instructions }}</p>
        <img v-bind:src="exercise.image" v-bind:alt="exercise.name" style="max-width: 250px" />
      </div>
    </div>
    <div>
      <router-link to="/users">Back to Patients</router-link>
      <p>
        <button v-on:click="destroyProgram()">Delete program</button>
      </p>
    </div>
  </div>
</template>
