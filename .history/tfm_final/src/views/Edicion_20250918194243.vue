<template>
  <div class="edicion-container">
    <h1>Editar {{ tipo }}</h1>

    <form @submit.prevent="guardar">
       <template v-if="tipo === 'categorias'">
          <div>
            <label>Nombre:</label>
            <input v-model="nombre" type="text" />
          </div>

          <div>
            <label>Descripción:</label>
            <textarea v-model="descripcion"></textarea>
          </div>
       </template>
        <template v-if="tipo === 'perfiles'">
          <div>
            <label>Nombre:</label>
            <input v-model="nombre" type="text" />
          </div>

          <div>
            <label>Email:</label>
            <textarea v-model="email"></textarea>
          </div>
       </template>
       <template v-if="tipo === 'ingredientes'">
          <div>
            <label>Nombre:</label>
            <input v-model="nombre" type="text" />
          </div>

          <div>
            <label>Descripción:</label>
            <textarea v-model="descripcion"></textarea>
          </div>
          <div>
            <label>Unidad de Medida:</label>
            <textarea v-model="unidad_medida"></textarea>
          </div>
       </template>


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
import "../assets/styles/Edicion.css";

const route = useRoute();
const router = useRouter();

const tipo = route.params.tipo;
const id = route.params.id;


const nombre = ref(route.query.nombre || "");
const descripcion =  ref(route.query.descripcion || "");
const email = ref(route.query.email || "");

const mensaje = ref("");
const exito = ref(false);



async function guardar() {
  try {
    let data = {};
    if (tipo === "categorias") 
      {
        const data = await actualizarItem("categoria", id, { 
          nombre: nombre.value, 
          descripcion: descripcion.value 
        });
      }
    else if (tipo === "perfiles")  {
       const data = await actualizarItem("usuario", id, { 
          name: nombre.value, 
          email: email.value 
        });

    }
    mensaje.value = data.message || "Cambios guardados correctamente";
    alert("Cambios guardados correctamente");
    router.push({ name: "listar", params: { tipo } });
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
     else if (tipo ==="perfiles"){
      await eliminarItem("usuario", id);
     }
    
    alert("Eliminado correctamente");
    router.push({ name: "listar", params: { tipo } });
  } catch (err) {
    mensaje.value = err.message || "Error al eliminar";
    exito.value = false;
  }
}
</script>

