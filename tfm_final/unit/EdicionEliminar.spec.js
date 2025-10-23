import { vi } from 'vitest';
import { eliminarItem } from "../src/services/api.js";

vi.mock("../src/services/api.js", () => ({
  eliminarItem: vi.fn(),
}));

// eliminar categorias:
describe("eliminar categoria", () => {
  let confirmMock;
  let pushMock;
  let estado;
  let tipo;
  let id;

  beforeEach(() => {
    confirmMock = vi.spyOn(global, "confirm");
    pushMock = vi.fn();

    tipo = { value: "categorias" };
    id = { value: 1 };

    estado = { mensaje: "", exito: false };

    vi.clearAllMocks();
  });

  async function eliminar() {
    if (!confirm("¿Seguro que quieres eliminar el elemento?")) return;

    try {
      const rutas = {
        categorias: "categoria",
      };

      const rutaApi = rutas[tipo.value];
      if (!rutaApi) throw new Error("Tipo no válido para eliminar");

      await eliminarItem(rutaApi, id.value);

      estado.mensaje = "Eliminado correctamente";
      estado.exito = true;

      setTimeout(() => {
        pushMock({ name: "listar", params: { tipo: tipo.value } });
      }, 1000);
    } catch (err) {
      estado.mensaje = err.message || "Error al eliminar";
      estado.exito = false;
    }
  }

  it("elimina una categoría correctamente", async () => {
    confirmMock.mockReturnValue(true);
    eliminarItem.mockResolvedValueOnce({ message: "Eliminado correctamente" });

    await eliminar();

    expect(confirmMock).toHaveBeenCalledWith("¿Seguro que quieres eliminar el elemento?");
    expect(eliminarItem).toHaveBeenCalledWith("categoria", 1);

    expect(estado.mensaje).toBe("Eliminado correctamente");
    expect(estado.exito).toBe(true);
  });

  it("no elimina si el usuario cancela", async () => {
    confirmMock.mockReturnValue(false);

    await eliminar();

    expect(eliminarItem).not.toHaveBeenCalled();
    expect(estado.mensaje).toBe("");
  });

  // eliminar comentarios:
  describe("eliminar comentario", () => {
  let confirmMock;
  let pushMock;
  let estado;
  let tipo;
  let id;

  beforeEach(() => {
    confirmMock = vi.spyOn(global, "confirm");
    pushMock = vi.fn();

    tipo = { value: "comentarios" };
    id = { value: 42 }; 

    estado = { mensaje: "", exito: false };

    vi.clearAllMocks();
  });

  async function eliminar() {
    if (!confirm("¿Seguro que quieres eliminar el elemento?")) return;

    try {
      const rutas = {
        comentarios: "comentario",       
      };

      const rutaApi = rutas[tipo.value];
      if (!rutaApi) throw new Error("Tipo no válido para eliminar");

      await eliminarItem(rutaApi, id.value);

      estado.mensaje = "Eliminado correctamente";
      estado.exito = true;

      setTimeout(() => {
        pushMock({ name: "listar", params: { tipo: tipo.value } });
      }, 1000);
    } catch (err) {
      estado.mensaje = err.message || "Error al eliminar";
      estado.exito = false;
    }
  }

  it("elimina un comentario correctamente", async () => {
    confirmMock.mockReturnValue(true);
    eliminarItem.mockResolvedValueOnce({ message: "Eliminado correctamente" });

    await eliminar();

    expect(confirmMock).toHaveBeenCalledWith("¿Seguro que quieres eliminar el elemento?");
    expect(eliminarItem).toHaveBeenCalledWith("comentario", 42);
    expect(estado.mensaje).toBe("Eliminado correctamente");
    expect(estado.exito).toBe(true);
  });

  it("no elimina si el usuario cancela", async () => {
    confirmMock.mockReturnValue(false);

    await eliminar();

    expect(eliminarItem).not.toHaveBeenCalled();
    expect(estado.mensaje).toBe("");
  });

  it("maneja errores si laravel falla", async () => {
    confirmMock.mockReturnValue(true);
    eliminarItem.mockRejectedValue(new Error("Error al eliminar"));

    await eliminar();

    expect(estado.mensaje).toBe("Error al eliminar");
    expect(estado.exito).toBe(false);
  });

  });

  // eliminar usuarios:
  describe("eliminar usuario", () => {
  let confirmMock;
  let pushMock;
  let estado;
  let tipo;
  let id;

  beforeEach(() => {
    confirmMock = vi.spyOn(global, "confirm");
    pushMock = vi.fn();

    tipo = { value: "perfiles" };
    id = { value: 7 }; 

    estado = { mensaje: "", exito: false };

    vi.clearAllMocks();
  });

  async function eliminar() {
    if (!confirm("¿Seguro que quieres eliminar el elemento?")) return;

    try {
      const rutas = {
        perfiles: "usuario",       
      };

      const rutaApi = rutas[tipo.value];
      if (!rutaApi) throw new Error("Tipo no válido para eliminar");

      await eliminarItem(rutaApi, id.value);

      estado.mensaje = "Eliminado correctamente";
      estado.exito = true;

      setTimeout(() => {
        pushMock({ name: "listar", params: { tipo: tipo.value } });
      }, 1000);
    } catch (err) {
      estado.mensaje = err.message || "Error al eliminar";
      estado.exito = false;
    }
  }

  it("elimina un usuario", async () => {
    confirmMock.mockReturnValue(true);
    eliminarItem.mockResolvedValueOnce({ message: "Eliminado correctamente" });

    await eliminar();

    expect(confirmMock).toHaveBeenCalledWith("¿Seguro que quieres eliminar el elemento?");
    expect(eliminarItem).toHaveBeenCalledWith("usuario", 7);
    expect(estado.mensaje).toBe("Eliminado correctamente");
    expect(estado.exito).toBe(true);
  });

  it("no elimina si el usuario cancela", async () => {
    confirmMock.mockReturnValue(false);

    await eliminar();

    expect(eliminarItem).not.toHaveBeenCalled();
    expect(estado.mensaje).toBe("");
  });

  it("maneja errores si la laravel falla", async () => {
    confirmMock.mockReturnValue(true);
    eliminarItem.mockRejectedValue(new Error("Error al eliminar"));

    await eliminar();

    expect(estado.mensaje).toBe("Error al eliminar");
    expect(estado.exito).toBe(false);
  });
});

});
