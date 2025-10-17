import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Dietas from "@/views/Dietas.vue";

describe("Dietas.vue", () => {
  it("se renderiza correctamente", () => {
    const wrapper = mount(Dietas);
    expect(wrapper.exists()).toBe(true);
  });
});

it("muestra el título de la página", () => {
  const wrapper = mount(Dietas);
  expect(wrapper.text()).toContain("Dietas");
});

it("carga las dietas", async () => {
  const wrapper = mount(Dietas);
  await wrapper.findComponent({ name: "dietas" });
});

it("error al cargar las dietas", async () => {
  const wrapper = mount(Dietas);
  await wrapper.findComponent({ name: "dietas" });
});
