/**
 * ThemeToggle - Dark/Light mode toggle component
 * 
 * Features:
 * - Smooth transitions between modes
 * - Animated icon transitions
 * - Accessible keyboard support
 * - Mobile-friendly touch target
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

interface ThemeToggleProps {
  variant?: 'default' | 'compact' | 'dropdown';
  showLabel?: boolean;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'default',
  showLabel = false,
  className = '',
}) => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ] as const;

  const currentThemeIndex = themes.findIndex((t) => t.id === theme);

  const cycleTheme = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextIndex].id);
  };

  if (variant === 'dropdown') {
    return (
      <div className={`flex gap-1 bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-lg p-1 ${className}`}>
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={`Switch to ${t.label} mode`}
              title={`${t.label} mode`}
            >
              <Icon size={18} />
              {isActive && (
                <motion.div
                  layoutId="themeIndicator"
                  className="absolute inset-0 bg-brand-teal/20 border border-brand-teal/40 rounded-md -z-10"
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'compact') {
    const CurrentIcon = themes[currentThemeIndex].icon;
    return (
      <motion.button
        onClick={cycleTheme}
        className={`p-2 rounded-lg bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-brand-teal/40 transition-all duration-200 ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Current theme: ${themes[currentThemeIndex].label}. Click to cycle.`}
        title={`Theme: ${themes[currentThemeIndex].label}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CurrentIcon size={20} className="text-brand-teal" />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    );
  }

  // Default variant - single button with label
  const CurrentIcon = themes[currentThemeIndex].icon;
  return (
    <motion.button
      onClick={cycleTheme}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/70 backdrop-blur-xl border border-white/10 hover:border-brand-teal/40 transition-all duration-200 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Current theme: ${themes[currentThemeIndex].label}. Click to cycle.`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          <CurrentIcon size={18} className="text-brand-teal" />
        </motion.div>
      </AnimatePresence>
      {showLabel && (
        <span className="text-sm font-medium text-slate-300">
          {themes[currentThemeIndex].label}
        </span>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
