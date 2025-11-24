import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

/**
 * HeroCommandPanel - Split-screen hero with portrait and telemetry ticker
 * Replaces generic hero with Signalcraft Systems aesthetic
 */
interface TelemetryItem {
  label: string;
  value: string;
}

const telemetrySequence: TelemetryItem[] = [
  { label: 'Insight', value: '→' },
  { label: 'Architecture', value: '→' },
  { label: 'Ops', value: '→' },
];

const HeroCommandPanel: React.FC = () => {
  const [currentTelemetry, setCurrentTelemetry] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTelemetry((prev) => (prev + 1) % telemetrySequence.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--ink-900)]">
      {/* Blueprint texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] blueprint-grid"
        aria-hidden="true"
      />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-[var(--signal-500)]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--telemetry-400)]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Portrait with telemetry captions */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="relative"
        >
          <div className="relative">
            {/* Animated border ring */}
            <motion.div
              className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[var(--signal-500)] via-[var(--telemetry-400)] to-[var(--signal-500)] opacity-75"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ filter: 'blur(8px)' }}
              aria-hidden="true"
            />
            
            {/* Bio Portrait with modern fallback */}
            <div className="aspect-[3/4] max-w-md mx-auto rounded-lg overflow-hidden relative shadow-2xl">
              <picture>
                <source srcSet="/images/bio/bio-photo.avif" type="image/avif" />
                <source srcSet="/images/bio/bio-photo.webp" type="image/webp" />
                <img
                  src="/images/bio/bio-photo.jpg"
                  alt="Jacob Darling - Marketing Technologist and Systems Architect"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </picture>

              {/* Telemetry captions overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--ink-900)]/90 to-transparent space-y-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTelemetry}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-xs text-[var(--parchment-050)]/60 uppercase tracking-wider"
                  >
                    {telemetrySequence[currentTelemetry].label}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Headline and ticker */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          className="space-y-8"
        >
          {/* Main headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-sm text-[var(--signal-500)] uppercase tracking-wider mb-4"
            >
              Marketing Technologist
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[var(--parchment-050)] leading-[1.1]"
            >
              Building Systems
              <br />
              That <span className="text-[var(--signal-500)]">Scale Growth</span>
            </motion.h1>
          </div>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--parchment-050)]/70 max-w-xl font-body leading-relaxed"
          >
            I design and deploy marketing infrastructure that connects insight to action—from automation and CRM architecture to analytics and campaign strategy. 16+ years transforming complex problems into scalable solutions.
          </motion.p>

          {/* Telemetry ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 font-mono text-sm"
          >
            <div className="flex items-center gap-2 text-[var(--telemetry-400)]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTelemetry}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {telemetrySequence[currentTelemetry].value}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="h-px flex-1 bg-[var(--ink-700)]" />
            <div className="text-[var(--parchment-050)]/40 uppercase tracking-wider">
              Scroll Down
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4"
          >
            <a
              href="/case-studies"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,107,61,0.3)]"
            >
              Explore Systems
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-[var(--ink-700)] text-[var(--parchment-050)] font-semibold rounded-lg transition-all hover:border-[var(--signal-500)] hover:bg-[var(--signal-500)]/10"
            >
              Let's Talk
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCommandPanel;

