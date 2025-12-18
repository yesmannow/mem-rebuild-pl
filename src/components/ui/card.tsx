/**
 * Card Component - Shadcn/ui Style Base Primitive
 * 
 * Composable card component with consistent styling
 */

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'outlined';
  animated?: boolean;
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', animated = false, hover = false, children, onClick, onMouseEnter, onMouseLeave, ...restProps }, ref) => {
    const baseStyles = 'rounded-2xl border transition-all duration-300';
    
    const variants = {
      default: 'bg-slate-950/60 border-white/10 backdrop-blur',
      glass: 'bg-slate-950/40 border-white/5 backdrop-blur-xl',
      gradient: 'bg-gradient-to-br from-slate-950/80 to-slate-900/80 border-white/10 backdrop-blur',
      outlined: 'bg-transparent border-white/20',
    };

    const hoverStyles = hover
      ? 'hover:border-brand-turquoise/50 hover:shadow-brand-shadow-accent hover:-translate-y-1'
      : '';

    const classNames = cn(baseStyles, variants[variant], hoverStyles, className);

    if (animated) {
      return (
        <motion.div
          ref={ref}
          className={classNames}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClick as any}
          onMouseEnter={onMouseEnter as any}
          onMouseLeave={onMouseLeave as any}
          {...(restProps as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={classNames}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...restProps}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight text-brand-text', className)}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-brand-muted', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
