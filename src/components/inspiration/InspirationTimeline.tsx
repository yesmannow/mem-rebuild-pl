import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import timelineData from '../../data/inspirationTimeline.json';

interface TimelineItem {
  year: string;
  title: string;
  highlight: string;
  details: string;
  icon: string;
}

interface InspirationTimelineProps {
  className?: string;
}

const InspirationTimeline: React.FC<InspirationTimelineProps> = ({ className = '' }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Cast the imported data to the correct type
  const timelineItems: TimelineItem[] = timelineData as unknown as TimelineItem[];

  // Scroll progress for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const toggleExpanded = (year: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section className={`py-16 bg-slate-50 dark:bg-slate-900 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Journey of Inspiration
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The experiences that shaped my creative philosophy and led to the founding of Bear Cave
            Marketing
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700">
            <motion.div className="w-full bg-amber-500 origin-top" style={{ height: lineHeight }} />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const isExpanded = expandedItems.has(item.year);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-start ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Timeline Node */}
                  <div className="flex-shrink-0 w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-2xl shadow-lg z-10">
                    {item.icon}
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 ${isEven ? 'ml-8' : 'mr-8'}`}>
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                      onClick={() => toggleExpanded(item.year)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {item.year}
                          </span>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </motion.div>
                      </div>

                      {/* Highlight */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 font-medium">
                        {item.highlight}
                      </p>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {item.details}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expand Hint */}
                      {!isExpanded && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-4">
                          <span>Click to expand</span>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-16" />
      </div>
    </section>
  );
};

export default InspirationTimeline;
