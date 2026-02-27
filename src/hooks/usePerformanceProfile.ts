import { useEffect, useMemo, useState } from 'react';

export type PerformanceTier = 'cinematic' | 'balanced' | 'low-power';

export interface PerformanceProfile {
  tier: PerformanceTier;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  deviceMemory: number;
  cores: number;
  summary: string;
}

export interface PerformanceBudget {
  particles: number;
  secondaryParticles: number;
  pointSize: number;
  magnetForce: number;
  positionFrameSkip: number;
  dpr: [number, number];
  maxProjects: number;
  physicsTimeScale: number;
  rippleDecay: number;
  blurMultiplier: number;
}

const DEFAULT_PROFILE: PerformanceProfile = {
  tier: 'cinematic',
  isMobile: false,
  prefersReducedMotion: false,
  deviceMemory: 8,
  cores: 8,
  summary: 'Desktop cinematic mode',
};

const getProfile = (): PerformanceProfile => {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;

  const width = window.innerWidth;
  const isMobile = width <= 768;
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const deviceMemory = (navigator as unknown as { deviceMemory?: number })?.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;

  let tier: PerformanceTier = 'cinematic';
  if (prefersReducedMotion || isMobile || deviceMemory <= 4 || cores <= 4) {
    tier = 'low-power';
  } else if (width <= 1280 || deviceMemory <= 6 || cores <= 6) {
    tier = 'balanced';
  }

  const summaryParts = [tier.toUpperCase(), `${cores} cores`, `${deviceMemory}GB mem`];
  if (prefersReducedMotion) summaryParts.push('reduced motion');
  if (isMobile) summaryParts.push('mobile viewport');

  return {
    tier,
    isMobile,
    prefersReducedMotion,
    deviceMemory,
    cores,
    summary: summaryParts.join(' • '),
  };
};

export const usePerformanceProfile = (): PerformanceProfile => {
  const [profile, setProfile] = useState<PerformanceProfile>(() => getProfile());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handle = () => setProfile(getProfile());
    window.addEventListener('resize', handle);
    const motion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    motion?.addEventListener('change', handle);
    return () => {
      window.removeEventListener('resize', handle);
      motion?.removeEventListener('change', handle);
    };
  }, []);

  return profile;
};

export const usePerformanceBudget = () => {
  const profile = usePerformanceProfile();

  const budget: PerformanceBudget = useMemo(() => {
    switch (profile.tier) {
      case 'low-power':
        return {
          particles: 420,
          secondaryParticles: 140,
          pointSize: 0.02,
          magnetForce: 0.000012,
          positionFrameSkip: 2,
          dpr: [1, 1.2],
          maxProjects: 6,
          physicsTimeScale: 0.9,
          rippleDecay: 0.9,
          blurMultiplier: 0.06,
        };
      case 'balanced':
        return {
          particles: 700,
          secondaryParticles: 220,
          pointSize: 0.022,
          magnetForce: 0.000015,
          positionFrameSkip: 1,
          dpr: [1, 1.5],
          maxProjects: 8,
          physicsTimeScale: 1,
          rippleDecay: 0.92,
          blurMultiplier: 0.08,
        };
      default:
        return {
          particles: 900,
          secondaryParticles: 300,
          pointSize: 0.024,
          magnetForce: 0.000018,
          positionFrameSkip: 1,
          dpr: [1, 1.8],
          maxProjects: 10,
          physicsTimeScale: 1.05,
          rippleDecay: 0.94,
          blurMultiplier: 0.09,
        };
    }
  }, [profile.tier]);

  return { profile, budget };
};
