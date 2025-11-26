import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Briefcase, Terminal, User } from 'lucide-react';
import { useHaptic } from '../hooks/useHaptic';

const MobileDock: React.FC = () => {
  const location = useLocation();
  const { triggerHaptic } = useHaptic();

  const dockItems = [
    { icon: Home, label: 'Home', path: '/', ariaLabel: 'Navigate to home' },
    { icon: Briefcase, label: 'Work', path: '/case-studies', ariaLabel: 'View case studies' },
    { icon: Terminal, label: 'Status', path: '/tools', ariaLabel: 'View the stack and tools' },
    { icon: User, label: 'Bio', path: '/about', ariaLabel: 'View bio' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleTap = () => triggerHaptic([10]);

  return (
    <nav
      className="fixed bottom-4 left-0 right-0 z-[90] block md:hidden flex justify-center"
      aria-label="Mobile navigation dock"
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.35, 0, 1] }}
        className="relative w-[95%] max-w-md mx-auto bg-slate-900/80 backdrop-blur-xl rounded-full border border-white/10 border-t border-white/10 shadow-2xl"
        style={{
          boxShadow:
            '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(64, 224, 208, 0.1), 0 -2px 20px rgba(64, 224, 208, 0.2)',
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-brand-teal/60 to-transparent" />

        <div className="flex items-center justify-evenly px-3 py-3 w-full">
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
                {active && (
                  <motion.div
                    layoutId="activeDockItem"
                    className="absolute inset-0 rounded-full bg-brand-teal/20"
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
        </div>
      </motion.div>
    </nav>
  );
};

export default MobileDock;
