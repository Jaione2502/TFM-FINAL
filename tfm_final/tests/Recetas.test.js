import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Recetas from "../src/views/Recetas.vue";

describe("Recetas.vue", () => {

  it("se renderiza correctamente", () => {
    const wrapper = mount(Recetas);
    expect(wrapper.exists()).toBe(true);
  });

  it("muestra el título de la página", () => {
    const wrapper = mount(Recetas);
    expect(wrapper.text()).toContain("Recetas");
  });

  it("carga recetas desde la API", async () => {
    const wrapper = mount(Recetas);
    await flushPromises();
    expect(wrapper.html()).toMatch(/titulo|descripcion|Receta/i);
  });

});