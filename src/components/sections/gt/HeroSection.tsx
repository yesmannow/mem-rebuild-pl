import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';

interface HeroSectionProps {
  headline: string;
  supportingText?: string;
  ctaText?: string;
  ctaLink?: string;
  onCtaClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  supportingText,
  ctaText = 'Get Started',
  ctaLink,
  onCtaClick,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <SectionWrapper bgVariant="transparent" className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            variants={itemVariants}
          >
            {headline}
          </motion.h1>

          {supportingText && (
            <motion.p
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {supportingText}
            </motion.p>
          )}

          {(ctaLink || onCtaClick) && (
            <motion.div variants={itemVariants}>
              {ctaLink ? (
                <motion.a
                  href={ctaLink}
                  className="inline-block px-8 py-4 bg-creamsicle text-white rounded-lg font-semibold text-lg hover:bg-creamsicle-dark transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {ctaText}
                </motion.a>
              ) : (
                <motion.button
                  onClick={onCtaClick}
                  className="px-8 py-4 bg-creamsicle text-white rounded-lg font-semibold text-lg hover:bg-creamsicle-dark transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {ctaText}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;

