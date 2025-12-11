/**
 * Badge Component - Shadcn/ui Style Base Primitive
 * 
 * Versatile badge/tag component for labels, categories, and status indicators
 */

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-brand-turquoise/10 text-brand-turquoise border-brand-turquoise/20 hover:bg-brand-turquoise/20',
        secondary: 'border-transparent bg-brand-creamsicle/10 text-brand-creamsicle border-brand-creamsicle/20 hover:bg-brand-creamsicle/20',
        destructive: 'border-transparent bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20',
        outline: 'text-brand-text border-white/20 hover:border-white/40',
        success: 'border-transparent bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20',
        warning: 'border-transparent bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20',
        info: 'border-transparent bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
        glass: 'border-white/10 bg-slate-950/40 text-brand-text backdrop-blur-sm hover:bg-slate-950/60',
      },
      size: {
        sm: 'px-2 py-0.5 text-[10px]',
        default: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

function Badge({ className, variant, size, icon, removable, onRemove, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1 inline-flex">{icon}</span>}
      {children}
      {removable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 inline-flex items-center justify-center rounded-full p-0.5 hover:bg-current/10 transition-colors"
          aria-label="Remove"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export { Badge, badgeVariants };
