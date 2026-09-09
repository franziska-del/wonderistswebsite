import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        nextGen: resolve(import.meta.dirname, 'next-gen/index.html'),
        wildIdeas: resolve(import.meta.dirname, 'wild-ideas/index.html'),
        wonderlab: resolve(import.meta.dirname, 'wonderlab/index.html'),
        dontBeAPussy: resolve(import.meta.dirname, 'wonderlab/dont-be-a-pussy/index.html'),
        unspokenCards: resolve(import.meta.dirname, 'unspokencards/index.html'),
      },
    },
  },
});
