<template>
  <div class="menu-container">
    <h3 class="menu-titulo">Crear Menú</h3>

    <form class="menu-form">
      <div>
        <label for="usuario">Usuario:</label>
        <select id="usuario" v-model="usuario_id" required>
          <option value="" disabled>Selecciona un usuario</option>
          <option
            v-for="usuario in usuarios"
            :key="usuario.id"
            :value="usuario.id"
          >
            {{ usuario.name }}
          </option>
        </select>
      </div>
      <div>
        <label>Nombre:</label>
        <input v-model="nombre" type="text" required />
      </div>
      <div>
        <label for="fecha">Fecha:</label>
        <input v-model="fecha" type="date" name="fecha" id="fecha" required />
      </div>

      <button type="button" @click="guardarInventario" :disabled="loading">
        Guardar
      </button>

      <p v-if="mensaje" class="mensaje-ok">{{ mensaje }}</p>
      <p v-if="error" class="mensaje-error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUsuarios, NuevoInventario } from "../services/api.js";
import "../assets/styles/MenuForm.css";

const fecha = ref("");
const usuario_id = ref("");
const nombre = ref("");
const usuarios = ref([]);
const loading = ref(false);
const mensaje = ref("");
const error = ref("");
const exito = ref(false);

onMounted(async () => {
  try {
    usuarios.value = await getUsuarios();
  } catch (err) {
    error.value = "Error al cargar los usuarios";
  }
});

async function guardarInventario() {
  if (!nombre.value || !fecha.value || !usuario_id.value) {
    mensaje.value = "Todos los campos son obligatorios";
    exito.value = false;
    return;
  }

  try {
    const res = await NuevoInventario({
      nombre: nombre.value,
      fecha: fecha.value,
      usuario_id: usuario_id.value,
    });

    mensaje.value = res.message || "Menú creado correctamente";
    exito.value = true;

    nombre.value = "";
    fecha.value = "";
    usuario_id.value = "";
  } catch (err) {
    console.error(err);
    mensaje.value = err.message || "Error al crear el menú";
    exito.value = false;
  }
}
</script>
