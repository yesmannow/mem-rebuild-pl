"use client";

import React, { lazy, Suspense } from "react";
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

export const EnhancedOceanBackground: React.FC<EnhancedOceanBackgroundProps> = ({
  variant = "gradient",
  children,
  className,
  containerClassName,
  intensity = "medium",
}) => {
  const opacityClass = {
    subtle: "opacity-30",
    medium: "opacity-50",
    vibrant: "opacity-70",
  }[intensity];

  // Minimal variant is rendered without Suspense for fastest initial load
  if (variant === "minimal") {
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

