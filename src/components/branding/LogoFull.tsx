import React from 'react';
import { motion, Variants } from 'framer-motion';
import Logo from './Logo';
import './LogoFull.css';

interface LogoFullProps {
  className?: string;
  animated?: boolean;
  showTagline?: boolean;
}

const LogoFull: React.FC<LogoFullProps> = ({
  className = '',
  animated = false,
  showTagline = false,
}) => {
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };

  const taglineVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.7,
        duration: 0.5,
      },
    },
  };

  const TextComponent = animated ? motion.div : 'div';

  return (
    <div className={`logo-full ${className}`}>
      <Logo animated={animated} size={48} />
      <div className="logo-text">
        <TextComponent
          className="logo-name"
          initial={animated ? 'hidden' : undefined}
          animate={animated ? 'visible' : undefined}
          variants={animated ? textVariants : undefined}
        >
          Jacob Darling
        </TextComponent>
        {showTagline && (
          <TextComponent
            className="logo-tagline"
            initial={animated ? 'hidden' : undefined}
            animate={animated ? 'visible' : undefined}
            variants={animated ? taglineVariants : undefined}
          >
            Marketing Strategist & Systems Architect
          </TextComponent>
        )}
      </div>
    </div>
  );
};

export default LogoFull;
