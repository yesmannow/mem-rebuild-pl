import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import './FeaturesSection.css';

interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  variant?: 'default' | 'grid' | 'cards' | 'minimal';
  columns?: 2 | 3 | 4;
  className?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title,
  subtitle,
  features,
  variant = 'default',
  columns = 3,
  className = '',
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      className={`features-section features-section--${variant} features-section--cols-${columns} ${className}`}
    >
      <div className="features-section__container">
        {(title || subtitle) && (
          <motion.div
            className="features-section__header"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <div className="features-section__subtitle">{subtitle}</div>
            )}
            {title && (
              <h2 className="features-section__title">{title}</h2>
            )}
          </motion.div>
        )}

        <motion.div
          className="features-section__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="features-section__item"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {feature.icon && (
                <div className="features-section__icon">{feature.icon}</div>
              )}
              <h3 className="features-section__item-title">{feature.title}</h3>
              <p className="features-section__item-description">
                {feature.description}
              </p>
              {feature.link && (
                <a href={feature.link} className="features-section__link">
                  Learn more →
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

