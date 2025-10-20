<template>
  <div class="menu-container">
    <h3 class="menu-titulo">Crear Inventario</h3>

    <form @submit.prevent="guardarInventario">
      <div class="menu-form">
        <label for="usuario">Usuario:</label>
        <select id="usuario" v-model.number="usuario_id" required :disabled="loading">
          <option value="" disabled>Selecciona un usuario</option>
          <option v-for="u in usuarios" :key="u.id" :value="u.id">
            {{ u.name || u.nombre || `Usuario #${u.id}` }}
          </option>
        </select>
      </div>

      <div class="menu-form">
        <label for="ingrediente">Ingrediente:</label>
        <select id="ingrediente" v-model.number="ingrediente_id" required :disabled="loading">
          <option value="" disabled>Selecciona un ingrediente</option>
          <option v-for="ing in ingredientes" :key="ing.id" :value="ing.id">
            {{ ing.titulo || ing.nombre || ing.id }}
          </option>
        </select>
      </div>

      <div>
        <label for="cantidad">Cantidad:</label>
        <input v-model.trim="cantidad" placeholder="Escribe una cantidad..." type="text" name="cantidad" id="cantidad" required :disabled="loading" />
      </div>

      <button type="submit" :disabled="loading">Guardar</button>

      <p v-if="mensaje && exito" class="mensaje-ok">{{ mensaje }}</p>
      <p v-if="mensaje && !exito" class="mensaje-error">{{ mensaje }}</p>
      <p v-if="error" class="mensaje-error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUsuarios, getIngredientes, NuevoInventario } from "../services/api.js";
import "../assets/styles/MenuForm.css";

const usuario_id = ref("");
const ingrediente_id = ref("");
const cantidad = ref("");
const usuarios = ref([]);
const ingredientes = ref([]);
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
  try {
    ingredientes.value = await getIngredientes();
  } catch (err) {
    error.value = "Error al cargar los ingredientes";
  }
});

async function guardarInventario() {
  if (!cantidad.value || !ingrediente_id.value || !usuario_id.value) {
    mensaje.value = "Todos los campos son obligatorios";
    exito.value = false;
    return;
  }

  try {
    const res = await NuevoInventario({
      cantidad: cantidad.value,
      ingrediente_id: ingrediente_id.value,
      usuario_id: usuario_id.value,
    });

    mensaje.value = res.message || "Inventario creado correctamente";
    exito.value = true;

    cantidad.value = "";
    ingrediente_id.value = "";
    usuario_id.value = "";
  } catch (err) {
    console.error(err);
    mensaje.value = err.message || "Error al crear el menú";
    exito.value = false;
  }
}
</script>