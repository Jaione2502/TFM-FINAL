<template> 
  <div class="buscador-container"> 
    <h1>Buscador de {{ tipo }}</h1> 
    <div class="buscador-form"> 
      <input type="number" v-model="id" placeholder="Introduce un ID" @keyup.enter="cargarDatos(tipo)" /> 
      <button @click="cargarDatos(tipo)">Buscar</button> 
    </div> 

    <div v-if="resultado" class="resultado-card"> 
        <h2>{{ resultado.nombre }}</h2> 
        </div> 
        <p v-else-if="buscado"> No se encontró ningun@ {{ tipo }}</p> 
    </div> 
</template>


<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getCategoriasByID } from "../services/api.js";
import { getIngredientesyID } from "../services/api.js";
import "../assets/styles/Buscar.css";

const route = useRoute();
const tipo = ref(route.params.tipo);
const id = ref("");


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
    console.error("Error cargando categorías:", err);
    resultado.value = null;
    buscado.value = true;
  }
}

async function BuscarIngredientes() {
  try {
    const res = await getIngredienteByID(id.value);
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

async function BuscarMenus() {
  console.log("Aquí llamarías a getMenus()");
  resultado.value = { id: id.value, nombre: "Menú de ejemplo" };
  buscado.value = true;
}

// Función principal que decide qué fetch ejecutar
async function cargarDatos(tipo) {
  resultado.value = null;
  buscado.value = false;

  switch (tipo) {
    case "categorias":
      await BuscarCategoria();
      break;
    case "ingredientes":
      await BuscarIngredientes();
      break;
    case "dietas":
      await BuscarDietas();
      break;
    case "recetas":
      await BuscarRecetas();
      break;
    case "menus":
      await BuscarMenus();
      break;
    default:
      console.warn("Tipo no reconocido");
  }
}

// Observa cambios en la ruta
watch(
  () => route.params.tipo,
  (nuevoTipo) => {
    tipo.value = nuevoTipo;
    cargarDatos(tipo.value);
  }
);
</script>
