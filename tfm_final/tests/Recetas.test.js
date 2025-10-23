import { describe, it, expect, beforeAll, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Recetas from "../src/views/Recetas.vue";

const API_URL = "http://127.0.0.1:8000/api";
const TOKEN = "1|bcpugBufuZRzFIBkYeIszPeN572Aw3YkHkwbyR2Y2531edab";

beforeAll(() => {
  global.localStorage = {
    getItem: (key) => (key === "token" ? TOKEN : null),
    setItem: () => {},
    removeItem: () => {},
  };

  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      json: () =>
        Promise.resolve([
          { titulo: "Paella", descripcion: "Arroz con mariscos" },
          { titulo: "Ensalada", descripcion: "Lechuga y tomate" },
        ])
    })
  );
});

describe("Recetas.vue", () => {
  it("se renderiza correctamente", () => {
    const wrapper = mount(Recetas, { props: { apiUrl: API_URL } });
    expect(wrapper.exists()).toBe(true);
  });

  it("muestra el título de la página", () => {
    const wrapper = mount(Recetas, { props: { apiUrl: API_URL } });
    expect(wrapper.text()).toContain("Recetas");
  });

  it("carga recetas desde la API", async () => {
    const wrapper = mount(Recetas, {
      props: { 
        apiUrl: API_URL,
        apiToken: TOKEN
      }
    });
    await flushPromises();
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(wrapper.html()).toMatch(/Paella|Ensalada/i);
  });
});
