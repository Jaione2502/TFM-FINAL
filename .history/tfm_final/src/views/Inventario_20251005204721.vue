<template>
  <div class="menu-container">
    <h3 class="menu-titulo">Crear Inventario</h3>

    <form @submit.prevent="guardarInventario" class="menu-form">
      <!-- Usuarios -->
      <div class="form-row">
        <label for="usuario">Usuario:</label>
        <select
          id="usuario"
          v-model.number="usuario_id"
          required
          :disabled="loading"
        >
          <option value="" disabled>Selecciona un usuario</option>
          <option v-for="u in usuarios" :key="u.id" :value="u.id">
            {{ u.label }}
          </option>
        </select>
      </div>

      <!-- Ingredientes -->
      <div class="form-row">
        <label for="ingrediente">Ingrediente:</label>
        <select
          id="ingrediente"
          v-model.number="ingrediente_id"
          required
          :disabled="loading"
        >
          <option value="" disabled>Selecciona un ingrediente</option>
          <option v-for="ing in ingredientes" :key="ing.id" :value="ing.id">
            {{ ing.label }}
          </option>
        </select>
      </div>

      <!-- Cantidad -->
      <div class="form-row">
        <label for="cantidad">Cantidad:</label>
        <input
          id="cantidad"
          type="text"
          inputmode="decimal"
          v-model.trim="cantidad"
          placeholder="Ej: 1,5 o 2"
          required
          :disabled="loading"
          @blur="normalizarCantidad"
        />
        <small class="hint">Admite coma o punto decimal</small>
      </div>

      <button type="submit" :disabled="loading || !isFormValid">
        {{ loading ? 'Guardando...' : 'Guardar' }}
      </button>

      <p v-if="mensaje && exito" class="mensaje-ok">{{ mensaje }}</p>
      <p v-if="mensaje && !exito" class="mensaje-error">{{ mensaje }}</p>
      <p v-if="error" class="mensaje-error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
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

/** Normaliza respuestas tipo {data: []} o [] */
function unwrapArray(res) {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (res.items && Array.isArray(res.items)) return res.items;
  return [];
}

/** Crea un label legible para select (usuarios/ingredientes) */
function toUserOption(u) {
  return {
    id: u.id,
    label: u.name ?? u.nombre ?? `Usuario #${u.id ?? ""}`.trim(),
  };
}
function toIngOption(i) {
  return {
    id: i.id,
    label: i.nombre ?? i.titulo ?? `Ingrediente #${i.id ?? ""}`.trim(),
  };
}

/** Convierte texto a número (admite coma) y NaN si no procede */
function toNumberLoose(txt) {
  if (txt == null) return NaN;
  const norm = String(txt).replace(",", ".").replace(/\s+/g, "");
  return Number(norm);
}

const isFormValid = computed(() => {
  const n = toNumberLoose(cantidad.value);
  return (
    Number.isFinite(n) &&
    n >= 0 &&
    !!usuario_id.value &&
    !!ingrediente_id.value
  );
});

function normalizarCantidad() {
  const n = toNumberLoose(cantidad.value);
  if (Number.isFinite(n)) {
    // Mantenemos formato con punto para enviar al backend
    cantidad.value = String(n);
  }
}

onMounted(async () => {
  loading.value = true;
  mensaje.value = "";
  error.value = "";
  exito.value = false;

  try {
    const [uRes, iRes] = await Promise.allSettled([
      getUsuarios(),
      getIngredientes(),
    ]);

    if (uRes.status === "fulfilled") {
      const arrU = unwrapArray(uRes.value);
      usuarios.value = arrU.map(toUserOption);
    } else {
      error.value = "Error al cargar los usuarios";
      console.error(uRes.reason);
    }

    if (iRes.status === "fulfilled") {
      const arrI = unwrapArray(iRes.value);
      ingredientes.value = arrI.map(toIngOption);
    } else {
      error.value = (error.value ? error.value + " · " : "") + "Error al cargar los ingredientes";
      console.error(iRes.reason);
    }
  } catch (e) {
    console.error(e);
    error.value = "Error cargando datos iniciales";
  } finally {
    loading.value = false;
  }
});

async function guardarInventario() {
  mensaje.value = "";
  error.value = "";
  exito.value = false;

  // Validación de front (extra)
  const n = toNumberLoose(cantidad.value);
  if (!Number.isFinite(n) || n < 0) {
    mensaje.value = "La cantidad debe ser un número válido (≥ 0)";
    return;
  }
  if (!usuario_id.value || !ingrediente_id.value) {
    mensaje.value = "Todos los campos son obligatorios";
    return;
  }

  try {
    loading.value = true;

    const payload = {
      usuario_id: Number(usuario_id.value),
      ingrediente_id: Number(ingrediente_id.value),
      cantidad: n, // numérico para backend
    };

    const res = await NuevoInventario(payload);

    // Mensaje del backend o genérico
    mensaje.value = res?.message || "Inventario creado correctamente";
    exito.value = true;

    // Reset de formulario
    usuario_id.value = null;
    ingrediente_id.value = null;
    cantidad.value = "";
  } catch (err) {
    console.error(err);
    // intentamos leer mensaje de error típico { message: "..."} o { errors: {...} }
    const apiMsg =
      err?.response?.data?.message ||
      err?.message ||
      "Error al crear el inventario";
    mensaje.value = apiMsg;
    exito.value = false;
  } finally {
    loading.value = false;
  }
}
</script>