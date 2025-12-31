import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Command } from 'lucide-react';
import ModernLogo from './branding/ModernLogo';
import { mainNavigationLinks } from '../data/navigation';
import MegaMenu from './navigation/MegaMenu';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const location = useLocation();

  const navLinks = mainNavigationLinks;

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed w-full z-[100] h-16 bg-slate-950/60 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-6">

          {/* Left Section: Logo */}
          <div className="flex items-center">
            {/* BRANDING: Personal Identity - Modern Animated Logo */}
            <Link to="/" className="flex items-center min-w-0 flex-shrink-0">
              <ModernLogo size={32} showText={false} animated={true} className="sm:hidden" />
              <ModernLogo size={38} showText={true} animated={true} className="hidden sm:flex" />
            </Link>
          </div>

          {/* DESKTOP NAV - Mega Menu */}
          <MegaMenu navLinks={navLinks} isActive={isActive} />

          {/* Cmd+K Search Button - Desktop */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-brand-muted hover:text-brand-teal hover:border-brand-teal/30 transition-all duration-300 group"
            aria-label="Open command palette"
          >
            <Search size={16} className="group-hover:text-brand-teal transition-colors" />
            <kbd className="hidden lg:flex items-center gap-1 text-xs font-mono">
              <Command size={12} />K
            </kbd>
          </button>

          {/* MOBILE: Search button (navigation handled by MobileDock) */}
          <div className="md:hidden flex items-center">
            {/* Mobile Cmd+K trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="p-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-brand-muted hover:text-brand-teal transition-all"
              aria-label="Open search"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

