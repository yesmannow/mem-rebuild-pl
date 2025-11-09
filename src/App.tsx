import React, { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { initLenis, destroyLenis } from "./utils/motion-sync";
import { initAnalytics } from "./utils/analytics";
import JSONLD from "./components/seo/JSONLD";
import "lenis/dist/lenis.css";

const BearCaveHeader = lazy(() => import("./components/layout/BearCaveHeader"));
const BearCaveFooter = lazy(() => import("./components/layout/BearCaveFooter"));
const ScrollToTop = lazy(() => import("./components/utils/ScrollToTop"));
const BackToTop = lazy(() => import("./components/utilities/BackToTop"));
const PersonSchema = lazy(() => import("./components/seo/PersonSchema"));
const PerformanceMonitor = lazy(() => import("./components/utils/PerformanceMonitor"));
const AppRouter = lazy(() => import("./router/AppRouter"));
const FloatingActionButtons = lazy(() => import("./components/utils/FloatingActionButtons"));

const App: React.FC = () => {
  useEffect(() => {
    // Initialize analytics
    initAnalytics();

    // Ensure native scrolling works immediately
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";

    // Initialize global Lenis instance (with error handling)
    // initLenis() has a guard to prevent multiple initializations
    try {
      const lenis = initLenis();
      if (lenis) {
        // Only log once per actual initialization (guard prevents duplicate logs)
        if (process.env.NODE_ENV === "development") {
          console.log("✅ App: Lenis ready");
        }
      } else {
        if (process.env.NODE_ENV === "development") {
          console.warn("⚠️ App: Lenis not initialized, using native scroll");
        }
      }
    } catch (error) {
      console.error("❌ App: Lenis initialization error:", error);
    }

    // Cleanup on unmount
    // Note: In React StrictMode (dev), effects run twice, but we shouldn't
    // destroy Lenis between these runs. Only destroy on actual unmount.
    return () => {
      // Only destroy on actual app unmount, not during StrictMode remounts
      // This prevents duplicate initialization during dev mode
      if (process.env.NODE_ENV === "production") {
        try {
          destroyLenis();
        } catch (error) {
          console.error("❌ App: Cleanup error:", error);
        }
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <JSONLD />
          <div className="app min-h-dvh flex flex-col bg-[color:theme('colors.cave.bg')] text-[color:theme('colors.cave.text')] font-sans">
            <Suspense fallback={null}>
              <PersonSchema />
            </Suspense>
            <Suspense fallback={null}>
              <PerformanceMonitor />
            </Suspense>
            <Suspense fallback={null}>
              <ScrollToTop />
            </Suspense>
            <Suspense fallback={null}>
              <BackToTop />
            </Suspense>
            <Suspense
              fallback={
                <header className="container-px">
                  <div className="mx-auto max-w-6xl py-6 flex items-center justify-between">
                    <Link to="/" className="font-display text-xl">
                      BearCave
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                      <a href="#work" className="hover:opacity-75">
                        Work
                      </a>
                      <a href="#about" className="hover:opacity-75">
                        About
                      </a>
                      <a href="#contact" className="hover:opacity-75">
                        Contact
                      </a>
                      <a href="#contact" className="btn-primary">
                        Work With Me
                      </a>
                    </nav>
                  </div>
                </header>
              }
            >
              <BearCaveHeader />
            </Suspense>
            <Suspense fallback={null}>
              <FloatingActionButtons />
            </Suspense>
            <main className="flex-1">
              <AppRouter />
            </main>
            <Suspense
              fallback={
                <footer className="container-px py-12">
                  <div className="mx-auto max-w-6xl text-sm opacity-70">
                    © {new Date().getFullYear()} Jacob Darling — BearCave Marketing
                  </div>
                </footer>
              }
            >
              <BearCaveFooter />
            </Suspense>
          </div>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
