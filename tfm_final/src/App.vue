<template>
  <div id="app">

   
    <div v-if="auth.isAuthenticated" class="logout-container">
      <button class="logout-btn" @click="logout">Cerrar sesión</button>
    </div>



    <Banner v-if="auth.isAuthenticated" class="banner-top" />

 
    <div class="content">
      <router-view />
    </div>

    <!-- Footer -->
    <footer>
      <p>
        &copy; 2025 Recetas de Cocina EBIS. Todos los derechos reservados. |
        <router-link to="/politicas">Políticas de Privacidad</router-link>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Banner from "./components/Banner.vue";
import { auth } from "./auth";



const router = useRouter();

// Mantener sesión si hay token en localStorage
onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    auth.isAuthenticated = true;
    auth.token = token;
    router.push({ name: "Home" }); // si ya hay token, vamos al home
  } else {
    auth.isAuthenticated = false;
    router.push({ name: "Login" }); // si no hay token, vamos al login
  }
});

const logout = () => {
  auth.isAuthenticated = false;
  auth.token = null;
  localStorage.removeItem("token");
  router.push({ name: "Login" });
};
</script>

<style>
.logout-container {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 300;
  padding: 0.5rem 1rem;

}



/* Footer */
footer {
  padding: 0;
  text-align: center;
  background: #f4f4f4;
}

.logout-btn {
  background: #ff4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.logout-btn:hover {
  background: #cc0000;
}

.banner-top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 200;
}

.content {
  padding-top: 80px; /* ajustar según altura del banner */
}

footer {
  text-align: center;
  background: #f4f4f4;
  padding: 0.5rem 0;
}
</style>
