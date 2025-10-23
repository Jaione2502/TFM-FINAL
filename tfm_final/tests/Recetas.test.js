import { describe, it, expect, beforeAll } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Recetas from "../src/views/Recetas.vue";

const API_URL = "http://127.0.0.1:8000/api";
let TOKEN = "";

beforeAll(async () => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", password: "password" }),
  });
  const data = await res.json();
  TOKEN = data.access_token;

  if (!TOKEN) throw new Error("No se pudo obtener token de autenticación");
});

describe("Recetas.vue", () => {
  it("carga recetas desde la API", async () => {
    const wrapper = mount(Recetas, { props: { apiToken: TOKEN, apiUrl: API_URL } });

    await flushPromises();
    
    expect(wrapper.html()).toMatch(/titulo|descripcion/i);
  });
});