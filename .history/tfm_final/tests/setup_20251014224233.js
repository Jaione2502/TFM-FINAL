import { vi, beforeAll, afterEach } from 'vitest'

beforeAll(() => {
  // URL base usada en src/services/api.js
  if (vi.stubEnv) {
    vi.stubEnv('VITE_API_URL', 'http://localhost:8000/api')
  } else {
    process.env.VITE_API_URL = 'http://localhost:8000/api'
  }

  // Mock FETCH (así sí tendrás mockResolvedValueOnce)
  if (vi.stubGlobal) {
    vi.stubGlobal('fetch', vi.fn())
  } else {
    globalThis.fetch = vi.fn()
  }

  // Mock localStorage (tu api.js usa token)
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
