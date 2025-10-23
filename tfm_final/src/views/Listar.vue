<template>
  <div class="listar-container">
    <h1>Listado de {{ tipo }}</h1>
    <div class="card-grid">
      <div v-for="item in items" 
           :key="item.id" 
           class="card"
           @click="irAEdicion(item)">
        
        <!-- Perfiles -->
        <template v-if="tipo === 'perfiles'">
          <h2 class="card-title">{{ item.name }}</h2>
          <p>{{ item.email }}</p>
        </template>

        <!-- Categorias -->
        <template v-if="tipo === 'categorias'">
          <h2 class="card-title">{{ item.nombre }}</h2>
          <p>{{ item.descripcion }}</p>
        </template>

        <!-- Comentarios -->
        <template v-if="tipo === 'comentarios'">
          <h2 class="card-title">{{ item.receta }}</h2>
          <p>{{ item.usuario }}</p>
          <p>{{ item.contenido }}</p>
        </template>

        <!-- Ingredientes -->
        <template v-if="tipo === 'ingredientes'">
          <h2 class="card-title">{{ item.nombre }}</h2>
          <p>{{ item.descripcion }}</p>
          <p>{{ item.unidad_medida }}</p>
        </template>

        <!-- Menus -->
        <template v-if="tipo === 'menus'">
          <p>{{ item.usuario_id }}</p>
          <h2 class="card-title">{{ item.nombre }}</h2>
          <p>Fecha: {{ item.fecha }} </p>
        </template>

        <!-- Inventario -->
        <template v-if="tipo === 'inventario'">
          <p>{{ item.usuario }}</p>
          <h2 class="card-title">{{ item.ingrediente }}</h2>
          <p>{{ item.cantidad }}</p>
        </template>

        <!-- Dietas -->
        <template v-if="tipo === 'dietas'">
          <h2 class="card-title">{{ item.nombre }}</h2>
          <p>{{ item.descripcion }}</p>
        </template>

        <!-- Recetas -->
        <template v-if="tipo === 'recetas'">
          <h2 class="card-title">{{ item.titulo }}</h2>
          <p>{{ item.descripcion }}</p>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const items = ref([]);
const tipo = ref(route.params.tipo);

// Inyectamos API URL y token
const apiBaseUrl = inject("apiBaseUrl", "http://127.0.0.1:8000/api");
const token = inject("token", "");

async function cargarDatos(tipo) {
  try {
    let url = "";
    if (tipo === "categorias") url = `${apiBaseUrl}/categoria`;
    else if (tipo === "perfiles") url = `${apiBaseUrl}/usuario`;
    else if (tipo === "comentarios") url = `${apiBaseUrl}/comentario`;
    else if (tipo === "ingredientes") url = `${apiBaseUrl}/ingredientes`;
    else if (tipo === "menus") url = `${apiBaseUrl}/menus`;
    else if (tipo === "inventario") url = `${apiBaseUrl}/inventario`;
    else if (tipo === "dietas") url = `${apiBaseUrl}/dietas`;
    else if (tipo === "recetas") url = `${apiBaseUrl}/recetas`;
    else {
      items.value = [];
      return;
    }

    const res = await fetch(url, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    });

    if (!res.ok) throw new Error("Error al cargar datos");
    items.value = await res.json();
  } catch (err) {
    console.error("Error cargando datos:", err);
    items.value = [];
  }
}

function irAEdicion(item) {
  let query = {};
  if (tipo.value === "categorias") query = { nombre: item.nombre, descripcion: item.descripcion };
  else if (tipo.value === "perfiles") query = { nombre: item.name, email: item.email };
  else if (tipo.value === "comentarios") query = { contenido: item.contenido, usuario: item.usuario, receta: item.receta };
  else if (tipo.value === "menus") query = { nombre: item.nombre, usuario: item.usuario_id, fecha: item.fecha };
  else if (tipo.value === "ingredientes") query = { nombre: item.nombre, descripcion: item.descripcion, unidad_medida: item.unidad_medida };
  else if (tipo.value === "inventario") query = { cantidad: item.cantidad, ingrediente: item.ingrediente, usuario: item.usuario };
  else if (tipo.value === "dietas") query = { nombre: item.nombre, descripcion: item.descripcion };
  else if (tipo.value === "recetas") query = { titulo: item.titulo, descripcion: item.descripcion };

  router.push({
    name: "edicion",
    params: { tipo: tipo.value, id: item.id },
    query,
  });
}

// Carga inicial
onMounted(() => cargarDatos(tipo.value));

// Actualiza cuando cambia la ruta
watch(() => route.params.tipo, (nuevoTipo) => {
  tipo.value = nuevoTipo;
  cargarDatos(tipo.value);
});
</script>
