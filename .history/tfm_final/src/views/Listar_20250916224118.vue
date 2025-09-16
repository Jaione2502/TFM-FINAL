<template>
  <div class="listar-container">
    <h1>Listado de {{ tipo }}</h1>

    <div class="card-grid">
      <div v-for="item in items" :key="item.id" class="card">
        <h2 class="card-title">{{ item.nombre }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getCategorias } from "../services/api.js";
import { getIngredientes } from "../services/api.js";
import "../assets/styles/Listar.css";

const route = useRoute();
const items = ref([]);
const tipo = ref(route.params.tipo);


async function ListarCategorias() {
  try {
    items.value = await getCategorias();
  } catch (err) {
    console.error("Error cargando categorías:", err);
  }
}

async function ListarIngredientes() {
  console.log("Aquí llamarías a getIngredientes()");
  items.value = []; 
}

async function ListarDietas() {
  console.log("Aquí llamarías a getDietas()");
  items.value = [];
}

async function ListarRecetas() {
  console.log("Aquí llamarías a getRecetas()");
  items.value = [];
}

async function ListarMenus() {
  console.log("Aquí llamarías a getMenus()");
  items.value = [];
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
  } else {
    items.value = [];
  }
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
