'use client';

import * as React from 'react';
import { motion, type Transition } from 'framer-motion';

import { cn } from '../../lib/utils';

type OceanGradientTextProps = React.ComponentProps<'span'> & {
  text: string;
  gradient?: string;
  neon?: boolean;
  transition?: Transition;
  className?: string;
};

function OceanGradientText({
  text,
  className,
  gradient = 'linear-gradient(90deg, #006d77 0%, #83c5be 20%, #e29578 50%, #83c5be 80%, #006d77 100%)',
  neon = false,
  transition = { duration: 3, repeat: Infinity, ease: 'linear' },
  ...props
}: OceanGradientTextProps) {
  const baseStyle: React.CSSProperties = {
    backgroundImage: gradient,
  };

  return (
    <span
      data-slot="gradient-text"
      className={cn('relative inline-block', className)}
      {...props}
    >
      <motion.span
        className="m-0 text-transparent bg-clip-text bg-[length:200%_100%]"
        style={baseStyle}
        animate={{ backgroundPositionX: ['0%', '200%'] }}
        transition={transition}
      >
        {text}
      </motion.span>

      {neon && (
        <motion.span
          className="m-0 absolute top-0 left-0 text-transparent bg-clip-text blur-[8px] mix-blend-plus-lighter bg-[length:200%_100%]"
          style={baseStyle}
          animate={{ backgroundPositionX: ['0%', '200%'] }}
          transition={transition}
        >
          {text}
        </motion.span>
      )}
    </span>
  );
}

export { OceanGradientText, type OceanGradientTextProps };

