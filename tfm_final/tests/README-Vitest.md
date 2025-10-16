# Tests con Vitest

## 1) Configurar Vitest en `vite.config.js`
Añade el bloque `test`:

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: './tests/coverage'
    },
    css: true
  }
})
```

## 2) Scripts en package.json
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

## 3) Ejecutar
```bash
npm run test
npm run test:ui
npm run test:coverage
```
