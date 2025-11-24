/**
 * AvailabilityBadge Component
 * Displays "Available for Hire" status with animated indicator
 * Uses Ocean Pearl color system
 */

import React from 'react';
import { motion } from 'framer-motion';

export interface AvailabilityBadgeProps {
  available?: boolean;
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const AvailabilityBadge: React.FC<AvailabilityBadgeProps> = ({
  available = true,
  text,
  className = '',
  size = 'md',
  showPulse = true,
}) => {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  const statusText = text || (available ? 'Available for Hire' : 'Not Available');
  const statusColor = available ? '#83c5be' : '#94a3b8';
  const bgColor = available ? 'bg-[#83c5be]/10' : 'bg-gray-500/10';
  const borderColor = available ? 'border-[#83c5be]/30' : 'border-gray-500/30';

  return (
    <motion.div
      className={`inline-flex items-center gap-2 rounded-full border ${bgColor} ${borderColor} ${sizeClasses[size]} font-medium ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Animated status indicator */}
      <div className="relative flex items-center justify-center">
        {/* Pulsing ring */}
        {showPulse && available && (
          <motion.span
            className={`absolute ${dotSizes[size]} rounded-full`}
            style={{ backgroundColor: statusColor }}
            animate={{
              scale: [1, 1.8, 1.8],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
        
        {/* Static dot */}
        <span
          className={`relative ${dotSizes[size]} rounded-full`}
          style={{ backgroundColor: statusColor }}
        />
      </div>

      {/* Status text */}
      <span style={{ color: statusColor }}>{statusText}</span>
    </motion.div>
  );
};

export default AvailabilityBadge;
