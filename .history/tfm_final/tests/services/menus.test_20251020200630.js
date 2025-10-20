import { describe, it, expect } from 'vitest'
import { getMenus, getMenuByID, NuevoMenu } from '../../src/services/api.js'

describe('Servicios: Menús', () => {
  it('getMenus devuelve menús OK', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, nombre: 'Menú diario', fecha: '2025-10-01' },
        { id: 2, nombre: 'Menú fin de semana', fecha: '2025-10-05' }
      ])
    })

    const data = await getMenus()
    expect(data[0].nombre).toBe('Menú diario')
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/menus',
    expect.any(Object)
  )
  })
  })

  it('getMenuByID devuelve el menú', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 2, nombre: 'Menú fin de semana', fecha: '2025-10-05' })
    })

    const data = await getMenuByID(2)
    expect(data.id).toBe(2)
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/menus/2')
  })

  it('NuevoMenu crea un menú', async () => {
    const payload = { usuario_id: 1, nombre: 'Comida viernes', fecha: '2025-10-10' }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 8, ...payload })
    })

    const data = await NuevoMenu(payload)
    expect(data.id).toBe(8)
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/menus',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' })
      })
    )
  })
})
