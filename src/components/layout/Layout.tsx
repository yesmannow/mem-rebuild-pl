import React, { lazy, Suspense, ReactNode, useState, useEffect, useCallback } from 'react';
import Loader from '../ui/Loader';
import ReadingProgressBar from '../ui/ReadingProgressBar';
import KeyboardShortcuts from '../ui/KeyboardShortcuts';
import Atmosphere from '../ui/Atmosphere';

const Navbar = lazy(() => import('../Navbar'));
const EnhancedFooter = lazy(() => import('./EnhancedFooter'));
const ScrollToTop = lazy(() => import('../utils/ScrollToTop'));
const BackToTop = lazy(() => import('../utilities/BackToTop'));
const MobileDock = lazy(() => import('../MobileDock'));
const CommandPalette = lazy(() => import('../CommandPalette'));

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut for Cmd+K / Ctrl+K
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsCommandPaletteOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const openCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(true);
  }, []);

  const closeCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(false);
  }, []);

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
        {/* Reading Progress Bar */}
        <ReadingProgressBar />

        {/* Navigation */}
        <Suspense
          fallback={
            <nav className="container-px py-4" aria-label="Main navigation">
              <Loader size="sm" message="Loading navigation..." />
            </nav>
          }
        >
          <Navbar onOpenCommandPalette={openCommandPalette} />
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
                © {new Date().getFullYear()} Jacob Darling — Marketing Strategist & Systems Architect
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

        {/* Command Palette (Cmd+K) */}
        <Suspense fallback={null}>
          <CommandPalette isOpen={isCommandPaletteOpen} onClose={closeCommandPalette} />
        </Suspense>

        {/* Keyboard Shortcuts Overlay */}
        <KeyboardShortcuts />
      </div>
    </>
  );
};

export default Layout;
