import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface CaseStudyCTAProps {
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  visualIdentity?: {
    accentColor?: string;
  };
}

const CaseStudyCTA: React.FC<CaseStudyCTAProps> = ({
  title = 'Want to transform your practitioner ecosystem?',
  description,
  primaryAction = {
    label: 'Start a Project',
    href: '/contact',
  },
  secondaryAction,
  visualIdentity,
}) => {
  return (
    <motion.section
      className="py-20 md:py-32 bg-gray-900 dark:bg-gray-950 text-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-6">{title}</h2>
        {description && (
          <p className="text-xl text-gray-300 mb-10">{description}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={primaryAction.href}
            className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: visualIdentity?.accentColor || '#FF9E58',
              color: '#fff',
            }}
          >
            {primaryAction.label}
          </Link>
          {secondaryAction && (
            <Link
              to={secondaryAction.href}
              className="px-8 py-4 rounded-lg font-bold text-lg border-2 border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default CaseStudyCTA;

