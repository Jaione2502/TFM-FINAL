import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Politicas from "../views/Politicas.vue";
import Categorias from "../views/Categorias.vue";
import Login from "../views/Login.vue";

const routes = [
  { path: "/home", component: Home, meta: { requiresAuth: true } },
  { path: "/politicas", component: Politicas, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/categorias", component: Categorias, meta: { requiresAuth: true }},
  { path: "/", redirect: "/home" },
  { path: "/:tipo/listar", name: "listar", component: () => import("../views/Listar.vue")},
  { path: "/:tipo/buscar", name: "buscar", component: () => import("../views/Buscar.vue"),
  props: true
}

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


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
