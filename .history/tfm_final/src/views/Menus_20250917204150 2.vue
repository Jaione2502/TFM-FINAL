<template>
  <div class="alta-categoria-container">
    <h1>Nuevo Menú</h1>

    <form @submit.prevent="guardarMenu" class="formulario">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="nombre"
          placeholder="Introduce el nombre del menú"
          required
        />
      </div>

      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          v-model="descripcion"
          placeholder="Introduce una descripción"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="fecha">Fecha (opcional):</label>
        <input
          type="date"
          id="fecha"
          v-model="fecha"
          placeholder="Selecciona una fecha para el menú"
        />
      </div>

      <div class="form-group">
        <label for="recetas">Recetas del menú:</label>
        <select
          id="recetas"
          v-model="recetasSeleccionadas"
          multiple
          size="6"
          required
        >
          <option
            v-for="receta in recetas"
            :key="receta.id"
            :value="receta.id"
          >
            {{ receta.nombre || receta.title || `Receta #${receta.id}` }}
          </option>
        </select>
        <small v-if="!recetas.length && !cargandoRecetas">No hay recetas disponibles.</small>
        <small v-if="cargandoRecetas">Cargando recetas…</small>
      </div>

      <button type="submit">Guardar Menú</button>
    </form>

    <p v-if="mensaje" :class="{ exito: exito, error: !exito }">
      {{ mensaje }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { NuevoMenu, ListarRecetas } from "../services/api.js";
import "../assets/styles/Categorias.css"; // reutilizo tu CSS

const router = useRouter();

const nombre = ref("");
const descripcion = ref("");
const fecha = ref(""); // YYYY-MM-DD
const recetas = ref([]);
const recetasSeleccionadas = ref([]);
const cargandoRecetas = ref(false);

const mensaje = ref("");
const exito = ref(false);

onMounted(async () => {
  try {
    cargandoRecetas.value = true;
    // Ajusta el nombre del servicio según tu API
    const res = await ListarRecetas();
    // Adapta si tu payload viene en res.data / res.recetas / etc.
    recetas.value = res.data || res.recetas || res || [];
  } catch (e) {
    console.error(e);
    mensaje.value = "No se pudieron cargar las recetas";
    exito.value = false;
  } finally {
    cargandoRecetas.value = false;
  }
});

async function guardarMenu() {
  if (!nombre.value || !descripcion.value || recetasSeleccionadas.value.length === 0) {
    mensaje.value = "Nombre, descripción y al menos una receta son obligatorios";
    exito.value = false;
    return;
  }

  try {
    const payload = {
      nombre: nombre.value,
      descripcion: descripcion.value,
      fecha: fecha.value || null,
      recetas: recetasSeleccionadas.value, // array de IDs
    };

    const res = await NuevoMenu(payload);

    mensaje.value = res.message || "Menú creado correctamente";
    exito.value = true;

    // Limpiar formulario
    nombre.value = "";
    descripcion.value = "";
    fecha.value = "";
    recetasSeleccionadas.value = [];

    // Si quieres redirigir:
    // router.push({ name: "menus.list" });
  } catch (err) {
    console.error(err);
    // Adapta a tu formato de errores de backend
    mensaje.value =
      err?.response?.data?.message ||
      err?.message ||
      "Error al crear el menú";
    exito.value = false;
  }
}
</script>
