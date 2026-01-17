import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  as?: 'button' | 'a' | 'div';
  href?: string;
  [key: string]: any; // Allow additional props for flexibility
}

/**
 * MagneticButton - Simple wrapper with magnetic pull effect
 * Tracks mouse position and moves element slightly towards cursor
 * Creates a subtle 'magnetic' interaction on hover
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  className = '',
  as = 'button',
  href,
  ...props
}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center and apply magnetic pull (0.2 multiplier)
      const deltaX = (e.clientX - centerX) * 0.2;
      const deltaY = (e.clientY - centerY) * 0.2;

      setPosition({ x: deltaX, y: deltaY });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const motionProps = {
    ref: elementRef as any,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
    ...props,
  };

  const content = (
    <motion.div
      className="inline-block"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.div>
  );

  if (as === 'a' && href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ display: 'inline-block', ...props.style }}
      >
        {content}
      </motion.a>
    );
  }

  if (as === 'div') {
    return (
      <motion.div
        {...motionProps}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ display: 'inline-block', ...props.style }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ display: 'inline-block', ...props.style }}
    >
      {content}
    </motion.button>
  );
};

export default MagneticButton;
