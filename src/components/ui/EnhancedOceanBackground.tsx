"use client";

import React, { lazy, Suspense, useState, useEffect } from "react";
import { cn } from "../../lib/utils";

// Lazy load heavy background variants - only load when actually used
const OceanAuroraBackground = lazy(() => import("./OceanAuroraBackground").then(m => ({ default: m.OceanAuroraBackground })));
const OceanBackgroundBeams = lazy(() => import("./OceanBackgroundBeams").then(m => ({ default: m.OceanBackgroundBeams })));
const OceanGradientAnimation = lazy(() => import("./OceanGradientAnimation").then(m => ({ default: m.OceanGradientAnimation })));
const OceanWavyBackground = lazy(() => import("./OceanWavyBackground").then(m => ({ default: m.OceanWavyBackground })));

export type BackgroundVariant =
  | "aurora"
  | "beams"
  | "gradient"
  | "wavy"
  | "minimal";

interface EnhancedOceanBackgroundProps {
  variant?: BackgroundVariant;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  intensity?: "subtle" | "medium" | "vibrant";
}

/**
 * Hook to detect if we should use simplified backgrounds for performance
 * - Mobile devices (smaller screens or touch devices)
 * - Users who prefer reduced motion
 * - Low-power devices based on device memory or connection
 */
function useShouldSimplifyBackground(): boolean {
  const [shouldSimplify, setShouldSimplify] = useState(false);

  useEffect(() => {
    const checkShouldSimplify = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check for mobile device (touch OR small screen - not both required)
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      const isMobile = isTouchDevice || isSmallScreen;
      
      // Check for low memory devices (navigator.deviceMemory is in GB)
      type NavigatorWithMemory = Navigator & { deviceMemory?: number };
      const isLowMemory = 'deviceMemory' in navigator && 
        (navigator as NavigatorWithMemory).deviceMemory !== undefined && 
        (navigator as NavigatorWithMemory).deviceMemory! < 4;
      
      // Check for slow connection
      type NavigatorWithConnection = Navigator & { connection?: { effectiveType?: string } };
      const connection = (navigator as NavigatorWithConnection).connection;
      const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
      
      setShouldSimplify(prefersReducedMotion || isMobile || isLowMemory || isSlowConnection);
    };

    checkShouldSimplify();
    
    // Listen for changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkShouldSimplify);
    window.addEventListener('resize', checkShouldSimplify);

    return () => {
      motionQuery.removeEventListener('change', checkShouldSimplify);
      window.removeEventListener('resize', checkShouldSimplify);
    };
  }, []);

  return shouldSimplify;
}

export const EnhancedOceanBackground: React.FC<EnhancedOceanBackgroundProps> = ({
  variant = "gradient",
  children,
  className,
  containerClassName,
  intensity = "medium",
}) => {
  const shouldSimplify = useShouldSimplifyBackground();
  const opacityClass = {
    subtle: "opacity-30",
    medium: "opacity-50",
    vibrant: "opacity-70",
  }[intensity];

  // On mobile/reduced motion, always use minimal static gradient to prevent flashing
  if (variant === "minimal" || shouldSimplify) {
    return (
      <div
        className={cn(
          "relative w-full h-full bg-gradient-to-br from-[#edf6f9] via-[#d4e8ed] to-[#b8d9e1]",
          containerClassName
        )}
        // Ensure no animation or transform on this element
        style={{ willChange: 'auto' }}
      >
        <div className={cn("relative z-10", className)}>
          {children}
        </div>
      </div>
    );
  }

  // Heavy variants are lazy loaded
  switch (variant) {
    case "aurora":
      return (
        <Suspense fallback={<MinimalFallback containerClassName={containerClassName} className={className}>{children}</MinimalFallback>}>
          <div className={cn("relative w-full h-full", containerClassName)}>
            <OceanAuroraBackground className={className}>
              {children}
            </OceanAuroraBackground>
          </div>
        </Suspense>
      );

    case "beams":
      return (
        <Suspense fallback={<MinimalFallback containerClassName={containerClassName} className={className}>{children}</MinimalFallback>}>
          <div className={cn("relative w-full h-full", containerClassName)}>
            <OceanBackgroundBeams className={cn(opacityClass)} />
            <div className={cn("relative z-10", className)}>
              {children}
            </div>
          </div>
        </Suspense>
      );

    case "gradient":
      return (
        <Suspense fallback={<MinimalFallback containerClassName={containerClassName} className={className}>{children}</MinimalFallback>}>
          <OceanGradientAnimation
            className={className}
            containerClassName={containerClassName}
          >
            {children}
          </OceanGradientAnimation>
        </Suspense>
      );

    case "wavy":
      return (
        <Suspense fallback={<MinimalFallback containerClassName={containerClassName} className={className}>{children}</MinimalFallback>}>
          <OceanWavyBackground
            className={className}
            containerClassName={containerClassName}
            waveOpacity={intensity === "subtle" ? 0.3 : intensity === "medium" ? 0.5 : 0.7}
          >
            {children}
          </OceanWavyBackground>
        </Suspense>
      );

    default:
      return (
        <div
          className={cn(
            "relative w-full h-full bg-gradient-to-br from-[#edf6f9] via-[#d4e8ed] to-[#b8d9e1]",
            containerClassName
          )}
        >
          <div className={cn("relative z-10", className)}>
            {children}
          </div>
        </div>
      );
  }
};

// Lightweight fallback while heavy backgrounds load
const MinimalFallback: React.FC<{
  containerClassName?: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ containerClassName, className, children }) => (
  <div
    className={cn(
      "relative w-full h-full bg-gradient-to-br from-[#edf6f9] via-[#d4e8ed] to-[#b8d9e1]",
      containerClassName
    )}
  >
    <div className={cn("relative z-10", className)}>
      {children}
    </div>
  </div>
);

