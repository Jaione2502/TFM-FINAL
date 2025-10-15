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
       <template v-if="tipo === 'menus'">
          <div>
            <label>Nombre:</label>
            <input v-model="nombre" type="text" />
          </div>

          <div>
            <label>Fecha:</label>
            <textarea v-model="fecha"></textarea>
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


const nombre = ref("");
const descripcion = ref("");
const email = ref("");
const unidad_medida = ref("");
const fecha = ref("");

const mensaje = ref("");
const exito = ref(false);

async function cargarItem() {
  try {
    mensaje.value = "";
    let data;

    if (tipo.value === "ingredientes") {
      data = await getIngredientesByID(id.value);
      data = data?.data ?? data;
      nombre.value = data?.nombre ?? "";
      descripcion.value = data?.descripcion ?? "";
      unidad_medida.value = data?.unidad_medida ?? "";
    } else if (tipo.value === "menus") {
      data = await getMenuByID(id.value);
      data = data?.data ?? data;
      nombre.value = data?.nombre ?? "";
      // normaliza a YYYY-MM-DD si viene con tiempo
      const f = (data?.fecha || "").toString().slice(0, 10);
      fecha.value = f;
    } else if (tipo.value === "categorias") {
      data = await getCategoriasByID(id.value);
      data = data?.data ?? data;
      nombre.value = data?.nombre ?? "";
      descripcion.value = data?.descripcion ?? "";
    } else if (tipo.value === "perfiles") {
      data = await getUsuarioByID(id.value);
      data = data?.data ?? data;
      nombre.value = data?.name ?? data?.nombre ?? "";
      email.value = data?.email ?? "";
    } else {
      mensaje.value = "Tipo no soportado";
    }
  } catch (e) {
    console.error(e);
    mensaje.value = e?.message || "No se pudo cargar el elemento";
    exito.value = false;
  }
}

onMounted(cargarItem);
watch(() => route.params, () => {
  tipo.value = route.params.tipo;
  id.value = Number(route.params.id);
  cargarItem();
});

async function guardar() {
  try {
    let payload = {};
    if (tipo.value === "categorias") {
      payload = { nombre: nombre.value, descripcion: descripcion.value };
      const resp = await actualizarItem("categoria", id.value, payload);
      mensaje.value = resp.message || "Cambios guardados correctamente";
    } else if (tipo.value === "perfiles") {
      payload = { name: nombre.value, email: email.value };
      const resp = await actualizarItem("usuario", id.value, payload);
      mensaje.value = resp.message || "Cambios guardados correctamente";
    } else if (tipo.value === "ingredientes") {
      payload = { nombre: nombre.value, descripcion: descripcion.value, unidad_medida: unidad_medida.value };
      const resp = await actualizarItem("ingrediente", id.value, payload);
      mensaje.value = resp.message || "Cambios guardados correctamente";
    } else if (tipo.value === "menus") {
      payload = { nombre: nombre.value, fecha: fecha.value };
      const resp = await actualizarItem("menu", id.value, payload);
      mensaje.value = resp.message || "Cambios guardados correctamente";
    }

    exito.value = true;
    alert("Cambios guardados correctamente");
    router.push({ name: "listar", params: { tipo: tipo.value } });
  } catch (err) {
    console.error(err);
    mensaje.value = err?.message || "Error al guardar";
    exito.value = false;
  }
}

async function eliminar() {
  if (!confirm("¿Seguro que quieres eliminar el elemento?")) return;
  try {
    if (tipo.value === "categorias") await eliminarItem("categoria", id.value);
    else if (tipo.value === "perfiles") await eliminarItem("usuario", id.value);
    else if (tipo.value === "ingredientes") await eliminarItem("ingrediente", id.value);
    else if (tipo.value === "menus") await eliminarItem("menu", id.value);

    alert("Eliminado correctamente");
    router.push({ name: "listar", params: { tipo: tipo.value } });
  } catch (err) {
    console.error(err);
    mensaje.value = err?.message || "Error al eliminar";
    exito.value = false;
  }
}
</script>

