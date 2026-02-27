import React, { lazy, Suspense, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import ReadingProgressBar from '../ui/ReadingProgressBar';
import KeyboardShortcuts from '../ui/KeyboardShortcuts';
import Atmosphere from '../ui/Atmosphere';
import SystemBreadcrumb from '../navigation/SystemBreadcrumb';
import { useSystemStore } from '../../store/useSystemStore';
import MenuOverlay from '../navigation/MenuOverlay';

const Footer = lazy(() => import('./Footer'));
const ScrollToTop = lazy(() => import('../utils/ScrollToTop'));
const MobileDock = lazy(() => import('../MobileDock'));
const CommandPalette = lazy(() => import('../CommandPalette'));
const PortfolioConcierge = lazy(() => import('../ai/PortfolioConcierge'));

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { isCommandPaletteOpen, setCommandPalette } = useSystemStore();

  // Check if we're on an app route - these should have minimal chrome
  const isAppRoute = location.pathname.startsWith('/apps/');

  const closeCommandPalette = () => setCommandPalette(false);

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

      <div className="app min-h-dvh flex flex-col bg-[var(--ink-900)] text-[var(--parchment-050)] relative overflow-hidden">
        <Atmosphere />
        {/* Reading Progress Bar - hide on app routes */}
        {!isAppRoute && <ReadingProgressBar />}

        {/* Global MENU overlay trigger */}
        <MenuOverlay />

        {/* System Breadcrumb path indicator */}
        <SystemBreadcrumb />

        {/* Scroll utilities */}
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>

        {/* Main content area */}
        <main id="main-content" className="flex-1 pb-24 md:pb-0" role="main">
          {children}
        </main>

        {/* Footer - hide on app routes */}
        {!isAppRoute && (
          <Suspense
            fallback={
              <footer className="container-px py-12" role="contentinfo">
                <div className="mx-auto max-w-6xl text-sm opacity-70">
                  © {new Date().getFullYear()} Jacob Darling — Marketing Strategist & Systems Architect
                </div>
              </footer>
            }
          >
            <Footer />
          </Suspense>
        )}

        {/* Mobile Navigation Dock */}
        <Suspense fallback={null}>
          <MobileDock />
        </Suspense>

        {/* Command Palette (Cmd+K) - keep available everywhere */}
        <Suspense fallback={null}>
          <CommandPalette isOpen={isCommandPaletteOpen} onClose={closeCommandPalette} />
        </Suspense>

        {/* Keyboard Shortcuts Overlay */}
        <KeyboardShortcuts />

        {/* Portfolio Concierge - hide on app routes for focused experience */}
        {!isAppRoute && (
          <Suspense fallback={null}>
            <PortfolioConcierge />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Layout;
