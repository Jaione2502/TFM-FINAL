<template>
  <div class="menu-container">
    <h3 class="menu-titulo">Crear Inventario</h3>

    <form class="menu-form" @submit.prevent="guardarInventario">
      <div>
        <label for="usuario">Usuario:</label>
        <select id="usuario" v-model.number="usuario_id" required :disabled="loading">
          <option value="" disabled>Selecciona un usuario</option>
          <option v-for="u in usuarios" :key="u.id" :value="u.id">
            {{ u.name || u.nombre || `Usuario #${u.id}` }}
          </option>
        </select>
      </div>

      <div>
        <label for="ingrediente">Ingrediente:</label>
        <select id="ingrediente" v-model.number="ingrediente_id" placeholder="Selecciona un ingrediente" required :disabled="loading">
          <option value="" disabled>Selecciona un ingrediente</option>
          <option v-for="ing in ingredientes" :key="ing.id" :value="ing.id">
            {{ ing.label }}
          </option>
        </select>
      </div>

      <div>
        <label for="cantidad">Cantidad:</label>
        <input v-model.trim="cantidad" type="text" name="cantidad" id="cantidad" required :disabled="loading" />
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

const usuario_id = ref(null);
const ingrediente_id = ref(null);
const cantidad = ref("");
const usuarios = ref([]);
const ingredientes = ref([]);
const loading = ref(false);
const mensaje = ref("");
const error = ref("");
const exito = ref(false);

// Normaliza un array posible {data: []} o []
function unwrapArray(res) {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (res.items && Array.isArray(res.items)) return res.items;
  return [];
}

onMounted(async () => {
  loading.value = true;
  error.value = "";
  try {
    const [uRes, iRes] = await Promise.allSettled([getUsuarios(), getIngredientes()]);

    if (uRes.status === "fulfilled") {
      usuarios.value = unwrapArray(uRes.value);
    } else {
      error.value = "Error al cargar los usuarios";
      console.error(uRes.reason);
    }

    if (iRes.status === "fulfilled") {
      const arr = unwrapArray(iRes.value);
      // Crea un label robusto: nombre || titulo || fallback
      ingredientes.value = arr.map(i => ({
        ...i,
        label: i.nombre ?? i.titulo ?? `Ingrediente #${i.id ?? ""}`.trim(),
      }));
    } else {
      error.value = (error.value ? error.value + " · " : "") + "Error al cargar los ingredientes";
      console.error(iRes.reason);
    }
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
    const res = await NuevoInventario({
      cantidad: cantidad.value,
      ingrediente_id: Number(ingrediente_id.value),
      usuario_id: Number(usuario_id.value),
    });

    mensaje.value = res?.message || "Inventario creado correctamente";
    exito.value = true;

    cantidad.value = "";
    ingrediente_id.value = null;
    usuario_id.value = null;
  } catch (err) {
    console.error(err);
    mensaje.value = err?.message || "Error al crear el inventario";
    exito.value = false;
  } finally {
    loading.value = false;
  }
}
</script>
