<template>
  <div class="comentario-container">
    <h3>Crear Menú</h3>

    <form class="comentario-form">

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
        <div>
            <label>Nombre:</label>
            <input v-model="nombre" type="text" />
          </div>
        <div>
            <label for="contenido">Fecha:</label>
            <input type="date" name="fecha" id="fecha">
        </div>

       
        <button type="button" @click="enviarMenu" :disabled="loading">
            Guardar
        </button>

        <p v-if="mensaje" class="mensaje-ok">{{ mensaje }}</p>
        <p v-if="error" class="mensaje-error">{{ error }}</p>
        </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getMenus,  getUsuarios, NuevoMenu } from "../services/api.js"; 
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
    usuarios.value = await getUsuarios();
  } catch (err) {
    error.value = "Error al cargar los usuarios";
  }
});




const enviarMenu = async () => {
  if (!name.value || !usuario_id.value) return;

  loading.value = true;
  mensaje.value = "";
  error.value = "";

  try {
    
    await NuevoMenu({
      usuario_id: usuario_id.value,
      receta_id: receta_id.value,
      contenido: contenido.value,
    });

    mensaje.value = "Menu enviado con éxito";
    receta_id.value = "";
    contenido.value = "";
    usuario_id.value ="";
  } catch (err) {
    error.value = "Error al enviar el menú";
  } finally {
    loading.value = false;
  }
};
</script>

