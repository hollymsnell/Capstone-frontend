<template>
  <nav class="navbar navbar-expand-lg bg-light p-0">
    <div class="container-fluid p-2">
      <a class="navbar-brand" href="/">TherapE</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <!-- <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li> -->
          <li class="nav-item">
            <a class="nav-link" href="/users">Patients</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/add">Add</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/signup">SignUp</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- <nav>
    <router-link to="/">Home</router-link>
    |
    <router-link to="/signup">SignUp</router-link>
    |
    <router-link to="/login">Login</router-link>
    |
    <router-link to="/logout">Logout</router-link>
    |
    <router-link to="/users">My Patients</router-link>
  </nav> -->
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #c1c8e4;
  min-height: 100vh;
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.container-fluid {
  background-color: #84ceeb;
  border: 1px solid rgb(182, 177, 177);
  /* margin: -8px; */
}
</style>
