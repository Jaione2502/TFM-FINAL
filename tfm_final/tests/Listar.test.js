import { describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import Listar from "../src/views/Listar.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/:tipo/listar", component: Listar },
    { path: "/:tipo/editar/:id", name: "edicion", component: { template: "<div>Edit</div>" } },
  ],
});

const tipos = ["categorias", "recetas", "dietas", "ingredientes", "perfiles", "comentarios", "menus", "inventario"];

describe("Listar.vue", () => {

  tipos.forEach((tipo) => {
    it(`muestra elementos de tipo "${tipo}"`, async () => {
      router.push(`/${tipo}/listar`);
      await router.isReady();

      const wrapper = mount(Listar, {
        global: { plugins: [router] },
      });

      await flushPromises();

      
      expect(wrapper.html()).toMatch(/nombre|descripcion|titulo|usuario|ingrediente/i);

      
      const firstCard = wrapper.find(".card");
      if (firstCard.exists()) {
        await firstCard.trigger("click");
        expect(wrapper.vm.$route.name).toBe("edicion");
      }
    });
  });

});
   
