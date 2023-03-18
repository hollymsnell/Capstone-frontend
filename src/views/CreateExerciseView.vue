<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newExerciseParams: {},
      errors: [],
      newExercise: {},
      exercises: [],
    };
  },

  methods: {
    submit: function () {
      axios
        .post("/add", this.newExerciseParams)
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
    <h1>Create New Exercise</h1>
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
