<template>
  <div class="menu-container">
    <h3 class="menu-titulo">Crear Inventario</h3>

    <form class="menu-form" @submit.prevent="guardarInventario">
      <div>
        <label for="usuario">Usuario:</label>
        <select id="usuario" v-model.number="usuario_id" required :disabled="loading">
          <option value="" disabled>Selecciona un usuario</option>
          <option v-for="u in usuarios" :key="u.id" :value="u.id">
            {{ u.name || u.nombre || (`Usuario #${u.id}`) }}
          </option>
        </select>
      </div>

      <div>
        <label for="ingrediente">Ingrediente:</label>
        <select id="ingrediente" v-model.number="ingrediente_id" required :disabled="loading">
          <option value="" disabled>Selecciona un ingrediente</option>
          <option v-for="ing in ingredientes" :key="ing.id" :value="ing.id">
            {{ ing.nombre ?? ing.titulo ?? `Ingrediente #${ing.id}` }}
          </option>
        </select>
        <p v-if="!loading && ingredientes.length === 0" class="mensaje-error" style="margin-top:.5rem">
          No hay ingredientes para mostrar.
        </p>
      </div>

      <div>
        <label for="cantidad">Cantidad:</label>
        <input
          v-model.number="cantidad"
          type="number"
          name="cantidad"
          id="cantidad"
          step="0.01"
          min="0"
          required
          :disabled="loading"
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Guardando…' : 'Guardar' }}
      </button>

      <p v-if="mensaje && exito" class="mensaje-ok">{{ mensaje }}</p>
      <p v-if="mensaje && !exito" class="mensaje-error">{{ mensaje }}</p>
      <p v-if="error" class="mensaje-error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { getUsuarios, getIngredientes, NuevoInventario } from "../services/api.js";
import "../assets/styles/MenuForm.css";

const usuario_id = ref(null);
const cantidad = ref("");
const ingrediente_id = ref(null);
const ingredientes = ref([]);
const usuarios = ref([]);
const loading = ref(false);
const mensaje = ref("");
const error = ref("");
const exito = ref(false);


function normalizeList(res, keyFallback) {
  
  if (Array.isArray(res)) return res;
  
  if (res?.data) {
    if (Array.isArray(res.data)) return res.data;
    
    if (Array.isArray(res.data.data)) return res.data.data;
  }
  
  if (keyFallback && Array.isArray(res?.[keyFallback])) return res[keyFallback];
  
  return [];
}

onMounted(async () => {
  loading.value = true;
  mensaje.value = "";
  error.value = "";
  try {
    const [resUsers, resIngs] = await Promise.all([
      getUsuarios(),
      getIngredientes(),
    ]);

    usuarios.value = normalizeList(resUsers, "usuarios");
    ingredientes.value = normalizeList(resIngs, "ingredientes");

    
    console.log("Usuarios:", usuarios.value);
    console.log("Ingredientes:", ingredientes.value);
  } catch (err) {
    console.error(err);
    error.value = "Error al cargar datos. Revisa consola para más detalles.";
  } finally {
    loading.value = false;
  }
});

async function guardarInventario() {
  mensaje.value = "";
  error.value = "";
  exito.value = false;

  if (!cantidad.value || !ingrediente_id.value || !usuario_id.value) {
    mensaje.value = "Todos los campos son obligatorios";
    return;
  }

  try {
    loading.value = true;
    const payload = {
      cantidad: cantidad.value,
      ingrediente_id: ingrediente_id.value,
      usuario_id: usuario_id.value,
    };

    const res = await NuevoInventario(payload);
    
    const msg =
      res?.message ||
      res?.data?.message ||
      "Inventario creado correctamente";

    mensaje.value = msg;
    exito.value = true;

    
    cantidad.value = null;
    ingrediente_id.value = "";
    usuario_id.value = "";
  } catch (err) {
    console.error(err);
    mensaje.value =
      err?.response?.data?.message ||
      err?.message ||
      "Error al crear el inventario";
    exito.value = false;
  } finally {
    loading.value = false;
  }
}
</script>
