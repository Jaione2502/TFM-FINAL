import {
  getInventario,
  getInventarioByID,
  NuevoInventario,
  actualizarItem,
  eliminarItem,
} from "../../src/services/api.js";

global.fetch = vi.fn();

describe("Servicios: Inventario", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "TEST_TOKEN");
  });

  // --- LISTAR ---
  test("getInventario devuelve lista OK", async () => {
    const mockData = [
      { id: 1, cantidad: 3, usuario_id: 1, ingrediente_id: 2 },
      { id: 2, cantidad: 5, usuario_id: 1, ingrediente_id: 3 },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getInventario();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(2);
    expect(data[0].cantidad).toBe(3);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/inventario$/),
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: expect.any(String),
        }),
      })
    );
  });

  // --- OBTENER POR ID ---
  test("getInventarioByID devuelve un elemento de inventario", async () => {
    const mockData = { id: 9, cantidad: 2, usuario_id: 1, ingrediente_id: 4 };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getInventarioByID(9);
    expect(data.id).toBe(9);
    expect(data.cantidad).toBe(2);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/inventario\/9$/),
      expect.any(Object)
    );
  });

  // --- CREAR ---
  test("NuevoInventario crea un registro correctamente", async () => {
    const nuevo = { usuario_id: 1, ingrediente_id: 2, cantidad: 4 };
    const mockData = { id: 10, ...nuevo };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await NuevoInventario(nuevo);
    expect(data.id).toBe(10);
    expect(data.cantidad).toBe(4);
  });

  // --- ACTUALIZAR (genérico) ---
  test("actualizarItem(inventario) realiza PUT correctamente", async () => {
    const payload = { cantidad: 8 };
    const respuesta = { id: 1, cantidad: 8 };

    fetch.mockResolvedValueOnce({ ok: true, json: async () => respuesta });

    const data = await actualizarItem("inventario", 1, payload);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/inventario\/1$/),
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify(payload),
        headers: expect.objectContaining({
          Authorization: "Bearer TEST_TOKEN",
          "Content-Type": "application/json",
        }),
      })
    );
    expect(data).toEqual(respuesta);
  });

  // --- ELIMINAR (genérico) ---
  test("eliminarItem(inventario) hace DELETE con Authorization", async () => {
    const resp = { deleted: true };

    fetch.mockResolvedValueOnce({ ok: true, json: async () => resp });

    const result = await eliminarItem("inventario", 7);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/inventario\/7$/),
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
  test("getInventario lanza error 500 legible", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Internal Server Error" }),
    });

    await expect(getInventario()).rejects.toThrow(/500|inventario|internal/i);
  });

  test("NuevoInventario lanza error de validación", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 422,
      json: async () => ({
        message: "Error de validación",
        errors: { cantidad: ["Debe ser numérica."] },
      }),
    });

    await expect(NuevoInventario({ cantidad: "x" })).rejects.toThrow(/422|validación|numérica/i);
  });

  test("Errores de red se propagan", async () => {
    fetch.mockRejectedValueOnce(new Error("Network down"));
    await expect(getInventario()).rejects.toThrow(/network/i);
  });
});
