/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/apps/frontend/weather-client',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react()],
  build: {
    outDir: '../../../dist/apps/frontend/weather-client',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      '@monorepo/weather-interfaces': path.resolve(
        __dirname,
        '../../../libs/weather/interfaces/src'
      ),
      '@monorepo/shared-utils': path.resolve(
        __dirname,
        '../../../libs/shared-utils/src'
      ),
    },
  },
}));
