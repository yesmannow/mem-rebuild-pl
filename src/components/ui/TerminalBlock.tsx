import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface TerminalBlockProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  command?: string;
  typewriter?: boolean;
  typewriterSpeed?: number;
}

const TerminalBlock: React.FC<TerminalBlockProps> = ({
  title,
  children,
  className,
  command,
  typewriter = false,
  typewriterSpeed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (typewriter && command) {
      setIsTyping(true);
      setDisplayedText('');
      let index = 0;
      const timer = setInterval(() => {
        if (index < command.length) {
          setDisplayedText(command.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, typewriterSpeed);
      return () => clearInterval(timer);
    }
  }, [command, typewriter, typewriterSpeed]);

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
      {command && typewriter ? (
        <div className="space-y-1 leading-relaxed font-mono" style={{ fontFamily: "'Fira Code', monospace" }}>
          <span className="text-brand-teal">$</span>{' '}
          <span>{displayedText}</span>
          {isTyping && <span className="animate-pulse">▋</span>}
        </div>
      ) : command ? (
        <div className="space-y-1 leading-relaxed font-mono" style={{ fontFamily: "'Fira Code', monospace" }}>
          <span className="text-brand-teal">$</span> {command}
        </div>
      ) : (
        <div className="space-y-1 leading-relaxed">{children}</div>
      )}
    </div>
  );
};

export default TerminalBlock;
