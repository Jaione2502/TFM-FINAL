<template>
  <div class="edicion-container">
    <h1>Editar {{ tipo }}</h1>

    <form @submit.prevent="guardar">
      <div>
        <label>Nombre:</label>
        <input v-model="nombre" type="text" />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea v-model="descripcion"></textarea>
      </div>

      <div class="botones">
        <button type="submit">Guardar</button>
        <button type="button" @click="eliminar">Eliminar</button>
      </div>
    </form>

    <p v-if="mensaje" :class="{ exito: exito, error: !exito }">{{ mensaje }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { actualizarItem, eliminarItem } from "../services/api.js";

const route = useRoute();
const router = useRouter();

const tipo = route.params.tipo;
const id = route.params.id;


const nombre = ref(route.query.nombre || "");
const descripcion = ref(route.query.descripcion || "");

const mensaje = ref("");
const exito = ref(false);

// Actualizar elemento
async function guardar() {
  try {
    if (tipo === "categorias") 
        {
            const data = await actualizarItem("categoria", id, {
            nombre: nombre.value,
            descripcion: descripcion.value
        });
    }
    
    mensaje.value = data.message || "Cambios guardados correctamente";
    exito.value = true;
  } catch (err) {
    mensaje.value = err.message || "Error al guardar";
    exito.value = false;
  }
}

// Eliminar elemento 
async function eliminar() {
  if (!confirm("¿Seguro que quieres eliminar el elemento?")) return;

  try {
     if (tipo === "categorias") {
        await eliminarItem("categoria", id);
     }
    
    alert("Eliminado correctamente");
    router.push({ name: "listar", params: { tipo } });
  } catch (err) {
    mensaje.value = err.message || "Error al eliminar";
    exito.value = false;
  }
}
</script>

<style scoped>
.edicion-container {
  max-width: 500px;
  margin: auto;
}

form div {
  margin-bottom: 1rem;
}

.botones button {
  margin-right: 10px;
}

.exito {
  color: green;
}

.error {
  color: red;
}
</style>
