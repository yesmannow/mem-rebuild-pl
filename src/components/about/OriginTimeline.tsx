import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../shared/MotionVariants';

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface OriginTimelineProps {
  entries: TimelineEntry[];
}

const OriginTimeline: React.FC<OriginTimelineProps> = ({ entries }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-accent via-gray-300 to-transparent dark:from-brand-accent dark:via-gray-600 dark:to-transparent transform md:-translate-x-1/2" />

        {/* Timeline Items */}
        <div className="space-y-12">
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col md:flex-row md:items-center gap-4"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-brand-accent rounded-full border-4 border-white dark:border-gray-900 transform md:-translate-x-1/2 z-10" />

              {/* Content */}
              <div
                className={`flex-1 ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left md:ml-auto'
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                  <div className="text-sm font-semibold text-brand-accent mb-1">{entry.year}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {entry.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{entry.description}</p>
                  {entry.icon && <div className="mt-4">{entry.icon}</div>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OriginTimeline;

