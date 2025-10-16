import { vi, beforeAll, afterEach } from 'vitest'

// URL base para tus servicios
beforeAll(() => {
  // Para import.meta.env.VITE_API_URL
  if (vi.stubEnv) {
    vi.stubEnv('VITE_API_URL', 'http://localhost:8000/api')
  } else {
    // fallback si tu versión no tiene stubEnv
    process.env.VITE_API_URL = 'http://localhost:8000/api'
  }

  // Mock de fetch (vi.fn() sí tiene mockResolvedValueOnce)
  if (vi.stubGlobal) {
    vi.stubGlobal('fetch', vi.fn())
  } else {
    globalThis.fetch = vi.fn()
  }

  // Mock de localStorage (tu api.js lo usa para el token)
  const ls = {
    store: {},
    getItem: vi.fn((k) => ls.store[k] ?? null),
    setItem: vi.fn((k, v) => { ls.store[k] = String(v) }),
    removeItem: vi.fn((k) => { delete ls.store[k] }),
    clear: vi.fn(() => { ls.store = {} })
  }
  if (vi.stubGlobal) {
    vi.stubGlobal('localStorage', ls)
  } else {
    globalThis.localStorage = ls
  }
})

afterEach(() => {
  vi.clearAllMocks()
})
