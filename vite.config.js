import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
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
      // Allow imports from cli-workflow directory only
      allow: [resolve(__dirname, 'cli-workflow')]
    }
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sw: resolve(__dirname, 'src/sw.js')
      },
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
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'gsap', 'lenis'],
      exclude: ['@tanstack/react-query'], // Exclude if not used on initial load
    },
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Minify with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
  }
});
