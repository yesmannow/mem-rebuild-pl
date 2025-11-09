import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sw: resolve(__dirname, 'src/sw.js')
      },
      output: {
        entryFileNames: chunk => (chunk.name === 'sw' ? 'sw.js' : 'assets/[name]-[hash].js')
      }
    }
  }
});
