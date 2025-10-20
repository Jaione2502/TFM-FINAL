import { describe, it, expect } from 'vitest'
import { getIngredientes, getIngredientesByID, NuevoIngrediente } from '../../src/services/api.js'

describe('Servicios: Ingredientes', () => {
  it('getIngredientes devuelve lista OK', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, nombre: 'Sal', unidad_medida: 'g' },
        { id: 2, nombre: 'Azúcar', unidad_medida: 'g' }
      ])
    })

    const data = await getIngredientes()
    expect(data.length).toBe(2)
    expect(data[0].nombre).toBe('Sal')
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/ingredientes')
  })

  it('getIngredientesByID devuelve el ingrediente', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 5, nombre: 'Harina', unidad_medida: 'g' })
    })

    const data = await getIngredientesByID(5)
    expect(data.id).toBe(5)
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/api/ingredientes/5')
  })

  it('NuevoIngrediente crea un ingrediente', async () => {
    const payload = { nombre: 'Aceite', descripcion: 'Oliva virgen', unidad_medida: 'ml' }
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ id: 9, ...payload })
    })

    const data = await NuevoIngrediente(payload)
    expect(data.id).toBe(9)
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8000/api/ingredientes',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' })
      })
    )
  })
})
