import React, { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { initLenis, destroyLenis } from "./utils/motion-sync";
import { initAnalytics } from "./utils/analytics";
import "lenis/dist/lenis.css";

const ModernHeader = lazy(() => import("./components/layout/ModernHeader"));
const Footer = lazy(() => import("./components/layout/Footer"));
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
          <Suspense fallback={
            <header className="fixed top-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-sm border-b border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <Link to="/" className="text-xl font-bold text-primary">Jacob Darling</Link>
                  </div>
                  <nav className="hidden md:flex space-x-8">
                    <Link to="/about" className="text-text hover:text-primary transition-colors">About</Link>
                    <Link to="/case-studies" className="text-text hover:text-primary transition-colors">Case Studies</Link>
                    <Link to="/projects" className="text-text hover:text-primary transition-colors">Projects</Link>
                    <Link to="/contact" className="text-text hover:text-primary transition-colors">Contact</Link>
                  </nav>
                </div>
              </div>
            </header>
          }>
            <ModernHeader />
          </Suspense>
          <Suspense fallback={null}>
            <FloatingActionButtons />
          </Suspense>
          <Suspense fallback={null}>
            <AppRouter />
          </Suspense>
          <Suspense fallback={
            <footer className="bg-bg border-t border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-text-secondary">
                  <p>&copy; 2024 Jacob Darling. All rights reserved.</p>
                </div>
              </div>
            </footer>
          }>
            <Footer />
          </Suspense>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
