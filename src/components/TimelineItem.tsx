import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Milestone {
  role: string;
  company: string;
  dates: string;
  highlight: string;
  details: string;
}

interface TimelineItemProps {
  milestone: Milestone;
  index: number;
  isLeft?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ milestone, index, isLeft = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`mb-10 relative ${isLeft ? 'md:pr-8 md:text-right md:ml-0' : 'md:pl-8 md:ml-6'}`}
    >
      {/* Timeline dot */}
      <span className="absolute -left-3 md:left-1/2 md:transform md:-translate-x-1/2 flex items-center justify-center w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow-lg z-10"></span>

      {/* Content card */}
      <div
        className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">{milestone.role}</h3>
            <p className="text-amber-600 font-medium mb-2">{milestone.company}</p>
            <time className="text-sm text-gray-500">{milestone.dates}</time>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{milestone.highlight}</p>

        <button
          onClick={toggleExpanded}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors focus:ring-2 focus:ring-amber-500 focus:outline-none"
          aria-expanded={isExpanded ? "true" : "false"}
          aria-label={`${isExpanded ? 'Hide' : 'Show'} details for ${milestone.role} at ${milestone.company}`}
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
          <svg
            className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <p className="text-gray-600 leading-relaxed">{milestone.details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
