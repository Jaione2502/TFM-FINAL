<template>

  <div class="buscador-container"> 
    <h1>Buscador de {{ tipo }}</h1> 

    <div class="buscador-form"> 
      <input type="number" v-model="id" placeholder="Introduce un ID"  @keyup.enter="cargarDatos(tipo)"  /> 
      <button @click="cargarDatos(tipo)">Buscar</button> 
    </div> 


    <div v-if="resultado">

      <!-- Categorías -->
      <div v-if="tipo === 'categorias'" :key="resultado.id" class="resultado-card" @click="irAEdicion(resultado)">
        <h2>{{ resultado.nombre }}</h2>
        <p>{{ resultado.descripcion }}</p>
      </div>

      <!-- Perfiles -->
      <div v-if="tipo === 'perfiles'" :key="resultado.id" class="resultado-card" @click="irAEdicion(resultado)">
        <h2>{{ resultado.name }}</h2>
        <p>{{ resultado.email }}</p>
      </div>
      
         <!-- Comentarios -->
      <div v-if="tipo === 'comentarios'" :key="resultado.id" class="resultado-card" @click="irAEdicion(resultado)">
        <h2>{{ resultado.receta }}</h2>
        <p>{{ resultado.usuario }}</p>
        <p>{{ resultado.contenido }}</p>
      </div>

      <!-- Ingredientes -->
      <div v-if="tipo === 'ingredientes'" :key="resultado.id" class="resultado-card" @click="irAEdicion(resultado)">
        <h2>{{ resultado.nombre }}</h2>
        <p>{{ resultado.descripcion }}</p>
        <p>{{ resultado.unidad_medida }}</p>
      </div>
      <!-- Recetas -->
      <!-- Dietas -->
      <!-- Menús -->
      <div v-if="tipo === 'menus'" :key="resultado.id" class="resultado-card" @click="irAEdicion(resultado)">
        <h2>{{ resultado.nombre }}</h2>
        <p>{{ resultado.usuario }}</p>
        <p>{{ resultado.fecha }} </p>
      </div>
      <!-- Inventario -->
      <div v-if="tipo === 'inventario'" :key="resultado.id" class="resultado-card" @click="irAEdicion(resultado)">
        <h2>{{ resultado.ingrediente }}</h2>
        <p>{{ resultado.usuario }}</p>
        <p>{{ resultado.cantidad }} </p>
      </div>
    </div>

 
    <p v-else-if="buscado">No se encontró ningun@ {{ tipo }}</p>
  </div>
</template>



<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";  
import { getCategoriasByID } from "../services/api.js";
import { getUsuarioByID } from "../services/api.js";
import { getIngredientesByID } from "../services/api.js";
import { getMenuByID } from "../services/api.js";
import { getComentariosByID } from "../services/api.js"; 
import { getInventarioByID } from "../services/api.js";

import "../assets/styles/Buscar.css";

const route = useRoute();
const tipo = ref(route.params.tipo);
const id = ref("");
const router = useRouter();  


const resultado = ref(null);

const buscado = ref(false);

async function BuscarCategoria() {
  try {
    const res = await getCategoriasByID(id.value);
    if (res) {
      resultado.value = res;
      buscado.value = true;
    } else {
      resultado.value = null;
      buscado.value = true;
    }
  } catch (err) {
    console.error("Error buscando categorías:", err);
    resultado.value = null;
    buscado.value = true;
  }
}


async function BuscarPerfiles() {
    try {
    const res = await getUsuarioByID(id.value);
    if (res) {
      resultado.value = res;
      buscado.value = true;
    } else {
      resultado.value = null;
      buscado.value = true;
    }
  } catch (err) {
    console.error("Error buscando perfiles:", err);
    resultado.value = null;
    buscado.value = true;
  }
  
}

async function BuscarIngredientes() {
  try {
    const res = await getIngredientesByID(id.value);
    if (res) {
      resultado.value = res;
      buscado.value = true;
    } else {
      resultado.value = null;
      buscado.value = true;
    }
  } catch (err) {
    console.error("Error cargando ingredientes:", err);
    resultado.value = null;
    buscado.value = true;
  }
}

async function BuscarMenus() {
  try {
    const res = await getMenuByID(id.value);
    if (res) {
      resultado.value = res;
      buscado.value = true;
    } else {
      resultado.value = null;
      buscado.value = true;
    }
  } catch (err) {
    console.error("Error cargando menú:", err);
    resultado.value = null;
    buscado.value = true;
  }
}

async function BuscarInventarios(){
   try {
    const res = await getInventarioByID(id.value);
    if (res) {
      resultado.value = res;
      buscado.value = true;
    } else {
      resultado.value = null;
      buscado.value = true;
    }
  } catch (err) {
    console.error("Error cargando inventarios:", err);
    resultado.value = null;
    buscado.value = true;
  }
}

async function BuscarComentarios(){
   try {
    const res = await getComentariosByID(id.value);
    if (res) {
      resultado.value = res;
      buscado.value = true;
    } else {
      resultado.value = null;
      buscado.value = true;
    }
  } catch (err) {
    console.error("Error cargando comentario:", err);
    resultado.value = null;
    buscado.value = true;
  }
}

async function BuscarDietas() {
  console.log("Aquí llamarías a getDietas()");
  resultado.value = { id: id.value, nombre: "Dieta de ejemplo" };
  buscado.value = true;
}

async function BuscarRecetas() {
  console.log("Aquí llamarías a getRecetas()");
  resultado.value = { id: id.value, nombre: "Receta de ejemplo" };
  buscado.value = true;
}


async function cargarDatos(tipo) {
  if (tipo === "ingredientes") {
    await BuscarIngredientes();
  } else if (tipo === "categorias") {
    await BuscarCategoria();
  } else if (tipo === "dietas") {
    await BuscarDietas();
  } else if (tipo === "recetas") {
    await BuscarRecetas();
  } else if (tipo === "menus") {
    await BuscarMenus();
  } else if (tipo=="perfiles"){
    await BuscarPerfiles();
  } else if (tipo=="comentarios"){
    await BuscarComentarios();
  } else if (tipo=="inventario"){
    await BuscarInventarios();
  } else {
    items.value = [];
  }
}


function irAEdicion(item) {
  let query = {};
  console.log = item.id;
  // Dependiendo del tipo, pasamos distintos campos
  if (tipo.value === "categorias") {
    query = { nombre: item.nombre, descripcion: item.descripcion };
  } else if (tipo.value === "perfiles") {
    query = { nombre: item.name, email: item.email };
  } else if (tipo.value ==="comentarios") {
    query = {contenido: item.contenido , usuario: item.usuario , receta: item.receta};
  } else if (tipo.value ==="menus") {
    query = {nombre: item.nombre , usuario: item.usuario , fecha: item.fecha};
  } else if (tipo.value ==="inventario") {
    query = {cantidad: item.cantidad , ingrediente: item.ingrediente , usuario: item.usuario};
  } else if (tipo.value ==="ingredientes") {
    query = {nombre: item.nombre , descripcion: item.descripcion , unidad_medida: item.unidad_medida};
  }

  router.push({
    name: "edicion",
    params: { tipo: tipo.value, id: item.id },
    query
  });
}

watch(
  () => route.params.tipo,
  (nuevoTipo) => {
    tipo.value = nuevoTipo;
    cargarDatos(tipo.value);
  }
);
</script>
