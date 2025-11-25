import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  text,
  className,
  delay = 0,
}) => {
  const words = text.split(' ');

  return (
    <motion.span
      className={cn('inline-block', className)}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: index * 0.1,
              },
            },
          }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal via-brand-orange to-brand-teal bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]">
            {word}
          </span>
        </motion.span>
      ))}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </motion.span>
  );
};

export default AnimatedGradientText;

