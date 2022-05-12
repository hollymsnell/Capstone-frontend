<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Programs",
      programs: [],
      newProgram: {},
      currentProgram: {},
    };
  },
  created: function () {
    this.indexPrograms();
  },
  methods: {
    indexPrograms: function () {
      axios.get("/programs").then((response) => {
        console.log("programs index", response);
        this.programs = response.data;
      });
    },
    createProgram() {
      axios.post("/programs", this.newProgram).then((response) => {
        this.programs.push(response.data);
      });
    },
    showProgram(program) {
      axios.get(`/programs/${program.id}`).then((response) => {
        this.currentProgram = response.data;
        document.querySelector("#program-details").showModal();
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
    deleteProgram(program) {
      axios.delete(`/programs/${program.id}`).then((response) => {
        console.log(response);
        var index = this.programs.indexOf(program);
        this.programs.splice(index, 1);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1 v-bind:class="classname">{{ message }}</h1>
    <h2>Program Info</h2>
    <p>Title: {{ currentProgram.title }}</p>
    <p>Rating: {{ currentProgram.user_rating }}</p>
  </div>
</template>

<style></style>
