<template>
  <div class="listar-container">
    <h1>Listado de {{ tipo }}</h1>

    <div class="card-grid">
      <div
        v-for="item in paginatedItems"
        :key="item.id"
        class="card"
        @click="irAEdicion(item)"
      >
        <!-- Perfiles -->
        <template v-if="tipo === 'perfiles'">
          <h2 class="card-title">{{ item.name }}</h2>
          <p>{{ item.email }}</p>
        </template>

        <!-- Categorías -->
        <template v-if="tipo === 'categorias'">
          <h2 class="card-title">{{ item.nombre }}</h2>
          <p>{{ item.descripcion }}</p>
        </template>

        <!-- Comentarios -->
        <template v-if="tipo === 'comentarios'">
          <h2 class="card-title">{{ item.receta }}</h2>
          <p>{{ item.usuario }}</p>
          <p>{{ item.contenido }}</p>
        </template>

        <!-- Ingredientes -->
        <template v-if="tipo === 'ingredientes'">
          <h2 class="card-title">{{ item.nombre }}</h2>
          <p>{{ item.descripcion }}</p>
          <p>{{ item.unidad_medida }}</p>
        </template>

        <!-- Menús -->
        <template v-if="tipo === 'menus'">
          <p>{{ item.usuario }}</p>
          <h2 class="card-title">{{ item.nombre }}</h2>
          <p>{{ item.fecha }}</p>
        </template>

        <!-- Inventario -->
        <template v-if="tipo === 'inventario'">
          <p>{{ item.usuario }}</p>
          <h2 class="card-title">{{ item.ingrediente_id }}</h2>
          <p>{{ item.cantidad }}</p>
        </template>
      </div>
    </div>

    <div class="pagination" v-if="totalPages > 1">
      <button :disabled="currentPage === 1" @click="currentPage--">
        Anterior
      </button>

      <span>Página {{ currentPage }} de {{ totalPages }}</span>

      <button :disabled="currentPage === totalPages" @click="currentPage++">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getCategorias,
  getComentarios,
  getUsuarios,
  getIngredientes,
  getMenus,
  getInventario,
} from "../services/api.js";

import "../assets/styles/Listar.css";

const route = useRoute();
const router = useRouter();

const items = ref([]);
const tipo = ref(route.params.tipo);

const currentPage = ref(1);
const itemsPerPage = 20;

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return items.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage));

async function ListarCategorias() {
  try {
    items.value = await getCategorias();
  } catch (err) {
    console.error("Error cargando categorías:", err);
  }
}

async function ListarComentarios() {
  try {
    items.value = await getComentarios();
  } catch (err) {
    console.error("Error cargando comentarios:", err);
  }
}

async function ListarUsuarios() {
  try {
    items.value = await getUsuarios();
  } catch (err) {
    console.error("Error cargando usuarios:", err);
  }
}

async function ListarIngredientes() {
  try {
    items.value = await getIngredientes();
  } catch (err) {
    console.error("Error cargando ingredientes:", err);
  }
}

async function ListarDietas() {
  items.value = [];
}

async function ListarRecetas() {
  items.value = [];
}

async function ListarMenus() {
  try {
    items.value = await getMenus();
  } catch (err) {
    console.error("Error cargando menús:", err);
  }
}

async function ListarInventario() {
  try {
    items.value = await getInventario();
  } catch (err) {
    console.error("Error cargando inventario:", err);
  }
}

async function cargarDatos(tipo) {
  if (tipo === "ingredientes") {
    await ListarIngredientes();
  } else if (tipo === "categorias") {
    await ListarCategorias();
  } else if (tipo === "dietas") {
    await ListarDietas();
  } else if (tipo === "recetas") {
    await ListarRecetas();
  } else if (tipo === "menus") {
    await ListarMenus();
  } else if (tipo === "perfiles") {
    await ListarUsuarios();
  } else if (tipo === "comentarios") {
    await ListarComentarios();
  } else if (tipo === "inventario") {
    await ListarInventario();
  } else {
    items.value = [];
  }
  currentPage.value = 1;
}

function irAEdicion(item) {
  let query = {};

  if (tipo.value === "categorias") {
    query = { nombre: item.nombre, descripcion: item.descripcion };
  } else if (tipo.value === "perfiles") {
    query = { nombre: item.name, email: item.email };
  } else if (tipo.value === "comentarios") {
    query = {
      contenido: item.contenido,
      usuario: item.usuario,
      receta: item.receta,
    };
  } else if (tipo.value === "menus") {
    query = {
      nombre: item.nombre,
      usuario: item.usuario,
      fecha: item.fecha,
    };
  } else if (tipo.value === "ingredientes") {
    query = {
      nombre: item.nombre,
      descripcion: item.descripcion,
      unidad_medida: item.unidad_medida,
    };
  } else if (tipo.value === "inventario") {
    query = {
      cantidad: item.cantidad,
      ingrediente_id: item.ingrediente,
      usuario: item.usuario,
    };
  }

  router.push({
    name: "edicion",
    params: { tipo: tipo.value, id: item.id },
    query,
  });
}

cargarDatos(tipo.value);

watch(
  () => route.params.tipo,
  (nuevoTipo) => {
    tipo.value = nuevoTipo;
    cargarDatos(tipo.value);
  }
);
</script>
