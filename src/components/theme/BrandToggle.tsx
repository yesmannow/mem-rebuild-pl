import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeProvider';

type Brand = 'cmo' | 'dev' | 'default';

const BRAND_OPTIONS: { value: Brand; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { value: 'cmo', label: 'CMO', icon: Briefcase },
  { value: 'default', label: 'Hybrid', icon: Sparkles },
  { value: 'dev', label: 'Dev', icon: Code },
];

export default function BrandToggle() {
  const { brand, setBrand } = useTheme();

  const currentIndex = BRAND_OPTIONS.findIndex(opt => opt.value === brand);
  const activeIndex = currentIndex >= 0 ? currentIndex : 1; // Default to Hybrid

  return (
    <div className="flex items-center gap-1 bg-brand-dark/50 backdrop-blur-sm border border-brand-teal/20 rounded-full p-1">
      {BRAND_OPTIONS.map((option, index) => {
        const Icon = option.icon;
        const isActive = brand === option.value;

        return (
          <button
            key={option.value}
            onClick={() => setBrand(option.value)}
            className={`
              relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
              ${isActive
                ? 'text-brand-dark'
                : 'text-brand-muted hover:text-brand-teal'
              }
            `}
            aria-label={`Switch to ${option.label} mode`}
          >
            {/* Animated background */}
            {isActive && (
              <motion.div
                layoutId="brandToggleBackground"
                className="absolute inset-0 bg-brand-teal rounded-full"
                initial={false}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}

            {/* Content */}
            <span className="relative flex items-center gap-1.5 z-10">
              <Icon size={14} />
              <span className="hidden sm:inline">{option.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

