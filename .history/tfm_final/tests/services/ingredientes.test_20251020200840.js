import { getIngredientes, getIngredientesByID, NuevoIngrediente } from "../../src/services/api.js";

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
