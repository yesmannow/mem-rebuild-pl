import React, { lazy, Suspense, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { queryClient } from './lib/queryClient';
import { initLenis, destroyLenis } from './utils/motion-sync';
import { initAnalytics } from './utils/analytics';
import { initAccessibility } from './utils/accessibility';
import JSONLD from './components/seo/JSONLD';
import 'lenis/dist/lenis.css';
import './styles/skip-to-content.css';

const MainNav = lazy(() => import('./components/nav/MainNav'));
const Footer = lazy(() => import('./components/layout/Footer'));
const ScrollToTop = lazy(() => import('./components/utils/ScrollToTop'));
const BackToTop = lazy(() => import('./components/utilities/BackToTop'));
const PersonSchema = lazy(() => import('./components/seo/PersonSchema'));
const PerformanceMonitor = lazy(() => import('./components/utils/PerformanceMonitor'));
const AppRouter = lazy(() => import('./router/AppRouter'));

const App: React.FC = () => {
  useEffect(() => {
    // Initialize analytics
    initAnalytics();

    // Initialize accessibility enhancements
    initAccessibility();

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
          console.log('✅ App: Lenis ready');
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ App: Lenis not initialized, using native scroll');
        }
      }
    } catch (error) {
      console.error('❌ App: Lenis initialization error:', error);
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
          console.error('❌ App: Cleanup error:', error);
        }
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider>
            <JSONLD />
            {/* Skip to content link */}
            <a
              href="#main-content"
              className="skip-to-content"
              aria-label="Skip to main content"
            >
              Skip to content
            </a>
            <div className="app min-h-dvh flex flex-col bg-[var(--bc-bg)] text-[var(--bc-text-primary)]">
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
              <Suspense fallback={null}>
                <MainNav key="main-nav" />
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
                <Footer />
              </Suspense>
            </div>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
