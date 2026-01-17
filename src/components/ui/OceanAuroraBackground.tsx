"use client";

import { cn } from "../../lib/utils";
import React, { ReactNode, useState, useEffect } from "react";

interface OceanAuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const OceanAuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: OceanAuroraBackgroundProps) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMotionAndDevice = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;

      setPrefersReducedMotion(reducedMotion);
      // Consider mobile if touch device OR small screen (not both required)
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkMotionAndDevice();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', checkMotionAndDevice);
    window.addEventListener('resize', checkMotionAndDevice);

    return () => {
      motionQuery.removeEventListener('change', checkMotionAndDevice);
      window.removeEventListener('resize', checkMotionAndDevice);
    };
  }, []);

  // For mobile/reduced motion, render a simplified static version
  if (prefersReducedMotion || isMobile) {
    return (
      <main>
        <div
          className={cn(
            "relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#005a63] via-[#006d77] to-[#003d44] text-[#edf6f9]",
            className,
          )}
          style={{ willChange: 'auto' }}
          {...props}
        >
          {children}
        </div>
      </main>
    );
  }

  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex min-h-screen flex-col items-center justify-center bg-[#005a63] text-[#edf6f9]",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#006d77_10%,#83c5be_15%,#7ab5c2_20%,#ffddd2_25%,#e29578_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

              "--stormy-teal": "#006d77",
              "--pearl-aqua": "#83c5be",
              "--alice-blue": "#edf6f9",
              "--almond-silk": "#ffddd2",
              "--tangerine-dream": "#e29578",
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--stormy-teal)_10%,var(--pearl-aqua)_15%,var(--pearl-aqua)_20%,var(--almond-silk)_25%,var(--tangerine-dream)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};

