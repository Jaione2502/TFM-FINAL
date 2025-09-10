<template>
  <div>
    <h2>Listado de Categorías</h2>
    <ul v-if="categorias.length">
      <li v-for="cat in categorias" :key="cat.id">{{ cat.nombre }}</li>
    </ul>
    <p v-else>No hay categorías disponibles o no estás logueado.</p>
  </div>
</template>

<script>
import { getCategorias } from '../services/api.js';

export default {
  data() {
    return { categorias: [] };
  },
  async mounted() {
    try {
      this.categorias = await getCategorias();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>
