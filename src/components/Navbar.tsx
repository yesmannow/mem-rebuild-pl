import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchitectLogo from './branding/ArchitectLogo';
import { mainNavigationLinks } from '../data/navigation';
import MegaMenu from './navigation/MegaMenu';
import { useScrollDirection } from '../hooks/useScrollDirection';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const location = useLocation();
  const { scrollDirection, isAtTop, scrollY } = useScrollDirection({ threshold: 10, debounceMs: 50 });

  const navLinks = mainNavigationLinks;

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  // Determine navbar visibility
  const shouldHideNavbar = scrollDirection === 'down' && scrollY > 100;
  const shouldShowNavbar = scrollDirection === 'up' || isAtTop;

  return (
    <motion.nav
      className="fixed w-full z-[100] h-16 transition-all duration-300"
      initial={{ y: 0 }}
      animate={{
        y: shouldHideNavbar ? -80 : 0,
        backgroundColor: isAtTop ? 'rgba(2, 6, 23, 0.6)' : 'rgba(2, 6, 23, 0.8)',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      style={{
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: isAtTop ? 'none' : '0 4px 24px rgba(0, 0, 0, 0.2)',
        willChange: 'transform, background-color',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-3 sm:gap-4 lg:gap-6">

          {/* Left Section: Logo */}
          <div className="flex items-center flex-shrink-0">
            {/* BRANDING: Architect Logo - Generative Systems Architecture Monogram */}
            <ArchitectLogo size="lg" showLabel={true} />
          </div>

          {/* DESKTOP NAV - Mega Menu */}
          <MegaMenu navLinks={navLinks} isActive={isActive} />

          {/* Right Section: System Status + Cmd+K Search Button - Desktop */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* System Status Indicator */}
            <div className="relative group">
              <Link
                to="/war-room"
                className="flex items-center justify-center w-[10px] h-[10px] rounded-full bg-emerald-500 animate-pulse hover:animate-none transition-all duration-300 hover:scale-110"
                aria-label="System Status: Online"
              />
              {/* Tooltip */}
              <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                <div className="px-2 py-1 text-xs bg-slate-900/95 backdrop-blur-sm border border-white/10 rounded text-white">
                  System Status: Online
                </div>
              </div>
            </div>

            {/* Cmd+K Search Button */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-brand-muted hover:text-brand-teal hover:border-brand-teal/30 transition-all duration-300 group"
              aria-label="Open command palette"
            >
              <Search size={16} className="group-hover:text-brand-teal transition-colors" />
              <kbd className="hidden lg:flex items-center gap-1 text-xs font-mono">
                <Command size={12} />K
              </kbd>
            </button>
          </div>

          {/* MOBILE: Search button (navigation handled by MobileDock) */}
          <div className="md:hidden flex items-center flex-shrink-0">
            {/* Mobile Cmd+K trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="p-2 bg-slate-800/50 border border-white/10 rounded-lg text-brand-muted hover:text-brand-teal transition-all"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

