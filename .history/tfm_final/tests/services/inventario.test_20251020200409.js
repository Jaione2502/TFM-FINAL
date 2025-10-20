import { describe, it, expect } from 'vitest'
import { getInventario, getInventarioByID, NuevoInventario } from '../../src/services/api.js'

describe('Servicios: Inventario', () => {
  it('getInventario devuelve lista OK', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, usuario: 'Juan', ingrediente: 'Sal', cantidad: 2 },
        { id: 2, usuario: 'Ana', ingrediente: 'Harina', cantidad: 1 }
      ])
    })

    const data = await getInventario()
    expect(data.length).toBe(2)
    expect(data[1].ingrediente).toBe('Harina')
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/inventario',
    expect.any(Object)
  )
  })
  })

  it('getInventarioByID devuelve un registro', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 7, usuario_id: 3, ingrediente_id: 5, cantidad: 4 })
    })

    const data = await getInventarioByID(7)
    expect(data.id).toBe(7)
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/inventario/7',
    expect.any(Object)
  )
  })
  it('NuevoInventario crea registro y devuelve el creado', async () => {
    const payload = { usuario_id: 3, ingrediente_id: 5, cantidad: 4 }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 12, ...payload })
    })

    const data = await NuevoInventario(payload)
    expect(data.id).toBe(12)
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/inventario',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' })
      })
    )
  })
