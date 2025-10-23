import { describe, it, expect, beforeAll } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import Listar from "../src/views/Listar.vue";

const API_URL = "http://127.0.0.1:8000/api";
let TOKEN = "";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/:tipo/listar", component: Listar },
    { path: "/:tipo/editar/:id", name: "edicion", component: { template: "<div>Edit</div>" } },
  ],
});

const tipos = ["categorias", "recetas", "dietas"];

beforeAll(async () => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", password: "password" }),
  });
  const data = await res.json();
  TOKEN = data.access_token;

  if (!TOKEN) throw new Error("No se pudo obtener token de autenticación");
});

describe("Listar.vue (API real)", () => {
  tipos.forEach((tipo) => {
    it(`muestra elementos de tipo "${tipo}" desde la API`, async () => {
      router.push(`/${tipo}/listar`);
      await router.isReady();

      const wrapper = mount(Listar, {
        global: {
          plugins: [router],
          provide: {
            apiBaseUrl: API_URL,
            token: TOKEN,
          },
        },
      });

      await flushPromises();

      // Verificar que se cargaron elementos
      expect(wrapper.html()).toMatch(/nombre|descripcion|titulo|usuario/i);

      const firstCard = wrapper.find(".card");
      if (firstCard.exists()) {
        await firstCard.trigger("click");
        expect(wrapper.vm.$route.name).toBe("edicion");
      }
    });
  });
});