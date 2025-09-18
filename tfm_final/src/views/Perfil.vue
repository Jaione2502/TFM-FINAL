<template>
  <div class="alta-usuario-container">
    <h1>Nuevo Usuario</h1>

    <form @submit.prevent="guardarUsuario" class="formulario">
     
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="name" placeholder="Introduce el nombre del usuario" required />
      </div>

      
      <div class="form-group">
        <label for="mail">Email:</label>
        <input v-model="mail" id="mail" type="email" placeholder="Correo electrónico" required />
      </div>

      <div class="form-group">
        <label for="pass">Contraseña:</label>
        <input v-model="pass" id="pass" type="password" placeholder="Contraseña" required />
      </div>
       
      <button type="submit">Guardar Usuario</button>
    </form>

   
    <p v-if="mensaje" :class="{'exito': exito, 'error': !exito}">
      {{ mensaje }}
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NuevoUsuario } from "../services/api.js"; 
import "../assets/styles/Perfiles.css"; 

const router = useRouter();

const name = ref("");
const mail = ref("");
const pass = ref("");
const mensaje = ref("");
const exito = ref(false);


async function guardarUsuario() {
  if (!name.value || !mail.value || !pass.value) {
    mensaje.value = "Todos los campos son obligatorios";
    exito.value = false;
    return;
  }

  try {
    const res = await NuevoUsuario({
      name: name.value,
      email: mail.value,
      password: pass.value
    });

    mensaje.value = res.message || "Usuario creado correctamente";
    exito.value = true;

  
    name.value = "";
    mail.value = "";
    pass.value="";
  } catch (err) {
    console.error(err);
    mensaje.value = err.message || "Error al crear el perfil";
    exito.value = false;
  }
}
</script>

