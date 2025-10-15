<template>
  <div class="alta-categoria-container">
    <h1>Nuevo Menú</h1>

    <form @submit.prevent="guardarMenu" class="formulario">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="nombre"
          placeholder="Introduce el nombre del menú"
          required
        />
      </div>

      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input
          type="date"
          id="fecha"
          v-model="fecha"
          required
        />
      </div>

      <button type="submit">Guardar Menú</button>
    </form>

    <p v-if="mensaje" :class="{ exito: exito, error: !exito }">
      {{ mensaje }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NuevoMenu } from "../services/api.js";
import "../assets/styles/Categorias.css";

const router = useRouter();

const nombre = ref("");
const fecha = ref("");
const mensaje = ref("");
const exito = ref(false);

const usuarioId = localStorage.getItem("user_id");

async function guardarMenu() {
  if (!nombre.value || !fecha.value) {
    mensaje.value = "Nombre y fecha son obligatorios";
    exito.value = false;
    return;
  }

  try {
    const res = await NuevoMenu({ 
      nombre: nombre.value,
      fecha: fecha.value,
    });

    mensaje.value = res.message || "Menú creado correctamente";
    exito.value = true;

    nombre.value = "";
    fecha.value = "";

    
  } catch (err) {
    console.error(err);
    mensaje.value = err?.message || "Error al crear el menú";
    exito.value = false;
  }
}
</script>
