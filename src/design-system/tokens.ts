/**
 * Design Tokens - TypeScript Type-Safe Access
 * 
 * This file provides programmatic access to design tokens defined in tokens.css
 * Use for animations, dynamic styles, and component logic
 */

export const colors = {
  // Primary Brand Colors
  brandPrimary: '#3b82f6', // Electric Blue
  brandAccent: '#ec4899', // Magenta Glow
  brandBackground: '#0a0a0a', // Deep Black
  brandText: '#ffffff', // Pure White
  brandTextMuted: '#a1a1aa', // Zinc 400
  
  // Extended Palette
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#0a0a0a',
  },
  
  // Semantic Colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

export const typography = {
  // Font Families
  fonts: {
    heading: '"Playfair Display", Georgia, "Times New Roman", serif',
    body: '"Karla", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
  },
  
  // Type Scale (in rem)
  scale: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },
  
  // Line Heights
  leading: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Font Weights
  weight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;

export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  '3xl': '3rem',   // 48px
  '4xl': '4rem',   // 64px
  '5xl': '6rem',   // 96px
  '6xl': '8rem',   // 128px
  '7xl': '12rem',  // 192px
  '8xl': '16rem',  // 256px
} as const;

export const motion = {
  // Durations (in ms for JS, in s for CSS)
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
  },
  
  // Easing Functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Custom easings for orchestrated animations
    dramatic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.45, 0, 0.15, 1)',
  },
  
  // Stagger delays for orchestrated animations (in ms)
  stagger: {
    short: 100,
    medium: 200,
    long: 300,
  },
} as const;

export const radius = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  brand: '0 10px 30px rgba(59, 130, 246, 0.2), 0 5px 15px rgba(236, 72, 153, 0.1)',
  glow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(236, 72, 153, 0.2)',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

/**
 * Helper function to check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Helper to get animation duration with reduced motion support
 */
export function getAnimationDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration;
}

/**
 * CSS variable helper - returns var(--variable-name) for use in CSS-in-JS
 */
export function cssVar(varName: string): string {
  return `var(--${varName})`;
}

/**
 * Brand theme variants - can be extended
 */
export type BrandTheme = 'default' | 'cmo' | 'dev';

export const brandThemes: Record<BrandTheme, { accent: string; font: string; radius: string }> = {
  default: {
    accent: colors.brandAccent,
    font: typography.fonts.body,
    radius: radius.xl,
  },
  cmo: {
    accent: '#0f3b82', // Navy
    font: typography.fonts.heading,
    radius: radius.lg,
  },
  dev: {
    accent: '#22d3ee', // Cyan
    font: typography.fonts.mono,
    radius: radius['2xl'],
  },
} as const;
