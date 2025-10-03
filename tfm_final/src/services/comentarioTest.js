import { ref } from "vue";
import { getRecetas, getUsuarios, NuevoComentario } from "./api.js";

export const receta_id = ref(null);
export const usuario_id = ref(null);
export const contenido = ref("");
export const loading = ref(false);
export const error = ref(null);



export async function cargarRecetas() {
  loading.value = true;
  try {
    const data = await getRecetas();
    loading.value = false;
    return data;
  } catch (err) {
    loading.value = false;
    error.value = err.message;
    return [];
  }
}

export async function cargarUsuarios() {
  loading.value = true;
  try {
    const data = await getUsuarios();
    loading.value = false;
    return data;
  } catch (err) {
    loading.value = false;
    error.value = err.message;
    return [];
  }
}

export async function crearComentario() {
  loading.value = true;
  try {
    const comentario = await NuevoComentario({
      receta_id: receta_id.value,
      usuario_id: usuario_id.value,
      contenido: contenido.value,
    });
    loading.value = false;
    return comentario;
  } catch (err) {
    loading.value = false;
    error.value = err.message;
    return null;
  }
}
