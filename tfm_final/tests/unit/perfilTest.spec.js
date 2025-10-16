import {
  name,
  mail,
  pass,
  mensaje,
  exito,
  guardarUsuario,
} from "../../src/services/perfilTest.js";

import { NuevoUsuario } from "../../src/services/api.js";

jest.mock("../../src/services/api.js", () => ({
  NuevoUsuario: jest.fn(),
}));

describe("perfilTest", () => {
  beforeEach(() => {
    name.value = "";
    mail.value = "";
    pass.value = "";
    mensaje.value = "";
    exito.value = false;
    jest.clearAllMocks();
  });

  test("no guarda usuario si hay campos vacíos", async () => {
    name.value = "";
    mail.value = "";
    pass.value = "";

    const res = await guardarUsuario();

    expect(res).toBeNull();
    expect(mensaje.value).toBe("Todos los campos son obligatorios");
    expect(exito.value).toBe(false);
  });

  test("guarda usuario correctamente", async () => {
    name.value = "Jaione";
    mail.value = "pruebaTestJaione@example.com";
    pass.value = "123456";

    NuevoUsuario.mockResolvedValue({ message: "Usuario creado correctamente" });

    const res = await guardarUsuario();

    expect(NuevoUsuario).toHaveBeenCalledWith({
      name: "Jaione",
      email: "pruebaTestJaione@example.com",
      password: "123456",
    });
    expect(mensaje.value).toBe("Usuario creado correctamente");
    expect(exito.value).toBe(true);
    expect(name.value).toBe("");
    expect(mail.value).toBe("");
    expect(pass.value).toBe("");
    expect(res).toEqual({ message: "Usuario creado correctamente" });
  });

  test("Error al crear usuario", async () => {
    name.value = "Jaione";
    mail.value = "pruebaTestJaione@example.com";
    pass.value = "123456";

    NuevoUsuario.mockRejectedValue(new Error("Error en el servidor"));

    const res = await guardarUsuario();

    expect(res).toBeNull();
    expect(mensaje.value).toBe("Error en el servidor");
    expect(exito.value).toBe(false);
  });
});
