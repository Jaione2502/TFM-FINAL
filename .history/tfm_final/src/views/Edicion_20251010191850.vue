<template>
  <div class="edicion-container">
    <h1>Editar {{ tipo }}</h1>

    <form @submit.prevent="guardar">
      <!-- Categorias -->
      <template v-if="tipo === 'categorias'">
        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea v-model="form.descripcion"></textarea>
        </div>
      </template>

      <!-- Perfiles -->
      <template v-if="tipo === 'perfiles'">
        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Email:</label>
          <input v-model="form.email" type="email" />
        </div>
      </template>

      <!-- Comentarios -->
      <template v-if="tipo === 'comentarios'">
        <div>
          <label>Titulo receta:</label>
          <input v-model="form.receta" type="text" disabled />
        </div>

        <div>
          <label>Usuario:</label>
          <input v-model="form.usuario" type="text" disabled />
        </div>

        <div>
          <label>Comentario:</label>
          <textarea v-model="form.contenido"></textarea>
        </div>
      </template>

      <!-- Ingredientes -->
      <template v-if="tipo === 'ingredientes'">
        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea v-model="form.descripcion"></textarea>
        </div>

        <div>
          <label>Unidad de Medida:</label>
          <input v-model="form.unidad_medida" type="text" />
        </div>
      </template>

      <!-- Menus -->
      <template v-if="tipo === 'menus'">
        <div>
          <label>Usuario:</label>
          <input v-model="form.usuario" type="text" disabled />
        </div>

        <div>
          <label>Nombre:</label>
          <input v-model="form.nombre" type="text" />
        </div>

        <div>
          <label>Fecha:</label>
          <input type="date" v-model="form.fecha" required />
        </div>
      </template>

      <!-- Inventario -->
      <template v-if="tipo === 'inventario'">
        <div>
          <label>Usuario:</label>
          <!-- mostramos el nombre del usuario, solo lectura -->
          <input v-model="form.usuario" disabled />
        </div>

        <div>
          <label>Ingrediente:</label>
          <select v-model.number="form.ingrediente_id" required :disabled="loading">
            <option value="" disabled>Selecciona un ingrediente</option>
            <option v-for="ing in ingredientes" :key="ing.id" :value="ing.id">
              {{ ing.nombre ?? ing.titulo ?? `Ingrediente #${ing.id}` }}
            </option>
          </select>
          <p v-if="errores.ingrediente_id" class="error">{{ errores.ingrediente_id }}</p>
        </div>

        <div>
          <label>Cantidad:</label>
          <input v-model="form.cantidad" type="number" step="any" min="0" required />
          <p v-if="errores.cantidad" class="error">{{ errores.cantidad }}</p>
        </div>
      </template>

      <div class="botones">
        <button type="submit" :disabled="loading">Guardar</button>
        <button type="button" @click="eliminar" :disabled="loading">Eliminar</button>
      </div>
    </form>

    <p v-if="estado.mensaje" :class="{ exito: estado.exito, error: !estado.exito }">
      {{ estado.mensaje }}
    </p>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { actualizarItem, eliminarItem } from "../services/api.js";
import "../assets/styles/Edicion.css";

const route = useRoute();
const router = useRouter();

const tipo = ref(route.params.tipo);
const id = ref(Number(route.params.id));

const loading = ref(false);
const ingredientes = ref([]);

const errores = reactive({
  ingrediente_id: "",
  cantidad: ""
});

const form = reactive({
  // comunes según tipo
  nombre: route.query.nombre || "",
  descripcion: route.query.descripcion || "",
  email: route.query.email || "",
  usuario: route.query.usuario || "",                    // nombre visible
  usuario_id: Number(route.query.usuario_id) || null,    // por si el back lo pide
  receta: route.query.receta || "",
  contenido: route.query.contenido || "",
  unidad_medida: route.query.unidad_medida || "",
  fecha: route.query.fecha || "",

  // inventario (lo nuevo clave es ingrediente_id)
  ingrediente: route.query.ingrediente || "",            // nombre (solo display/compat)
  ingrediente_id: route.query.ingrediente_id
    ? Number(route.query.ingrediente_id)
    : "",                                                // v-model del select
  cantidad: route.query.cantidad ?? ""
});

const estado = reactive({
  mensaje: "",
  exito: false
});

// Cargar ingredientes si estamos en edición de inventario
onMounted(async () => {
  if (tipo.value !== "inventario") return;

  loading.value = true;
  try {
    const r = await fetch("/api/ingredientes", {
      headers: { Accept: "application/json" }
    });
    if (!r.ok) throw new Error("No se pudo cargar ingredientes");
    const lista = await r.json();

    ingredientes.value = Array.isArray(lista)
      ? lista.map(i => ({
          id: i.id,
          nombre: i.nombre ?? i.titulo ?? `Ingrediente #${i.id}`
        }))
      : [];

    // Si venimos solo con nombre sin id, forzamos selección manual
    if (!form.ingrediente_id) form.ingrediente_id = "";
  } catch (e) {
    console.error(e);
    estado.mensaje = e.message || "Error cargando ingredientes";
    estado.exito = false;
  } finally {
    loading.value = false;
  }
});

function validarFormulario() {
  if (tipo.value === "categorias") {
    return form.nombre.trim() !== "" && form.descripcion.trim() !== "";
  }
  if (tipo.value === "perfiles") {
    return form.nombre.trim() !== "" && form.email.trim() !== "";
  }
  if (tipo.value === "comentarios") {
    return form.receta && form.usuario && form.contenido.trim() !== "";
  }
  if (tipo.value === "ingredientes") {
    return (
      form.nombre.trim() !== "" &&
      form.descripcion.trim() !== "" &&
      form.unidad_medida.trim() !== ""
    );
  }
  if (tipo.value === "menus") {
    return form.usuario && form.nombre.trim() !== "" && form.fecha;
  }
  if (tipo.value === "inventario") {
    errores.ingrediente_id = "";
    errores.cantidad = "";

    const okIng = !!form.ingrediente_id;
    const okCant =
      String(form.cantidad).trim() !== "" && !isNaN(Number(form.cantidad));

    if (!okIng) errores.ingrediente_id = "Debes seleccionar un ingrediente";
    if (!okCant) errores.cantidad = "Introduce una cantidad válida";

    return okIng && okCant;
  }
  return true;
}

async function guardar() {
  if (!validarFormulario()) {
    estado.mensaje = "Todos los campos obligatorios deben completarse";
    estado.exito = false;
    return;
  }

  loading.value = true;
  try {
    let data;

    if (tipo.value === "categorias") {
      data = await actualizarItem("categoria", id.value, {
        nombre: form.nombre,
        descripcion: form.descripcion
      });
    } else if (tipo.value === "perfiles") {
      data = await actualizarItem("usuario", id.value, {
        name: form.nombre,
        email: form.email
      });
    } else if (tipo.value === "comentarios") {
      data = await actualizarItem("comentario", id.value, {
        usuario: form.usuario,
        receta: form.receta,
        contenido: form.contenido
      });
    } else if (tipo.value === "ingredientes") {
      data = await actualizarItem("ingredientes", id.value, {
        nombre: form.nombre,
        descripcion: form.descripcion,
        unidad_medida: form.unidad_medida
      });
    } else if (tipo.value === "menus") {
      data = await actualizarItem("menus", id.value, {
        usuario: form.usuario,
        nombre: form.nombre,
        fecha: form.fecha
      });
    } else if (tipo.value === "inventario") {
      // Payload mínimo recomendado por el back: ingrediente_id + cantidad
      const payload = {
        ingrediente_id: Number(form.ingrediente_id),
        cantidad: Number(form.cantidad)
      };

      // Si tu back exige usuario_id en la actualización, descomenta:
      // if (form.usuario_id) payload.usuario_id = Number(form.usuario_id);

      data = await actualizarItem("inventario", id.value, payload);
    }

    estado.mensaje = (data && data.message) || "Cambios guardados correctamente";
    estado.exito = true;

    setTimeout(() => {
      router.push({ name: "listar", params: { tipo: tipo.value } });
    }, 1000);
  } catch (err) {
    console.error(err);
    estado.mensaje = err.message || "Error al guardar";
    estado.exito = false;
  } finally {
    loading.value = false;
  }
}

async function eliminar() {
  if (!confirm("¿Seguro que quieres eliminar el elemento?")) return;

  loading.value = true;
  try {
    const rutas = {
      categorias: "categoria",
      perfiles: "usuario",
      comentarios: "comentario",
      ingredientes: "ingredientes",
      menus: "menus",
      inventario: "inventario"
    };

    const rutaApi = rutas[tipo.value];
    if (!rutaApi) throw new Error("Tipo no válido para eliminar");

    await eliminarItem(rutaApi, id.value);

    estado.mensaje = "Eliminado correctamente";
    estado.exito = true;

    setTimeout(() => {
      router.push({ name: "listar", params: { tipo: tipo.value } });
    }, 1000);
  } catch (err) {
    console.error(err);
    estado.mensaje = err.message || "Error al eliminar";
    estado.exito = false;
  } finally {
    loading.value = false;
  }
}
</script>