<template>
  <div class="alta-categoria-container">
    <h1>Nueva Categoría</h1>

    <form @submit.prevent="guardarCategoria" class="formulario">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="form.nombre"
          placeholder="Introduce el nombre de la categoría"
          required
        />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          v-model="form.descripcion"
          placeholder="Introduce una descripción"
          required
        ></textarea>
      </div>

      <button type="submit">Guardar Categoría</button>
    </form>

    <p v-if="estado.mensaje" :class="{'exito': estado.exito, 'error': !estado.exito}">
      {{ estado.mensaje }}
    </p>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { NuevaCategoria } from "../services/api.js"; 
import "../assets/styles/Categorias.css"; 

const router = useRouter();


const form = reactive({
  nombre: "",
  descripcion: ""
});


const estado = reactive({
  mensaje: "",
  exito: false
});


function validarFormulario() {
  return Object.values(form).every(value => value.trim() !== "");
}

async function guardarCategoria() {
  if (!validarFormulario()) {
    estado.mensaje = "Todos los campos son obligatorios";
    estado.exito = false;
    return;
  }

  try {
    const res = await NuevaCategoria(form);
    estado.mensaje = res.message || "Categoría creada correctamente";
    estado.exito = true;

   
    Object.keys(form).forEach(key => form[key] = "");

  
   router.push({ name: "listar", params: { tipo: "categorias" } });

  } catch (err) {
    console.error(err);
    estado.mensaje = err.response?.data?.message || "Error al crear la categoría";
    estado.exito = false;
  }
}
</script>
