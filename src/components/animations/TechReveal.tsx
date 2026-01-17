import React, { useState, useEffect, useRef } from 'react';

/**
 * TechReveal - Hacker/Decoding text effect
 *
 * Creates a 'decoding' animation where random characters cycle through
 * before settling on the correct letter. Perfect for app titles and technical content.
 *
 * Features:
 * - 500ms decode animation
 * - Random character pool (A-Z, 0-9, #, @)
 * - Smooth transition to final text
 * - Trigger on mount or hover
 */
interface TechRevealProps {
  text: string;
  triggerOnMount?: boolean;
  triggerOnHover?: boolean;
  className?: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@';

export const TechReveal: React.FC<TechRevealProps> = ({
  text,
  triggerOnMount = true,
  triggerOnHover = false,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isRevealing, setIsRevealing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriggeredRef = useRef(false);

  const startReveal = () => {
    if (hasTriggeredRef.current && !triggerOnHover) return;

    setIsRevealing(true);

    let iterations = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            if (char === ' ') {
              return ' ';
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iterations += 1 / 3; // Smooth progression

      if (iterations >= text.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setDisplayText(text);
        setIsRevealing(false);
        if (!triggerOnHover) {
          hasTriggeredRef.current = true;
        }
      }
    }, 25); // 25ms intervals for smooth animation (~500ms total)
  };

  useEffect(() => {
    if (triggerOnMount) {
      startReveal();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text, triggerOnMount]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      // Reset for hover triggers to allow multiple reveals
      hasTriggeredRef.current = false;
      startReveal();
    }
  };

  return (
    <span
      className={`font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '0.025em',
      }}
    >
      {displayText}
    </span>
  );
};

export default TechReveal;
