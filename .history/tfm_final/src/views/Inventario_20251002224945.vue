<template>
  <div class="menu-container">
    <h3 class="menu-titulo">Crear Inventario</h3>

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
        <label for="ingrediente"> Ingrediente:</label>
        <select id="ingrediente" v-model="ingrediente_id" required>
          <option value="" disabled>Selecciona un ingrediente</option>
          <option
            v-for="ingrediente in ingredientes"
            :key="ingrediente.id"
            :value="ingrediente.id"
          >
            {{ ingrediente.titulo }}
          </option>
        </select>
      </div>
      <div>
        <label for="fecha">Cantidad:</label>
        <input v-model="cantidad" type="text" name="cantidad" id="cantidad" required />
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
import { getUsuarios, getIngredientes, NuevoInventario } from "../services/api.js";
import "../assets/styles/MenuForm.css";

const usuario_id = ref("");
const cantidad = ref("");
const ingrediente_id = ref("");
const ingredientes = ref([]);
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
onMounted(async () => {
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
