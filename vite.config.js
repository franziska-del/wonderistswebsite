import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        nextGen: resolve(import.meta.dirname, 'next-gen/index.html'),
        wildIdeas: resolve(import.meta.dirname, 'wild-ideas/index.html'),
      },
    },
  },
});
