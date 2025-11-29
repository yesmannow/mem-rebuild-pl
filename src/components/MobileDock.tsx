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
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-lg font-semibold text-white">Navigation</h2>
                <span className="text-xs text-brand-teal font-mono">System Menu</span>
              </div>

              {/* Grid of menu items */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 p-4 overflow-y-auto max-h-[calc(100vh-220px)] safe-area-inset">
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
                        className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 touch-target min-h-[100px] ${
                          active
                            ? 'bg-brand-teal/20 border-brand-teal/50 text-brand-teal'
                            : 'bg-slate-800/50 border-white/10 text-white hover:bg-slate-800 hover:border-brand-teal/30'
                        }`}
                      >
                        <Icon
                          size={28}
                          className={active ? 'text-brand-teal' : 'text-brand-muted'}
                          style={{
                            filter: active ? 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.6))' : 'none',
                          }}
                        />
                        <span className="mt-2 font-medium text-sm">{item.label}</span>
                        <span className="text-[10px] text-brand-muted mt-0.5">{item.description}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Close Button */}
              <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center px-4 safe-area-inset">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-white/10 rounded-full text-white font-medium touch-target w-full max-w-xs"
                >
                  <X size={18} />
                  Close Menu
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Dock */}
      <nav
        className="fixed bottom-6 left-4 right-4 z-[90] block md:hidden"
        aria-label="Mobile navigation dock"
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.35, 0, 1] }}
          className="relative bg-slate-900/85 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
          style={{
            boxShadow:
              '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(64, 224, 208, 0.1), 0 -2px 20px rgba(64, 224, 208, 0.2)',
          }}
        >
          {/* Teal accent line at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-brand-teal/60 to-transparent" />

          <div className="flex items-center justify-evenly px-2 py-2">
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
                  className="relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 group"
                >
                  {active && (
                    <motion.div
                      layoutId="activeDockItem"
                      className="absolute inset-0 rounded-xl bg-brand-teal/20"
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
                      className={`transition-all duration-300 ${
                        active ? 'text-brand-teal' : 'text-brand-muted group-hover:text-brand-teal/70'
                      }`}
                      style={{
                        filter: active ? 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.6))' : 'none',
                      }}
                    />
                  </motion.div>

                  <span
                    className={`text-[10px] whitespace-nowrap mt-1 font-medium transition-colors duration-300 ${
                      active ? 'text-brand-teal' : 'text-brand-muted/60'
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
              className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 ${
                isMenuOpen ? 'bg-brand-teal/20' : ''
              }`}
            >
              <Grip
                size={22}
                className={`transition-all duration-300 ${
                  isMenuOpen ? 'text-brand-teal' : 'text-brand-muted'
                }`}
                style={{
                  filter: isMenuOpen ? 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.6))' : 'none',
                }}
              />
              <span
                className={`text-[10px] whitespace-nowrap mt-1 font-medium transition-colors duration-300 ${
                  isMenuOpen ? 'text-brand-teal' : 'text-brand-muted/60'
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
