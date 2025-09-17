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
          placeholder="Introduce el nombre de la categoría"
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

      
      <button type="submit">Guardar Categoría</button>
    </form>

   
    <p v-if="mensaje" :class="{'exito': exito, 'error': !exito}">
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
const descripcion = ref("");
const mensaje = ref("");
const exito = ref(false);


async function guardarMenu() {
  if (!nombre.value || !descripcion.value) {
    mensaje.value = "Todos los campos son obligatorios";
    exito.value = false;
    return;
  }

  try {
    const res = await NuevoMenu({
      nombre: nombre.value,
      descripcion: descripcion.value,
    });

    mensaje.value = res.message || "Menú creado correctamente";
    exito.value = true;

    // Limpiar formulario
    nombre.value = "";
    descripcion.value = "";
  } catch (err) {
    console.error(err);
    mensaje.value = err.message || "Error al crear el menú";
    exito.value = false;
  }
}
</script>

