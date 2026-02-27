import React, { lazy, useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { ToastProvider } from './components/ui/Toast';
import Layout from './components/layout/Layout';
import SwipeShell from './components/SwipeShell';
import CookieConsent from './components/ui/CookieConsent';
import { queryClient } from './lib/queryClient';
import { ReactLenis } from '@studio-freight/react-lenis';
import { initAnalytics } from './utils/analytics';
import { initAccessibility } from './utils/accessibility';
import JSONLD from './components/seo/JSONLD';
import { useKonamiCode } from './hooks/useKonamiCode';
import GodMode from './components/ui/GodMode';
import SystemBoot from './components/ui/SystemBoot';
import { Toaster } from 'sonner';
import 'lenis/dist/lenis.css';
import './styles/skip-to-content.css';
import './styles/sonner-theme.css';

import { ScrollProgressIndicator, InvertedCursor, DataDustCanvas } from './components/ui/GlobalPolish';

// const PersonSchema = lazy(() => import('./components/seo/PersonSchema')); // Removed - deleted
// const PerformanceMonitor = lazy(() => import('./components/utils/PerformanceMonitor')); // Removed - deleted
const AppRouter = lazy(() => import('./router/AppRouter'));
const premiumLenisOptions = { lerp: 0.08, smoothTouch: false } as unknown as Record<string, unknown>;

const AppContent: React.FC = () => {
  const isGodMode = useKonamiCode();
  const [booted, setBooted] = useState(() => {
    if (typeof sessionStorage === 'undefined') return true;
    return sessionStorage.getItem('sys-booted') === '1';
  });

  const handleBootComplete = () => {
    sessionStorage.setItem('sys-booted', '1');
    setBooted(true);
  };

  useEffect(() => {
    initAnalytics();
    initAccessibility();

    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <>
      {!booted && <SystemBoot onComplete={handleBootComplete} />}
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <ThemeProvider>
              <ReactLenis root options={premiumLenisOptions}>
                <ToastProvider>
                  <Helmet>
                    <title>Jacob Darling | Systems Architect</title>
                    <meta
                      name="description"
                      content="Digital production and technical architecture for high-ticket brands."
                    />
                    <meta property="og:title" content="Jacob Darling | Systems Architect" />
                    <meta
                      property="og:description"
                      content="Digital production and technical architecture for high-ticket brands."
                    />
                    <meta property="og:type" content="website" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Jacob Darling | Systems Architect" />
                    <meta
                      name="twitter:description"
                      content="Digital production and technical architecture for high-ticket brands."
                    />
                  </Helmet>
                  <JSONLD />
                  <DataDustCanvas />
                  <ScrollProgressIndicator />
                  <InvertedCursor />
                  <Layout>
                    <SwipeShell>
                      <AppRouter />
                    </SwipeShell>
                  </Layout>
                  <CookieConsent />
                  <GodMode active={isGodMode} />
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
    </>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
