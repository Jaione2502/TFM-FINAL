<template>
  <div id="app">
    <!-- Si no está logueado -->
    <div v-if="!isAuthenticated" class="login-container">
      <Login @login-success="handleLogin" />
    </div>

    <!-- Si ya hizo login -->
    <div v-else class="app-layout">
      <Banner :is-authenticated="isAuthenticated" />

      <div class="main-section">
        <header class="topbar">
          <h1>Mis recetas de cocina</h1>
          <button class="logout-btn" @click="handleLogout">Cerrar sesión</button>
        </header>

        <main class="content">
          <router-view />
        </main>

        <footer>
          <p>
            &copy; 2025 Recetas de Cocina EBIS. Todos los derechos reservados. |
            <router-link to="/politicas">Políticas de Privacidad</router-link>
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Banner from "./components/Banner.vue";
import Login from "./views/Login.vue";

const router = useRouter();
const isAuthenticated = ref(false);

onMounted(() => {
  const savedAuth = localStorage.getItem("isAuthenticated") === "true";
  isAuthenticated.value = savedAuth;

  if (savedAuth) {
    router.push("/home");
  } else {
    router.push("/login");
  }
});

function handleLogin() {
  isAuthenticated.value = true;
  localStorage.setItem("isAuthenticated", "true");
  router.push("/home");
}

function handleLogout() {
  isAuthenticated.value = false;
  localStorage.removeItem("isAuthenticated");
  router.push("/login");
}
</script>

<style>
/* Layout general con flexbox */
.app-layout {
  display: flex;
}

/* Main section contiene topbar, contenido y footer */
.main-section {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 220px; /* espacio para sidebar */
  padding-top: 60px; /* espacio para el topbar fijo */
  transition: margin-left 0.3s;
}


/* Contenido crece para empujar footer abajo */
.content {
  flex: 1;
  padding: 1rem;
}

/* Topbar */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem 1rem 1rem; /* más espacio a la derecha */
  background: #333;
  color: white;
  position: fixed; /* topbar fijo arriba */
  width: calc(100% - 220px); /* ancho total menos sidebar */
  top: 0;
  left: 220px; /* al lado del sidebar */
  box-sizing: border-box;
  z-index: 100; /* para que esté sobre contenido */
}



/* Footer */
footer {
  padding: 1rem;
  text-align: center;
  background: #f4f4f4;
}

/* Botón logout */
.logout-btn {
  background: #ff4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}
.logout-btn:hover {
  background: #cc0000;
}

/* Responsive: móvil */
@media (max-width: 768px) {
  .main-section {
    margin-left: 0; /* sidebar tipo drawer */
  }
}

@media (max-width: 768px) {
  .topbar {
    left: 0;
    width: 100%;
  }
}

</style>
