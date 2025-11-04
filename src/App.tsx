import React, { lazy, Suspense, useEffect } from "react";
import AppRouter from "./router/AppRouter";
import ModernHeader from "./components/layout/ModernHeader";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/utils/ScrollToTop";
import BackToTop from "./components/utilities/BackToTop";
import PersonSchema from "./components/seo/PersonSchema";
import PerformanceMonitor from "./components/utils/PerformanceMonitor";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { initLenis, destroyLenis } from "./utils/motion-sync";
import { initAnalytics } from "./utils/analytics";
import "lenis/dist/lenis.css";

const FloatingActionButtons = lazy(() => import("./components/utils/FloatingActionButtons"));

const App: React.FC = () => {
  useEffect(() => {
    // Initialize analytics
    initAnalytics();

    // Ensure native scrolling works immediately
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    // Initialize global Lenis instance (with error handling)
    // initLenis() has a guard to prevent multiple initializations
    try {
      const lenis = initLenis();
      if (lenis) {
        // Only log once per actual initialization (guard prevents duplicate logs)
        if (process.env.NODE_ENV === 'development') {
          console.log("✅ App: Lenis ready");
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
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
      if (process.env.NODE_ENV === 'production') {
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
      <ThemeProvider>
        <div className="app bg-bg text-text font-ui">
          <PersonSchema />
          <PerformanceMonitor />
          <ScrollToTop />
          <BackToTop />
          <ModernHeader />
          <Suspense fallback={null}>
            <FloatingActionButtons />
          </Suspense>
          <AppRouter />
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
