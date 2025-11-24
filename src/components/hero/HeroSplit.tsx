import React from 'react';
import { motion } from 'framer-motion';

interface HeroSplitProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  imageUrl?: string;
  videoUrl?: string;
  reverse?: boolean;
  className?: string;
}

/**
 * HeroSplit - Asymmetric split-screen hero with large typography
 * 
 * Features:
 * - Bold, oversized typography
 * - Split layout (60/40 or 40/60)
 * - Optional video or image background
 * - Staggered animation entrance
 * - Avoids centered, cookie-cutter design
 */
const HeroSplit: React.FC<HeroSplitProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  imageUrl,
  videoUrl,
  reverse = false,
  className = '',
}) => {
  const contentSide = reverse ? 'lg:col-start-2' : 'lg:col-start-1';
  const mediaSide = reverse ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2';

  return (
    <section className={`hero-split relative min-h-[85vh] overflow-hidden ${className}`}>
      <div className="container mx-auto px-6 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 h-full items-center py-16 lg:py-0">
          {/* Content Side - 60% */}
          <motion.div
            className={`${contentSide} space-y-6 lg:space-y-8 z-10`}
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle && (
              <motion.p
                className="text-sm md:text-base font-semibold uppercase tracking-wider text-[var(--signal-500)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {subtitle}
              </motion.p>
            )}

            <motion.h1
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {title.split(' ').map((word, index) => (
                <span key={index} className="inline-block">
                  {word}
                  {index < title.split(' ').length - 1 && ' '}
                </span>
              ))}
            </motion.h1>

            {description && (
              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-[var(--parchment-050)]/80 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {description}
              </motion.p>
            )}

            {ctaText && ctaHref && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <a
                  href={ctaHref}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold text-lg rounded-lg hover:bg-[var(--signal-500)]/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {ctaText}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            )}
          </motion.div>

          {/* Media Side - 40% */}
          <motion.div
            className={`${mediaSide} relative h-[50vh] lg:h-full`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              {videoUrl ? (
                <video
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--telemetry-400)]/20 to-[var(--signal-500)]/20 backdrop-blur-sm" />
              )}

              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--ink-900)]/40 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-32 h-32 bg-[var(--signal-500)]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-40 h-40 bg-[var(--telemetry-400)]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Background gradient accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className={`absolute ${reverse ? 'right-0' : 'left-0'} top-0 w-1/2 h-full bg-gradient-to-${reverse ? 'l' : 'r'} from-[var(--telemetry-400)]/5 via-transparent to-transparent`}
        />
      </div>
    </section>
  );
};

export default HeroSplit;
