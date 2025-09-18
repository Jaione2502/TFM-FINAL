<template>
  <div>
  
    <button class="drawer-toggle" @click="toggleDrawer" v-if="!isDesktop">
      ☰
    </button>

    <!-- Banner -->

   <aside   :class="['sidebar', { open: drawerOpen, desktop: isDesktop }]" v-show="auth.isAuthenticated">

      <h2 class="sidebar-title">Panel de control</h2>
      <nav>
        <ul>
          <li><RouterLink to="/home">Inicio</RouterLink></li>
          <li><a href="#">Mi perfil</a></li>
          <li>
            <button class="menu-btn" @click="toggleIngredientes">
              Ingredientes
              <span class="arrow">{{ showIngredientes ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showIngredientes" class="submenu">
              <li><RouterLink :to="{ name: 'listar', params: { tipo: 'ingredientes' }}">Listar</RouterLink></li>
              <li><RouterLink to="/ingredientes">Nuevo</RouterLink></li>
              <li><RouterLink :to="{ name: 'buscar', params: { tipo: 'categorias' }}">Buscar</RouterLink></li>

            </ul>
          </li>
          <li>
            <button class="menu-btn" @click="toggleCategorias">
              Categorías
              <span class="arrow">{{ showCategorias ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showCategorias" class="submenu">
              <li><RouterLink :to="{ name: 'listar', params: { tipo: 'categorias' }}">Listar</RouterLink></li>
              <li><RouterLink to="/categorias">Nuevo</RouterLink></li>
              <li><RouterLink :to="{ name: 'buscar', params: { tipo: 'categorias' }}">Buscar</RouterLink></li>
            </ul>
          </li>
          <li>
            <button class="menu-btn" @click="toggleDietas">
              Dietas
              <span class="arrow">{{ showDietas ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showDietas" class="submenu">
              <li><RouterLink :to="{ name: 'listar', params: { tipo: 'dietas' }}">Listar</RouterLink></li>
              <li><RouterLink to="/dietas">Nueva</RouterLink></li>
              <li><RouterLink :to="{ name: 'buscar', params: { tipo: 'dietas' }}">Buscar</RouterLink></li>
            </ul>
          </li>
          <li>
            <button class="menu-btn" @click="toggleRecetas">
              Recetas
              <span class="arrow">{{ showRecetas ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showRecetas" class="submenu">
              <li><RouterLink :to="{ name: 'listar', params: { tipo: 'recetas' }}">Listar</RouterLink></li>
              <li><RouterLink to="/recetas">Nueva</RouterLink></li>
              <li><RouterLink :to="{ name: 'buscar', params: { tipo: 'recetas' }}">Buscar</RouterLink></li>
            </ul>
          </li>
          <li>
            <button class="menu-btn" @click="toggleMenus">
              Menús
              <span class="arrow">{{ showMenus ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showMenus" class="submenu">
              <li><RouterLink :to="{ name: 'listar', params: { tipo: 'menus' }}">Listar</RouterLink></li>
              <li><RouterLink to="/menus">Nuevo</RouterLink></li>
              <li><RouterLink :to="{ name: 'buscar', params: { tipo: 'menus' }}">Buscar</RouterLink></li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Overlay -->
    <div class="overlay" v-if="drawerOpen && !isDesktop" @click="toggleDrawer"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { auth } from '../auth';



const drawerOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 768);

// Estado del submenu
const showCategorias = ref(false);
const showIngredientes = ref(false);
const showDietas = ref(false);
const showMenus = ref(false);
const showRecetas = ref(false);

const toggleCategorias = () => {
  showCategorias.value = !showCategorias.value;
};

const toggleIngredientes = () => {
  showIngredientes.value = !showIngredientes.value;
};

const toggleDietas = () => {
  showDietas.value = !showDietas.value;
};

const toggleMenus = () => {
  showMenus.value = !showMenus.value;
};

const toggleRecetas = () => {
  showRecetas.value = !showRecetas.value;
};




function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

// Detectar cambio de tamaño de pantalla
function handleResize() {
  isDesktop.value = window.innerWidth >= 768;
  if (isDesktop.value) drawerOpen.value = false;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});


</script>

<style scoped>
/* Sidebar base */
.sidebar {
  position: fixed;
  top: 0;
  left: -220px;
  width: 220px;
  height: 100vh;
  background: linear-gradient(135deg, #333, #111);
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
  color: white;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 1rem 0;
}

.sidebar a,
.menu-btn {
  color: white;
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.3s;
}

.sidebar a:hover,
.menu-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Submenu */
.submenu {
  margin-left: 15px;
  font-size: 0.9em;
  transition: all 0.3s ease;
}

.submenu li {
  margin: 0.5rem 0;
}

.menu-btn {
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.arrow {
  font-size: 0.8em;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
}

/* Botón abrir móvil */
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
