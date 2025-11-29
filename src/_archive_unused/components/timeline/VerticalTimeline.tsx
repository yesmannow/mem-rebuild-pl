import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface TimelineItem {
  id: string;
  title: string;
  period: string;
  headline: string;
  problem: string;
  strategy: string[];
  result: string[];
}

interface VerticalTimelineProps {
  items: TimelineItem[];
  className?: string;
}

const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ items, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <div ref={containerRef} className={cn('relative py-12', className)}>
      {/* Vertical line */}
      <div className="absolute left-8 md:left-12 top-0 bottom-0 w-0.5 bg-brand-teal/30" />

      {/* Active progress line */}
      {isInView && (
        <motion.div
          className="absolute left-8 md:left-12 top-0 w-0.5 bg-gradient-to-b from-brand-teal to-brand-orange"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      )}

      <div className="space-y-12 md:space-y-16">
        {items.map((item, index) => {
          const itemRef = useRef<HTMLDivElement>(null);
          const itemInView = useInView(itemRef, { once: true, margin: '-50px' });

          return (
            <div
              key={item.id}
              ref={itemRef}
              className="relative pl-20 md:pl-28"
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-10 top-2">
                <motion.div
                  className="relative z-10 w-4 h-4 rounded-full bg-brand-teal border-4 border-brand-dark"
                  initial={{ scale: 0 }}
                  animate={itemInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Pulsing ring */}
                  {itemInView && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-brand-teal"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={itemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="space-y-4"
              >
                <div>
                  <span className="text-xs font-mono text-brand-teal uppercase tracking-wide">
                    {item.period}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-text mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-lg text-brand-muted">{item.headline}</p>
                </div>

                <div className="space-y-4 pt-4">
                  <div>
                    <h4 className="text-sm font-semibold text-brand-teal mb-2">The Challenge</h4>
                    <p className="text-brand-muted">{item.problem}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-brand-teal mb-2">The Strategy</h4>
                    <ul className="space-y-2 text-brand-muted">
                      {item.strategy.map((strategy, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-brand-teal mt-1">•</span>
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-brand-teal mb-2">The Result</h4>
                    <ul className="space-y-2 text-brand-muted">
                      {item.result.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-brand-teal mt-1">•</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalTimeline;

