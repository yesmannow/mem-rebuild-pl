'use client';

import * as React from 'react';
import { motion, useAnimate } from 'framer-motion';
import { cn } from '../../lib/utils';

type OceanTextGenerateEffectProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  words: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
  className?: string;
};

function OceanTextGenerateEffect({
  ref,
  words,
  className,
  filter = true,
  duration = 0.5,
  staggerDelay = 0.2,
  ...props
}: OceanTextGenerateEffectProps) {
  const localRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

  const [scope, animate] = useAnimate();
  const wordsArray = React.useMemo(() => words.split(' '), [words]);

  React.useEffect(() => {
    if (scope.current) {
      const spans = scope.current.querySelectorAll('span');
      spans.forEach((span, index) => {
        animate(
          span,
          {
            opacity: 1,
            filter: filter ? 'blur(0px)' : 'none',
          },
          {
            duration: duration,
            delay: index * staggerDelay,
          }
        );
      });
    }
  }, [animate, duration, filter, scope, staggerDelay]);

  return (
    <div ref={localRef} className={cn('font-bold', className)} data-slot="text-generate-effect" {...props}>
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`}
            className="opacity-0 will-change-transform will-change-opacity will-change-filter"
            style={{
              filter: filter ? 'blur(10px)' : 'none',
            }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export { OceanTextGenerateEffect, type OceanTextGenerateEffectProps };

