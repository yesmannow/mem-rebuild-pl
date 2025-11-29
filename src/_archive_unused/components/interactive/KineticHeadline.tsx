import React from 'react';
import { motion } from 'framer-motion';

interface KineticHeadlineProps {
  text: string;
  className?: string;
  delay?: number;
}

export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const words = text.split(' ');

  return (
    <h2 className={`text-4xl md:text-6xl font-display font-bold text-[var(--parchment-050)] ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.1,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
};
