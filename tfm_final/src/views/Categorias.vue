<script setup>
import { ref } from "vue";
import "../assets/styles/Categorias.css"; 
import Banner from "../components/Banner.vue";



const categorias = ref([]);
const nuevaCategoria = ref({ nombre: "", descripcion: "" });
const editando = ref(null);

const agregarCategoria = () => {
  if (!nuevaCategoria.value.nombre.trim()) return;

  if (editando.value) {
    categorias.value = categorias.value.map((cat) =>
      cat.id === editando.value ? { ...cat, ...nuevaCategoria.value } : cat
    );
    editando.value = null;
  } else {
    categorias.value.push({
      id: Date.now(),
      nombre: nuevaCategoria.value.nombre,
      descripcion: nuevaCategoria.value.descripcion,
    });
  }

  nuevaCategoria.value = { nombre: "", descripcion: "" };
};

const eliminarCategoria = (id) => {
  categorias.value = categorias.value.filter((c) => c.id !== id);
};

const empezarEdicion = (cat) => {
  editando.value = cat.id;
  nuevaCategoria.value = { nombre: cat.nombre, descripcion: cat.descripcion };
};
</script>

<template>
  <div class="container">
     <Banner />
    <h1>Gestión de Categorías</h1>

    <!-- Formulario -->
    <div class="card">
      <h2>{{ editando ? "Editar Categoría" : "Añadir Nueva Categoría" }}</h2>

      <label>Nombre</label>
      <input v-model="nuevaCategoria.nombre" type="text" placeholder="Ej: Bebidas" />

      <label>Descripción</label>
      <textarea
        v-model="nuevaCategoria.descripcion"
        placeholder="Ej: Refrescos, zumos, cafés"
      ></textarea>

      <button @click="agregarCategoria" class="btn btn-primary">
        {{ editando ? "Guardar Cambios" : "Añadir Categoría" }}
      </button>
    </div>

    <!-- Listado -->
    <div v-if="categorias.length" class="listado">
      <h2>Categorías Registradas</h2>
      <div v-for="cat in categorias" :key="cat.id" class="categoria-card">
        <div class="info">
          <h3>{{ cat.nombre }}</h3>
          <p>{{ cat.descripcion }}</p>
        </div>
        <div class="acciones">
          <button class="btn btn-warning" @click="empezarEdicion(cat)">Editar</button>
          <button class="btn btn-danger" @click="eliminarCategoria(cat.id)">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <p v-else class="mensaje-vacio">No hay categorías aún. ¡Crea la primera! 🚀</p>
  </div>
</template>
