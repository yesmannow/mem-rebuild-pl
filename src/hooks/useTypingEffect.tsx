/**
 * useTypingEffect Hook
 * Creates a typing animation effect for text
 * Cycles through multiple strings with typing/deleting animation
 */

import { useState, useEffect } from 'react';

export interface UseTypingEffectOptions {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenStrings?: number;
  loop?: boolean;
  startDelay?: number;
}

export const useTypingEffect = ({
  strings,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenStrings = 2000,
  loop = true,
  startDelay = 0,
}: UseTypingEffectOptions) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    // Initial delay before starting
    const initialTimeout = setTimeout(() => {
      setIsWaiting(false);
    }, startDelay);

    return () => clearTimeout(initialTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (isWaiting || strings.length === 0) return;

    const currentString = strings[currentStringIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing forward
          if (currentText.length < currentString.length) {
            setCurrentText(currentString.substring(0, currentText.length + 1));
          } else {
            // Finished typing, wait before deleting
            setTimeout(() => {
              setIsDeleting(true);
            }, delayBetweenStrings);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.substring(0, currentText.length - 1));
          } else {
            // Finished deleting, move to next string
            setIsDeleting(false);
            const nextIndex = currentStringIndex + 1;
            
            if (nextIndex >= strings.length) {
              if (loop) {
                setCurrentStringIndex(0);
              } else {
                // Stop at the last string
                setCurrentText(strings[strings.length - 1]);
                return;
              }
            } else {
              setCurrentStringIndex(nextIndex);
            }
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    currentStringIndex,
    strings,
    typeSpeed,
    deleteSpeed,
    delayBetweenStrings,
    loop,
    isWaiting,
  ]);

  return {
    text: currentText,
    isDeleting,
    currentIndex: currentStringIndex,
  };
};

export default useTypingEffect;
