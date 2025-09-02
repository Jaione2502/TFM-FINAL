<template>
  <div>
    
    <button class="drawer-toggle" @click="toggleDrawer" v-if="!isDesktop">
      ☰
    </button>

    
    <aside :class="['sidebar', { open: drawerOpen, desktop: isDesktop }]" v-if="isAuthenticated">
      <h2 class="sidebar-title">Panel de control</h2>
      <nav>
        <ul>
          <li><a href="../views/Home.vue">Inicio</a></li>
          <li><a href="#">Mi perfil</a></li>
          <li><a href="#">Ingredientes</a></li>
          <li><a href="#">Categorías</a></li>
          <li><a href="#">Dietas</a></li>
          <li><a href="#">Recetas</a></li>
          <li><a href="#">Menú</a></li>
        </ul>
      </nav>
    </aside>

  
    <div class="overlay" v-if="drawerOpen && !isDesktop" @click="toggleDrawer"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps({
  isAuthenticated: Boolean
});

const drawerOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 768);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

// Detectar cambio de tamaño de pantalla
function handleResize() {
  isDesktop.value = window.innerWidth >= 768;
  if (isDesktop.value) drawerOpen.value = false; // cerrar drawer en desktop
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

watch(
  () => props.isAuthenticated,
  (newVal) => {
    if (!newVal) drawerOpen.value = false; // cerrar drawer al hacer logout
  }
);
</script>

<style scoped>
/* Sidebar base */
.sidebar {
  position: fixed;
  top: 0;
  left: -220px; 
  width: 220px;
  height: 100vh;
  background: linear-gradient(135deg,  #333);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  color: white;
  transition: left 0.3s;
  z-index: 1000;
}

.sidebar.open {
  left: 0;
}

.sidebar.desktop {
  left: 0; 
}

.sidebar-title {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 1rem 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.3s;
}

.sidebar a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Overlay oscuro cuando el drawer está abierto */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 900;
}

/* Botón para abrir  en móvil */
.drawer-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1100;
  background: #4facfe;
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

@media (min-width: 768px) {
  .drawer-toggle {
    display: none; 
  }
}
</style>
