<template>
  <div class="alta-usuario-container">
    <h1>Nuevo Usuario</h1>

    <form @submit.prevent="guardarUsuario" class="formulario">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.name" placeholder="Introduce el nombre del usuario" required />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" placeholder="Correo electrónico" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="form.password" placeholder="Contraseña" required />
      </div>

      <button type="submit">Guardar Usuario</button>
    </form>

    <p v-if="estado.mensaje" :class="{'exito': estado.exito, 'error': !estado.exito}">
      {{ estado.mensaje }}
    </p>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { NuevoUsuario } from "../services/api.js"; 
import "../assets/styles/Perfiles.css"; 

const router = useRouter();


const form = reactive({
  name: "",
  email: "",
  password: ""
});


const estado = reactive({
  mensaje: "",
  exito: false
});


function validarFormulario() {
  return Object.values(form).every(value => value.trim() !== "");
}

async function guardarUsuario() {
  if (!validarFormulario()) {
    estado.mensaje = "Todos los campos son obligatorios";
    estado.exito = false;
    return;
  }

  try {
    const res = await NuevoUsuario(form);
    estado.mensaje = res.message || "Usuario creado correctamente";
    estado.exito = true;

   
    Object.keys(form).forEach(key => form[key] = "");


     router.push({ name: "listar", params: { tipo: "perfiles" } });
    
  } catch (err) {
    console.error(err);
    estado.mensaje = err.response?.data?.message || "Error al crear el perfil";
    estado.exito = false;
  }
}
</script>
