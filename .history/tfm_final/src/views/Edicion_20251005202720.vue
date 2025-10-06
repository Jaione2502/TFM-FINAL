<template>
  <div class="edicion-container">
    <h1>Editar {{ tipo }}</h1>

    <form @submit.prevent="guardar">
      <!-- Categorias -->
      <template v-if="tipo === 'categorias'">
        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea v-model="form.descripcion"></textarea>
        </div>
      </template>

      <!-- Perfiles -->
      <template v-if="tipo === 'perfiles'">

        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Email:</label>
          <input v-model="form.email" type="email" />
        </div>
      </template>

      <!-- Comentarios -->
      <template v-if="tipo === 'comentarios'">
        <div>
          <label>Titulo receta:</label>
          <input v-model="form.receta" type="text" disabled />
        </div>

        <div>
          <label>Usuario:</label>
          <input v-model="form.usuario" type="text" disabled />
        </div>

        <div>
          <label>Comentario:</label>
          <textarea v-model="form.contenido"></textarea>
        </div>
      </template>

      <!-- Ingredientes -->
      <template v-if="tipo === 'ingredientes'">
        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea v-model="form.descripcion"></textarea>
        </div>

        <div>
          <label>Unidad de Medida:</label>
          <input v-model="form.unidad_medida" type="text" />
        </div>
      </template>

      <!-- Menus -->
      <template v-if="tipo === 'menus'">
        <div>
          <label>Usuario:</label>
          <input v-model="form.usuario" type="text" disabled />
        </div>

        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Fecha:</label>
          <input type="date" v-model="form.fecha" required />
        </div>
      </template>
       <!-- Inventario -->
       <template v-if="tipo === 'inventario'">
          <div>
            <label>Usuario:</label>
            <input v-model.number="form.usuario_id" disabled></input>
          </div>
          <div>
            <label>Ingrediente:</label>
            <input v-model.number="form.ingrediente_id" type="text" />
          </div>

          <div>
            <label>Cantidad:</label>
            <textarea v-model="form.cantidad"></textarea>
          </div>
       </template>

      <div class="botones">
        <button type="submit">Guardar</button>
        <button type="button" @click="eliminar">Eliminar</button>
      </div>
    </form>

    <p v-if="estado.mensaje" :class="{ exito: estado.exito, error: !estado.exito }">
      {{ estado.mensaje }}
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { actualizarItem, eliminarItem } from "../services/api.js";
import "../assets/styles/Edicion.css";

const route = useRoute();
const router = useRouter();

const tipo = ref(route.params.tipo);
const id = ref(Number(route.params.id));



const form = reactive({
  nombre: route.query.nombre || "",
  descripcion: route.query.descripcion || "",
  email: route.query.email || "",
  usuario: route.query.usuario || "",
  receta: route.query.receta || "",
  contenido: route.query.contenido || "",
  unidad_medida: route.query.unidad_medida || "",
  fecha: route.query.fecha || "",
  ingrediente_id : route.query.ingrediente_id || "",
  cantidad : route.query.cantidad || ""
});



const estado = reactive({
  mensaje: "",
  exito: false
});



  function validarFormulario() {
  if (tipo.value === "categorias") {
    return form.nombre.trim() !== "" && form.descripcion.trim() !== "";
  }
  if (tipo.value === "perfiles") {
    return form.nombre.trim() !== "" && form.email.trim() !== "";
  }
  if (tipo.value === "comentarios") {
    return form.receta && form.usuario && form.contenido.trim() !== "";
  }
  if (tipo.value === "ingredientes") {
    return form.nombre.trim() !== "" && form.descripcion.trim() !== "" && form.unidad_medida.trim() !== "";
  }
  if (tipo.value === "menus") {
    return form.usuario && form.nombre.trim() !== "" && form.fecha;
  }
  return true; 
}



async function guardar() {
  if (!validarFormulario()) {
    estado.mensaje = "Todos los campos obligatorios deben completarse";
    estado.exito = false;
    return;
  }

  try {
    let data;

    if (tipo.value === "categorias") {
      data = await actualizarItem("categoria", id.value, { 
        nombre: form.nombre, 
        descripcion: form.descripcion 
      });
    } else if (tipo.value === "perfiles") {
      data = await actualizarItem("usuario", id.value, { 
        name: form.nombre, 
        email: form.email 
      });
    } else if (tipo.value === "comentarios") {
      data = await actualizarItem("comentario", id.value, { 
        usuario: form.usuario, 
        receta: form.receta,
        contenido: form.contenido
      });   
    } else if (tipo.value === "ingredientes") {
      data = await actualizarItem("ingredientes", id.value, { 
        nombre: form.nombre, 
        descripcion: form.descripcion,
        unidad_medida: form.unidad_medida 
      });
    } else if (tipo.value === "menus") {
      data = await actualizarItem("menus", id.value, { 
        usuario_id: form.usuario,
        nombre: form.nombre, 
        fecha: form.fecha 
      });
    }
      else if (tipo.value === "inventario")  {
       data = await actualizarItem("inventario", id.value, { 
          usuario_id: usuario.value,
          ingrediente_id: ingrediente.value, 
          cantidad: cantidad.value 
        });
    }


    estado.mensaje = data.message || "Cambios guardados correctamente";
    estado.exito = true;
    
  
    setTimeout(() => { router.push({ name: "listar", params: { tipo: tipo.value } }); }, 1000);


   
    
  } catch (err) {
   
    estado.mensaje = err.message || "Error al guardar";
    estado.exito = false;
  }
}

async function eliminar() {
  if (!confirm("¿Seguro que quieres eliminar el elemento?")) return;

  try {

   
    const rutas = {
      categorias: "categoria",
      perfiles: "usuario",
      comentarios: "comentario",
      ingredientes: "ingredientes",
      menus: "menus"
    };

    const rutaApi = rutas[tipo.value];

    if (!rutaApi) throw new Error("Tipo no válido para eliminar");

    await eliminarItem(rutaApi, id.value);

  
    estado.mensaje = "Eliminado correctamente";
    estado.exito = true;

  
    setTimeout(() => {
      router.push({ name: "listar", params: { tipo: tipo.value } });
    }, 1000);

    
  } catch (err) {
    console.error(err);
    estado.mensaje = err.message || "Error al eliminar";
    estado.exito = false;
  }
}
</script>
