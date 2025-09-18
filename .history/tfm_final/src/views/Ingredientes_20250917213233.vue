<template>
  <div class="alta-categoria-container">
    <h1>Nuevo Ingrediente</h1>

    <form @submit.prevent="guardarIngrediente" class="formulario">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="nombre"
          placeholder="Introduce el nombre del ingrediente"
          required
        />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          v-model="descripcion"
          placeholder="Introduce una descripción"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="unidad_medida">Unidad de medida:</label>
        <input
          type="text"
          id="unidad_medida"
          v-model="unidad_medida"
          placeholder="Ej: gramos, litros..."
          required
        />
      </div>

      <button type="submit">Guardar Ingrediente</button>
    </form>

    <p v-if="mensaje" :class="{ exito: exito, error: !exito }">
      {{ mensaje }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NuevoIngrediente } from "../services/api.js";
import "../assets/styles/Categorias.css";

const router = useRouter();

const nombre = ref("");
const descripcion = ref("");
const unidad_medida = ref("");
const mensaje = ref("");
const exito = ref(false);

async function guardarIngrediente() {
  if (!nombre.value || !descripcion.value || !unidad_medida) {
    mensaje.value = "Todos los campos son obligatorios";
    exito.value = false;
    return;
  }

  try {
    const res = await NuevoIngrediente({
      nombre: nombre.value,
      descripcion: descripcion.value,
      unidad_medida: unidad_medida.value,
    });

    mensaje.value = res.message || "Ingrediente creado correctamente";
    exito.value = true;
    
    nombre.value = "";
    descripcion.value = "";
  } catch (err) {
    console.error(err);
    mensaje.value = err.message || "Error al crear la ingrediente";
    exito.value = false;
  }
}
</script>
