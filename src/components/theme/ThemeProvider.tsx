import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
type Brand = 'default';

type ThemeContextType = {
  theme: Theme;
  brand: Brand;
  brandAccent?: string;
  setTheme: (t: Theme) => void;
  setBrand: (b: Brand) => void;
  setBrandAccent: (color?: string) => void;
  prefersReducedMotion: boolean;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state synchronously from localStorage (safe because ThemeInit script runs first)
  const getInitialTheme = (): Theme => {
    try {
      const stored = localStorage.getItem('theme') as Theme;
      return stored && ['light', 'dark', 'system'].includes(stored) ? stored : 'system';
    } catch {
      return 'system';
    }
  };

  const getInitialBrandAccent = (): string | undefined => {
    try {
      const stored = localStorage.getItem('brandAccent');
      return stored || undefined;
    } catch {
      return undefined;
    }
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const brand: Brand = 'default'; // Always use hybrid/default brand
  const [brandAccent, setBrandAccentState] = useState<string | undefined>(getInitialBrandAccent);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Define apply function before using it in effects
  const updateThemeColor = React.useCallback((isDark: boolean) => {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDark ? 'var(--color-neutral-1)' : 'var(--color-light)');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = isDark ? 'var(--color-neutral-1)' : 'var(--color-light)';
      document.head.appendChild(meta);
    }
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }, []);

  const apply = React.useCallback((t: Theme, accent?: string) => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = t === 'dark' || (t === 'system' && prefersDark);

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-brand', 'default');

    // Apply default (hybrid) font family
    const fontFamily = "'Montserrat', system-ui, sans-serif";
    document.documentElement.style.setProperty('--brand-font-family', fontFamily);
    document.body.style.fontFamily = fontFamily;

    if (accent) {
      document.documentElement.style.setProperty('--brand-accent-override', accent);
      document.documentElement.style.setProperty('--accent', accent);
    } else {
      document.documentElement.style.removeProperty('--brand-accent-override');
    }

    updateThemeColor(isDark);
  }, [updateThemeColor]);

  useEffect(() => {
    apply(theme, brandAccent);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      document.documentElement.classList.toggle('reduce-motion', e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    document.documentElement.classList.toggle('reduce-motion', motionQuery.matches);

    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, [apply, theme, brandAccent]);

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => apply('system', brandAccent);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [apply, theme, brandAccent]);



  // Analytics helper
  const trackEvent = React.useCallback((eventName: string, params: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as { gtag: (event: string, name: string, params: Record<string, unknown>) => void }).gtag;
      gtag('event', eventName, params);
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('theme', t);
    apply(t, brandAccent);
    trackEvent('theme_change', { theme: t });
  };

  // setBrand is a no-op now since we only use 'default' brand
  const setBrand = (_b: Brand) => {
    // No-op: brand is always 'default'
  };

  const setBrandAccent = (color?: string) => {
    setBrandAccentState(color);
    if (color) {
      localStorage.setItem('brandAccent', color);
    } else {
      localStorage.removeItem('brandAccent');
    }
    apply(theme, color);
    trackEvent('brand_accent_change', { color: color || 'none' });
  };

  // Always provide context - never return children without Provider
  return (
    <ThemeContext.Provider
      value={{
        theme,
        brand,
        brandAccent,
        setTheme,
        setBrand,
        setBrandAccent,
        prefersReducedMotion
      }}
    >
      {/* Smooth crossfade on theme changes */}
      <div className="transition-colors duration-300">{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
