'use client';

import * as React from 'react';
import {
  type SpringOptions,
  useInView,
  useMotionValue,
  useSpring,
  type UseInViewOptions,
} from 'framer-motion';
import { cn } from '../../lib/utils';

type OceanCountingNumberProps = React.ComponentProps<'span'> & {
  number: number;
  fromNumber?: number;
  padStart?: boolean;
  inView?: boolean;
  inViewMargin?: UseInViewOptions['margin'];
  inViewOnce?: boolean;
  decimalSeparator?: string;
  transition?: SpringOptions;
  decimalPlaces?: number;
  suffix?: string;
  className?: string;
};

function OceanCountingNumber({
  ref,
  number,
  fromNumber = 0,
  padStart = false,
  inView = false,
  inViewMargin = '0px',
  inViewOnce = true,
  decimalSeparator = '.',
  transition = { stiffness: 90, damping: 50 },
  decimalPlaces = 0,
  suffix = '',
  className,
  ...props
}: OceanCountingNumberProps) {
  const localRef = React.useRef<HTMLSpanElement>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLSpanElement);

  // Guard against undefined number
  const safeNumber = number ?? 0;
  const numberStr = safeNumber.toString();
  const decimals =
    typeof decimalPlaces === 'number'
      ? decimalPlaces
      : numberStr.includes('.')
        ? (numberStr.split('.')[1]?.length ?? 0)
        : 0;

  const motionVal = useMotionValue(fromNumber);
  const springVal = useSpring(motionVal, transition);
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  React.useEffect(() => {
    if (isInView) motionVal.set(safeNumber);
  }, [isInView, safeNumber, motionVal]);

  React.useEffect(() => {
    const unsubscribe = springVal.on('change', (latest) => {
      if (localRef.current) {
        let formatted =
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toString();

        if (decimals > 0) {
          formatted = formatted.replace('.', decimalSeparator);
        }

        if (padStart) {
          const finalIntLength = Math.floor(Math.abs(safeNumber)).toString().length;
          const [intPart, fracPart] = formatted.split(decimalSeparator);
          const paddedInt = intPart?.padStart(finalIntLength, '0') ?? '';
          formatted = fracPart
            ? `${paddedInt}${decimalSeparator}${fracPart}`
            : paddedInt;
        }

        localRef.current.textContent = formatted + suffix;
      }
    });
    return () => unsubscribe();
  }, [springVal, decimals, padStart, safeNumber, decimalSeparator, suffix]);

  const finalIntLength = Math.floor(Math.abs(safeNumber)).toString().length;
  const initialText = padStart
    ? '0'.padStart(finalIntLength, '0') +
      (decimals > 0 ? decimalSeparator + '0'.repeat(decimals) : '') + suffix
    : '0' + (decimals > 0 ? decimalSeparator + '0'.repeat(decimals) : '') + suffix;

  return (
    <span
      ref={localRef}
      data-slot="counting-number"
      className={cn('text-[var(--color-primary)] font-bold', className)}
      {...props}
    >
      {initialText}
    </span>
  );
}

export { OceanCountingNumber, type OceanCountingNumberProps };

