import React from 'react';
import { motion } from 'framer-motion';

export interface CapabilitiesBadgesProps {
  capabilities: string[];
  visualIdentity?: {
    primaryColor?: string;
  };
}

const CapabilitiesBadges: React.FC<CapabilitiesBadgesProps> = ({
  capabilities,
  visualIdentity,
}) => {
  return (
    <motion.section
      className="py-16 md:py-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black mb-8 text-gray-900 dark:text-white">
          Capabilities Demonstrated
        </h2>
        <div className="flex flex-wrap gap-3">
          {capabilities.map((capability, idx) => (
            <motion.span
              key={idx}
              className="px-4 py-2 rounded-lg text-sm font-medium border"
              style={{
                backgroundColor: visualIdentity?.primaryColor
                  ? `${visualIdentity.primaryColor}15`
                  : undefined,
                borderColor: visualIdentity?.primaryColor
                  ? visualIdentity.primaryColor
                  : undefined,
                color: visualIdentity?.primaryColor || undefined,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {capability}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CapabilitiesBadges;

