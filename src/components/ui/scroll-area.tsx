import React, { useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: 'vertical' | 'horizontal' | 'both';
  className?: string;
}

export function ScrollArea({
  children,
  orientation = 'vertical',
  className,
  ...props
}: ScrollAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Custom scrollbar styling
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      // Add scroll state for styling if needed
      const { scrollTop, scrollLeft, scrollWidth, clientWidth, scrollHeight, clientHeight } = scrollElement;

      // You can add scroll-based styling here
      if (scrollTop > 0 || scrollLeft > 0) {
        scrollElement.classList.add('scrolled');
      } else {
        scrollElement.classList.remove('scrolled');
      }
    };

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, []);

  const orientationClasses = {
    vertical: 'overflow-y-auto overflow-x-hidden',
    horizontal: 'overflow-x-auto overflow-y-hidden',
    both: 'overflow-auto',
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        'relative',
        orientationClasses[orientation],
        // Custom scrollbar styles
        '[&::-webkit-scrollbar]:w-2',
        '[&::-webkit-scrollbar-track]:bg-transparent',
        '[&::-webkit-scrollbar-track:hover]:bg-cave-bg/50',
        '[&::-webkit-scrollbar-thumb]:bg-cave-border/60',
        '[&::-webkit-scrollbar-thumb:hover]:bg-turquoise/60',
        '[&::-webkit-scrollbar-thumb]:rounded-full',
        '[&::-webkit-scrollbar-corner]:bg-transparent',
        // Firefox scrollbar
        'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cave-border/60 hover:scrollbar-thumb-turquoise/60',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}