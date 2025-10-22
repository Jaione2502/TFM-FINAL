import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Dietas from "../src/views/Dietas.vue";

describe("Dietas.vue", () => {

  it("se renderiza correctamente", () => {
    const wrapper = mount(Dietas);
    expect(wrapper.exists()).toBe(true);
  });

  it("muestra el título de la página", () => {
    const wrapper = mount(Dietas);
    expect(wrapper.text()).toContain("Dietas");
  });

  it("carga dietas desde la API", async () => {
    const wrapper = mount(Dietas);
    await flushPromises(); 
    expect(wrapper.html()).toMatch(/nombre|descripcion|Dieta/i);
  });

});