import React from 'react';
import { motion, useInView } from 'framer-motion';
import './CTASection.css';

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
  variant?: 'default' | 'gradient' | 'minimal' | 'split';
  className?: string;
  children?: React.ReactNode;
}

const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'default',
  className = '',
  children,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        // TODO: Convert cubic-bezier array to proper easing type - using string format for compatibility
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)' as any,
      },
    },
  };

  return (
    <section
      ref={ref}
      className={`cta-section cta-section--${variant} ${className}`}
    >
      <div className="cta-section__container">
        <motion.div
          className="cta-section__content"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="cta-section__title">{title}</h2>

          {description && (
            <p className="cta-section__description">{description}</p>
          )}

          <div className="cta-section__actions">
            {primaryCTA.link ? (
              <a
                href={primaryCTA.link}
                className="cta-section__button cta-section__button--primary"
              >
                {primaryCTA.text}
              </a>
            ) : (
              <button
                onClick={primaryCTA.onClick}
                className="cta-section__button cta-section__button--primary"
              >
                {primaryCTA.text}
              </button>
            )}

            {secondaryCTA && (
              <>
                {secondaryCTA.link ? (
                  <a
                    href={secondaryCTA.link}
                    className="cta-section__button cta-section__button--secondary"
                  >
                    {secondaryCTA.text}
                  </a>
                ) : (
                  <button
                    onClick={secondaryCTA.onClick}
                    className="cta-section__button cta-section__button--secondary"
                  >
                    {secondaryCTA.text}
                  </button>
                )}
              </>
            )}
          </div>

          {children && (
            <div className="cta-section__children">{children}</div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

