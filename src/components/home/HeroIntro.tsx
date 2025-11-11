import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, scaleIn, staggerContainer, hoverLift } from '../shared/MotionVariants';

export interface HeroIntroProps {
  avatarSrc?: string;
  avatarAlt?: string;
  headline?: string;
  subhead?: string;
  metrics?: { label: string; value: string }[];
  videoUrl?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
}

const HeroIntro: React.FC<HeroIntroProps> = ({
  avatarSrc = '/assets/jacob-avatar.jpg',
  avatarAlt = 'Jacob Darling',
  headline = 'Architect of Systems, Curator of Stories',
  subhead = 'I build things that empower people—and assistants—to think, create, and scale.',
  metrics = [],
  videoUrl,
  ctaHref = '/case-studies',
  ctaLabel = 'Explore My Work',
  className = '',
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap and ESC handling
  useEffect(() => {
    if (!isVideoOpen) return;

    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Focus the modal when it opens
    const modal = modalRef.current;
    if (modal) {
      const firstFocusable = modal.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    // Handle ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };

    // Handle focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modal) return;

      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      // Restore focus to previously focused element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isVideoOpen]);

  return (
    <section className={`max-w-4xl mx-auto px-6 pt-20 text-center ${className}`}>
      {/* Headline */}
      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
      >
        {headline}
      </motion.h1>

      {/* Avatar */}
      {avatarSrc && (
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="mb-8 flex justify-center"
        >
          <img
            src={avatarSrc}
            alt={avatarAlt}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-brand-accent"
          />
        </motion.div>
      )}

      {/* Subhead */}
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-neutral-muted mb-8 max-w-2xl mx-auto"
      >
        {subhead}
      </motion.p>

      {/* Metrics */}
      {metrics.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-brand-accent mb-1">
                {metric.value}
              </div>
              <div className="text-sm md:text-base text-neutral-muted">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* CTA Button */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        {videoUrl ? (
          <motion.button
            variants={hoverLift}
            initial="rest"
            whileHover="hover"
            onClick={() => setIsVideoOpen(true)}
            className="px-8 py-3 bg-brand-accent text-white rounded-lg font-semibold focus-ring"
            aria-label="Watch introduction video"
          >
            {ctaLabel}
          </motion.button>
        ) : (
          <motion.a
            href={ctaHref}
            variants={hoverLift}
            initial="rest"
            whileHover="hover"
            className="inline-block px-8 py-3 bg-brand-accent text-white rounded-lg font-semibold focus-ring"
          >
            {ctaLabel}
          </motion.a>
        )}
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && videoUrl && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-backdrop"
              onClick={() => setIsVideoOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="video-modal-title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative bg-card rounded-lg p-4 max-w-4xl w-full">
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-neutral-muted focus-ring rounded-full p-2"
                  aria-label="Close video modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 id="video-modal-title" className="sr-only">
                  Introduction Video
                </h2>
                <div className="aspect-video w-full">
                  <iframe
                    src={videoUrl}
                    title="Introduction Video"
                    className="w-full h-full rounded"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroIntro;

