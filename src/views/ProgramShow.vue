<script>
import axios from "axios";

export default {
  data: function () {
    return {
      programs: [],
      currentProgram: {},
      newProgram: {},
      isClicked: false,
      currentUser: {},
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
        this.findUser(this.programs[0].user_id);
        // document.querySelector("#program-details").showModal();
      });
    },
    updateProgram(program) {
      axios.patch(`/programs/${program.id}}`, program).then((response) => {
        console.log("Success!", response);
        // var index = this.programs.indexOf(this.currentProgram);
        // this.programs.splice(index, 1);
        // this.programs.push(response.data);
      });
    },
    destroyProgram(program) {
      axios.delete(`/programs/${program.id}`).then((response) => {
        console.log(response);
        var index = this.programs.indexOf(program);
        this.programs.splice(index, 1);
        // this.$router.push("/programs");
      });
    },
    findUser(id) {
      axios.get(`/users/${id}`).then((response) => {
        this.currentUser = response.data;
        console.log("AHHH!!", this.currentUser);
      });
    },
  },
};
</script>

<template>
  <div class="home">
    <h3>{{ currentUser.name }}</h3>
    <div v-for="program in programs" v-bind:key="program.id">
      <h2>{{ program.title }}</h2>
      <!-- <p>Patient Rating:{{ program.user_rating }}</p>
      <button v-on:click="clicked()">Change Rating</button> -->
      <form v-on:submit="updateProgram(program)">
        <label for="programs">Change Rating:</label>

        <select name="program" id="programs" v-model="program.user_rating">
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="hard">Hard</option>
          <option value="unable">Unable to Perform</option>
        </select>

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
        <button class="btn btn-danger" v-on:click="destroyProgram(program)">Delete Program</button>
      </p>
    </div>
    <div>
      <router-link to="/users">Back to Patients</router-link>
    </div>
  </div>
</template>
