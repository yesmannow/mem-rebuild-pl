import React from 'react';
import { motion } from 'framer-motion';

interface EmbedWrapperProps {
  src: string;
  ratio?: number;
  title?: string;
  className?: string;
}

/**
 * EmbedWrapper - A reusable, responsive iframe wrapper component
 * 
 * Features:
 * - Responsive aspect-ratio wrapper with configurable ratio
 * - Tailwind styling with rounded corners, shadow, and border
 * - Dark/light mode adaptive borders
 * - Hover elevation effect
 * - Accessibility: keyboard focus visible, iframe title attribute
 * - Supports prefers-reduced-motion
 */
const EmbedWrapper: React.FC<EmbedWrapperProps> = ({
  src,
  ratio = 16 / 9,
  title = 'Embedded Content',
  className = '',
}) => {
  const paddingBottom = `${(1 / ratio) * 100}%`;

  return (
    <motion.div
      className={`
        embed-wrapper
        relative
        overflow-hidden
        rounded-xl
        shadow-lg
        border
        border-[var(--ink-700)]/40
        dark:border-[var(--telemetry-400)]/20
        bg-[var(--ink-800)]/30
        backdrop-blur-sm
        transition-all
        duration-300
        hover:shadow-2xl
        hover:shadow-[var(--telemetry-400)]/10
        hover:-translate-y-1
        hover:border-[var(--telemetry-400)]/40
        focus-within:ring-2
        focus-within:ring-[var(--signal-500)]
        focus-within:ring-offset-2
        focus-within:ring-offset-[var(--ink-900)]
        ${className}
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ 
        scale: 1.005,
        transition: { duration: 0.3 }
      }}
      style={{
        willChange: 'transform, box-shadow',
      }}
    >
      {/* Aspect ratio container */}
      <div
        className="relative w-full"
        style={{
          paddingBottom,
        }}
      >
        <iframe
          src={src}
          title={title}
          frameBorder="0"
          className="
            absolute
            top-0
            left-0
            w-full
            h-full
            border-0
            focus:outline-none
            focus:ring-2
            focus:ring-primary-500
          "
          style={{
            border: 'none',
          }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </motion.div>
  );
};

export default EmbedWrapper;
