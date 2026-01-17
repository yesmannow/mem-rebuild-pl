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
import { ReactLenis } from './hooks/useLenis';
import { initAnalytics } from './utils/analytics';
import { initAccessibility } from './utils/accessibility';
import JSONLD from './components/seo/JSONLD';
import { useKonamiCode } from './hooks/useKonamiCode';
import GodMode from './components/ui/GodMode';
import { Toaster } from 'sonner';
import 'lenis/dist/lenis.css';
import './styles/skip-to-content.css';
import './styles/sonner-theme.css';

const PersonSchema = lazy(() => import('./components/seo/PersonSchema'));
const PerformanceMonitor = lazy(() => import('./components/utils/PerformanceMonitor'));
const AppRouter = lazy(() => import('./router/AppRouter'));

const AppContent: React.FC = () => {
  const isGodMode = useKonamiCode();

  useEffect(() => {
    initAnalytics();
    initAccessibility();

    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider>
            <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
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

                <GodMode active={isGodMode} />

                {/* Sonner Toaster with Blueprint theme */}
                <Toaster
                  position="top-right"
                  theme="dark"
                  toastOptions={{
                    className: 'sonner-toast',
                    style: {
                      background: 'var(--brand-surface)',
                      border: '1px solid var(--brand-turquoise)',
                      fontFamily: 'var(--brand-font-family, monospace)',
                      color: 'var(--brand-text)',
                    },
                  }}
                />
              </ToastProvider>
            </ReactLenis>
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
