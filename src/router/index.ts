import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import DashBoard from "../pages/DashBoard.vue";
import { useAuthStore } from "../store/authStore";

const routes = [
  { path: "/", component: Login },
  { path: "/dashBoard", component: DashBoard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  const isLoggedIn = !!authStore.token;

  if (to.path === "/" && isLoggedIn) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
