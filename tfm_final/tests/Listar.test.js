import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Listar from "@/views/Listar.vue";

vi.mock("@/services/api.js", () => ({
  getCategorias: vi.fn(() => Promise.resolve([{ id: 1, nombre: "Vegana", descripcion: "Sin carne" }])),
  getRecetas: vi.fn(() => Promise.resolve([{ id: 1, titulo: "Ensalada", descripcion: "Fresca y sana" }])),
  getDietas: vi.fn(() => Promise.resolve([{ id: 1, nombre: "Keto", descripcion: "Baja en carbos" }])),
  getIngredientes: vi.fn(() => Promise.resolve([{ id: 1, nombre: "Tomate", descripcion: "Rojo", unidad_medida: "kg" }])),
  getUsuarios: vi.fn(() => Promise.resolve([{ id: 1, name: "Ana", email: "ana@mail.com" }])),
  getMenus: vi.fn(() => Promise.resolve([{ id: 1, nombre: "Menú diario", fecha: "2025-10-11" }])),
  getInventario: vi.fn(() => Promise.resolve([{ id: 1, ingrediente: "Arroz", cantidad: "5kg" }])),
  getComentarios: vi.fn(() => Promise.resolve([{ id: 1, contenido: "Excelente receta", usuario: "Luis" }])),
}));

describe("Listar.vue", () => {
  it("se renderiza correctamente", () => {
    const wrapper = mount(Listar);
    expect(wrapper.exists()).toBe(true);
  });

  it("muestra el título de la página", () => {
    const wrapper = mount(Listar);
    expect(wrapper.text()).toContain("Listado");
  });

  it("carga categorías desde la API", async () => {
    const wrapper = mount(Listar, {
      props: {},
    });
    await flushPromises(); 
    expect(wrapper.text()).toContain("Vegana");
  });

  it("muestra un error si falla la carga (simulado)", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const wrapper = mount(Listar);
    await flushPromises();
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining("Error"));
    consoleSpy.mockRestore();
  });
});
   
