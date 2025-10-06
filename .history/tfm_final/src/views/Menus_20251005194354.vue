<template>
  <div class="menu-container">
    <h3 class="menu-titulo">Crear Menú</h3>

    <form class="">
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
      <div class="form-group">
        <label>Nombre:</label>
        <input v-model="nombre" type="text" placeholder="Escribe un nombre..." required />
      </div>
      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input v-model="fecha" type="date" name="fecha" id="fecha" required />
      </div>

      <button type="button" @click="guardarMenu" :disabled="loading">
        Guardar
      </button>

      <p v-if="mensaje" class="mensaje-ok">{{ mensaje }}</p>
      <p v-if="error" class="mensaje-error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUsuarios, NuevoMenu } from "../services/api.js";
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

async function guardarMenu() {
  if (!nombre.value || !fecha.value || !usuario_id.value) {
    mensaje.value = "Todos los campos son obligatorios";
    exito.value = false;
    return;
  }

  try {
    const res = await NuevoMenu({
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
