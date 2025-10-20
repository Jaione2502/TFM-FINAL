import { getMenus, getMenuByID, NuevoMenu } from "../../src/services/api.js";

global.fetch = vi.fn();

describe("Servicios: Menús", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "TEST_TOKEN");
  });

  test("getMenus devuelve menús OK", async () => {
    const mockData = [{ id: 1, nombre: "Menú diario" }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getMenus();
    expect(data[0].nombre).toBe("Menú diario");
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/menus",
      expect.any(Object)
    );
  });

  test("getMenuByID devuelve el menú", async () => {
    const mockData = { id: 2, nombre: "Cena especial" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await getMenuByID(2);
    expect(data.id).toBe(2);
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:8000/api/menus/2",
      expect.any(Object)
    );
  });

  test("NuevoMenu crea un menú", async () => {
    const nuevo = { nombre: "Menú del día" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 5, ...nuevo }),
    });

    const data = await NuevoMenu(nuevo);
    expect(data.nombre).toBe("Menú del día");
  });
});
