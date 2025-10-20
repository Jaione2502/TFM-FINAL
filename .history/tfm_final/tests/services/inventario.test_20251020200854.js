import { getInventario, getInventarioByID, NuevoInventario } from "../../src/services/api.js";

global.fetch = vi.fn();

describe("Servicios: Inventario", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "TEST_TOKEN");
  });

  test("getInventario devuelve lista OK", async () => {
    const mockData = [
      { id: 1, ingrediente: "Sal" },
      { id: 2, ingrediente: "Harina" },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getInventario();
    expect(data.length).toBe(2);
    expect(data[1].ingrediente).toBe("Harina");
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/inventario",
      expect.any(Object)
    );
  });

  test("getInventarioByID devuelve un registro", async () => {
    const mockData = { id: 7, ingrediente: "Azúcar", cantidad: 3 };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getInventarioByID(7);
    expect(data.id).toBe(7);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/inventario/7",
      expect.any(Object)
    );
  });

  test("NuevoInventario crea registro y devuelve el creado", async () => {
    const nuevo = { ingrediente_id: 1, cantidad: 3 };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 9, ...nuevo }),
    });

    const data = await NuevoInventario(nuevo);
    expect(data.id).toBe(9);
    expect(data.cantidad).toBe(3);
  });
});
