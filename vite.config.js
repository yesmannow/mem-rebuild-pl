import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@data': resolve(__dirname, 'src/data'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@config': resolve(__dirname, 'src/config'),
      '@hooks': resolve(__dirname, 'src/hooks'),
    },
  },
  plugins: [
    react(),
    // Bundle analyzer - run with ANALYZE=true npm run build
    process.env.ANALYZE && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  server: {
    fs: {
      // Allow imports from entire project directory
      allow: [
        resolve(__dirname),
        resolve(__dirname, 'cli-workflow')
      ]
    },
    port: 5173,
    host: true,
  },
  // Optimize dependencies for dev server
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'gsap', 'lenis'],
    exclude: ['@tanstack/react-query'], // Exclude if not used on initial load
  },
  build: {
    manifest: false, // Set to false to avoid HTML proxy issues
    rollupOptions: {
      input: (() => {
        const entries = {
          main: resolve(__dirname, 'index.html'),
        };
        const serviceWorkerPath = resolve(__dirname, 'src/sw.js');
        if (existsSync(serviceWorkerPath)) {
          entries.sw = serviceWorkerPath;
        }
        return entries;
      })(),
      output: {
        entryFileNames: chunk => (chunk.name === 'sw' ? 'sw.js' : 'assets/[name]-[hash].js'),
        manualChunks: {
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion', 'gsap'],
          'utils-vendor': ['lenis'],
        },
      }
    },
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Minify with esbuild (default, faster than terser)
    minify: 'esbuild',
  }
});
