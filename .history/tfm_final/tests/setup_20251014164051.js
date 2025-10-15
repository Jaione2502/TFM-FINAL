import { vi, afterEach } from 'vitest'

// Punto de entrada común para tests: mock de fetch y ENV
vi.stubEnv('VITE_API_URL', 'http://localhost:8000/api')

if (!global.fetch) {
  global.fetch = vi.fn()
} else {
  vi.spyOn(global, 'fetch')
}

afterEach(() => {
  vi.clearAllMocks()
})
