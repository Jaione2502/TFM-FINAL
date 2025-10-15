<template>
  <section>
    <h1>Recetas</h1>

    <div class="recipes" v-if="recetas.length">
      <div class="recipe" v-for="receta in recetas" :key="receta.id">
        <h2>{{ receta.titulo }}</h2>
        <p>{{ receta.descripcion }}</p>
        <p><strong>Tiempo:</strong> {{ receta.tiempo_preparacion }} min</p>
        <p><strong>Porciones:</strong> {{ receta.porciones }}</p>
      </div>
    </div>

    <p v-else>Cargando recetas...</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const recetas = ref([]);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:8000/api/recetas");
    recetas.value = await res.json();
  } catch (err) {
    console.error("Error al cargar recetas:", err);
  }
});
</script>
