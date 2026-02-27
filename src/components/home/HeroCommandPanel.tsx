import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { OceanAuroraBackground } from '../ui/OceanAuroraBackground';
import { OceanTextGenerateEffect } from '../ui/OceanTextGenerateEffect';
import { OceanGradientText } from '../ui/OceanGradientText';
import { AvailabilityBadge } from '../ui/AvailabilityBadge';
import { AppButton } from '../ui/AppButton';
import { useTypingEffect } from '../../hooks/useTypingEffect';

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

  // Typing effect for role titles
  const { text: roleText } = useTypingEffect({
    strings: ['Marketing Strategist', 'Systems Architect', 'Growth Engineer', 'Automation Expert'],
    typeSpeed: 100,
    deleteSpeed: 50,
    delayBetweenStrings: 2000,
    loop: true,
    startDelay: 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTelemetry((prev) => (prev + 1) % telemetrySequence.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <OceanAuroraBackground
      className="min-h-[90vh] flex items-center overflow-hidden"
      showRadialGradient={true}
    >
      <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden">
        {/* Blueprint texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] blueprint-grid"
          aria-hidden="true"
        />

        {/* Animated gradient orbs - Ocean Pearl colors */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-[#e29578]/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 left-20 w-96 h-96 bg-[#83c5be]/10 rounded-full blur-3xl"
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
            {/* Animated border ring - Ocean Pearl */}
            <motion.div
              className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[#006d77] via-[#83c5be] to-[#006d77] opacity-75"
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
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#006d77]/90 to-transparent space-y-2">
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
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4"
            >
              <AvailabilityBadge
                available={true}
                size="md"
                showPulse={true}
              />
            </motion.div>

            {/* Dynamic typing role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-sm text-[#006d77] uppercase tracking-wider mb-4 min-h-[1.5rem]"
            >
              {roleText}
              <span className="inline-block w-0.5 h-4 bg-[#83c5be] ml-1 animate-pulse" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#edf6f9] leading-[1.1]"
            >
              <OceanTextGenerateEffect
                words="Building Systems"
                className="block mb-2"
                duration={0.6}
                staggerDelay={0.05}
              />
              That <OceanGradientText
                text="Scale Growth"
                className="inline-block"
                neon={false}
              />
            </motion.h1>
          </div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <p className="text-lg md:text-xl text-[#edf6f9]/70 max-w-xl font-body leading-relaxed">
              I design and deploy marketing infrastructure that connects insight to action—from automation and CRM architecture to analytics and campaign strategy.
            </p>

            {/* Who I serve */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#006d77]/10 border border-[#006d77]/20">
              <span className="text-sm font-mono text-[#006d77] uppercase tracking-wider">
                Serving: SaaS • Healthcare • Legal • Financial Services
              </span>
            </div>
          </motion.div>

          {/* Telemetry ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-4 font-mono text-sm"
          >
            <div className="flex items-center gap-2 text-[#83c5be]">
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
            <div className="h-px flex-1 bg-[#5a7a7d]" />
            <div className="text-[#edf6f9]/40 uppercase tracking-wider">
              Scroll Down
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <AppButton
              href="/case-studies"
              variant="primary"
              size="lg"
            >
              Explore Systems
              <ChevronRight className="w-5 h-5" />
            </AppButton>
            <AppButton
              href="/contact"
              variant="outline"
              size="lg"
            >
              Let's Talk
            </AppButton>
            <AppButton
              href="/resume"
              variant="secondary"
              size="lg"
            >
              View Resume
            </AppButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </OceanAuroraBackground>
  );
};

export default HeroCommandPanel;

