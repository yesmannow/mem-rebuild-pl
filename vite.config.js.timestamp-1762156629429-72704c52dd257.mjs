// vite.config.js
import { defineConfig } from "file:///C:/Users/hoosi/OneDrive/Desktop/port55/jacob-darling-portfolio-meme/jacob-darling-portfolio-meme/jacob-darling-portfolio-meme/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/hoosi/OneDrive/Desktop/port55/jacob-darling-portfolio-meme/jacob-darling-portfolio-meme/jacob-darling-portfolio-meme/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
import { createHtmlPlugin } from "file:///C:/Users/hoosi/OneDrive/Desktop/port55/jacob-darling-portfolio-meme/jacob-darling-portfolio-meme/jacob-darling-portfolio-meme/node_modules/vite-plugin-html/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\hoosi\\OneDrive\\Desktop\\port55\\jacob-darling-portfolio-meme\\jacob-darling-portfolio-meme\\jacob-darling-portfolio-meme";
var vite_config_default = defineConfig({
  plugins: [
    react(),
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
          if (id.includes("node_modules/recharts")) {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxob29zaVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHBvcnQ1NVxcXFxqYWNvYi1kYXJsaW5nLXBvcnRmb2xpby1tZW1lXFxcXGphY29iLWRhcmxpbmctcG9ydGZvbGlvLW1lbWVcXFxcamFjb2ItZGFybGluZy1wb3J0Zm9saW8tbWVtZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcaG9vc2lcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxwb3J0NTVcXFxcamFjb2ItZGFybGluZy1wb3J0Zm9saW8tbWVtZVxcXFxqYWNvYi1kYXJsaW5nLXBvcnRmb2xpby1tZW1lXFxcXGphY29iLWRhcmxpbmctcG9ydGZvbGlvLW1lbWVcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2hvb3NpL09uZURyaXZlL0Rlc2t0b3AvcG9ydDU1L2phY29iLWRhcmxpbmctcG9ydGZvbGlvLW1lbWUvamFjb2ItZGFybGluZy1wb3J0Zm9saW8tbWVtZS9qYWNvYi1kYXJsaW5nLXBvcnRmb2xpby1tZW1lL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4taHRtbCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcclxuICAgICAgbWluaWZ5OiB0cnVlLFxyXG4gICAgICBpbmplY3Q6IHtcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICB0aXRsZTogJ0phY29iIERhcmxpbmcgXHUyMDE0IERlc2lnbi4gTW90aW9uLiBDb2RlLicsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ0EgY2luZW1hdGljIHBvcnRmb2xpbyBieSBKYWNvYiBEYXJsaW5nIFx1MjAxNCBicmlkZ2luZyBjcmVhdGl2aXR5LCB0ZWNobm9sb2d5LCBhbmQgc3Rvcnl0ZWxsaW5nLicsXHJcbiAgICAgICAgICBvZ1RpdGxlOiAnSmFjb2IgRGFybGluZyBcdTIwMTQgQ2luZW1hdGljIFBvcnRmb2xpbycsXHJcbiAgICAgICAgICBvZ0Rlc2NyaXB0aW9uOiAnRXhwbG9yZSBKYWNvYlxcJ3MgY2luZW1hdGljIGRpZ2l0YWwgd29yayBcdTIwMTQgd2hlcmUgZGVzaWduLCBjb2RlLCBhbmQgbW90aW9uIG1vdmUgYXMgb25lLicsXHJcbiAgICAgICAgICBvZ0ltYWdlOiAnL2ltYWdlcy9vZy1jb3Zlci53ZWJwJyxcclxuICAgICAgICAgIG9nVXJsOiAnaHR0cHM6Ly9qYWNvYmRhcmxpbmcuY29tJyxcclxuICAgICAgICAgIHR3aXR0ZXJDYXJkOiAnc3VtbWFyeV9sYXJnZV9pbWFnZScsXHJcbiAgICAgICAgICB0d2l0dGVyVGl0bGU6ICdKYWNvYiBEYXJsaW5nIFx1MjAxNCBDaW5lbWF0aWMgUG9ydGZvbGlvJyxcclxuICAgICAgICAgIHR3aXR0ZXJEZXNjcmlwdGlvbjogJ0Rlc2lnbi4gTW90aW9uLiBDb2RlLiBDaW5lbWF0aWMgc3Rvcnl0ZWxsaW5nIGZvciB0aGUgbW9kZXJuIHdlYi4nLFxyXG4gICAgICAgICAgdHdpdHRlckltYWdlOiAnL2ltYWdlcy9vZy1jb3Zlci53ZWJwJyxcclxuICAgICAgICAgIGNhbm9uaWNhbFVybDogJ2h0dHBzOi8vamFjb2JkYXJsaW5nLmNvbScsXHJcbiAgICAgICAgICBsZEpzb246IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgXCJAY29udGV4dFwiOiBcImh0dHBzOi8vc2NoZW1hLm9yZ1wiLFxyXG4gICAgICAgICAgICBcIkB0eXBlXCI6IFwiUGVyc29uXCIsXHJcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIkphY29iIERhcmxpbmdcIixcclxuICAgICAgICAgICAgXCJqb2JUaXRsZVwiOiBcIkNyZWF0aXZlIFRlY2hub2xvZ2lzdFwiLFxyXG4gICAgICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vamFjb2JkYXJsaW5nLmNvbVwiLFxyXG4gICAgICAgICAgICBcImltYWdlXCI6IFwiL2ltYWdlcy9iaW8vYmlvLXBob3RvLmpwZ1wiLFxyXG4gICAgICAgICAgICBcInNhbWVBc1wiOiBbXHJcbiAgICAgICAgICAgICAgXCJodHRwczovL2xpbmtlZGluLmNvbS9pbi9qYWNvYmRhcmxpbmdcIixcclxuICAgICAgICAgICAgICBcImh0dHBzOi8vZ2l0aHViLmNvbS9KZGFybGluZ0dUXCJcclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgXSxcclxuICBzZXJ2ZXI6IHtcclxuICAgIGZzOiB7XHJcbiAgICAgIHN0cmljdDogZmFsc2VcclxuICAgIH1cclxuICAgIC8vIEhNUiBjb25maWcgcmVtb3ZlZCBlbnRpcmVseSAtIHJlbHlpbmcgb24gVml0ZSBkZWZhdWx0cyBwcmV2ZW50cyBvdmVybGF5X2J1bmRsZS5qcyBpbmplY3Rpb25cclxuICAgIC8vIFRoaXMgcHJldmVudHMgbWNlLWF1dG9zaXplLXRleHRhcmVhIGZyb20gYmVpbmcgcmVnaXN0ZXJlZCBieSB0aGUgZXJyb3Igb3ZlcmxheVxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgIFwicmVhY3RcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL25vZGVfbW9kdWxlcy9yZWFjdFwiKSxcclxuICAgICAgXCJyZWFjdC1kb21cIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL25vZGVfbW9kdWxlcy9yZWFjdC1kb21cIiksXHJcbiAgICB9LFxyXG4gICAgZGVkdXBlOiBbXCJyZWFjdFwiLCBcInJlYWN0LWRvbVwiXSxcclxuICB9LFxyXG4gIG9wdGltaXplRGVwczoge1xyXG4gICAgaW5jbHVkZTogW1wicmVhY3RcIiwgXCJyZWFjdC1kb21cIiwgXCJyZWFjdC9qc3gtcnVudGltZVwiLCBcImxlbmlzXCIsIFwiZnJhbWVyLW1vdGlvblwiLCBcImdzYXBcIl0sXHJcbiAgICBlc2J1aWxkT3B0aW9uczoge1xyXG4gICAgICAvLyBGaXggcG90ZW50aWFsIGNpcmN1bGFyIGRlcGVuZGVuY3kgaXNzdWVzXHJcbiAgICAgIGtlZXBOYW1lczogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAvLyBQcmV2ZW50IGNpcmN1bGFyIGRlcGVuZGVuY3kgd2FybmluZ3NcclxuICAgICAgICBob2lzdFRyYW5zaXRpdmVJbXBvcnRzOiBmYWxzZSxcclxuICAgICAgICAvLyBFbnN1cmUgcHJvcGVyIGNodW5rIGxvYWRpbmcgaW4gcHJvZHVjdGlvblxyXG4gICAgICAgIGZvcm1hdDogJ2VzJyxcclxuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xyXG4gICAgICAgICAgLy8gQ29yZSBSZWFjdCBsaWJyYXJpZXMgLSBNVVNUIGJlIHNlcGFyYXRlIGFuZCBsb2FkIGZpcnN0XHJcbiAgICAgICAgICAvLyBJbmNsdWRlIGFsbCBSZWFjdC1yZWxhdGVkIHBhY2thZ2VzIGluIHJlYWN0LWNvcmUgdG8gcHJldmVudCBkZWR1cGxpY2F0aW9uIGlzc3Vlc1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3QvJykgfHxcclxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3JlYWN0LWRvbS8nKSB8fFxyXG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3QvanN4LXJ1bnRpbWUnKSB8fFxyXG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3QvanN4LWRldi1ydW50aW1lJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdyZWFjdC1jb3JlJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBUaHJlZS5qcyByZWxhdGVkIChWRVJZIExBUkdFIC0gY2hlY2sgRUFSTFkgYmVmb3JlIG90aGVyIHZlbmRvcnMpXHJcbiAgICAgICAgICAvLyBNdXN0IGJlIGlzb2xhdGVkIHRvIHByZXZlbnQgaXQgZnJvbSBibG9hdGluZyB0aGUgbWFpbiBpbmRleC5tanMgY2h1bmtcclxuICAgICAgICAgIC8vIENoZWNrIGZvciBhbGwgVGhyZWUuanMgcGFja2FnZXMgYW5kIGRlcGVuZGVuY2llc1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvdGhyZWUvJykgfHxcclxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL0ByZWFjdC10aHJlZS8nKSB8fFxyXG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvdGhyZWUvc3JjLycpIHx8XHJcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy90aHJlZS9idWlsZC8nKSkge1xyXG4gICAgICAgICAgICAvLyBGb3JjZSBUaHJlZS5qcyBpbnRvIGl0cyBvd24gY2xlYW4sIHNlcGFyYXRlIGNodW5rXHJcbiAgICAgICAgICAgIHJldHVybiAndGhyZWUtdmVuZG9yJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBBbmltYXRpb24gbGlicmFyaWVzIChsYXJnZSwgYnVuZGxlIHRvZ2V0aGVyKVxyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvZnJhbWVyLW1vdGlvbicpIHx8XHJcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9nc2FwJykgfHxcclxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2FuaW1lanMnKSB8fFxyXG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvbGVuaXMnKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ2FuaW1hdGlvbi12ZW5kb3InO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFJvdXRlciBsaWJyYXJpZXMgKGRlcGVuZHMgb24gUmVhY3QpXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWFjdC1yb3V0ZXInKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3JvdXRlci12ZW5kb3InO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFBERiBsaWJyYXJpZXMgKGxhcmdlLCBsYXp5IGxvYWQgdGhlc2Ugc2VwYXJhdGVseSlcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL0ByZWFjdC1wZGYnKSB8fCBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2pzcGRmJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdwZGYtdmVuZG9yJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBTaW1wbGUtaWNvbnMgKGxhcmdlIGljb24gbGlicmFyeSwgc2VwYXJhdGUgY2h1bmsgLSBsYXp5IGxvYWRlZClcclxuICAgICAgICAgIC8vIEZvcmNlIGl0IGludG8gaXRzIG93biBjaHVuayB0byBlbnN1cmUgaXQgZG9lc24ndCBibG9jayBpbml0aWFsIGxvYWRcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3NpbXBsZS1pY29ucycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnc2ltcGxlLWljb25zLWxhenknO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIFVJIGxpYnJhcmllc1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvbHVjaWRlLXJlYWN0JykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICd1aS12ZW5kb3InO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL0ByYWRpeC11aScpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAndWktdmVuZG9yJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBDaGFydGluZyBsaWJyYXJpZXNcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3JlY2hhcnRzJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdjaGFydHMtdmVuZG9yJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBQYXJ0aWNsZSBzeXN0ZW1zXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy90c3BhcnRpY2xlcycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAncGFydGljbGVzLXZlbmRvcic7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gSW1hZ2UgcHJvY2Vzc2luZyBsaWJyYXJpZXMgKGxhcmdlKVxyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvamltcCcpIHx8IGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvbm9kZS12aWJyYW50JykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdpbWFnZS12ZW5kb3InO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIE90aGVyIG5vZGVfbW9kdWxlcyAoc3BsaXQgcmVtYWluaW5nIHZlbmRvcnMpXHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgIC8vIFByZXZlbnQgc2luZ2xlIGh1Z2UgdmVuZG9yIGNodW5rXHJcbiAgICAgICAgICAgIHJldHVybiAndmVuZG9yJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBTcGxpdCBsYXJnZSBzb3VyY2UgZmlsZXMgaW50byBsb2dpY2FsIGNodW5rc1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCcvc3JjL3BkZi8nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3BkZi1hcHAnO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnL3NyYy9wYWdlcy8nKSkge1xyXG4gICAgICAgICAgICAvLyBQYWdlcyBhcmUgYWxyZWFkeSBsYXp5IGxvYWRlZCB2aWEgUmVhY3QubGF6eVxyXG4gICAgICAgICAgICAvLyBUaGlzIGVuc3VyZXMgcGFnZS1yZWxhdGVkIGNvZGUgaXMgY2h1bmtlZCBwcm9wZXJseVxyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvLyBMZXQgVml0ZSBoYW5kbGUgcGFnZSBjaHVua3MgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gT3B0aW1pemUgY2h1bmsgbmFtaW5nIGZvciBiZXR0ZXIgY2FjaGluZ1xyXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAoY2h1bmtJbmZvKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmYWNhZGVNb2R1bGVJZCA9IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZCA/IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZC5zcGxpdCgnLycpLnBvcCgpIDogJ2NodW5rJztcclxuICAgICAgICAgIC8vIFJlbW92ZSAudHN4Ly50cyBleHRlbnNpb24gYW5kIGVuc3VyZSAuanMgZXh0ZW5zaW9uXHJcbiAgICAgICAgICBjb25zdCBiYXNlTmFtZSA9IGZhY2FkZU1vZHVsZUlkLnJlcGxhY2UoL1xcLih0c3h8dHMpJC8sICcnKTtcclxuICAgICAgICAgIHJldHVybiBgYXNzZXRzLyR7YmFzZU5hbWV9LVtoYXNoXS5qc2A7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogKGNodW5rSW5mbykgPT4ge1xyXG4gICAgICAgICAgLy8gRW5zdXJlIGVudHJ5IGZpbGVzIGFsd2F5cyB1c2UgLmpzIGV4dGVuc2lvbiwgbmV2ZXIgLnRzeFxyXG4gICAgICAgICAgbGV0IG5hbWUgPSBjaHVua0luZm8ubmFtZSB8fCAnaW5kZXgnO1xyXG4gICAgICAgICAgLy8gUmVtb3ZlIGFueSAudHN4IG9yIC50cyBleHRlbnNpb24gdGhhdCBtaWdodCBiZSBpbiB0aGUgbmFtZVxyXG4gICAgICAgICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvXFwuKHRzeHx0cykkLywgJycpO1xyXG4gICAgICAgICAgLy8gSWYgbm8gbmFtZSBvciBuYW1lIGlzIGVtcHR5LCB1c2UgJ2luZGV4J1xyXG4gICAgICAgICAgaWYgKCFuYW1lIHx8IG5hbWUgPT09ICdtYWluJykge1xyXG4gICAgICAgICAgICBuYW1lID0gJ2luZGV4JztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBgYXNzZXRzLyR7bmFtZX0tW2hhc2hdLmpzYDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBpbmZvID0gYXNzZXRJbmZvLm5hbWUuc3BsaXQoJy4nKTtcclxuICAgICAgICAgIGNvbnN0IGV4dCA9IGluZm9baW5mby5sZW5ndGggLSAxXTtcclxuXHJcbiAgICAgICAgICAvLyBQcmV2ZW50IC50c3gvLnRzIGZpbGVzIGZyb20gYmVpbmcgY29waWVkIGFzIGFzc2V0c1xyXG4gICAgICAgICAgaWYgKC9cXC4odHN4fHRzKSQvLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZXNlIHNob3VsZG4ndCBiZSBhc3NldHMgLSB0aGV5IHNob3VsZCBiZSBjaHVua3NcclxuICAgICAgICAgICAgLy8gUmV0dXJuIGEgSlMgZXh0ZW5zaW9uIHRvIGZvcmNlIHByb3BlciBoYW5kbGluZ1xyXG4gICAgICAgICAgICBjb25zdCBiYXNlTmFtZSA9IGFzc2V0SW5mby5uYW1lLnJlcGxhY2UoL1xcLih0c3h8dHMpJC8sICcnKTtcclxuICAgICAgICAgICAgcmV0dXJuIGBhc3NldHMvJHtiYXNlTmFtZX0tW2hhc2hdLmpzYDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoL1xcLihjc3MpJC8udGVzdChhc3NldEluZm8ubmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBhc3NldHMvW25hbWVdLVtoYXNoXS4ke2V4dH1gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKC9cXC4ocG5nfGpwZT9nfGdpZnxzdmd8d2VicHxhdmlmKSQvLnRlc3QoYXNzZXRJbmZvLm5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgYXNzZXRzL2ltYWdlcy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gYGFzc2V0cy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vIFBlcmZvcm1hbmNlIG9wdGltaXphdGlvbnNcclxuICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIGNvbXByZXNzOiB7XHJcbiAgICAgICAgZHJvcF9jb25zb2xlOiBmYWxzZSwgLy8gS2VlcCBjb25zb2xlLmxvZyBmb3IgcHJvZHVjdGlvbiBkZWJ1Z2dpbmdcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxyXG4gICAgICAgIHB1cmVfZnVuY3M6IFsnY29uc29sZS5kZWJ1ZyddIC8vIE9ubHkgZHJvcCBkZWJ1Zywga2VlcCBsb2cvd2Fybi9lcnJvclxyXG4gICAgICB9LFxyXG4gICAgICBtYW5nbGU6IHtcclxuICAgICAgICBzYWZhcmkxMDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gU291cmNlIG1hcHMgZm9yIHByb2R1Y3Rpb24gZGVidWdnaW5nXHJcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG4gICAgLy8gVGFyZ2V0IG1vZGVybiBicm93c2VycyBmb3IgYmV0dGVyIG9wdGltaXphdGlvblxyXG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcclxuICAgIC8vIENTUyBjb2RlIHNwbGl0dGluZ1xyXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgLy8gQXNzZXQgb3B0aW1pemF0aW9uXHJcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogNDA5NiwgLy8gNGtiIGlubGluZSBsaW1pdFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLCAvLyBXYXJuaW5nIGF0IDFNQiAoY2h1bmtzIHdpbGwgc3RpbGwgYmUgYnVpbHQsIGJ1dCB3YXJuZWQpXHJcbiAgICAvLyBSZXBvcnQgY29tcHJlc3NlZCBzaXplc1xyXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWUsXHJcbiAgICAvLyBNaW5pZnkgQ1NTXHJcbiAgICBjc3NNaW5pZnk6IHRydWUsXHJcbiAgfSxcclxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUEyakIsU0FBUyxvQkFBb0I7QUFDeGxCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx3QkFBd0I7QUFIakMsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04saUJBQWlCO0FBQUEsTUFDZixRQUFRO0FBQUEsTUFDUixRQUFRO0FBQUEsUUFDTixNQUFN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
