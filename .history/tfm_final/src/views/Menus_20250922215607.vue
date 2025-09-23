<template>
  <div class="comentario-container">
    <h3>Crear Menú</h3>

    <form class="comentario-form">
        <!-- Selección de Receta -->
        <div>
            <label for="receta">Receta:</label>
            <select id="receta" v-model="receta_id"  required>
            <option value="" disabled>Selecciona una receta</option>
            <option v-for="receta in recetas" :key="receta.id" :value="receta.id">
                {{ receta.titulo }}
            </option>
            </select>
        </div>

        <!-- Usuarios -->
         <div>
            <label for="usuario">Usuario:</label>
            <select id="usuario" v-model="usuario_id"  required>
            <option value="" disabled>Selecciona un usuario</option>
            <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
                {{ usuario.name }}
            </option>
            </select>
        </div>

        <!-- Contenido del comentario -->
        <div>
            <label for="contenido">Comentario:</label>
            <textarea id="contenido" v-model="contenido" placeholder="Escribe tu comentario..." required></textarea>
        </div>

       
        <button type="button" @click="enviarComentario" :disabled="loading">
            Guardar
        </button>

        <p v-if="mensaje" class="mensaje-ok">{{ mensaje }}</p>
        <p v-if="error" class="mensaje-error">{{ error }}</p>
        </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getRecetas,  getUsuarios, NuevoComentario } from "../services/api.js"; 
import "../assets/styles/Comentarios.css";

const receta_id = ref("");
const usuario_id = ref("");
const contenido = ref("");
const recetas = ref([]);
const usuarios = ref([]);
const loading = ref(false);
const mensaje = ref("");
const error = ref("");
 

onMounted(async () => {
  try {
    recetas.value = await getRecetas();
  } catch (err) {
    error.value = "Error al cargar las recetas";
  }
});

onMounted(async () => {
  try {
    usuarios.value = await getUsuarios();
  } catch (err) {
    error.value = "Error al cargar los usuarios";
  }
});




const enviarComentario = async () => {
  if (!receta_id.value || !contenido.value || !usuario_id.value) return;

  loading.value = true;
  mensaje.value = "";
  error.value = "";

  try {
    
    await NuevoComentario({
      usuario_id: usuario_id.value,
      receta_id: receta_id.value,
      contenido: contenido.value,
    });

    mensaje.value = "Comentario enviado con éxito";
    receta_id.value = "";
    contenido.value = "";
    usuario_id.value ="";
  } catch (err) {
    error.value = "Error al enviar el comentario";
  } finally {
    loading.value = false;
  }
};
</script>

