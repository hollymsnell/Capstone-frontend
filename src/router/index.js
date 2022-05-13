import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";
import LogoutView from "../views/LogoutView.vue";
import UserView from "../views/UserView.vue";
import ExerciseProgramsView from "../views/ExerciseProgramsView.vue";
import ProgramView from "../views/ProgramView.vue";
import ProgramShow from "../views/ProgramShow.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/users",
    name: "users",
    component: UserView,
  },
  {
    path: "/exercise_programs",
    name: "exercise_programs",
    component: ExerciseProgramsView,
  },
  {
    path: "/programs",
    name: "programs",
    component: ProgramView,
  },
  {
    path: "/programs/:id",
    name: "programs",
    component: ProgramShow,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
