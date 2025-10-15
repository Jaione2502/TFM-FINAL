<template>
  <div class="listar-container">
    <h1>Listado de {{ tipo }}</h1>
    <div class="card-grid">
      <div v-for="item in items" 
        :key="item.id" 
        class="card"
        @click="irAEdicion(item)" >

        <template v-if="tipo === 'perfiles'">
            <h2 class="card-title">{{ item.name }}</h2>
            <p>{{ item.email }}</p>
        </template>
        <template v-if="tipo === 'categorias'">
            <h2 class="card-title">{{ item.nombre }}</h2>
            <p>{{ item.descripcion }}</p>
        </template>
       
        <template v-if="tipo === 'ingredientes'">
          <h2 class="card-title">{{ item.nombre }}</h2>
          <p>{{ item.descripcion }}</p>
          <p>{{ item.unidad_medida }}</p>
         </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";  
import { getCategorias } from "../services/api.js";
import { getUsuarios } from "../services/api.js";
import { getIngredientes } from "../services/api.js";
import { getMenus } from "../services/api.js";

import "../assets/styles/Listar.css";

const route = useRoute();
const router = useRouter();  
const items = ref([]);
const tipo = ref(route.params.tipo);

async function ListarCategorias() {
  try {
    items.value = await getCategorias();
  } catch (err) {
    console.error("Error cargando categorías:", err);
  }
}

async function ListarUsuarios() {
  try{
    items.value = await getUsuarios();
  }catch (err){
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
  console.log("Aquí llamarías a getDietas()");
  items.value = [];
}

async function ListarRecetas() {
  console.log("Aquí llamarías a getRecetas()");
  items.value = [];
}

async function ListarMenus() {
  try {
    items.value = await getMenus();
  } catch (err) {
    console.error("Error cargando menús:", err);
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
  } else if (tipo=="perfiles"){
    await ListarUsuarios();
  } else {
    items.value = [];
  }
}


function irAEdicion(item) {
  let query = {};

  // Dependiendo del tipo, pasamos distintos campos
  if (tipo.value === "categorias") {
    query = { nombre: item.nombre, descripcion: item.descripcion };
  } else if (tipo.value === "perfiles") {
    query = { nombre: item.name, email: item.email };
  }

  router.push({
    name: "edicion",
    params: { tipo: tipo.value, id: item.id },
    query
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
