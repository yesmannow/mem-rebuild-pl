import React, { lazy, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { ToastProvider } from './components/ui/Toast';
import Layout from './components/layout/Layout';
import GradientMesh from './components/ui/GradientMesh';
import { queryClient } from './lib/queryClient';
import { initLenis, destroyLenis } from './utils/motion-sync';
import { initAnalytics } from './utils/analytics';
import { initAccessibility } from './utils/accessibility';
import JSONLD from './components/seo/JSONLD';
import 'lenis/dist/lenis.css';
import './styles/skip-to-content.css';

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
            <ToastProvider>
              {/* Animated gradient mesh background */}
              <GradientMesh colors={['#88ABF2', '#6B8FD6', '#5A7EC0', '#0b0b0c']} speed={0.0003} />
              
              <JSONLD />
              <Suspense fallback={null}>
                <PersonSchema />
              </Suspense>
              <Suspense fallback={null}>
                <PerformanceMonitor />
              </Suspense>
              <Layout>
                <AppRouter />
              </Layout>
            </ToastProvider>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
