import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TechTooltip.css';

interface TechTooltipProps {
  tech: string;
  description: string;
  usage: string;
  show: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const TechTooltip: React.FC<TechTooltipProps> = ({
  tech,
  description,
  usage,
  show,
  position = 'top',
}) => {
  if (!show) return null;

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent',
    bottom:
      'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent',
    right:
      'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 }}
          transition={{ duration: 0.2 }}
          className={`tech-tooltip ${position}`}
        >
          <div className="tech-tooltip-content">
            {/* Header with icon */}
            <div className="tech-tooltip-header">
              <h4 className="tech-tooltip-title">{tech}</h4>
            </div>

            {/* Description */}
            <p className="tech-tooltip-description">{description}</p>

            {/* Usage */}
            <div className="tech-tooltip-usage">
              <p className="tech-tooltip-usage-text">
                <span className="tech-tooltip-usage-label">How I use it:</span>
                <span className="tech-tooltip-usage-content"> {usage}</span>
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="tech-tooltip-arrow" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TechTooltip;
