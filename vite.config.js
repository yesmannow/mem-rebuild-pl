import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { existsSync } from 'fs';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Set base path for GitHub Pages deployment
  // Use '/' for root domain deployments (Vercel, Netlify, etc.)
  // Use repository name for GitHub Pages (e.g., '/mem-rebuild-pl/')
  base: process.env.GITHUB_PAGES === 'true'
    ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || 'mem-rebuild-pl'}/`
    : '/',
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
    react({
      // Ensure React Fast Refresh preamble is injected correctly
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      // Include all files for transformation
      include: '**/*.{jsx,tsx}',
    }),
    // PWA Configuration
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'header-logo.svg'],
      manifest: {
        name: 'Jacob Darling',
        short_name: 'Jacob',
        description: 'Marketing Technologist Portfolio',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'header-logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: 'pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false, // Disable in dev to avoid service worker conflicts
      },
    }),
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
    host: 'localhost',
    strictPort: false,
    hmr: {
      // Fix WebSocket connection issues - use same port as server
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
    },
    // Suppress overlay for known harmless errors (TinyMCE custom element duplicates)
    // Overlay is disabled - errors are caught and handled by our error handlers in index.html
    // Set to true if you want to see Vite's error overlay for debugging
    overlay: false,
  },
  // Optimize dependencies for dev server
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'gsap', 'lenis'],
    exclude: ['@tanstack/react-query'], // Exclude if not used on initial load
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
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
        format: 'es',
        entryFileNames: chunk => (chunk.name === 'sw' ? 'sw.js' : 'assets/[name]-[hash].js'),
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          router: ['react-router-dom'],
        },
      }
    },
  },
});
