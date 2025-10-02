<template>
  <div class="edicion-container">
    <h1>Editar {{ tipo }}</h1>

    <form @submit.prevent="guardar">
      <!-- Categorias -->
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
       <!-- Perfiles -->
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

       <!-- Comentarios -->
        <template v-if="tipo === 'comentarios'">
          <div>
            <label>Titulo receta:</label>
            <input v-model="receta" type="text" disabled  />
          </div>

          <div>
            <label>Usuario:</label>
            <textarea v-model="usuario" disabled ></textarea>
          </div>

           <div>
            <label>Comentario:</label>
            <textarea v-model="contenido"></textarea>
          </div>
       </template>

        <!-- Ingredientes -->
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

        <!-- Menus -->
       <template v-if="tipo === 'menus'">
          <div>
            <label>Usuario:</label>
            <input v-model="usuario" disabled></input>
          </div>
          <div>
            <label>Nombre:</label>
            <input v-model="nombre" type="text" />
          </div>

          <div>
            <label>Fecha:</label>
            <input type="date" id="fecha" v-model="fecha" name="fecha" required>
          </div>
       </template>

        <!-- Inventario -->
       <template v-if="tipo === 'inventario'">
          <div>
            <label>Usuario:</label>
            <input v-model="usuario" disabled></input>
          </div>
          <div>
            <label>Ingrediente:</label>
            <input v-model="ingrediente_id" type="text" />
          </div>

          <div>
            <label>Cantidad:</label>
            <textarea v-model="cantidad"></textarea>
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

const tipo = ref(route.params.tipo);
const id = ref(Number(route.params.id));


const nombre = ref(route.query.nombre || "");
const descripcion =  ref(route.query.descripcion || "");
const email = ref(route.query.email || "");
const usuario = ref(route.query.usuario ?? "");
const receta = ref(route.query.receta || "");
const contenido = ref(route.query.contenido || "");
const unidad_medida = ref(route.query.unidad_medida || "");
const fecha = ref(route.query.fecha || "");
const ingrediente = ref(route.query.ingrediente || "");
const ingrediente_id = ref(route.query.ingrediente_id || "");
const cantidad = ref(route.query.cantidad || "");

const mensaje = ref("");
const exito = ref(false);



async function guardar() {
  try {
    let data = {};
    if (tipo.value === "categorias") 
      {
        data = await actualizarItem("categoria", id.value, { 
          nombre: nombre.value, 
          descripcion: descripcion.value 
        });
      }
    else if (tipo.value === "perfiles")  {
       data = await actualizarItem("usuario", id.value, { 
          name: nombre.value, 
          email: email.value 
        });
      }
    else if (tipo.value === "comentarios")  {
       data = await actualizarItem("comentario", id.value, { 
          usuario: usuario.value, 
          receta: receta.value ,
          contenido: contenido.value
        });   
    }
    else if (tipo.value === "ingredientes")  {
       data = await actualizarItem("ingredientes", id.value, { 
          nombre: nombre.value, 
          descripcion: descripcion.value,
          unidad_medida: unidad_medida.value 
        });

    }
    else if (tipo.value === "menus")  {
       data = await actualizarItem("menus", id.value, { 
          usuario_id: usuario.value,
          nombre: nombre.value, 
          fecha: fecha.value 
        });
    }
    else if (tipo.value === "inventario")  {
       data = await actualizarItem("inventario", id.value, { 
          usuario: usuario.value,
          ingrediente_id: ingrediente.value, 
          cantidad: cantidad.value 
        });
    }

    mensaje.value = data.message || "Cambios guardados correctamente";
    alert("Cambios guardados correctamente");
    router.push({ name: "listar", params: { tipo: tipo.value } });
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
     if (tipo.value === "categorias") {
        await eliminarItem("categoria", id.value);
     }
     else if (tipo.value ==="perfiles"){
        await eliminarItem("usuario", id.value);
    }
      else if (tipo.value ==="comentarios"){
        await eliminarItem("comentario", id.value);
     }
     else if (tipo.value === "ingredientes") {
      await eliminarItem("ingredientes", id.value);
     }
     else if (tipo.value === "menus") {
      await eliminarItem("menus", id.value);
     }
      else if (tipo.value === "inventario") {
        await eliminarItem("inventario", id.value);
    }
    
    alert("Eliminado correctamente");
    router.push({ name: "listar", params: { tipo: tipo.value } });
  } catch (err) {
    mensaje.value = err.message || "Error al eliminar";
    exito.value = false;
  }
}
</script>

