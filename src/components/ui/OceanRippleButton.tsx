'use client';

import * as React from 'react';
import { motion, type Transition } from 'framer-motion';
import { cn } from '../../lib/utils';

type Ripple = {
  id: number;
  x: number;
  y: number;
};

type OceanRippleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  rippleClassName?: string;
  scale?: number;
  transition?: Transition;
  asLink?: boolean;
  href?: string;
};

export function OceanRippleButton({
  children,
  onClick,
  className,
  rippleClassName,
  variant = 'primary',
  size = 'md',
  scale = 10,
  transition = { duration: 0.6, ease: 'easeOut' },
  asLink = false,
  href,
  ...props
}: OceanRippleButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const buttonRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    [],
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      createRipple(event);
      if (onClick) {
        onClick(event as any);
      }
    },
    [createRipple, onClick],
  );

  const variantClasses = {
    primary: 'bg-brand-teal text-slate-900 hover:bg-brand-teal/90 shadow-cta',
    secondary: 'bg-brand-orange text-white hover:bg-brand-orange/90',
    outline: 'border-2 border-brand-teal/60 text-brand-text hover:border-brand-teal hover:bg-brand-teal/10',
  };

  const sizeClasses = {
    sm: 'text-sm px-4 py-2 rounded-lg',
    md: 'text-base px-6 py-3 rounded-full',
    lg: 'text-lg px-8 py-4 rounded-full',
  };

  const rippleColorClasses = {
    primary: 'bg-slate-900/20',
    secondary: 'bg-white/30',
    outline: 'bg-brand-teal/30',
  };

  const baseClasses = cn(
    'relative overflow-hidden cursor-pointer inline-flex items-center justify-center gap-2 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale, opacity: 0 }}
          transition={transition}
          className={cn(
            'absolute rounded-full size-5 pointer-events-none',
            rippleColorClasses[variant],
            rippleClassName,
          )}
          style={{
            top: ripple.y - 10,
            left: ripple.x - 10,
          }}
        />
      ))}
    </>
  );

  if (asLink && href) {
    return (
      <motion.a
        ref={buttonRef as any}
        href={href}
        onClick={handleClick as any}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className={baseClasses}
        {...(props as any)}
      >
        {buttonContent}
      </motion.a>
    );
  }

  // Filter out HTML event handlers that conflict with Framer Motion
  const { 
    onAnimationStart, 
    onAnimationEnd, 
    onAnimationIteration,
    onDragStart,
    onDrag,
    onDragEnd,
    ...restProps 
  } = props;

  return (
    <motion.button
      ref={buttonRef as any}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className={baseClasses}
      {...restProps}
    >
      {buttonContent}
    </motion.button>
  );
}

