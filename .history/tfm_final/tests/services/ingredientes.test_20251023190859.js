import { getIngredientes, getIngredientesByID, NuevoIngrediente, ActualizarIngrediente, EliminarIngrediente } from "../../src/services/api.js";

global.fetch = vi.fn();

describe("Servicios: Ingredientes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "TEST_TOKEN");
  });

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
      "http://localhost:8000/api/ingredientes",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: expect.any(String),
        }),
      })
    );
  });

  test("getIngredientesByID devuelve el ingrediente", async () => {
    const mockData = { id: 5, nombre: "Aceite" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getIngredientesByID(5);
    expect(data.id).toBe(5);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/ingredientes/5",
      expect.any(Object)
    );
  });

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
});

test("ActualizarIngrediente realiza PUT/PATCH con body JSON", async () => {
    const payload = { nombre: "Pimentón dulce" };
    const respuesta = { id: 3, nombre: "Pimentón dulce" };

    fetch.mockResolvedValueOnce({ ok: true, json: async () => respuesta });

    const data = await ActualizarIngrediente(3, payload);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/ingredientes/3",
      expect.objectContaining({
        method: expect.stringMatching(/^(PUT|PATCH)$/),
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          Authorization: "Bearer TEST_TOKEN",
        }),
        body: JSON.stringify(payload),
      })
    );
    expect(data).toEqual(respuesta);
  });
test("EliminarIngrediente realiza DELETE", async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    const result = await EliminarIngrediente(4);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/ingredientes/4",
      expect.objectContaining({
        method: "DELETE",
        headers: expect.objectContaining({
          Authorization: "Bearer TEST_TOKEN",
        }),
      })
    );
    expect(result).toBe(true);
  });

  test("getIngredientes maneja respuesta vacía", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

    const data = await getIngredientes();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });

  test("getIngredientes maneja respuesta vacía", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });

    const data = await getIngredientes();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
