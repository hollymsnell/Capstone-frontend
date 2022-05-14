<script>
import axios from "axios";

export default {
  data: function () {
    return {
      programs: [],
      currentProgram: {},
      newProgram: {},
      isClicked: false,
    };
  },
  created: function () {
    this.showProgram();
  },
  methods: {
    clicked() {
      this.isClicked = true;
    },
    showProgram() {
      axios.get(`/programs/${this.$route.params.id}`).then((response) => {
        this.programs = response.data;
        console.log(response.data);
        // document.querySelector("#program-details").showModal();
      });
    },
    updateProgram(id) {
      console.log(id),
        axios.patch(`/programs/${id}}`, this.currentProgram).then((response) => {
          console.log("Success!", response);
          // var index = this.programs.indexOf(this.currentProgram);
          // this.programs.splice(index, 1);
          // this.programs.push(response.data);
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
      <h2>{{ program.title }}</h2>
      <p>Patient Rating:{{ program.user_rating }}</p>
      <button v-on:click="clicked()">Change Rating</button>

      <form v-if="this.isClicked === true" v-on:submit="updateProgram(program.id)">
        <p>
          <input v-model="currentProgram.user_rating" type="text" />
        </p>
        <p>
          <input type="submit" value="Update" />
          <!-- <button v-on:click="updateProgram(program.id)">Update Rating</button> -->
        </p>
      </form>

      <div v-for="exercise in program.exercises" v-bind:key="exercise.id">
        <h3>{{ exercise.name }}</h3>
        <p>{{ exercise.instructions }}</p>
        <img v-bind:src="exercise.image" v-bind:alt="exercise.name" style="max-width: 250px" />
      </div>

      <p>
        <button v-on:click="destroyProgram(program)">Delete Program</button>
      </p>
    </div>
    <div>
      <router-link to="/users">Back to Patients</router-link>
    </div>
  </div>
</template>
