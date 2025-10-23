import {
  getMenus,
  getMenuByID,
  NuevoMenu,
  actualizarItem,
  eliminarItem,
} from "../../src/services/api.js";

global.fetch = vi.fn();

describe("Servicios: Menús", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "TEST_TOKEN");
  });

  // --- LISTAR ---
  test("getMenus devuelve menús correctamente", async () => {
    const mockData = [
      { id: 1, nombre: "Menú diario", fecha: "2025-10-20", usuario_id: 1 },
      { id: 2, nombre: "Menú vegetariano", fecha: "2025-10-21", usuario_id: 2 },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getMenus();
    expect(data.length).toBe(2);
    expect(data[0].nombre).toBe("Menú diario");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/menus$/),
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: expect.any(String),
        }),
      })
    );
  });

  // --- OBTENER POR ID ---
  test("getMenuByID devuelve un menú", async () => {
    const mockData = { id: 3, nombre: "Menú infantil", fecha: "2025-10-22" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getMenuByID(3);
    expect(data.id).toBe(3);
    expect(data.nombre).toBe("Menú infantil");
  });

  // --- CREAR ---
  test("NuevoMenu crea un menú correctamente", async () => {
    const nuevo = { usuario_id: 1, nombre: "Menú especial", fecha: "2025-10-23" };
    const mockData = { id: 10, ...nuevo };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await NuevoMenu(nuevo);
    expect(data.id).toBe(10);
    expect(data.nombre).toBe("Menú especial");
  });

  // --- ACTUALIZAR (genérico) ---
  test("actualizarItem(menus) realiza PUT correctamente", async () => {
    const payload = { nombre: "Menú actualizado" };
    const respuesta = { id: 4, nombre: "Menú actualizado" };

    fetch.mockResolvedValueOnce({ ok: true, json: async () => respuesta });

    const data = await actualizarItem("menus", 4, payload);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/menus\/4$/),
      expect.objectContaining({
        method: "PUT",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer TEST_TOKEN",
        }),
        body: JSON.stringify(payload),
      })
    );
    expect(data).toEqual(respuesta);
  });

  // --- ELIMINAR (genérico) ---
  test("eliminarItem(menus) hace DELETE correctamente", async () => {
    const resp = { deleted: true };

    fetch.mockResolvedValueOnce({ ok: true, json: async () => resp });

    const result = await eliminarItem("menus", 5);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/menus\/5$/),
      expect.objectContaining({
        method: "DELETE",
        headers: expect.objectContaining({
          Authorization: "Bearer TEST_TOKEN",
        }),
      })
    );
    expect(result).toEqual(resp);
  });

  // --- ERRORES ---
  test("getMenus lanza error 500 legible", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Internal Server Error" }),
    });

    await expect(getMenus()).rejects.toThrow(/500|menú|internal/i);
  });

  test("NuevoMenu lanza error de validación", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 422,
      json: async () => ({
        message: "Error de validación",
        errors: { nombre: ["El campo nombre es obligatorio."] },
      }),
    });

    await expect(NuevoMenu({ nombre: "" })).rejects.toThrow(/error-de-validacion/i);
  });

  test("Errores de red se propagan", async () => {
    fetch.mockRejectedValueOnce(new Error("Network down"));
    await expect(getMenus()).rejects.toThrow(/network/i);
  });
});
