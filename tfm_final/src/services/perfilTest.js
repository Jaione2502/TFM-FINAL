import { ref } from "vue";
import { NuevoUsuario } from "./api.js";

export const name = ref("");
export const mail = ref("");
export const pass = ref("");
export const mensaje = ref("");
export const exito = ref(false);

export async function guardarUsuario() {
  if (!name.value || !mail.value || !pass.value) {
    mensaje.value = "Todos los campos son obligatorios";
    exito.value = false;
    return null;
  }

  try {
    const res = await NuevoUsuario({
      name: name.value,
      email: mail.value,
      password: pass.value,
    });

    mensaje.value = res.message || "Usuario creado correctamente";
    exito.value = true;

 
    name.value = "";
    mail.value = "";
    pass.value = "";

    return res;
  } catch (err) {
    mensaje.value = err.message || "Error al crear el perfil";
    exito.value = false;
    return null;
  }
}
