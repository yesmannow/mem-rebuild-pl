/**
 * VirtualizedVolunteerFeed - Virtual scroller for volunteer list
 * Renders only visible items + buffer for performance
 */

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { VolunteerItem } from '../../types';

interface VirtualizedVolunteerFeedProps {
  items: VolunteerItem[];
  containerHeight?: number;
  itemHeight?: number;
  buffer?: number;
}

export const VirtualizedVolunteerFeed: React.FC<VirtualizedVolunteerFeedProps> = ({
  items,
  containerHeight = typeof window !== 'undefined' && window.innerWidth < 1024 ? 300 : 384, // Responsive height
  itemHeight = 100,
  buffer = 2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate visible range
  const { startIndex, endIndex, totalHeight } = useMemo(() => {
    const visibleStart = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const visibleEnd = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + buffer
    );

    return {
      startIndex: visibleStart,
      endIndex: visibleEnd,
      totalHeight: items.length * itemHeight,
    };
  }, [scrollTop, items.length, itemHeight, containerHeight, buffer]);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="overflow-y-auto scrollbar-thin scrollbar-thumb-brand-teal/30 scrollbar-track-transparent"
        style={{
          height: `${containerHeight}px`,
        }}
      >
        {/* Spacer for items before visible range */}
        <div style={{ height: `${startIndex * itemHeight}px` }} />

        {/* Visible items */}
        <div className="space-y-4">
          {visibleItems.map((vol, idx) => {
            const actualIndex = startIndex + idx;
            return (
              <motion.div
                key={actualIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-slate-900/40 backdrop-blur border border-white/10 rounded-xl p-4 hover:border-brand-teal/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-teal/20 border border-brand-teal/30 flex-shrink-0">
                    <Heart size={16} className="text-brand-teal" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-brand-text font-semibold text-sm mb-1">{vol.role}</p>
                    <p className="text-brand-teal text-xs mb-1">{vol.organization}</p>
                    <p className="text-brand-muted text-xs mb-1">{vol.period}</p>
                    {vol.description && (
                      <p className="text-brand-muted/70 text-xs mt-2">{vol.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Spacer for items after visible range */}
        <div style={{ height: `${(items.length - endIndex - 1) * itemHeight}px` }} />
      </div>
    </div>
  );
};
