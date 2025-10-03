<template>
  <div class="comentario-container">
    <h1 class="comentario-titulo">Nuevo Comentario</h1>

    <form @submit.prevent="enviarComentario" class="comentario-form">
      <!-- Selección de Receta -->
      <div>
        <label for="receta">Receta:</label>
        <select id="receta" v-model="form.receta_id" required>
          <option value="" disabled>Selecciona una receta</option>
          <option v-for="receta in recetas" :key="receta.id" :value="receta.id">
            {{ receta.titulo }}
          </option>
        </select>
      </div>

      <!-- Selección de Usuario -->
      <div>
        <label for="usuario">Usuario:</label>
        <select id="usuario" v-model="form.usuario_id" required>
          <option value="" disabled>Selecciona un usuario</option>
          <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
            {{ usuario.name }}
          </option>
        </select>
      </div>

      <!-- Contenido del comentario -->
      <div>
        <label for="contenido">Comentario:</label>
        <textarea id="contenido" v-model="form.contenido" placeholder="Escribe tu comentario..." required></textarea>
      </div>

      <button type="submit" :disabled="loading">
        Guardar
      </button>

      <p v-if="estado.mensaje" :class="{'mensaje-ok': estado.exito, 'mensaje-error': !estado.exito}">
        {{ estado.mensaje }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { getRecetas, getUsuarios, NuevoComentario } from "../services/api.js"; 
import "../assets/styles/Comentarios.css";


const form = reactive({
  receta_id: "",
  usuario_id: "",
  contenido: ""
});


const estado = reactive({
  mensaje: "",
  exito: false
});


const recetas = ref([]);
const usuarios = ref([]);
const loading = ref(false);


async function cargarDatos() {
  try {
    recetas.value = await getRecetas();
    usuarios.value = await getUsuarios();
  } catch (err) {
    estado.mensaje = "Error al cargar datos";
    estado.exito = false;
  }
}

onMounted(cargarDatos);


function validarFormulario() {
  return Object.entries(form).every(([key, value]) => {
    if (typeof value === "string") return value.trim() !== "";
    return value != null && value !== ""; 
  });
}

async function enviarComentario() {
  if (!validarFormulario()) {
    estado.mensaje = "Todos los campos son obligatorios";
    estado.exito = false;
    return;
  }


  estado.mensaje = "";
  
  try 
  {
    await NuevoComentario(form);
    estado.mensaje = "Comentario generado correctamente";
    estado.exito = true;
  
    Object.keys(form).forEach(key => form[key] = "");
   
  } 
  catch (err) 
  {
    console.error(err);
    estado.mensaje = "Error al generar el comentario";
    estado.exito = false;
  }
}
</script>
