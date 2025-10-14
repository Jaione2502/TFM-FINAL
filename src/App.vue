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
  z-index: 1200;
  padding: 0.5rem 1rem;
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
  position: relative;
  width: 100%;
  z-index: 200;
  flex-shrink: 0;
}

.content {
  justify-content: center;
  padding-top: 80px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}

footer {
  text-align: center;
  background: #f4f4f4;
  padding: 0.5rem;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .logout-container {
    padding: 0.4rem 0.8rem;
    top: 0.5rem;
    right: 0.5rem;
  }

  .logout-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .content {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 70px;
  }
}


</style>
