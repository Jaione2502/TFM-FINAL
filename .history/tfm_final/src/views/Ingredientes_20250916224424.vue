<template>
  <div>
    <h2>Listado de Ingredientes</h2>
    <ul v-if="ingredientes.length">
      <li v-for="ing in ingredientes" :key="ing.id">{{ ing.nombre }}</li>
    </ul>
    <p v-else>No hay ingredientes disponibles o no estás logueado.</p>
  </div>
</template>

<script>
import { getIngredientes } from '../services/api.js';

export default {
  data() {
    return { ingredientes: [] };
  },
  async mounted() {
    try {
      this.ingredientes = await getIngredientes();
    } catch (err) {
      console.error(err);
    }
  }
};
</script>