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

    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else>Cargando recetas...</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "../assets/styles/Recetas.css";

const props = defineProps({
  apiToken: String,
  apiUrl: {
    type: String,
    default: "http://127.0.0.1:8000/api"
  }
});

const recetas = ref([]);
const error = ref("");

onMounted(async () => {
  if (!props.apiToken) {
    error.value = "Token de autenticación no proporcionado";
    return;
  }

  try {
    const res = await fetch(`${props.apiUrl}/recetas`, {
      headers: {
        Authorization: `Bearer ${props.apiToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Error al cargar las recetas");

    recetas.value = await res.json();
  } catch (err) {
    console.error(err);
    error.value = "No se pudieron cargar las recetas. Verifica tu sesión.";
  }
});
</script>

