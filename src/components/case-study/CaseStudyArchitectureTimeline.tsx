import React from 'react';
import { motion } from 'framer-motion';
import { Code, ArrowRight, CheckCircle } from 'lucide-react';
import { SimpleSection } from '../ui/SimpleSection';

interface ArchitectureTimelineProps {
  architecture: string[];
  accentColor?: string;
  className?: string;
}

/**
 * CaseStudyArchitectureTimeline
 * Visual timeline showing system architecture flow
 */
export const CaseStudyArchitectureTimeline: React.FC<ArchitectureTimelineProps> = ({
  architecture,
  accentColor = '#40E0D0',
  className = '',
}) => {
  return (
    <div className={`architecture-timeline ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-brand-text mb-2 flex items-center gap-2">
          <Code className="w-6 h-6 text-brand-turquoise" />
          System Architecture Flow
        </h3>
        <p className="text-brand-muted text-sm">
          Visual representation of how systems connect and data flows
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b"
          style={{
            background: `linear-gradient(to bottom, ${accentColor}40, ${accentColor}20, transparent)`,
          }}
        />

        <div className="space-y-6">
          {architecture.map((step, index) => {
            const isLast = index === architecture.length - 1;
            const parts = step.split('→').map(s => s.trim());

            return (
              <motion.div
                key={index}
                className="relative pl-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold border-4"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    borderColor: accentColor,
                    color: accentColor,
                  }}
                >
                  {index + 1}
                </div>

                {/* Step content */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-brand-turquoise/50 transition-colors">
                  {parts.length === 1 ? (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-turquoise flex-shrink-0" />
                      <span className="text-brand-text font-medium">{parts[0]}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 flex-wrap">
                      {parts.map((part, partIndex) => (
                        <React.Fragment key={partIndex}>
                          <span className="text-brand-text font-medium">{part}</span>
                          {partIndex < parts.length - 1 && (
                            <ArrowRight className="w-4 h-4 text-brand-turquoise flex-shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyArchitectureTimeline;
