import {
  nombre,
  descripcion,
  mensaje,
  exito,
  guardarCategoria,
} from "../../src/services/categoriaTest.js";

import { NuevaCategoria } from "../../src/services/api.js";

jest.mock("../../src/services/api.js", () => ({
  NuevaCategoria: jest.fn(),
}));

describe("categoriaTest", () => {
  beforeEach(() => {
    nombre.value = "";
    descripcion.value = "";
    mensaje.value = "";
    exito.value = false;
    jest.clearAllMocks();
  });

  test("no guarda categoría si hay campos vacíos", async () => {
    nombre.value = "";
    descripcion.value = "";

    const res = await guardarCategoria();

    expect(res).toBeNull();
    expect(mensaje.value).toBe("Todos los campos son obligatorios");
    expect(exito.value).toBe(false);
  });

  test("guarda categoría", async () => {
    nombre.value = "Postres";
    descripcion.value = "Recetas de postres";

    NuevaCategoria.mockResolvedValue({ message: "Categoría creada correctamente" });

    const res = await guardarCategoria();

    expect(NuevaCategoria).toHaveBeenCalledWith({
      nombre: "Postres",
      descripcion: "Recetas de postres",
    });
    expect(mensaje.value).toBe("Categoría creada correctamente");
    expect(exito.value).toBe(true);
    expect(nombre.value).toBe("");
    expect(descripcion.value).toBe("");
    expect(res).toEqual({ message: "Categoría creada correctamente" });
  });

  test("maneja error al crear categoría", async () => {
    nombre.value = "Postres";
    descripcion.value = "Recetas dulces y postres";

    NuevaCategoria.mockRejectedValue(new Error("Error en el servidor"));

    const res = await guardarCategoria();

    expect(res).toBeNull();
    expect(mensaje.value).toBe("Error en el servidor");
    expect(exito.value).toBe(false);
  });
});
