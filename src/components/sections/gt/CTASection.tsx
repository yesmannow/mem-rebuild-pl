import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../../SectionWrapper';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCTA: {
    text: string;
    link?: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    text: string;
    link?: string;
    onClick?: () => void;
  };
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
}) => {
  return (
    <SectionWrapper bgVariant="turquoise" className="text-white">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          {description && (
            <p className="text-xl mb-8 opacity-90">{description}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA.link ? (
              <motion.a
                href={primaryCTA.link}
                className="px-8 py-4 bg-creamsicle text-white rounded-lg font-semibold text-lg hover:bg-creamsicle-dark transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {primaryCTA.text}
              </motion.a>
            ) : (
              <motion.button
                onClick={primaryCTA.onClick}
                className="px-8 py-4 bg-creamsicle text-white rounded-lg font-semibold text-lg hover:bg-creamsicle-dark transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {primaryCTA.text}
              </motion.button>
            )}
            {secondaryCTA && (
              <>
                {secondaryCTA.link ? (
                  <motion.a
                    href={secondaryCTA.link}
                    className="px-8 py-4 bg-white text-turquoise rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {secondaryCTA.text}
                  </motion.a>
                ) : (
                  <motion.button
                    onClick={secondaryCTA.onClick}
                    className="px-8 py-4 bg-white text-turquoise rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {secondaryCTA.text}
                  </motion.button>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default CTASection;

