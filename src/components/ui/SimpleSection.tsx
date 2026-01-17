import React from 'react';
import { motion } from 'framer-motion';

type SectionVariant =
  | 'default'      // Standard dark background
  | 'elevated'     // Slightly lighter with shadow
  | 'accent-teal'  // Teal glow accent
  | 'accent-orange' // Orange glow accent
  | 'bordered'     // With subtle border
  | 'inset';       // Slightly darker, inset feel

interface SimpleSectionProps {
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  animated?: boolean;
}

const variantClasses: Record<SectionVariant, string> = {
  default: 'bg-brand-dark',
  elevated: 'bg-slate-900 shadow-[var(--shadow-lg)]',
  'accent-teal': 'bg-brand-dark relative before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,_rgba(64,224,208,0.08)_0%,_transparent_70%)] before:pointer-events-none',
  'accent-orange': 'bg-brand-dark relative before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,_rgba(255,165,0,0.08)_0%,_transparent_70%)] before:pointer-events-none',
  bordered: 'bg-brand-dark border-t border-b border-white/10',
  inset: 'bg-slate-950 shadow-inner',
};

const paddingClasses = {
  none: '',
  sm: 'py-12 px-4 sm:px-6',
  md: 'py-16 px-4 sm:px-6 lg:px-8',
  lg: 'py-24 px-4 sm:px-6 lg:px-8',
  xl: 'py-32 px-4 sm:px-6 lg:px-8',
};

const maxWidthClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-[1400px]',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

/**
 * SimpleSection - Clean section wrapper using existing design system
 *
 * Aligns with tokens.css and home-sections.css patterns
 * Uses shadows and background colors for separation
 *
 * Usage:
 * <SimpleSection variant="accent-teal" padding="lg">
 *   {children}
 * </SimpleSection>
 */
export const SimpleSection: React.FC<SimpleSectionProps> = ({
  children,
  variant = 'default',
  className = '',
  padding = 'lg',
  container = true,
  maxWidth = '7xl',
  animated = false,
}) => {
  const variantClass = variantClasses[variant];
  const paddingClass = paddingClasses[padding];
  const maxWidthClass = maxWidthClasses[maxWidth];

  const sectionContent = (
    <div className={`relative ${variantClass} ${className}`}>
      <div className={`relative z-10 ${paddingClass}`}>
        {container ? (
          <div className={`${maxWidthClass} mx-auto`}>{children}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        {sectionContent}
      </motion.section>
    );
  }

  return <section>{sectionContent}</section>;
};

export default SimpleSection;
