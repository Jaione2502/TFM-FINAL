import { describe, it, expect, beforeAll } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Dietas from "../src/views/Dietas.vue";

const API_URL = "http://127.0.0.1:8000/api";
let token = "";

beforeAll(async () => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", password: "password" }),
  });

  const data = await res.json();
  token = data.access_token;

  if (!token) throw new Error("No se obtuvo token de autenticación");
});

describe("Dietas.vue", () => {

  it("se renderiza correctamente", () => {
    const wrapper = mount(Dietas, { props: { apiToken: token, apiUrl: API_URL } });
    expect(wrapper.exists()).toBe(true);
  });

  it("muestra el título de la página", () => {
    const wrapper = mount(Dietas, { props: { apiToken: token, apiUrl: API_URL } });
    expect(wrapper.text()).toContain("Dietas");
  });

  it("carga dietas desde la API", async () => {
    const wrapper = mount(Dietas, { props: { apiToken: token, apiUrl: API_URL } });
    await flushPromises(); 
    expect(wrapper.html()).toMatch(/nombre|descripcion/i);
  });

});
