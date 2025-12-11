/**
 * PageParticleBackground Component
 * 
 * Subtle particle animation for hero sections
 * Uses tsParticles for performance-optimized particle effects
 */

import { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-engine';
import type { Engine } from 'tsparticles-engine';

export interface PageParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  opacity?: number;
  speed?: number;
}

/**
 * PageParticleBackground - Minimal particle animation
 * 
 * @example
 * <PageParticleBackground particleColor="#40E0D0" opacity={0.05} />
 */
export function PageParticleBackground({
  className = '',
  particleCount = 50,
  particleColor = '#40E0D0',
  opacity = 0.05,
  speed = 0.3,
}: PageParticleBackgroundProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    // Load only the features you need to reduce bundle size
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className={`absolute inset-0 -z-10 ${className}`}
      init={particlesInit}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: false,
            },
            onHover: {
              enable: false,
            },
            resize: true,
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            enable: false,
          },
          move: {
            enable: true,
            speed: speed,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out',
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: particleCount,
          },
          opacity: {
            value: opacity,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
        reduceDuplicates: true,
        // Respect user's motion preferences
        motion: {
          disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        },
      }}
    />
  );
}

export default PageParticleBackground;
