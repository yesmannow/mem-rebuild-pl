import React from 'react';
import { cn } from '../../lib/utils';

interface TerminalBlockProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const TerminalBlock: React.FC<TerminalBlockProps> = ({ title, children, className }) => {
  return (
    <div
      className={cn(
        'relative rounded-xl border border-brand-teal/30 bg-slate-900/90 backdrop-blur-xl shadow-soft-dark p-4 font-mono text-sm text-brand-text',
        className
      )}
    >
      {title && (
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-brand-muted">
          <span>{title}</span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
            ONLINE
          </span>
        </div>
      )}
      <div className="space-y-1 leading-relaxed">{children}</div>
    </div>
  );
};

export default TerminalBlock;
