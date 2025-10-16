<template>
  <div class="login-page">
    <div class="login-container">
      <form @submit.prevent="doLogin" class="login-form">
        <h2>Iniciar Sesión</h2>
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
        <p v-if="error" style="color: red; margin-top: 1rem;">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../auth";
import "../assets/styles/Login.css";


const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

async function doLogin() {

  error.value = "";

  try {
    const res = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Error de login");
    }

    const data = await res.json();

    auth.isAuthenticated = true;
    auth.token = data.access_token;
    localStorage.setItem("token", data.access_token);

    router.push({ name: "Home" });
  } catch (err) {
    console.error("Catch error:", err);
    error.value = err.message;
  }
}

</script>

