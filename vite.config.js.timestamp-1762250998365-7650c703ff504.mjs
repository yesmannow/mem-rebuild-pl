// vite.config.js
import { defineConfig } from "file:///C:/jacob-darling-portfolio-meme-main/node_modules/vite/dist/node/index.js";
import react from "file:///C:/jacob-darling-portfolio-meme-main/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
import { createHtmlPlugin } from "file:///C:/jacob-darling-portfolio-meme-main/node_modules/vite-plugin-html/dist/index.mjs";
import { visualizer } from "file:///C:/jacob-darling-portfolio-meme-main/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "C:\\jacob-darling-portfolio-meme-main";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    visualizer({
      open: false,
      filename: "dist/stats.html",
      gzipSize: true,
      brotliSize: true
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: "Jacob Darling \u2014 Design. Motion. Code.",
          description: "A cinematic portfolio by Jacob Darling \u2014 bridging creativity, technology, and storytelling.",
          ogTitle: "Jacob Darling \u2014 Cinematic Portfolio",
          ogDescription: "Explore Jacob's cinematic digital work \u2014 where design, code, and motion move as one.",
          ogImage: "/images/og-cover.webp",
          ogUrl: "https://jacobdarling.com",
          twitterCard: "summary_large_image",
          twitterTitle: "Jacob Darling \u2014 Cinematic Portfolio",
          twitterDescription: "Design. Motion. Code. Cinematic storytelling for the modern web.",
          twitterImage: "/images/og-cover.webp",
          canonicalUrl: "https://jacobdarling.com",
          ldJson: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Jacob Darling",
            "jobTitle": "Creative Technologist",
            "url": "https://jacobdarling.com",
            "image": "/images/bio/bio-photo.jpg",
            "sameAs": [
              "https://linkedin.com/in/jacobdarling",
              "https://github.com/JdarlingGT"
            ]
          })
        }
      }
    })
  ],
  server: {
    fs: {
      strict: false
    }
    // HMR config removed entirely - relying on Vite defaults prevents overlay_bundle.js injection
    // This prevents mce-autosize-textarea from being registered by the error overlay
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "react": path.resolve(__vite_injected_original_dirname, "./node_modules/react"),
      "react-dom": path.resolve(__vite_injected_original_dirname, "./node_modules/react-dom")
    },
    dedupe: ["react", "react-dom"]
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "lenis", "framer-motion", "gsap"],
    esbuildOptions: {
      // Fix potential circular dependency issues
      keepNames: true
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Prevent circular dependency warnings
        hoistTransitiveImports: false,
        // Ensure proper chunk loading in production
        format: "es",
        manualChunks: (id) => {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/react/jsx-runtime") || id.includes("node_modules/react/jsx-dev-runtime")) {
            return "react-core";
          }
          if (id.includes("node_modules/three/") || id.includes("node_modules/@react-three/") || id.includes("node_modules/three/src/") || id.includes("node_modules/three/build/")) {
            return "three-vendor";
          }
          if (id.includes("node_modules/framer-motion") || id.includes("node_modules/gsap") || id.includes("node_modules/animejs") || id.includes("node_modules/lenis")) {
            return "animation-vendor";
          }
          if (id.includes("node_modules/react-router")) {
            return "router-vendor";
          }
          if (id.includes("node_modules/@react-pdf") || id.includes("node_modules/jspdf")) {
            return "pdf-vendor";
          }
          if (id.includes("node_modules/simple-icons")) {
            return "simple-icons-lazy";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "ui-vendor";
          }
          if (id.includes("node_modules/@radix-ui")) {
            return "ui-vendor";
          }
          if (id.includes("node_modules/recharts") || id.includes("node_modules/recharts/")) {
            return "charts-vendor";
          }
          if (id.includes("node_modules/tsparticles")) {
            return "particles-vendor";
          }
          if (id.includes("node_modules/jimp") || id.includes("node_modules/node-vibrant")) {
            return "image-vendor";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/src/pdf/")) {
            return "pdf-app";
          }
          if (id.includes("/src/pages/")) {
            return void 0;
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split("/").pop() : "chunk";
          const baseName = facadeModuleId.replace(/\.(tsx|ts)$/, "");
          return `assets/${baseName}-[hash].js`;
        },
        entryFileNames: (chunkInfo) => {
          let name = chunkInfo.name || "index";
          name = name.replace(/\.(tsx|ts)$/, "");
          if (!name || name === "main") {
            name = "index";
          }
          return `assets/${name}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(tsx|ts)$/.test(assetInfo.name)) {
            const baseName = assetInfo.name.replace(/\.(tsx|ts)$/, "");
            return `assets/${baseName}-[hash].js`;
          }
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/[name]-[hash].${ext}`;
          }
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        }
      }
    },
    // Performance optimizations
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false,
        // Keep console.log for production debugging
        drop_debugger: true,
        pure_funcs: ["console.debug"]
        // Only drop debug, keep log/warn/error
      },
      mangle: {
        safari10: true
      }
    },
    // Source maps for production debugging
    sourcemap: false,
    // Target modern browsers for better optimization
    target: "esnext",
    // CSS code splitting
    cssCodeSplit: true,
    // Asset optimization
    assetsInlineLimit: 4096,
    // 4kb inline limit
    chunkSizeWarningLimit: 1e3,
    // Warning at 1MB (chunks will still be built, but warned)
    // Report compressed sizes
    reportCompressedSize: true,
    // Minify CSS
    cssMinify: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxqYWNvYi1kYXJsaW5nLXBvcnRmb2xpby1tZW1lLW1haW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGphY29iLWRhcmxpbmctcG9ydGZvbGlvLW1lbWUtbWFpblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovamFjb2ItZGFybGluZy1wb3J0Zm9saW8tbWVtZS1tYWluL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCc7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdmlzdWFsaXplcih7XG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICAgIGZpbGVuYW1lOiAnZGlzdC9zdGF0cy5odG1sJyxcbiAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICB9KSxcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgIG1pbmlmeTogdHJ1ZSxcbiAgICAgIGluamVjdDoge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGl0bGU6ICdKYWNvYiBEYXJsaW5nIFx1MjAxNCBEZXNpZ24uIE1vdGlvbi4gQ29kZS4nLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQSBjaW5lbWF0aWMgcG9ydGZvbGlvIGJ5IEphY29iIERhcmxpbmcgXHUyMDE0IGJyaWRnaW5nIGNyZWF0aXZpdHksIHRlY2hub2xvZ3ksIGFuZCBzdG9yeXRlbGxpbmcuJyxcbiAgICAgICAgICBvZ1RpdGxlOiAnSmFjb2IgRGFybGluZyBcdTIwMTQgQ2luZW1hdGljIFBvcnRmb2xpbycsXG4gICAgICAgICAgb2dEZXNjcmlwdGlvbjogJ0V4cGxvcmUgSmFjb2JcXCdzIGNpbmVtYXRpYyBkaWdpdGFsIHdvcmsgXHUyMDE0IHdoZXJlIGRlc2lnbiwgY29kZSwgYW5kIG1vdGlvbiBtb3ZlIGFzIG9uZS4nLFxuICAgICAgICAgIG9nSW1hZ2U6ICcvaW1hZ2VzL29nLWNvdmVyLndlYnAnLFxuICAgICAgICAgIG9nVXJsOiAnaHR0cHM6Ly9qYWNvYmRhcmxpbmcuY29tJyxcbiAgICAgICAgICB0d2l0dGVyQ2FyZDogJ3N1bW1hcnlfbGFyZ2VfaW1hZ2UnLFxuICAgICAgICAgIHR3aXR0ZXJUaXRsZTogJ0phY29iIERhcmxpbmcgXHUyMDE0IENpbmVtYXRpYyBQb3J0Zm9saW8nLFxuICAgICAgICAgIHR3aXR0ZXJEZXNjcmlwdGlvbjogJ0Rlc2lnbi4gTW90aW9uLiBDb2RlLiBDaW5lbWF0aWMgc3Rvcnl0ZWxsaW5nIGZvciB0aGUgbW9kZXJuIHdlYi4nLFxuICAgICAgICAgIHR3aXR0ZXJJbWFnZTogJy9pbWFnZXMvb2ctY292ZXIud2VicCcsXG4gICAgICAgICAgY2Fub25pY2FsVXJsOiAnaHR0cHM6Ly9qYWNvYmRhcmxpbmcuY29tJyxcbiAgICAgICAgICBsZEpzb246IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIFwiQGNvbnRleHRcIjogXCJodHRwczovL3NjaGVtYS5vcmdcIixcbiAgICAgICAgICAgIFwiQHR5cGVcIjogXCJQZXJzb25cIixcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIkphY29iIERhcmxpbmdcIixcbiAgICAgICAgICAgIFwiam9iVGl0bGVcIjogXCJDcmVhdGl2ZSBUZWNobm9sb2dpc3RcIixcbiAgICAgICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9qYWNvYmRhcmxpbmcuY29tXCIsXG4gICAgICAgICAgICBcImltYWdlXCI6IFwiL2ltYWdlcy9iaW8vYmlvLXBob3RvLmpwZ1wiLFxuICAgICAgICAgICAgXCJzYW1lQXNcIjogW1xuICAgICAgICAgICAgICBcImh0dHBzOi8vbGlua2VkaW4uY29tL2luL2phY29iZGFybGluZ1wiLFxuICAgICAgICAgICAgICBcImh0dHBzOi8vZ2l0aHViLmNvbS9KZGFybGluZ0dUXCJcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgZnM6IHtcbiAgICAgIHN0cmljdDogZmFsc2VcbiAgICB9XG4gICAgLy8gSE1SIGNvbmZpZyByZW1vdmVkIGVudGlyZWx5IC0gcmVseWluZyBvbiBWaXRlIGRlZmF1bHRzIHByZXZlbnRzIG92ZXJsYXlfYnVuZGxlLmpzIGluamVjdGlvblxuICAgIC8vIFRoaXMgcHJldmVudHMgbWNlLWF1dG9zaXplLXRleHRhcmVhIGZyb20gYmVpbmcgcmVnaXN0ZXJlZCBieSB0aGUgZXJyb3Igb3ZlcmxheVxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgXCJyZWFjdFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vbm9kZV9tb2R1bGVzL3JlYWN0XCIpLFxuICAgICAgXCJyZWFjdC1kb21cIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL25vZGVfbW9kdWxlcy9yZWFjdC1kb21cIiksXG4gICAgfSxcbiAgICBkZWR1cGU6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLFxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiLCBcInJlYWN0L2pzeC1ydW50aW1lXCIsIFwibGVuaXNcIiwgXCJmcmFtZXItbW90aW9uXCIsIFwiZ3NhcFwiXSxcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgLy8gRml4IHBvdGVudGlhbCBjaXJjdWxhciBkZXBlbmRlbmN5IGlzc3Vlc1xuICAgICAga2VlcE5hbWVzOiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIFByZXZlbnQgY2lyY3VsYXIgZGVwZW5kZW5jeSB3YXJuaW5nc1xuICAgICAgICBob2lzdFRyYW5zaXRpdmVJbXBvcnRzOiBmYWxzZSxcbiAgICAgICAgLy8gRW5zdXJlIHByb3BlciBjaHVuayBsb2FkaW5nIGluIHByb2R1Y3Rpb25cbiAgICAgICAgZm9ybWF0OiAnZXMnLFxuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAgIC8vIENvcmUgUmVhY3QgbGlicmFyaWVzIC0gTVVTVCBiZSBzZXBhcmF0ZSBhbmQgbG9hZCBmaXJzdFxuICAgICAgICAgIC8vIEluY2x1ZGUgYWxsIFJlYWN0LXJlbGF0ZWQgcGFja2FnZXMgaW4gcmVhY3QtY29yZSB0byBwcmV2ZW50IGRlZHVwbGljYXRpb24gaXNzdWVzXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3QvJykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWFjdC1kb20vJykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWFjdC9qc3gtcnVudGltZScpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3QvanN4LWRldi1ydW50aW1lJykpIHtcbiAgICAgICAgICAgIHJldHVybiAncmVhY3QtY29yZSc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gVGhyZWUuanMgcmVsYXRlZCAoVkVSWSBMQVJHRSAtIGNoZWNrIEVBUkxZIGJlZm9yZSBvdGhlciB2ZW5kb3JzKVxuICAgICAgICAgIC8vIE11c3QgYmUgaXNvbGF0ZWQgdG8gcHJldmVudCBpdCBmcm9tIGJsb2F0aW5nIHRoZSBtYWluIGluZGV4Lm1qcyBjaHVua1xuICAgICAgICAgIC8vIENoZWNrIGZvciBhbGwgVGhyZWUuanMgcGFja2FnZXMgYW5kIGRlcGVuZGVuY2llc1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3RocmVlLycpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvQHJlYWN0LXRocmVlLycpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvdGhyZWUvc3JjLycpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvdGhyZWUvYnVpbGQvJykpIHtcbiAgICAgICAgICAgIC8vIEZvcmNlIFRocmVlLmpzIGludG8gaXRzIG93biBjbGVhbiwgc2VwYXJhdGUgY2h1bmtcbiAgICAgICAgICAgIHJldHVybiAndGhyZWUtdmVuZG9yJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBbmltYXRpb24gbGlicmFyaWVzIChsYXJnZSwgYnVuZGxlIHRvZ2V0aGVyKVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2ZyYW1lci1tb3Rpb24nKSB8fFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2dzYXAnKSB8fFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2FuaW1lanMnKSB8fFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2xlbmlzJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnYW5pbWF0aW9uLXZlbmRvcic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUm91dGVyIGxpYnJhcmllcyAoZGVwZW5kcyBvbiBSZWFjdClcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXInKSkge1xuICAgICAgICAgICAgcmV0dXJuICdyb3V0ZXItdmVuZG9yJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBQREYgbGlicmFyaWVzIChsYXJnZSwgbGF6eSBsb2FkIHRoZXNlIHNlcGFyYXRlbHkpXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvQHJlYWN0LXBkZicpIHx8IGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvanNwZGYnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdwZGYtdmVuZG9yJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTaW1wbGUtaWNvbnMgKGxhcmdlIGljb24gbGlicmFyeSwgc2VwYXJhdGUgY2h1bmsgLSBsYXp5IGxvYWRlZClcbiAgICAgICAgICAvLyBGb3JjZSBpdCBpbnRvIGl0cyBvd24gY2h1bmsgdG8gZW5zdXJlIGl0IGRvZXNuJ3QgYmxvY2sgaW5pdGlhbCBsb2FkXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvc2ltcGxlLWljb25zJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnc2ltcGxlLWljb25zLWxhenknO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFVJIGxpYnJhcmllc1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2x1Y2lkZS1yZWFjdCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3VpLXZlbmRvcic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvQHJhZGl4LXVpJykpIHtcbiAgICAgICAgICAgIHJldHVybiAndWktdmVuZG9yJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDaGFydGluZyBsaWJyYXJpZXMgKHJlY2hhcnRzIC0gdmVyeSBsYXJnZSwgbXVzdCBiZSBpc29sYXRlZClcbiAgICAgICAgICAvLyBNYXJrZXRpbmdDb21tYW5kQ2VudGVyIHVzZXMgcmVjaGFydHMgYnV0IG1heSBub3QgYmUgYWN0aXZlbHkgdXNlZFxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3JlY2hhcnRzJykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWNoYXJ0cy8nKSkge1xuICAgICAgICAgICAgcmV0dXJuICdjaGFydHMtdmVuZG9yJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBQYXJ0aWNsZSBzeXN0ZW1zXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvdHNwYXJ0aWNsZXMnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdwYXJ0aWNsZXMtdmVuZG9yJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJbWFnZSBwcm9jZXNzaW5nIGxpYnJhcmllcyAobGFyZ2UpXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvamltcCcpIHx8IGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvbm9kZS12aWJyYW50JykpIHtcbiAgICAgICAgICAgIHJldHVybiAnaW1hZ2UtdmVuZG9yJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBPdGhlciBub2RlX21vZHVsZXMgKHNwbGl0IHJlbWFpbmluZyB2ZW5kb3JzKVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgIC8vIFByZXZlbnQgc2luZ2xlIGh1Z2UgdmVuZG9yIGNodW5rXG4gICAgICAgICAgICByZXR1cm4gJ3ZlbmRvcic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gU3BsaXQgbGFyZ2Ugc291cmNlIGZpbGVzIGludG8gbG9naWNhbCBjaHVua3NcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJy9zcmMvcGRmLycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3BkZi1hcHAnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnL3NyYy9wYWdlcy8nKSkge1xuICAgICAgICAgICAgLy8gUGFnZXMgYXJlIGFscmVhZHkgbGF6eSBsb2FkZWQgdmlhIFJlYWN0LmxhenlcbiAgICAgICAgICAgIC8vIFRoaXMgZW5zdXJlcyBwYWdlLXJlbGF0ZWQgY29kZSBpcyBjaHVua2VkIHByb3Blcmx5XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyBMZXQgVml0ZSBoYW5kbGUgcGFnZSBjaHVua3MgYXV0b21hdGljYWxseVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gT3B0aW1pemUgY2h1bmsgbmFtaW5nIGZvciBiZXR0ZXIgY2FjaGluZ1xuICAgICAgICBjaHVua0ZpbGVOYW1lczogKGNodW5rSW5mbykgPT4ge1xuICAgICAgICAgIGNvbnN0IGZhY2FkZU1vZHVsZUlkID0gY2h1bmtJbmZvLmZhY2FkZU1vZHVsZUlkID8gY2h1bmtJbmZvLmZhY2FkZU1vZHVsZUlkLnNwbGl0KCcvJykucG9wKCkgOiAnY2h1bmsnO1xuICAgICAgICAgIC8vIFJlbW92ZSAudHN4Ly50cyBleHRlbnNpb24gYW5kIGVuc3VyZSAuanMgZXh0ZW5zaW9uXG4gICAgICAgICAgY29uc3QgYmFzZU5hbWUgPSBmYWNhZGVNb2R1bGVJZC5yZXBsYWNlKC9cXC4odHN4fHRzKSQvLCAnJyk7XG4gICAgICAgICAgcmV0dXJuIGBhc3NldHMvJHtiYXNlTmFtZX0tW2hhc2hdLmpzYDtcbiAgICAgICAgfSxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcbiAgICAgICAgICAvLyBFbnN1cmUgZW50cnkgZmlsZXMgYWx3YXlzIHVzZSAuanMgZXh0ZW5zaW9uLCBuZXZlciAudHN4XG4gICAgICAgICAgbGV0IG5hbWUgPSBjaHVua0luZm8ubmFtZSB8fCAnaW5kZXgnO1xuICAgICAgICAgIC8vIFJlbW92ZSBhbnkgLnRzeCBvciAudHMgZXh0ZW5zaW9uIHRoYXQgbWlnaHQgYmUgaW4gdGhlIG5hbWVcbiAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9cXC4odHN4fHRzKSQvLCAnJyk7XG4gICAgICAgICAgLy8gSWYgbm8gbmFtZSBvciBuYW1lIGlzIGVtcHR5LCB1c2UgJ2luZGV4J1xuICAgICAgICAgIGlmICghbmFtZSB8fCBuYW1lID09PSAnbWFpbicpIHtcbiAgICAgICAgICAgIG5hbWUgPSAnaW5kZXgnO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYGFzc2V0cy8ke25hbWV9LVtoYXNoXS5qc2A7XG4gICAgICAgIH0sXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5mbyA9IGFzc2V0SW5mby5uYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgY29uc3QgZXh0ID0gaW5mb1tpbmZvLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgLy8gUHJldmVudCAudHN4Ly50cyBmaWxlcyBmcm9tIGJlaW5nIGNvcGllZCBhcyBhc3NldHNcbiAgICAgICAgICBpZiAoL1xcLih0c3h8dHMpJC8udGVzdChhc3NldEluZm8ubmFtZSkpIHtcbiAgICAgICAgICAgIC8vIFRoZXNlIHNob3VsZG4ndCBiZSBhc3NldHMgLSB0aGV5IHNob3VsZCBiZSBjaHVua3NcbiAgICAgICAgICAgIC8vIFJldHVybiBhIEpTIGV4dGVuc2lvbiB0byBmb3JjZSBwcm9wZXIgaGFuZGxpbmdcbiAgICAgICAgICAgIGNvbnN0IGJhc2VOYW1lID0gYXNzZXRJbmZvLm5hbWUucmVwbGFjZSgvXFwuKHRzeHx0cykkLywgJycpO1xuICAgICAgICAgICAgcmV0dXJuIGBhc3NldHMvJHtiYXNlTmFtZX0tW2hhc2hdLmpzYDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoL1xcLihjc3MpJC8udGVzdChhc3NldEluZm8ubmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBgYXNzZXRzL1tuYW1lXS1baGFzaF0uJHtleHR9YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKC9cXC4ocG5nfGpwZT9nfGdpZnxzdmd8d2VicHxhdmlmKSQvLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYGFzc2V0cy9pbWFnZXMvW25hbWVdLVtoYXNoXS4ke2V4dH1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYGFzc2V0cy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgICAvLyBQZXJmb3JtYW5jZSBvcHRpbWl6YXRpb25zXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IGZhbHNlLCAvLyBLZWVwIGNvbnNvbGUubG9nIGZvciBwcm9kdWN0aW9uIGRlYnVnZ2luZ1xuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgICBwdXJlX2Z1bmNzOiBbJ2NvbnNvbGUuZGVidWcnXSAvLyBPbmx5IGRyb3AgZGVidWcsIGtlZXAgbG9nL3dhcm4vZXJyb3JcbiAgICAgIH0sXG4gICAgICBtYW5nbGU6IHtcbiAgICAgICAgc2FmYXJpMTA6IHRydWVcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIFNvdXJjZSBtYXBzIGZvciBwcm9kdWN0aW9uIGRlYnVnZ2luZ1xuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgLy8gVGFyZ2V0IG1vZGVybiBicm93c2VycyBmb3IgYmV0dGVyIG9wdGltaXphdGlvblxuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgLy8gQ1NTIGNvZGUgc3BsaXR0aW5nXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgIC8vIEFzc2V0IG9wdGltaXphdGlvblxuICAgIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2LCAvLyA0a2IgaW5saW5lIGxpbWl0XG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLCAvLyBXYXJuaW5nIGF0IDFNQiAoY2h1bmtzIHdpbGwgc3RpbGwgYmUgYnVpbHQsIGJ1dCB3YXJuZWQpXG4gICAgLy8gUmVwb3J0IGNvbXByZXNzZWQgc2l6ZXNcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcbiAgICAvLyBNaW5pZnkgQ1NTXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICB9LFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFrUyxTQUFTLG9CQUFvQjtBQUMvVCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsa0JBQWtCO0FBSjNCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxNQUNWLFVBQVU7QUFBQSxNQUNWLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxJQUNELGlCQUFpQjtBQUFBLE1BQ2YsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLFFBQ04sTUFBTTtBQUFBLFVBQ0osT0FBTztBQUFBLFVBQ1AsYUFBYTtBQUFBLFVBQ2IsU0FBUztBQUFBLFVBQ1QsZUFBZTtBQUFBLFVBQ2YsU0FBUztBQUFBLFVBQ1QsT0FBTztBQUFBLFVBQ1AsYUFBYTtBQUFBLFVBQ2IsY0FBYztBQUFBLFVBQ2Qsb0JBQW9CO0FBQUEsVUFDcEIsY0FBYztBQUFBLFVBQ2QsY0FBYztBQUFBLFVBQ2QsUUFBUSxLQUFLLFVBQVU7QUFBQSxZQUNyQixZQUFZO0FBQUEsWUFDWixTQUFTO0FBQUEsWUFDVCxRQUFRO0FBQUEsWUFDUixZQUFZO0FBQUEsWUFDWixPQUFPO0FBQUEsWUFD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
