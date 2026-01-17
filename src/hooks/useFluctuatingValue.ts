import { useState, useEffect, useRef } from 'react';

/**
 * Hook for creating fluctuating values that update at random intervals
 *
 * @param baseValue - The base value to fluctuate around
 * @param variance - The maximum deviation from baseValue (value will be baseValue +/- variance)
 * @returns The current fluctuating value
 *
 * @example
 * const requestsPerSec = useFluctuatingValue(1300, 100); // Fluctuates between 1200-1400
 */
export function useFluctuatingValue(baseValue: number, variance: number): number {
  const [value, setValue] = useState(baseValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateValue = () => {
      // Generate a random offset between -variance and +variance
      const offset = (Math.random() * 2 - 1) * variance;
      const newValue = baseValue + offset;
      setValue(newValue);
    };

    const scheduleUpdate = () => {
      // Random interval between 2-4 seconds (2000-4000ms)
      const interval = 2000 + Math.random() * 2000;

      timeoutRef.current = setTimeout(() => {
        updateValue();
        scheduleUpdate(); // Schedule the next update
      }, interval);
    };

    // Start the first update
    scheduleUpdate();

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [baseValue, variance]);

  return value;
}
