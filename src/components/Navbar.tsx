import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Command } from 'lucide-react';
import ModernLogo from './branding/ModernLogo';
import { mainNavigationLinks } from '../data/navigation';
import ThemeToggle from './ui/ThemeToggle';

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
    <nav className="fixed w-full z-[100] h-16 bg-slate-950/60 backdrop-blur-md border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-2 sm:gap-4">

          {/* Left Section: System Status + Logo */}
          <div className="flex items-center gap-4">
            {/* System Status Indicator - Desktop only */}
            <div className="hidden lg:flex items-center gap-2 pr-4 border-r border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
              </span>
              <span className="text-xs text-brand-teal font-mono">System: Online</span>
            </div>

            {/* BRANDING: Personal Identity - Modern Animated Logo */}
            <Link to="/" className="flex items-center min-w-0 flex-shrink-0">
              <ModernLogo size={32} showText={false} animated={true} className="sm:hidden" />
              <ModernLogo size={36} showText={true} animated={true} className="hidden sm:flex" />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative ${
                  isActive(link.path)
                    ? 'text-white scale-110'
                    : 'text-brand-muted hover:text-brand-teal'
                } transition-all duration-300 font-medium text-sm uppercase tracking-wide group`}
              >
                {link.name}
                {/* Hover glow effect */}
                <span className={`absolute -bottom-1 left-0 w-full h-px transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                    : 'bg-transparent group-hover:bg-brand-teal/50'
                }`} />
              </Link>
            ))}

            {/* Theme Toggle */}
            <ThemeToggle variant="compact" />

            {/* Cmd+K Search Button */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-white/10 rounded-lg text-brand-muted hover:text-brand-teal hover:border-brand-teal/30 transition-all duration-300 group"
              aria-label="Open command palette"
            >
              <Search size={14} className="group-hover:text-brand-teal transition-colors" />
              <kbd className="hidden lg:flex items-center gap-0.5 text-xs font-mono">
                <Command size={10} />K
              </kbd>
            </button>
          </div>

          {/* MOBILE: Theme toggle and search button (navigation handled by MobileDock) */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <ThemeToggle variant="compact" />
            
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
    </nav>
  );
};

export default Navbar;

