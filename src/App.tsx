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
import { useKonamiCode } from './hooks/useKonamiCode';
import GodMode from './components/ui/GodMode';
import 'lenis/dist/lenis.css';
import './styles/skip-to-content.css';

const PersonSchema = lazy(() => import('./components/seo/PersonSchema'));
const PerformanceMonitor = lazy(() => import('./components/utils/PerformanceMonitor'));
const AppRouter = lazy(() => import('./router/AppRouter'));
const QuickContactFAB = lazy(() => import('./components/ui/QuickContactFAB'));

const AppContent: React.FC = () => {
  const isGodMode = useKonamiCode();

  useEffect(() => {
    initAnalytics();
    initAccessibility();

    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    const initScrolling = () => {
      try {
        const lenis = initLenis();
        if (!lenis && process.env.NODE_ENV === 'development') {
          console.warn('⚠️ Lenis not initialized, using native scroll');
        }
      } catch (error) {
        console.error('App: Lenis initialization error:', error);
      }
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(initScrolling, { timeout: 2000 });
    } else {
      setTimeout(initScrolling, 100);
    }

    return () => {
      if (process.env.NODE_ENV === 'production') {
        try {
          destroyLenis();
        } catch (error) {
          console.error('App: Cleanup error:', error);
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
              <EnhancedOceanBackground variant="minimal" intensity="subtle" className="fixed inset-0 -z-10" />

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

              <Suspense fallback={null}>
                <QuickContactFAB />
              </Suspense>

              <GodMode active={isGodMode} />
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
