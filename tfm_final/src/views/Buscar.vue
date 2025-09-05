<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const items = ref([]); // aquí guardamos los datos



function fetchIngredientes() {
  items.value = ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3"];
}

function fetchCategorias() {
  items.value = ["Categoría 1", "Categoría 2", "Categoría 3"];
}

function fetchDietas() {
  items.value = ["Dieta 1", "Dieta 2", "Dieta 3"];
}

function fetchRecetas() {
  items.value = ["Receta 1", "Receta 2", "Receta 3"];
}

function fetchMenus() {
  items.value = ["Menu 1", "Menu 2", "Menu 3"];
}



// Controlador según el tipo
function cargarDatos(tipo) {
  if (tipo === "ingredientes") {
    fetchCategorias();
  } else if (tipo === "categorias") {
    fetchIngredientes();
  } else if (tipo === "dietas") {
    fetchDietas();
  } else if (tipo === "recetas") {
    fetchRecetas();
  } else if (tipo === "menus") {
    fetchMenus();
  } else {
    items.value = [];
  }
}

// Según lo que estemos buscando llamaremos a un lado u a otro
watch(
  () => route.params.tipo,
  (nuevo) => {
    console.log("Cambio a:", nuevo);
    cargarDatos(nuevo);
  },
  { immediate: true } 
);
</script>

<template>
  <div>
    <h1>Listar {{ route.params.tipo }}</h1>
    <ul>
      <li v-for="(item, i) in items" :key="i">{{ item }}</li>
    </ul>
  </div>
</template>
