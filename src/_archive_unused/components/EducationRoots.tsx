import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

interface EducationRootsProps {
  className?: string;
}

const EducationRoots: React.FC<EducationRootsProps> = ({ className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn('relative overflow-hidden rounded-xl', className)}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/education/samplegatesheader-desktop.jpg"
          alt="Indiana University Sample Gates"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/90 to-brand-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-brand-teal" />
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
              Education & Roots
            </h2>
          </div>

          {/* Main content card */}
          <div className="bg-brand-surface/60 backdrop-blur-sm border border-brand-muted/20 rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* IU Logo */}
              <div className="flex-shrink-0">
                <img
                  src="/images/education/iu-logo.svg"
                  alt="Indiana University Logo"
                  className="w-24 h-24 md:w-32 md:h-32 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Text content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-brand-text mb-3">
                  Indiana University Bloomington
                </h3>
                <p className="text-lg text-brand-muted mb-4">
                  B.S. in Marketing & Communications
                </p>
                <p className="text-brand-text/80 leading-relaxed">
                  Hoosier native building global systems. My foundation in strategic communication
                  and data-driven marketing started here, where I learned to bridge creative vision
                  with measurable results—a philosophy that guides every project I build today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationRoots;

