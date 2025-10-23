// Mock functions for testing
import { vi } from 'vitest';

export const exito = true;

export const cargarDietas = vi.fn().mockResolvedValue([
  { id: 1, nombre: "Keto", descripcion: "Baja en carbohidratos" },
  { id: 2, nombre: "Vegetariana", descripcion: "Sin productos animales" }
]);

export const guardarDieta = vi.fn().mockResolvedValue({ success: true });