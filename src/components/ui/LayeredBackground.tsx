import React, { useEffect, useRef } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import './LayeredBackground.css';

export interface LayeredBackgroundProps {
  /**
   * Base gradient colors (CSS gradient string or array of colors)
   */
  gradient?: string | string[];
  
  /**
   * Texture overlay opacity (0-1)
   */
  textureOpacity?: number;
  
  /**
   * Enable parallax scroll effect
   */
  parallax?: boolean;
  
  /**
   * Parallax speed multiplier (0-1, lower is slower)
   */
  parallaxSpeed?: number;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Children elements to render on top of background
   */
  children?: React.ReactNode;
  
  /**
   * z-index for the background
   */
  zIndex?: number;
}

/**
 * LayeredBackground - Reusable background component with gradients and texture
 * 
 * Features:
 * - CSS gradients with customizable colors
 * - SVG noise texture overlay
 * - Optional CSS-only parallax on scroll
 * - Respects prefers-reduced-motion
 * - Accessible (aria-hidden, no interaction)
 */
export const LayeredBackground: React.FC<LayeredBackgroundProps> = ({
  gradient,
  textureOpacity = 0.3,
  parallax = false,
  parallaxSpeed = 0.5,
  className = '',
  children,
  zIndex = -1,
}) => {
  const { prefersReducedMotion } = useTheme();
  const layerRef = useRef<HTMLDivElement>(null);

  // Build gradient CSS string
  const gradientString = Array.isArray(gradient)
    ? `linear-gradient(135deg, ${gradient.join(', ')})`
    : gradient || 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)';

  // Parallax effect using pure CSS when possible, with fallback to JS
  useEffect(() => {
    if (!parallax || prefersReducedMotion || !layerRef.current) return;

    const handleScroll = () => {
      if (!layerRef.current) return;
      const scrollY = window.scrollY;
      const offset = scrollY * parallaxSpeed;
      
      // Use transform for better performance
      layerRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    // Use requestAnimationFrame for smooth parallax
    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });
    return () => window.removeEventListener('scroll', optimizedScroll);
  }, [parallax, parallaxSpeed, prefersReducedMotion]);

  return (
    <div 
      className={`layered-background ${className} ${parallax && !prefersReducedMotion ? 'layered-background--parallax' : ''}`}
      style={{ zIndex }}
      aria-hidden="true"
    >
      {/* Gradient layer */}
      <div 
        ref={layerRef}
        className="layered-background__gradient"
        style={{
          background: gradientString,
        }}
      />
      
      {/* Texture overlay (SVG noise pattern) */}
      <div 
        className="layered-background__texture"
        style={{
          opacity: textureOpacity,
        }}
      >
        <svg 
          className="layered-background__svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <filter id="noise">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.65" 
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.15" />
        </svg>
      </div>
      
      {/* Optional content overlay */}
      {children && (
        <div className="layered-background__content">
          {children}
        </div>
      )}
    </div>
  );
};

export default LayeredBackground;
