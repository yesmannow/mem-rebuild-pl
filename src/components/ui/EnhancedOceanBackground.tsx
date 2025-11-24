"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { OceanAuroraBackground } from "./OceanAuroraBackground";
import { OceanBackgroundBeams } from "./OceanBackgroundBeams";
import { OceanGradientAnimation } from "./OceanGradientAnimation";
import { OceanWavyBackground } from "./OceanWavyBackground";

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

  switch (variant) {
    case "aurora":
      return (
        <OceanAuroraBackground className={className} containerClassName={containerClassName}>
          {children}
        </OceanAuroraBackground>
      );

    case "beams":
      return (
        <div className={cn("relative w-full h-full", containerClassName)}>
          <OceanBackgroundBeams className={cn(opacityClass)} />
          <div className={cn("relative z-10", className)}>
            {children}
          </div>
        </div>
      );

    case "gradient":
      return (
        <OceanGradientAnimation
          className={className}
          containerClassName={containerClassName}
        >
          {children}
        </OceanGradientAnimation>
      );

    case "wavy":
      return (
        <OceanWavyBackground
          className={className}
          containerClassName={containerClassName}
          waveOpacity={intensity === "subtle" ? 0.3 : intensity === "medium" ? 0.5 : 0.7}
        >
          {children}
        </OceanWavyBackground>
      );

    case "minimal":
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

