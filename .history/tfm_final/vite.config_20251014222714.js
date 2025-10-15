import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './tests/setup.js',
  include: ['tests/**/*.{test,spec}.js'],
  exclude: [
    'tests/jest-test/**',          // 👈 excluye los tests de Jest
    'node_modules', 'dist', 'cypress',
    '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'
  ],
  css: true
  }
)


