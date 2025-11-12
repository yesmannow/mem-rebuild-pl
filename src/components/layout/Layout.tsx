import React, { lazy, Suspense, ReactNode } from 'react';
import Loader from '../ui/Loader';

const MainNav = lazy(() => import('../nav/MainNav'));
const Footer = lazy(() => import('./Footer'));
const ScrollToTop = lazy(() => import('../utils/ScrollToTop'));
const BackToTop = lazy(() => import('../utilities/BackToTop'));

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="skip-to-content"
        aria-label="Skip to main content"
      >
        Skip to content
      </a>

      <div className="app min-h-dvh flex flex-col bg-[var(--bc-bg)] text-[var(--bc-text-primary)]">
        {/* Navigation */}
        <Suspense
          fallback={
            <nav className="container-px py-4" aria-label="Main navigation">
              <Loader size="sm" message="Loading navigation..." />
            </nav>
          }
        >
          <MainNav key="main-nav" />
        </Suspense>

        {/* Scroll utilities */}
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>

        {/* Main content area */}
        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>

        {/* Footer */}
        <Suspense
          fallback={
            <footer className="container-px py-12" role="contentinfo">
              <div className="mx-auto max-w-6xl text-sm opacity-70">
                © {new Date().getFullYear()} Jacob Darling — BearCave Marketing
              </div>
            </footer>
          }
        >
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
