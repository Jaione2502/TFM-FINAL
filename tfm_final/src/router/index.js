import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Politicas from "../views/Politicas.vue";
import Login from "../views/Login.vue";

const routes = [
  { path: "/home", component: Home, meta: { requiresAuth: true } },
  { path: "/politicas", component: Politicas, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/", redirect: "/home" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔹 Guard global
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si la ruta requiere login y no está autenticado →  login
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    // Si está logueado y quiere ir a login →  home
    next("/home");
  } else {
    next(); 
  }
});

export default router;
