import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Politicas from "../views/Politicas.vue";
import Categorias from "../views/Categorias.vue";
import Perfiles  from "../views/Perfil.vue";  
import Ingredientes from "../views/Ingredientes.vue"
import Menús from "../views/Menus.vue";
import Login from "../views/Login.vue";
import Comentarios from "../views/Comentarios.vue";
import { auth } from "../auth.js"

const routes = [
  { path: "/home", name: "Home", component: Home, meta: { requiresAuth: true } },
  { path: "/politicas", component: Politicas, meta: { requiresAuth: true } },
  { path: "/login", name: "Login", component: Login },
  { path: "/categorias", component: Categorias, meta: { requiresAuth: true } },
  { path: "/ingredientes", component: Ingredientes, meta: { requiresAuth: true }},
  { path: "/menus", component: Menús, meta: { requiresAuth: true }},
  { path: "/perfiles", component: Perfiles, meta: { requiresAuth: true } },
  { path: "/comentarios", component: Comentarios, meta: { requiresAuth: true } },
  { path: "/:tipo/listar", name: "listar", component: () => import("../views/Listar.vue") },
  { path: "/:tipo/buscar", name: "buscar", component: () => import("../views/Buscar.vue"), props: true },
  { path: "/:tipo/editar/:id", name: "edicion", component: () => import("../views/Edicion.vue"), props: true, meta: { requiresAuth: true } }
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});



router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: "Login" }); // protege rutas privadas
  } else if (to.name === "Login" && auth.isAuthenticated) {
    next({ name: "Home" }); // evita entrar al login si ya está logueado
  } else {
    next();
  }
});
export default router;
