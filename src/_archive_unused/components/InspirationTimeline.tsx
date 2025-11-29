import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import timelineData from '../data/inspirationTimeline.json';

interface TimelineItem {
  year: string;
  title: string;
  highlight: string;
  details: string;
  icon: string;
}

const InspirationTimeline: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

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
    <div ref={containerRef} className="relative max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Systems Lineage Timeline</h2>

      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300">
          <motion.div className="w-full bg-amber-600" style={{ height: progressHeight }} />
        </div>

        <div className="space-y-8">
          {timelineData.map((item: TimelineItem, index: number) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-2xl mr-6 relative z-10">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-grow bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <span className="text-amber-600 font-bold">{item.year}</span>
                </div>
                <p className="text-gray-700 mb-4">{item.highlight}</p>

                <AnimatePresence>
                  {expandedItems.has(item.year) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-600 mt-4">{item.details}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => toggleExpanded(item.year)}
                  className="mt-4 text-amber-600 hover:text-amber-800 font-medium"
                  aria-expanded={expandedItems.has(item.year) ? "true" : "false"}
                >
                  {expandedItems.has(item.year) ? 'Show Less' : 'Learn More'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspirationTimeline;
