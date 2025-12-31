import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
}

/**
 * TypewriterEffect - Animated typewriter text effect with cursor
 * Perfect for hero sections and dynamic taglines
 */
export const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  words,
  className = '',
  cursorClassName = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  loop = true,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          if (loop || currentWordIndex < words.length - 1) {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration, loop]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={cn('inline-flex items-center', className)}>
      <span className="font-bold">{currentText}</span>
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0 }}
        className={cn('ml-1 inline-block w-0.5 h-[1em] bg-brand-teal', cursorClassName)}
      />
    </span>
  );
};

export default TypewriterEffect;
