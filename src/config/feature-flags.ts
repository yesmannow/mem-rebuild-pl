/**
 * Feature Flags Configuration
 * Config-driven feature toggles for safe deployment
 */

export interface FeatureFlag {
  enabled: boolean;
  description: string;
  rolloutPercentage?: number; // 0-100 for gradual rollout
}

export interface FeatureFlags {
  [key: string]: FeatureFlag;
}

/**
 * Feature flags configuration
 * Set enabled: true to enable a feature, false to disable
 * Use rolloutPercentage for gradual rollouts (0-100)
 */
export const featureFlags: FeatureFlags = {
  // New case studies
  'case-studies.the-guardian': {
    enabled: true,
    description: 'The Guardian case study page',
  },
  'case-studies.the-compass': {
    enabled: true,
    description: 'The Compass case study page',
  },
  'case-studies.the-fortress': {
    enabled: true,
    description: 'The Fortress case study page',
  },
  'case-studies.the-conductor': {
    enabled: true,
    description: 'The Conductor case study page',
  },
  'case-studies.the-engine-room': {
    enabled: true,
    description: 'The Engine Room case study page',
  },
  'case-studies.graston-ceu': {
    enabled: true,
    description: 'Graston CEU System case study page',
  },
  'case-studies.rbe-law': {
    enabled: true,
    description: 'RBE Law case study page',
  },
  'case-studies.ultimate-tech-roi': {
    enabled: true,
    description: 'Ultimate Tech ROI case study page',
  },

  // New sections
  'sections.inspiration-showcase': {
    enabled: true,
    description: 'Inspiration showcase section',
  },
  'sections.testimonials': {
    enabled: true,
    description: 'Testimonials section',
  },

  // Performance features
  'performance.image-optimization': {
    enabled: true,
    description: 'AVIF/WebP image optimization',
  },
  'performance.lazy-loading': {
    enabled: true,
    description: 'Lazy loading for images',
  },

  // Analytics
  'analytics.enhanced-telemetry': {
    enabled: false,
    description: 'Enhanced telemetry and client hints',
    rolloutPercentage: 0, // Start disabled
  },
};

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(flagKey: string): boolean {
  const flag = featureFlags[flagKey];
  if (!flag) {
    console.warn(`Feature flag "${flagKey}" not found. Defaulting to disabled.`);
    return false;
  }

  if (!flag.enabled) {
    return false;
  }

  // If rollout percentage is set, check if we're within the rollout
  if (flag.rolloutPercentage !== undefined) {
    // Simple hash-based rollout (deterministic per user/session)
    const hash = hashString(flagKey + (typeof window !== 'undefined' ? window.location.hostname : ''));
    return hash % 100 < flag.rolloutPercentage;
  }

  return true;
}

/**
 * Simple string hash function for deterministic rollout
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Get feature flag value
 */
export function getFeatureFlag(flagKey: string): FeatureFlag | null {
  return featureFlags[flagKey] || null;
}

/**
 * Get all enabled feature flags
 */
export function getEnabledFlags(): string[] {
  return Object.keys(featureFlags).filter(key => isFeatureEnabled(key));
}

