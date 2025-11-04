import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Briefcase, Code } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const ThemeToggle: React.FC = () => {
  const { theme, brand, setTheme, setBrand } = useTheme();

  const themeIcons = {
    light: Sun,
    system: Monitor,
    dark: Moon,
  };

  const brandIcons = {
    cmo: Briefcase,
    dev: Code,
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Theme segment: Light / System / Dark */}
      <div className="theme-card flex overflow-hidden">
        {(['light', 'system', 'dark'] as const).map((t) => {
          const active = theme === t;
          const Icon = themeIcons[t];
          return (
            <button
              key={t}
              {...(active ? { 'aria-pressed': 'true' } : { 'aria-pressed': 'false' })}
              onClick={() => setTheme(t)}
              className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'text-white'
                  : 'text-text hover:text-accent'
              }`}
              title={`Switch to ${t} theme`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
              {active && (
                <motion.span
                  layoutId="theme-pill"
                  className="absolute inset-0 -z-10 bg-accent rounded-[var(--radius)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Brand segment: CMO / Dev */}
      <div className="theme-card relative flex overflow-hidden">
        {(['cmo', 'dev'] as const).map((b) => {
          const active = brand === b;
          const Icon = brandIcons[b];
          return (
            <button
              key={b}
              {...(active ? { 'aria-pressed': 'true' } : { 'aria-pressed': 'false' })}
              onClick={() => setBrand(b)}
              className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? 'text-white'
                  : 'text-text hover:text-accent'
              }`}
              title={`Switch to ${b.toUpperCase()} mode`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{b.toUpperCase()} Mode</span>
              {active && (
                <motion.span
                  layoutId="brand-pill"
                  className="absolute inset-0 -z-10 bg-accent rounded-[var(--radius)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeToggle;

