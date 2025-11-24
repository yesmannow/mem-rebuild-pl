// vite.config.js
import { defineConfig } from "file:///C:/Users/hoosi/Desktop/jd-marketing-port/mem-rebuild-pl/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/hoosi/Desktop/jd-marketing-port/mem-rebuild-pl/node_modules/@vitejs/plugin-react/dist/index.js";
import { resolve } from "path";
import { existsSync } from "fs";
import { visualizer } from "file:///C:/Users/hoosi/Desktop/jd-marketing-port/mem-rebuild-pl/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "C:\\Users\\hoosi\\Desktop\\jd-marketing-port\\mem-rebuild-pl";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src"),
      "@components": resolve(__vite_injected_original_dirname, "src/components"),
      "@pages": resolve(__vite_injected_original_dirname, "src/pages"),
      "@data": resolve(__vite_injected_original_dirname, "src/data"),
      "@utils": resolve(__vite_injected_original_dirname, "src/utils"),
      "@assets": resolve(__vite_injected_original_dirname, "src/assets"),
      "@config": resolve(__vite_injected_original_dirname, "src/config"),
      "@hooks": resolve(__vite_injected_original_dirname, "src/hooks")
    }
  },
  plugins: [
    react({
      // Fix preamble detection issues - use classic runtime for class components
      jsxRuntime: "automatic",
      jsxImportSource: "react",
      // Include all files for transformation
      include: "**/*.{jsx,tsx}",
      // Don't exclude anything
      exclude: void 0
    }),
    // Bundle analyzer - run with ANALYZE=true npm run build
    process.env.ANALYZE && visualizer({
      open: true,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true
    })
  ].filter(Boolean),
  server: {
    fs: {
      // Allow imports from entire project directory
      allow: [
        resolve(__vite_injected_original_dirname),
        resolve(__vite_injected_original_dirname, "cli-workflow")
      ]
    },
    port: 5173,
    host: "localhost",
    strictPort: false,
    hmr: {
      // Fix WebSocket connection issues - use same port as server
      protocol: "ws",
      host: "localhost",
      port: 5173,
      clientPort: 5173
    },
    // Suppress overlay for known harmless errors (TinyMCE custom element duplicates)
    // Overlay is disabled - errors are caught and handled by our error handlers in index.html
    // Set to true if you want to see Vite's error overlay for debugging
    overlay: false
  },
  // Optimize dependencies for dev server
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion", "gsap", "lenis"],
    exclude: ["@tanstack/react-query"]
    // Exclude if not used on initial load
  },
  build: {
    outDir: "dist",
    // Explicit output directory for Cloudflare Pages
    assetsDir: "assets",
    // Explicit assets directory to match _headers rules
    manifest: true,
    // Enable manifest for service worker precaching
    cssCodeSplit: true,
    // Extract CSS into separate files (default, but explicit)
    rollupOptions: {
      input: (() => {
        const entries = {
          main: resolve(__vite_injected_original_dirname, "index.html")
        };
        const serviceWorkerPath = resolve(__vite_injected_original_dirname, "src/sw.js");
        if (existsSync(serviceWorkerPath)) {
          entries.sw = serviceWorkerPath;
        }
        return entries;
      })(),
      output: {
        format: "es",
        // Explicitly set ES module format
        entryFileNames: (chunk) => chunk.name === "sw" ? "sw.js" : "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        // Ensure all chunks have .js extension
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        manualChunks: {
          // Vendor chunks for better caching
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "animation-vendor": ["framer-motion", "gsap"],
          "utils-vendor": ["lenis"]
        }
      }
    },
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 1e3,
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Minify with esbuild (default, faster than terser)
    minify: "esbuild",
    // Copy Cloudflare Pages config files
    copyPublicDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxob29zaVxcXFxEZXNrdG9wXFxcXGpkLW1hcmtldGluZy1wb3J0XFxcXG1lbS1yZWJ1aWxkLXBsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxob29zaVxcXFxEZXNrdG9wXFxcXGpkLW1hcmtldGluZy1wb3J0XFxcXG1lbS1yZWJ1aWxkLXBsXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ob29zaS9EZXNrdG9wL2pkLW1hcmtldGluZy1wb3J0L21lbS1yZWJ1aWxkLXBsL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJztcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgJ0Bjb21wb25lbnRzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cycpLFxyXG4gICAgICAnQHBhZ2VzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcGFnZXMnKSxcclxuICAgICAgJ0BkYXRhJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvZGF0YScpLFxyXG4gICAgICAnQHV0aWxzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvdXRpbHMnKSxcclxuICAgICAgJ0Bhc3NldHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hc3NldHMnKSxcclxuICAgICAgJ0Bjb25maWcnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb25maWcnKSxcclxuICAgICAgJ0Bob29rcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2hvb2tzJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3Qoe1xyXG4gICAgICAvLyBGaXggcHJlYW1ibGUgZGV0ZWN0aW9uIGlzc3VlcyAtIHVzZSBjbGFzc2ljIHJ1bnRpbWUgZm9yIGNsYXNzIGNvbXBvbmVudHNcclxuICAgICAganN4UnVudGltZTogJ2F1dG9tYXRpYycsXHJcbiAgICAgIGpzeEltcG9ydFNvdXJjZTogJ3JlYWN0JyxcclxuICAgICAgLy8gSW5jbHVkZSBhbGwgZmlsZXMgZm9yIHRyYW5zZm9ybWF0aW9uXHJcbiAgICAgIGluY2x1ZGU6ICcqKi8qLntqc3gsdHN4fScsXHJcbiAgICAgIC8vIERvbid0IGV4Y2x1ZGUgYW55dGhpbmdcclxuICAgICAgZXhjbHVkZTogdW5kZWZpbmVkLFxyXG4gICAgfSksXHJcbiAgICAvLyBCdW5kbGUgYW5hbHl6ZXIgLSBydW4gd2l0aCBBTkFMWVpFPXRydWUgbnBtIHJ1biBidWlsZFxyXG4gICAgcHJvY2Vzcy5lbnYuQU5BTFlaRSAmJiB2aXN1YWxpemVyKHtcclxuICAgICAgb3BlbjogdHJ1ZSxcclxuICAgICAgZmlsZW5hbWU6ICdkaXN0L3N0YXRzLmh0bWwnLFxyXG4gICAgICBnemlwU2l6ZTogdHJ1ZSxcclxuICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcclxuICAgIH0pLFxyXG4gIF0uZmlsdGVyKEJvb2xlYW4pLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgZnM6IHtcclxuICAgICAgLy8gQWxsb3cgaW1wb3J0cyBmcm9tIGVudGlyZSBwcm9qZWN0IGRpcmVjdG9yeVxyXG4gICAgICBhbGxvdzogW1xyXG4gICAgICAgIHJlc29sdmUoX19kaXJuYW1lKSxcclxuICAgICAgICByZXNvbHZlKF9fZGlybmFtZSwgJ2NsaS13b3JrZmxvdycpXHJcbiAgICAgIF1cclxuICAgIH0sXHJcbiAgICBwb3J0OiA1MTczLFxyXG4gICAgaG9zdDogJ2xvY2FsaG9zdCcsXHJcbiAgICBzdHJpY3RQb3J0OiBmYWxzZSxcclxuICAgIGhtcjoge1xyXG4gICAgICAvLyBGaXggV2ViU29ja2V0IGNvbm5lY3Rpb24gaXNzdWVzIC0gdXNlIHNhbWUgcG9ydCBhcyBzZXJ2ZXJcclxuICAgICAgcHJvdG9jb2w6ICd3cycsXHJcbiAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxyXG4gICAgICBwb3J0OiA1MTczLFxyXG4gICAgICBjbGllbnRQb3J0OiA1MTczLFxyXG4gICAgfSxcclxuICAgIC8vIFN1cHByZXNzIG92ZXJsYXkgZm9yIGtub3duIGhhcm1sZXNzIGVycm9ycyAoVGlueU1DRSBjdXN0b20gZWxlbWVudCBkdXBsaWNhdGVzKVxyXG4gICAgLy8gT3ZlcmxheSBpcyBkaXNhYmxlZCAtIGVycm9ycyBhcmUgY2F1Z2h0IGFuZCBoYW5kbGVkIGJ5IG91ciBlcnJvciBoYW5kbGVycyBpbiBpbmRleC5odG1sXHJcbiAgICAvLyBTZXQgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBzZWUgVml0ZSdzIGVycm9yIG92ZXJsYXkgZm9yIGRlYnVnZ2luZ1xyXG4gICAgb3ZlcmxheTogZmFsc2UsXHJcbiAgfSxcclxuICAvLyBPcHRpbWl6ZSBkZXBlbmRlbmNpZXMgZm9yIGRldiBzZXJ2ZXJcclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIGluY2x1ZGU6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nLCAnZnJhbWVyLW1vdGlvbicsICdnc2FwJywgJ2xlbmlzJ10sXHJcbiAgICBleGNsdWRlOiBbJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSddLCAvLyBFeGNsdWRlIGlmIG5vdCB1c2VkIG9uIGluaXRpYWwgbG9hZFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Rpc3QnLCAvLyBFeHBsaWNpdCBvdXRwdXQgZGlyZWN0b3J5IGZvciBDbG91ZGZsYXJlIFBhZ2VzXHJcbiAgICBhc3NldHNEaXI6ICdhc3NldHMnLCAvLyBFeHBsaWNpdCBhc3NldHMgZGlyZWN0b3J5IHRvIG1hdGNoIF9oZWFkZXJzIHJ1bGVzXHJcbiAgICBtYW5pZmVzdDogdHJ1ZSwgLy8gRW5hYmxlIG1hbmlmZXN0IGZvciBzZXJ2aWNlIHdvcmtlciBwcmVjYWNoaW5nXHJcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsIC8vIEV4dHJhY3QgQ1NTIGludG8gc2VwYXJhdGUgZmlsZXMgKGRlZmF1bHQsIGJ1dCBleHBsaWNpdClcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgaW5wdXQ6ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgZW50cmllcyA9IHtcclxuICAgICAgICAgIG1haW46IHJlc29sdmUoX19kaXJuYW1lLCAnaW5kZXguaHRtbCcpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc2VydmljZVdvcmtlclBhdGggPSByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zdy5qcycpO1xyXG4gICAgICAgIGlmIChleGlzdHNTeW5jKHNlcnZpY2VXb3JrZXJQYXRoKSkge1xyXG4gICAgICAgICAgZW50cmllcy5zdyA9IHNlcnZpY2VXb3JrZXJQYXRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZW50cmllcztcclxuICAgICAgfSkoKSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZm9ybWF0OiAnZXMnLCAvLyBFeHBsaWNpdGx5IHNldCBFUyBtb2R1bGUgZm9ybWF0XHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IGNodW5rID0+IChjaHVuay5uYW1lID09PSAnc3cnID8gJ3N3LmpzJyA6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycpLFxyXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLCAvLyBFbnN1cmUgYWxsIGNodW5rcyBoYXZlIC5qcyBleHRlbnNpb25cclxuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xyXG4gICAgICAgICAgLy8gRW5zdXJlIENTUyBmaWxlcyBoYXZlIC5jc3MgZXh0ZW5zaW9uXHJcbiAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWUgJiYgYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoJy5jc3MnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiAnYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAvLyBWZW5kb3IgY2h1bmtzIGZvciBiZXR0ZXIgY2FjaGluZ1xyXG4gICAgICAgICAgJ3JlYWN0LXZlbmRvcic6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcclxuICAgICAgICAgICdhbmltYXRpb24tdmVuZG9yJzogWydmcmFtZXItbW90aW9uJywgJ2dzYXAnXSxcclxuICAgICAgICAgICd1dGlscy12ZW5kb3InOiBbJ2xlbmlzJ10sXHJcbiAgICAgICAgfSxcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIE9wdGltaXplIGNodW5rIHNpemUgd2FybmluZyBsaW1pdFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxyXG4gICAgLy8gRW5hYmxlIHNvdXJjZSBtYXBzIGZvciBwcm9kdWN0aW9uIGRlYnVnZ2luZyAob3B0aW9uYWwpXHJcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG4gICAgLy8gTWluaWZ5IHdpdGggZXNidWlsZCAoZGVmYXVsdCwgZmFzdGVyIHRoYW4gdGVyc2VyKVxyXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsXHJcbiAgICAvLyBDb3B5IENsb3VkZmxhcmUgUGFnZXMgY29uZmlnIGZpbGVzXHJcbiAgICBjb3B5UHVibGljRGlyOiB0cnVlLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1XLFNBQVMsb0JBQW9CO0FBQ2hZLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxrQkFBa0I7QUFKM0IsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUM3QixlQUFlLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDbEQsVUFBVSxRQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUN4QyxTQUFTLFFBQVEsa0NBQVcsVUFBVTtBQUFBLE1BQ3RDLFVBQVUsUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDeEMsV0FBVyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUMxQyxXQUFXLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQzFDLFVBQVUsUUFBUSxrQ0FBVyxXQUFXO0FBQUEsSUFDMUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQSxNQUVKLFlBQVk7QUFBQSxNQUNaLGlCQUFpQjtBQUFBO0FBQUEsTUFFakIsU0FBUztBQUFBO0FBQUEsTUFFVCxTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUE7QUFBQSxJQUVELFFBQVEsSUFBSSxXQUFXLFdBQVc7QUFBQSxNQUNoQyxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixVQUFVO0FBQUEsTUFDVixZQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDSCxFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFFBQVE7QUFBQSxJQUNOLElBQUk7QUFBQTtBQUFBLE1BRUYsT0FBTztBQUFBLFFBQ0wsUUFBUSxnQ0FBUztBQUFBLFFBQ2pCLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osS0FBSztBQUFBO0FBQUEsTUFFSCxVQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsSUFDZDtBQUFBO0FBQUE7QUFBQTtBQUFBLElBSUEsU0FBUztBQUFBLEVBQ1g7QUFBQTtBQUFBLEVBRUEsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLFNBQVMsYUFBYSxvQkFBb0IsaUJBQWlCLFFBQVEsT0FBTztBQUFBLElBQ3BGLFNBQVMsQ0FBQyx1QkFBdUI7QUFBQTtBQUFBLEVBQ25DO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLElBQ1gsVUFBVTtBQUFBO0FBQUEsSUFDVixjQUFjO0FBQUE7QUFBQSxJQUNkLGVBQWU7QUFBQSxNQUNiLFFBQVEsTUFBTTtBQUNaLGNBQU0sVUFBVTtBQUFBLFVBQ2QsTUFBTSxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUN2QztBQUNBLGNBQU0sb0JBQW9CLFFBQVEsa0NBQVcsV0FBVztBQUN4RCxZQUFJLFdBQVcsaUJBQWlCLEdBQUc7QUFDakMsa0JBQVEsS0FBSztBQUFBLFFBQ2Y7QUFDQSxlQUFPO0FBQUEsTUFDVCxHQUFHO0FBQUEsTUFDSCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUE7QUFBQSxRQUNSLGdCQUFnQixXQUFVLE1BQU0sU0FBUyxPQUFPLFVBQVU7QUFBQSxRQUMxRCxnQkFBZ0I7QUFBQTtBQUFBLFFBQ2hCLGdCQUFnQixDQUFDLGNBQWM7QUFFN0IsY0FBSSxVQUFVLFFBQVEsVUFBVSxLQUFLLFNBQVMsTUFBTSxHQUFHO0FBQ3JELG1CQUFPO0FBQUEsVUFDVDtBQUNBLGlCQUFPO0FBQUEsUUFDVDtBQUFBLFFBQ0EsY0FBYztBQUFBO0FBQUEsVUFFWixnQkFBZ0IsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsVUFDekQsb0JBQW9CLENBQUMsaUJBQWlCLE1BQU07QUFBQSxVQUM1QyxnQkFBZ0IsQ0FBQyxPQUFPO0FBQUEsUUFDMUI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSx1QkFBdUI7QUFBQTtBQUFBLElBRXZCLFdBQVc7QUFBQTtBQUFBLElBRVgsUUFBUTtBQUFBO0FBQUEsSUFFUixlQUFlO0FBQUEsRUFDakI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
