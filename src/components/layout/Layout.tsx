import React, { lazy, Suspense, ReactNode } from 'react';
import Loader from '../ui/Loader';

const Navbar = lazy(() => import('../Navbar'));
const EnhancedFooter = lazy(() => import('./EnhancedFooter'));
const ScrollToTop = lazy(() => import('../utils/ScrollToTop'));
const BackToTop = lazy(() => import('../utilities/BackToTop'));
const MobileDock = lazy(() => import('../MobileDock'));

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

      <div className="app min-h-dvh flex flex-col bg-[var(--ink-900)] text-[var(--parchment-050)]">
        {/* Navigation */}
        <Suspense
          fallback={
            <nav className="container-px py-4" aria-label="Main navigation">
              <Loader size="sm" message="Loading navigation..." />
            </nav>
          }
        >
          <Navbar />
        </Suspense>

        {/* Scroll utilities */}
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <Suspense fallback={null}>
          <BackToTop />
        </Suspense>

        {/* Main content area */}
        <main id="main-content" className="flex-1 pb-24 md:pb-0" role="main">
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
          <EnhancedFooter />
        </Suspense>

        {/* Mobile Navigation Dock */}
        <Suspense fallback={null}>
          <MobileDock />
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
