import { ref } from "vue";
import { NuevaCategoria } from "./api.js";

export const nombre = ref("");
export const descripcion = ref("");
export const mensaje = ref("");
export const exito = ref(false);

export async function guardarCategoria() {
  if (!nombre.value || !descripcion.value) {
    mensaje.value = "Todos los campos son obligatorios";
    exito.value = false;
    return null;
  }

  try {
    const res = await NuevaCategoria({
      nombre: nombre.value,
      descripcion: descripcion.value,
    });

    mensaje.value = res.message || "Categoría creada correctamente";
    exito.value = true;

 
    nombre.value = "";
    descripcion.value = "";

    return res;
  } catch (err) {
    mensaje.value = err.message || "Error al crear la categoría";
    exito.value = false;
    return null;
  }
}
