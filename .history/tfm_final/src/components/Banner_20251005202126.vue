<template>
  <div>
    <!-- Botón móvil -->
    <button class="drawer-toggle" @click="toggleDrawer" v-if="!isDesktop">
      ☰
    </button>

    <!-- Sidebar -->
    <aside
      :class="['sidebar', { open: drawerOpen }]"
      v-show="auth.isAuthenticated"
    >
      <h2 class="sidebar-title">Panel de control</h2>
      <nav>
        <ul>
          <li><RouterLink to="/home">Inicio</RouterLink></li>

          <!-- Perfiles -->
          <li>
            <button class="menu-btn" @click="togglePerfiles">
              Perfiles <span class="arrow">{{ showPerfiles ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showPerfiles" class="submenu">
              <li>
                <RouterLink
                  :to="{ name: 'listar', params: { tipo: 'perfiles' } }"
                  >Listar</RouterLink
                >
              </li>
              <li><RouterLink to="/perfiles">Nuevo</RouterLink></li>
              <li>
                <RouterLink
                  :to="{ name: 'buscar', params: { tipo: 'perfiles' } }"
                  >Buscar</RouterLink
                >
              </li>
            </ul>
          </li>

          <!-- Ingredientes -->
          <li>
            <button class="menu-btn" @click="toggleIngredientes">
              Ingredientes
              <span class="arrow">{{ showIngredientes ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showIngredientes" class="submenu">
              <li>
                <RouterLink
                  :to="{ name: 'listar', params: { tipo: 'ingredientes' } }"
                  >Listar</RouterLink
                >
              </li>
              <li><RouterLink to="/ingredientes">Nuevo</RouterLink></li>
              <li>
                <RouterLink
                  :to="{ name: 'buscar', params: { tipo: 'ingredientes' } }"
                  >Buscar</RouterLink
                >
              </li>
            </ul>
          </li>

          <!-- Categorías -->
          <li>
            <button class="menu-btn" @click="toggleCategorias">
              Categorías
              <span class="arrow">{{ showCategorias ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showCategorias" class="submenu">
              <li>
                <RouterLink
                  :to="{ name: 'listar', params: { tipo: 'categorias' } }"
                  >Listar</RouterLink
                >
              </li>
              <li><RouterLink to="/categorias">Nuevo</RouterLink></li>
              <li>
                <RouterLink
                  :to="{ name: 'buscar', params: { tipo: 'categorias' } }"
                  >Buscar</RouterLink
                >
              </li>
            </ul>
          </li>

          <!-- Dietas -->
          <li>
            <button class="menu-btn" @click="toggleDietas">
              Dietas <span class="arrow">{{ showDietas ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showDietas" class="submenu">
              <li>
                <RouterLink :to="{ name: 'listar', params: { tipo: 'dietas' } }"
                  >Listar</RouterLink
                >
              </li>
              <li><RouterLink to="/dietas">Nueva</RouterLink></li>
              <li>
                <RouterLink :to="{ name: 'buscar', params: { tipo: 'dietas' } }"
                  >Buscar</RouterLink
                >
              </li>
            </ul>
          </li>

          <!-- Recetas -->
          <li>
            <button class="menu-btn" @click="toggleRecetas">
              Recetas <span class="arrow">{{ showRecetas ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showRecetas" class="submenu">
              <li>
                <RouterLink
                  :to="{ name: 'listar', params: { tipo: 'recetas' } }"
                  >Listar</RouterLink
                >
              </li>
              <li><RouterLink to="/recetas">Nueva</RouterLink></li>
              <li>
                <RouterLink
                  :to="{ name: 'buscar', params: { tipo: 'recetas' } }"
                  >Buscar</RouterLink
                >
              </li>
            </ul>
          </li>

          <!-- Menús -->
          <li>
            <button class="menu-btn" @click="toggleMenus">
              Menús <span class="arrow">{{ showMenus ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showMenus" class="submenu">
              <li>
                <RouterLink :to="{ name: 'listar', params: { tipo: 'menus' } }"
                  >Listar</RouterLink
                >
              </li>
              <li><RouterLink to="/menus">Nuevo</RouterLink></li>
              <li>
                <RouterLink :to="{ name: 'buscar', params: { tipo: 'menus' } }"
                  >Buscar</RouterLink
                >
              </li>
            </ul>
          </li>

          <!-- Inventario -->
          <li>
            <button class="menu-btn" @click="toggleInventario">
              Inventario
              <span class="arrow">{{ showInventario ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showInventario" class="submenu">
              <li>
                <RouterLink
                  :to="{ name: 'listar', params: { tipo: 'inventario' } }"
                  >Listar</RouterLink
                >
              </li>
              <li><RouterLink to="/inventario">Nuevo</RouterLink></li>
              <li>
                <RouterLink
                  :to="{ name: 'buscar', params: { tipo: 'inventario' } }"
                  >Buscar</RouterLink
                >
              </li>
            </ul>
          </li>

          <!-- Comentarios -->
          <li>
            <button class="menu-btn" @click="toggleComentarios">
              Comentarios
              <span class="arrow">{{ showComentarios ? "▲" : "▼" }}</span>
            </button>
            <ul v-show="showComentarios" class="submenu">
              <li>
                <RouterLink
                  :to="{ name: 'listar', params: { tipo: 'comentarios' } }"
                  >Listar</RouterLink
                >
              </li>
              <li><RouterLink to="/comentarios">Nuevo</RouterLink></li>
              <li>
                <RouterLink
                  :to="{ name: 'buscar', params: { tipo: 'comentarios' } }"
                  >Buscar</RouterLink
                >
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Overlay -->
    <div
      class="overlay"
      v-if="drawerOpen && !isDesktop"
      @click="toggleDrawer"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { auth } from "../auth";

const drawerOpen = ref(false);
const isDesktop = ref(window.innerWidth >= 1253);

const showPerfiles = ref(false);
const showIngredientes = ref(false);
const showCategorias = ref(false);
const showDietas = ref(false);
const showRecetas = ref(false);
const showMenus = ref(false);
const showComentarios = ref(false);
const showInventario = ref(false);

const toggleDrawer = () => (drawerOpen.value = !drawerOpen.value);
const togglePerfiles = () => (showPerfiles.value = !showPerfiles.value);
const toggleIngredientes = () => (showIngredientes.value = !showIngredientes.value);
const toggleCategorias = () => (showCategorias.value = !showCategorias.value);
const toggleDietas = () => (showDietas.value = !showDietas.value);
const toggleRecetas = () => (showRecetas.value = !showRecetas.value);
const toggleMenus = () => (showMenus.value = !showMenus.value);
const toggleComentarios = () => (showComentarios.value = !showComentarios.value);
const toggleInventario = () => ( showInventario.value = !showInventario.value);


function handleResize() {
  isDesktop.value = window.innerWidth >= 1253;
  if (isDesktop.value) drawerOpen.value = false;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  background: linear-gradient(135deg, #333, #111);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  color: white;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
}

.sidebar::-webkit-scrollbar {
  width: 0.8rem;
}

.sidebar::-webkit-scrollbar-track {
  background: #222;
  border-radius: 1rem;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #fff;
  border-radius: 1rem;
  border: 0.2rem solid #222;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #e7f7e7;
}
.sidebar.open {
  transform: translateX(0);
}
.sidebar-title {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
}
.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
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
.submenu {
  padding-left: 1.5rem; 
  font-size: 0.9em;
  transition: all 0.3s ease;
  border-left: 2px solid rgba(255, 255, 255, 0.1); 
  margin-top: 0.5rem;
}
.submenu li {
  margin: 0.3rem 0;
  padding-left: 0.5rem;
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
}

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

.logout-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
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

@media (min-width: 1253px) {
  .sidebar {
    transform: translateX(0);
  }
  .overlay {
    display: none !important;
  }
  .drawer-toggle {
    display: none;
  }
  main {
    margin-left: 220px;
    transition: margin-left 0.3s;
  }
}
</style>
