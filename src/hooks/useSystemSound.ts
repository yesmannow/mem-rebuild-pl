/**
 * useSystemSound - Tactile audio feedback for UI interactions
 * Provides system-like sound effects for premium user experience
 */

import { useCallback, useRef } from 'react';

type SoundType = 'blip' | 'switch' | 'click' | 'hover';

interface SoundConfig {
  frequency?: number;
  duration?: number;
  volume?: number;
  type?: OscillatorType;
}

const soundPresets: Record<SoundType, SoundConfig> = {
  blip: {
    frequency: 800, // High-pitch blip
    duration: 50,
    volume: 0.1, // Very quiet
    type: 'sine',
  },
  switch: {
    frequency: 200, // Mechanical switch sound
    duration: 100,
    volume: 0.15,
    type: 'square',
  },
  click: {
    frequency: 400,
    duration: 30,
    volume: 0.08,
    type: 'sine',
  },
  hover: {
    frequency: 600,
    duration: 40,
    volume: 0.05, // Very subtle
    type: 'sine',
  },
};

/**
 * Hook for playing system sounds
 * Uses Web Audio API to generate sounds programmatically
 */
export function useSystemSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext on first use (requires user interaction)
  const getAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined' || typeof AudioContext === 'undefined') {
      return null;
    }

    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new AudioContext();
      } catch (error) {
        console.warn('AudioContext not available:', error);
        return null;
      }
    }

    // Resume if suspended (browsers require user interaction)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {
        // Silently fail if user hasn't interacted yet
      });
    }

    return audioContextRef.current;
  }, []);

  /**
   * Play a system sound
   */
  const playSound = useCallback(
    (type: SoundType, customConfig?: Partial<SoundConfig>) => {
      const config = { ...soundPresets[type], ...customConfig };
      const audioContext = getAudioContext();

      if (!audioContext) {
        // Fallback: Try to play a placeholder sound file if available
        // For now, we'll just return silently
        return;
      }

      try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = config.type || 'sine';
        oscillator.frequency.value = config.frequency || 440;

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          config.volume || 0.1,
          audioContext.currentTime + 0.01
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + (config.duration || 100) / 1000
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(
          audioContext.currentTime + (config.duration || 100) / 1000
        );
      } catch (error) {
        // Silently fail - audio might not be available
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to play sound:', error);
        }
      }
    },
    [getAudioContext]
  );

  /**
   * Convenience methods for common sounds
   */
  const playBlip = useCallback(() => playSound('blip'), [playSound]);
  const playSwitch = useCallback(() => playSound('switch'), [playSound]);
  const playClick = useCallback(() => playSound('click'), [playSound]);
  const playHover = useCallback(() => playSound('hover'), [playSound]);

  return {
    playSound,
    playBlip,
    playSwitch,
    playClick,
    playHover,
  };
}
