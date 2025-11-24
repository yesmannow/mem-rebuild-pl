/**
 * MagneticButton Component
 * Button with magnetic hover effect that follows cursor
 * Uses Ocean Pearl color system
 */

import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  magneticStrength?: number;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  magneticStrength = 0.3,
  disabled = false,
  type = 'button',
  target,
  rel,
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!buttonRef.current || disabled) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * magneticStrength;
      const deltaY = (e.clientY - centerY) * magneticStrength;

      setPosition({ x: deltaX, y: deltaY });
    },
    [magneticStrength, disabled]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const variantClasses = {
    primary: 'bg-[#006d77] text-white hover:bg-[#005a63] border-[#006d77] shadow-accent',
    secondary: 'bg-[#e29578] text-white hover:bg-[#d17f62] border-[#e29578] shadow-cta',
    outline: 'bg-transparent text-[#006d77] hover:bg-[#006d77]/10 border-[#006d77]',
  };

  const sizeClasses = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-lg border-2
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[#83c5be] focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;

  const buttonContent = (
    <motion.span
      className="relative z-10 flex items-center gap-2"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.span>
  );

  const sharedProps = {
    ref: buttonRef as any,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: baseClasses.trim(),
  };

  if (href && !disabled) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...sharedProps}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {buttonContent}
    </motion.button>
  );
};

export default MagneticButton;
