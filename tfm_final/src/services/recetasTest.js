// Mock functions for testing
import { vi } from 'vitest';

export const exito = true;

export const cargarRecetas = vi.fn().mockResolvedValue([
  { id: 1, titulo: "Paella", descripcion: "Arroz con mariscos" },
  { id: 2, titulo: "Ensalada", descripcion: "Ensalada fresca" }
]);

export const guardarReceta = vi.fn().mockResolvedValue({ success: true });