"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

interface OceanMeteorsProps {
  number?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
  angle?: number;
  className?: string;
}

export const OceanMeteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: OceanMeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    [],
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: "-5%",
      left: `calc(0% + ${Math.floor(Math.random() * window.innerWidth)}px)`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head - Ocean Pearl colors
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "pointer-events-none absolute size-0.5 rotate-[var(--angle)] animate-meteor rounded-full bg-[#83c5be] shadow-[0_0_0_1px_#006d7710]",
            className,
          )}
        >
          {/* Meteor Tail - Ocean Pearl gradient */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-[#83c5be] via-[#006d77] to-transparent" />
        </span>
      ))}
    </>
  );
};

