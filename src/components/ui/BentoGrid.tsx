import React from 'react';
import { cn } from '../../lib/utils';

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  span?: '1' | '2' | '3' | '4';
  rowSpan?: '1' | '2' | '3';
}

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 auto-rows-fr',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard: React.FC<BentoCardProps> = ({
  className,
  children,
  span = '1',
  rowSpan = '1',
}) => {
  const spanClasses = {
    '1': 'md:col-span-1',
    '2': 'md:col-span-2',
    '3': 'md:col-span-3',
    '4': 'md:col-span-4',
  };

  const rowSpanClasses = {
    '1': 'md:row-span-1',
    '2': 'md:row-span-2',
    '3': 'md:row-span-3',
  };

  return (
    <div
      className={cn(
        'relative rounded-xl border border-brand-muted/20 bg-brand-surface/50 backdrop-blur-sm p-6 overflow-hidden',
        'hover:border-brand-teal/40 transition-all duration-300',
        spanClasses[span],
        rowSpanClasses[rowSpan],
        className
      )}
    >
      {children}
    </div>
  );
};
