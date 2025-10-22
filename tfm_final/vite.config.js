import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: path.resolve(__dirname, 'tests/setup.js'),
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules', 'src/test/**'],
    },
  },
})
