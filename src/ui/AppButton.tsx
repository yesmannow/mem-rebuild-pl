/**
 * AppButton Component
 * 
 * Brand-specific button with gradients, borders, and Framer Motion
 * Built on top of shadcn/ui primitives with Bear Cave Marketing styling
 */

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface AppButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: 'bg-brand-turquoise text-white hover:bg-brand-turquoise-dark shadow-brand-shadow-accent',
  secondary: 'bg-brand-creamsicle text-white hover:bg-brand-creamsicle-dark shadow-brand-shadow-warm',
  outline: 'border-2 border-brand-turquoise text-brand-turquoise hover:bg-brand-turquoise hover:text-white',
  ghost: 'text-brand-turquoise hover:bg-brand-turquoise/10',
  gradient: 'bg-gradient-to-r from-brand-turquoise to-brand-creamsicle text-white shadow-brand-shadow-accent',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
  xl: 'px-10 py-5 text-xl rounded-2xl',
};

/**
 * AppButton - Brand-styled button with motion
 * 
 * @example
 * <AppButton variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
 *   Get Started
 * </AppButton>
 */
export function AppButton({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  fullWidth = false,
  className,
  children,
  ...props
}: AppButtonProps) {
  return (
    <motion.button
      className={cn(
        'font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        isLoading && 'opacity-70 cursor-not-allowed',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={isLoading}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : size === 'xl' ? 24 : 20} />}
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        <>{children}</>
      )}
      {Icon && iconPosition === 'right' && !isLoading && <Icon size={size === 'sm' ? 16 : size === 'xl' ? 24 : 20} />}
    </motion.button>
  );
}

export default AppButton;
