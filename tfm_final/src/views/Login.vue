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

<style scoped>
.login-page {
  height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;   
  background: #f0f2f5;
}

.login-container {
  width: 100%;
  max-width: 400px; 
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.login-form h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.login-form input {
  margin: 0.5rem 0;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.login-form button {
  margin-top: 1.5rem;
  padding: 0.8rem;
  background: #4facfe;
  border: none;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.login-form button:hover {
  background: #3a7bd5;
}

@media (max-width: 480px) {
  .login-container {
    padding: 1.5rem;
  }
}
</style>
