import React, { lazy, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { ToastProvider } from './components/ui/Toast';
import Layout from './components/layout/Layout';
import SwipeShell from './components/SwipeShell';
import { EnhancedOceanBackground } from './components/ui/EnhancedOceanBackground';
import CookieConsent from './components/ui/CookieConsent';
import { queryClient } from './lib/queryClient';
import { initLenis, destroyLenis } from './utils/motion-sync';
import { initAnalytics } from './utils/analytics';
import { initAccessibility } from './utils/accessibility';
import JSONLD from './components/seo/JSONLD';
import { useKonami, DebugOverlay } from './hooks/useKonami';
import 'lenis/dist/lenis.css';
import './styles/skip-to-content.css';

const PersonSchema = lazy(() => import('./components/seo/PersonSchema'));
const PerformanceMonitor = lazy(() => import('./components/utils/PerformanceMonitor'));
const AppRouter = lazy(() => import('./router/AppRouter'));
const QuickContactFAB = lazy(() => import('./components/ui/QuickContactFAB'));

const AppContent: React.FC = () => {
  // Konami code hook for "God Mode"
  const { isActive: isKonamiActive, setIsActive: setKonamiActive } = useKonami(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🎮 Konami Code Activated - God Mode Enabled!');
    }
  });

  useEffect(() => {
    // Initialize analytics
    initAnalytics();

    // Initialize accessibility enhancements
    initAccessibility();

    // Ensure native scrolling works immediately
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    // Defer Lenis initialization to after first paint to reduce main thread blocking
    // This allows the page to be interactive faster while smooth scrolling loads in background
    const initScrolling = () => {
      try {
        const lenis = initLenis();
        if (lenis) {
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
    };

    // Use requestIdleCallback to defer initialization, or setTimeout as fallback
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(initScrolling, { timeout: 2000 });
    } else {
      // Fallback for Safari and older browsers - defer by 100ms after first paint
      setTimeout(initScrolling, 100);
    }

    // Cleanup on unmount
    return () => {
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
              {/* Ocean Pearl Delight Background - Subtle gradient for global background */}
              <EnhancedOceanBackground
                variant="minimal"
                intensity="subtle"
                className="fixed inset-0 -z-10"
              />

              <JSONLD />
              <Suspense fallback={null}>
                <PersonSchema />
              </Suspense>
              <Suspense fallback={null}>
                <PerformanceMonitor />
              </Suspense>
              <Layout>
                <SwipeShell>
                  <AppRouter />
                </SwipeShell>
              </Layout>
              <CookieConsent />

              {/* Quick Contact FAB for better conversion */}
              <Suspense fallback={null}>
                <QuickContactFAB />
              </Suspense>

              {/* Konami Code Debug Overlay */}
              <DebugOverlay
                isActive={isKonamiActive}
                onClose={() => setKonamiActive(false)}
              />
            </ToastProvider>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
