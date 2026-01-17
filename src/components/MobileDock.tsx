import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Grip, X, Home } from 'lucide-react';
import { useHaptic } from '../hooks/useHaptic';
import { productMakerIcons } from './ui/Icons';
import { mainNavigationLinks } from '../data/navigation';

const { home: HomeIcon, projects: ProjectsIcon, lab: LabIcon } =
  productMakerIcons;

// Full menu items for the overlay
const fullMenuItems = [
  {
    icon: Home,
    label: 'Home',
    path: '/',
    description: 'Return to the main console',
  },
  ...mainNavigationLinks.map((item) => ({
    icon: item.icon,
    label: item.name,
    path: item.path,
    description: item.description,
  })),
];

const MobileDock: React.FC = () => {
  const location = useLocation();
  const { triggerHaptic } = useHaptic();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const openPalette = () => {
    triggerHaptic([10]);
    const ev = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true } as KeyboardEventInit);
    document.dispatchEvent(ev);
  };

  const dockItems = [
    { icon: HomeIcon, label: 'Home', path: '/', ariaLabel: 'Navigate to home' },
    { icon: ProjectsIcon, label: 'Projects', path: '/case-studies', ariaLabel: 'View flagship projects' },
    { icon: LabIcon, label: 'The Lab', path: '/apps', ariaLabel: 'View the lab' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleTap = () => triggerHaptic([10]);

  const handleMenuToggle = () => {
    triggerHaptic([15]);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    triggerHaptic([10]);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Full Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[95] bg-slate-950/95 backdrop-blur-xl md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute inset-x-0 bottom-0 top-20 bg-slate-900/90 backdrop-blur-xl rounded-t-3xl border-t border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Navigation</h2>
                  <p className="text-xs text-brand-muted">Explore the portfolio</p>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-slate-800/50 border border-white/10 hover:border-brand-teal/30 text-brand-muted hover:text-brand-teal transition-all"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Quick actions & links */}
              <div className="px-6 py-3 border-b border-white/10 flex items-center gap-3">
                {/* System Status Indicator */}
                <div className="relative group">
                  <Link
                    to="/war-room"
                    onClick={handleMenuItemClick}
                    className="flex items-center justify-center w-[10px] h-[10px] rounded-full bg-emerald-500 animate-pulse hover:animate-none transition-all duration-300"
                    aria-label="System Status: Online"
                  />
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    <div className="px-2 py-1 text-xs bg-slate-900/95 backdrop-blur-sm border border-white/10 rounded text-white">
                      System Status: Online
                    </div>
                  </div>
                </div>
                <button
                  onClick={openPalette}
                  className="px-3 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-brand-muted hover:text-brand-teal hover:border-brand-teal/30 transition"
                  aria-label="Open command palette"
                >
                  Search (Cmd+K)
                </button>
                <div className="flex-1 overflow-x-auto">
                  <div className="flex items-center gap-2 min-w-max">
                    {[
                      { label: 'Resume', path: '/resume' },
                      { label: 'Case Studies', path: '/case-studies' },
                      { label: 'Services', path: '/services' },
                      { label: 'Applications', path: '/apps' },
                      { label: 'Contact', path: '/contact' },
                    ].map((q) => (
                      <Link
                        key={q.path}
                        to={q.path}
                        onClick={handleMenuItemClick}
                        className="px-3 py-1.5 text-sm rounded-full border border-white/10 bg-slate-800/40 text-brand-muted hover:text-brand-teal hover:border-brand-teal/30 whitespace-nowrap"
                      >
                        {q.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid of menu items */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {fullMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          onClick={handleMenuItemClick}
                          className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border transition-all duration-300 min-h-[110px] sm:min-h-[130px] ${
                            active
                              ? 'bg-gradient-to-br from-brand-teal/20 to-brand-turquoise/10 border-brand-teal/50 shadow-lg shadow-brand-teal/20'
                              : 'bg-slate-800/40 border-white/10 hover:bg-slate-800/60 hover:border-brand-teal/30 active:scale-95'
                          }`}
                        >
                          <div className={`mb-3 p-3 rounded-xl ${
                            active
                              ? 'bg-brand-teal/20'
                              : 'bg-slate-700/50'
                          }`}>
                            <Icon
                              size={28}
                              className={active ? 'text-brand-teal' : 'text-brand-muted'}
                              style={{
                                filter: active ? 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.6))' : 'none',
                              }}
                            />
                          </div>
                          <span className="font-semibold text-sm sm:text-base mb-1 text-center text-white">
                            {item.label}
                          </span>
                          <span className="text-[10px] sm:text-xs text-brand-muted text-center leading-tight px-2 line-clamp-2">
                            {item.description}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Dock - Top-level mobile navigation */}
      <nav
        className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-4 sm:right-4 z-[90] block md:hidden"
        aria-label="Mobile navigation dock"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.35, 0, 1] }}
          className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
          style={{
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(64, 224, 208, 0.15), 0 -2px 24px rgba(64, 224, 208, 0.25)',
          }}
        >
          {/* Teal accent line at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-brand-teal to-transparent rounded-full" />

          <div className="flex items-center justify-evenly px-2 sm:px-3 py-2.5 sm:py-3">
            {/* Core Navigation Items */}
            {dockItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleTap}
                  aria-label={item.ariaLabel}
                  className="relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl transition-all duration-300 group min-w-[64px] sm:min-w-[72px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  {active && (
                    <motion.div
                      layoutId="activeDockItem"
                      className="absolute inset-0 rounded-xl bg-gradient-to-b from-brand-teal/20 to-brand-teal/10 border border-brand-teal/30"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}

                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 0.15 }}
                    animate={active ? { scale: 1.1 } : { scale: 1 }}
                  >
                    <Icon
                      size={22}
                      className={`transition-all duration-300 sm:w-6 sm:h-6 ${
                        active ? 'text-brand-teal' : 'text-brand-muted group-hover:text-brand-teal/70'
                      }`}
                      style={{
                        filter: active ? 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.6))' : 'none',
                      }}
                    />
                  </motion.div>

                  <span
                    className={`text-[10px] sm:text-[11px] whitespace-nowrap mt-1 sm:mt-1.5 font-semibold transition-colors duration-300 ${
                      active ? 'text-brand-teal' : 'text-brand-muted/70'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {/* Menu/Grid Button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleMenuToggle}
              aria-label="Open full menu"
              className={`relative flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl transition-all duration-300 min-w-[64px] sm:min-w-[72px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                isMenuOpen ? 'bg-gradient-to-b from-brand-teal/20 to-brand-teal/10 border border-brand-teal/30' : ''
              }`}
            >
              <Grip
                size={22}
                className={`transition-all duration-300 sm:w-6 sm:h-6 ${
                  isMenuOpen ? 'text-brand-teal' : 'text-brand-muted'
                }`}
                style={{
                  filter: isMenuOpen ? 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.6))' : 'none',
                }}
              />
              <span
                className={`text-[10px] sm:text-[11px] whitespace-nowrap mt-1 sm:mt-1.5 font-semibold transition-colors duration-300 ${
                  isMenuOpen ? 'text-brand-teal' : 'text-brand-muted/70'
                }`}
              >
                More
              </span>
            </motion.button>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default MobileDock;
