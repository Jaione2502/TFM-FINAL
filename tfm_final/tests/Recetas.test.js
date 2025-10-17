import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Recetas from "@/views/Recetas.vue";

describe("Recetas.vue", () => {
  it("se renderiza correctamente", () => {
    const wrapper = mount(Recetas);
    expect(wrapper.exists()).toBe(true);
  });
});
it("muestra el título de la página", () => {
  const wrapper = mount(Recetas);
  expect(wrapper.text()).toContain("Recetas");
});

it("carga las recetas", async () => {
  const wrapper = mount(Recetas);
  await wrapper.findComponent({ name: "recetas" });
});

it("error al cargar las recetas", async () => {
  const wrapper = mount(Recetas);
  await wrapper.findComponent({ name: "recetas" });
});