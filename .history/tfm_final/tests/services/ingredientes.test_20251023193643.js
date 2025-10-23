import {
  getIngredientes,
  getIngredientesByID,
  NuevoIngrediente,
  actualizarItem,
  eliminarItem,
} from "../../src/services/api.js";

global.fetch = vi.fn();

describe("Servicios: Ingredientes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "TEST_TOKEN");
  });

  // --- LISTAR ---
  test("getIngredientes devuelve lista OK", async () => {
    const mockData = [
      { id: 1, nombre: "Sal" },
      { id: 2, nombre: "Azúcar" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getIngredientes();
    expect(data.length).toBe(2);
    expect(data[0].nombre).toBe("Sal");
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/ingredientes$/),
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: expect.any(String),
        }),
      })
    );
  });

  // --- OBTENER POR ID ---
  test("getIngredientesByID devuelve el ingrediente", async () => {
    const mockData = { id: 5, nombre: "Aceite" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getIngredientesByID(5);
    expect(data.id).toBe(5);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/ingredientes\/5$/),
      expect.any(Object)
    );
  });

  // --- CREAR ---
  test("NuevoIngrediente crea un ingrediente", async () => {
    const nuevo = { nombre: "Harina" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 10, ...nuevo }),
    });

    const data = await NuevoIngrediente(nuevo);
    expect(data.id).toBe(10);
    expect(data.nombre).toBe("Harina");
  });

  // --- ACTUALIZAR (genérico) ---
  test("actualizarItem(ingredientes) realiza PUT con body JSON y headers correctos", async () => {
    const payload = { nombre: "Pimentón dulce" };
    const respuesta = { id: 3, nombre: "Pimentón dulce" };

    fetch.mockResolvedValueOnce({ ok: true, text: async () => JSON.stringify(respuesta), json: async () => respuesta });

    const data = await actualizarItem("ingredientes", 3, payload);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/ingredientes\/3$/),
      expect.objectContaining({
        method: "PUT",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer TEST_TOKEN",
          Accept: "application/json",
        }),
        body: JSON.stringify(payload),
      })
    );
    expect(data).toEqual(respuesta);
  });

  test("actualizarItem maneja respuesta no JSON (fallback a texto) con error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "Internal error no JSON",
    });

    await expect(
      actualizarItem("ingredientes", 9, { nombre: "X" })
    ).rejects.toThrow(/Error en la respuesta del servidor|500|Internal/i);
  });

  // --- ELIMINAR (genérico) ---
  test("eliminarItem(ingredientes) hace DELETE con Authorization", async () => {
    const serverResp = { deleted: true };
    fetch.mockResolvedValueOnce({ ok: true, json: async () => serverResp });

    const result = await eliminarItem("ingredientes", 7);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/ingredientes\/7$/),
      expect.objectContaining({
        method: "DELETE",
        headers: expect.objectContaining({
          Authorization: "Bearer TEST_TOKEN",
        }),
      })
    );
    expect(result).toEqual(serverResp);
  });

  test("eliminarItem lanza error si el servidor responde 403", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({ message: "Forbidden" }),
    });

    await expect(eliminarItem("ingredientes", 1)).rejects.toThrow(/403|Forbidden|eliminar/i);
  });

  // --- RESPUESTA VACÍA ---
  test("getIngredientes maneja respuesta vacía", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

    const data = await getIngredientes();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });

  // --- ERRORES ---
  test("getIngredientesByID propaga error genérico coherente", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: "No encontrado" }),
    });

    await expect(getIngredientesByID(999)).rejects.toThrow(/Error al obtener el ingrediente/i);
  });

  test("NuevoIngrediente devuelve error de validación (422) con mensajes del backend", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 422,
      json: async () => ({
        message: "The given data was invalid.",
        errors: { nombre: ["El campo nombre es obligatorio."] },
      }),
    });

    await expect(NuevoIngrediente({ nombre: "" })).rejects.toThrow(/422|invalid|obligatorio/i);
  });

  test("Todas las llamadas incluyen Authorization Bearer <token>", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
    await getIngredientes();

    const [, opts] = fetch.mock.calls[0];
    expect(opts.headers.Authorization).toBe("Bearer TEST_TOKEN");
  });

  test("Errores 500 en getIngredientes se convierten en excepciones legibles", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ message: "Internal Server Error" }),
    });

    await expect(getIngredientes()).rejects.toThrow(/Error al obtener ingredientes|500|internal/i);
  });

  test("Errores de red (reject) se propagan", async () => {
    fetch.mockRejectedValueOnce(new Error("Network down"));
    await expect(getIngredientes()).rejects.toThrow(/network/i);
  });
});
