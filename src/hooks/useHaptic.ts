import { useCallback } from 'react';

/**
 * Hook for haptic feedback using the Vibration API
 * Provides tactile feedback on supported devices (primarily mobile)
 *
 * @returns Object with triggerHaptic function
 */
export const useHaptic = () => {
  // Check if Vibration API is supported
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  /**
   * Trigger haptic feedback
   * @param pattern - Vibration pattern (default: [10] for a light tick)
   *   - Single number: duration in milliseconds
   *   - Array: [vibrate, pause, vibrate, pause, ...]
   *   - Example: [10] = 10ms vibration
   *   - Example: [10, 50, 10] = 10ms vibrate, 50ms pause, 10ms vibrate
   */
  const triggerHaptic = useCallback(
    (pattern: number | number[] = [10]) => {
      if (!isSupported) {
        // Gracefully fail on unsupported devices
        return;
      }

      try {
        // iOS Safari requires user interaction context
        // The pattern will work if called from a click/touch handler
        navigator.vibrate(pattern);
      } catch (error) {
        // Silently fail if vibration is blocked or unavailable
        // intentionally silence vibration errors
      }
    },
    [isSupported]
  );

  return {
    triggerHaptic,
    isSupported,
  };
};

