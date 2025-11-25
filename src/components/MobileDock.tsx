import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Terminal, User, Download } from 'lucide-react';
import { useHaptic } from '../hooks/useHaptic';
import { usePWAInstall } from '../hooks/usePWAInstall';
import BrandToggle from './theme/BrandToggle';

const MobileDock: React.FC = () => {
  const location = useLocation();
  const { triggerHaptic } = useHaptic();
  const { isInstallable, install, isIOS } = usePWAInstall();
  const [showInstallTooltip, setShowInstallTooltip] = useState(false);

  const dockItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      ariaLabel: 'Navigate to home',
    },
    {
      icon: Briefcase,
      label: 'Work',
      path: '/case-studies',
      ariaLabel: 'View case studies',
    },
    {
      icon: Terminal,
      label: 'War Room',
      path: '/tools',
      ariaLabel: 'View the stack and tools',
    },
    {
      icon: User,
      label: 'Bio',
      path: '/about',
      ariaLabel: 'View bio',
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleTap = () => {
    // Trigger haptic feedback on tap
    triggerHaptic([10]);
  };

  const handleInstallClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    triggerHaptic([10, 50, 10]); // Double tap pattern for install

    if (isIOS) {
      // Show tooltip for iOS
      setShowInstallTooltip(true);
      setTimeout(() => setShowInstallTooltip(false), 5000);
    } else {
      // Trigger install for Android/Chrome
      await install();
    }
  };

  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-[90] block md:hidden"
      aria-label="Mobile navigation dock"
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.35, 0, 1] }}
        className="relative bg-brand-dark/90 backdrop-blur-xl rounded-full border-t border-brand-teal/30 border-x border-b border-brand-teal/20 shadow-2xl"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(64, 224, 208, 0.1), 0 -2px 20px rgba(64, 224, 208, 0.2)',
        }}
      >
        {/* Glowing top border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-brand-teal/60 to-transparent" />

        <div className="flex items-center justify-around px-2 py-3">
          {/* Brand Toggle - Compact version for mobile */}
          <div className="px-2">
            <BrandToggle />
          </div>

          {dockItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleTap}
                aria-label={item.ariaLabel}
                className="relative flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 group"
              >
                {/* Active indicator glow */}
                {active && (
                  <motion.div
                    layoutId="activeDockItem"
                    className="absolute inset-0 rounded-full bg-brand-teal/20"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  animate={active ? { scale: 1.1 } : { scale: 1 }}
                >
                  <Icon
                    size={22}
                    className={`transition-all duration-300 ${
                      active
                        ? 'text-brand-teal'
                        : 'text-brand-muted group-hover:text-brand-teal/70'
                    }`}
                    style={{
                      filter: active
                        ? 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.6))'
                        : 'none',
                    }}
                  />
                </motion.div>

                {/* Label */}
                <span
                  className={`text-[10px] mt-1 font-medium transition-colors duration-300 ${
                    active ? 'text-brand-teal' : 'text-brand-muted/60'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Install Button - Only show if installable */}
          <AnimatePresence>
            {isInstallable && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={handleInstallClick}
                aria-label={isIOS ? 'Install app (iOS instructions)' : 'Install app'}
                className="relative flex flex-col items-center justify-center p-3 rounded-full transition-all duration-300 group"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className="relative"
                >
                  <Download
                    size={22}
                    className="text-brand-orange group-hover:text-brand-teal transition-colors duration-300"
                    style={{
                      filter: 'drop-shadow(0 0 6px rgba(255, 165, 0, 0.5))',
                    }}
                  />
                  {/* Pulsing indicator */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-brand-orange rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
                <span className="text-[10px] mt-1 font-medium text-brand-orange">
                  Install
                </span>

                {/* iOS Tooltip */}
                {showInstallTooltip && isIOS && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-2 bg-brand-dark border border-brand-teal/30 rounded-lg text-xs text-brand-text whitespace-nowrap shadow-xl z-50"
                  >
                    Tap Share → Add to Home Screen
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-brand-dark border-r border-b border-brand-teal/30 rotate-45" />
                  </motion.div>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </nav>
  );
};

export default MobileDock;

