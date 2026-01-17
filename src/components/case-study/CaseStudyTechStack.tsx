import React from 'react';
import { motion } from 'framer-motion';
import { Package, ExternalLink } from 'lucide-react';

interface TechStackProps {
  technologies: string[];
  accentColor?: string;
  className?: string;
}

/**
 * CaseStudyTechStack
 * Visual display of technologies used in the case study
 */
export const CaseStudyTechStack: React.FC<TechStackProps> = ({
  technologies,
  accentColor = '#40E0D0',
  className = '',
}) => {
  return (
    <div className={`tech-stack-display ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-brand-text mb-2 flex items-center gap-2">
          <Package className="w-6 h-6 text-brand-turquoise" />
          Technology Stack
        </h3>
        <p className="text-brand-muted text-sm">
          Tools and technologies powering this solution
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="relative group"
          >
            <div
              className="px-4 py-2 rounded-lg border font-mono text-sm font-medium transition-all cursor-pointer"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}30`,
                color: accentColor,
              }}
            >
              {tech}
            </div>
            {/* Hover glow effect */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 20px ${accentColor}40`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudyTechStack;
