'use client';

import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

// Simple marquee implementation without external dependency
export type OceanMarqueeProps = HTMLAttributes<HTMLDivElement> & {
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
};

export const OceanMarquee = ({
  className,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  children,
  ...props
}: OceanMarqueeProps) => {
  const animationDuration = `${100 / speed}s`;
  const animationDirection = direction === 'right' ? 'reverse' : 'normal';

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      {...props}
    >
      <div
        className={cn(
          'flex gap-8',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
        style={{
          animation: `marquee ${animationDuration} linear infinite`,
          animationDirection,
        }}
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>

      {/* Fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#006d77] to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#006d77] to-transparent pointer-events-none z-10" />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export type OceanMarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export const OceanMarqueeItem = ({ className, ...props }: OceanMarqueeItemProps) => (
  <div
    className={cn('mx-2 flex-shrink-0 object-contain', className)}
    {...props}
  />
);

