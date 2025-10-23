import { describe, it, expect, beforeAll, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Dietas from "../src/views/Dietas.vue";

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
          { nombre: "Keto", descripcion: "Baja en carbohidratos" },
          { nombre: "Vegetariana", descripcion: "Sin carne" },
        ])
    })
  );
});

describe("Dietas.vue", () => {
  it("se renderiza correctamente", () => {
    const wrapper = mount(Dietas, { props: { apiUrl: API_URL } });
    expect(wrapper.exists()).toBe(true);
  });

  it("muestra el título de la página", () => {
    const wrapper = mount(Dietas, { props: { apiUrl: API_URL } });
    expect(wrapper.text()).toContain("Dietas");
  });

  it("carga dietas desde la API", async () => {
    const wrapper = mount(Dietas, {
      props: { 
        apiUrl: API_URL,
        apiToken: TOKEN
      }
    });
    
    // Esperar a que se resuelvan todas las promesas
    await flushPromises();
    
    // Dar tiempo adicional para la renderización
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    // Verificar que los datos se muestran
    expect(wrapper.text()).toContain("Keto");
    expect(wrapper.text()).toContain("Baja en carbohidratos");
  });
});

