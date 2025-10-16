<template>
  <section>
    <h1>Dietas</h1>

    <div class="beneficios" v-if="dietas.length">
      <div class="beneficio" v-for="dieta in dietas" :key="dieta.id">
        <h2>{{ dieta.nombre }}</h2>
        <p>{{ dieta.descripcion }}</p>
      </div>
    </div>

    <p v-else-if="error" class="error">{{ error }}</p>
    <p v-else>Cargando dietas...</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "../assets/styles/Estilos.css";

const dietas = ref([]);
const error = ref("");

onMounted(async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://127.0.0.1:8000/api/dietas", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) throw new Error("Error al cargar las dietas");

    dietas.value = await res.json();
  } catch (err) {
    console.error(err);
    error.value = "No se pudieron cargar las dietas. Verifica tu sesión.";
  }
});
</script>
