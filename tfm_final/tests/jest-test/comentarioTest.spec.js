import {
  receta_id,
  usuario_id,
  contenido,
  loading,
  error,
  cargarRecetas,
  cargarUsuarios,
  crearComentario,
} from "../../src/services/comentarioTest.js";

import { getRecetas, getUsuarios, NuevoComentario } from "../../src/services/api.js";


jest.mock("../../src/services/api.js", () => ({
  getRecetas: jest.fn(),
  getUsuarios: jest.fn(),
  NuevoComentario: jest.fn(),
}));

describe("comentarioTest", () => {
  beforeEach(() => {
    receta_id.value = null;
    usuario_id.value = null;
    contenido.value = "";
    loading.value = false;
    error.value = null;
    jest.clearAllMocks();
  });

  test("cargarRecetas devuelve recetas", async () => {
    getRecetas.mockResolvedValue([{ id: 1, nombre: "Tortilla" }]);
    const data = await cargarRecetas();
    expect(data).toEqual([{ id: 1, nombre: "Tortilla" }]);
    expect(loading.value).toBe(false);
  });

  test("cargarUsuarios maneja error", async () => {
    getUsuarios.mockRejectedValue(new Error("error"));
    const data = await cargarUsuarios();
    expect(data).toEqual([]);
    expect(error.value).toBe("error");
  });

  test("crearComentario funciona correctamente", async () => {
    receta_id.value = 1;
    usuario_id.value = 2;
    contenido.value = "Muy buena receta para los test";

    NuevoComentario.mockResolvedValue({ id: 10, contenido: "Muy buena receta para los test" });

    const result = await crearComentario();

    expect(NuevoComentario).toHaveBeenCalledWith({
      receta_id: 1,
      usuario_id: 2,
      contenido: "Muy buena receta para los test",
    });
    expect(result).toEqual({ id: 10, contenido: "Muy buena receta para los test" });
  });
});
