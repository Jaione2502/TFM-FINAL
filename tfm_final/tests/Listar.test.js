import { describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import Listar from "../src/views/Listar.vue";

const API_URL = "http://127.0.0.1:8000/recetas_api"; 
const TOKEN = "1|bcpugBufuZRzFIBkYeIszPeN572Aw3YkHkwbyR2Y2531edab";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/:tipo/listar", component: Listar },
    { path: "/:tipo/editar/:id", name: "edicion", component: { template: "<div>Edit</div>" } },
  ],
});

const tipos = ["categorias", "recetas", "dietas"];

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

      // Esperamos que el HTML incluya texto de los datos
      expect(wrapper.html()).toMatch(/nombre|descripcion|titulo|usuario/i);

      const firstCard = wrapper.find(".card");
      if (firstCard.exists()) {
        await firstCard.trigger("click");
        expect(wrapper.vm.$route.name).toBe("edicion");
      }
    });
  });
});

