import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import TechProfile from '../components/TechProfile';
import { OceanMarquee, OceanMarqueeItem } from '../components/ui/OceanMarquee';
import TestimonialTerminal from '../components/TestimonialTerminal';
import ProcessFlow from '../components/ProcessFlow';
import StrategicPillars from '../components/StrategicPillars';
import ScrollProgress from '../components/ui/ScrollProgress';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';
import FloatingParticles from '../components/ui/FloatingParticles';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import SectionDivider from '../components/ui/SectionDivider';
import { EnhancedBentoCard } from '../components/ui/EnhancedBentoCard';

const brandLogos = [
  { name: 'Eat My Shorts', src: '/images/inspirations/eat-my-shorts.svg' },
  { name: 'Folklorious', src: '/images/inspirations/folklorious.svg' },
  { name: 'Bombay Electric', src: '/images/inspirations/bombay-electric.svg' },
  { name: 'British Rail', src: '/images/inspirations/british-rail.svg' },
  { name: 'Eames Kit', src: '/images/inspirations/eames-kit.svg' },
  { name: 'Felony Case', src: '/images/inspirations/felony-case.svg' },
  { name: 'Glorioso', src: '/images/inspirations/glorioso.svg' },
  { name: 'IBM Design', src: '/images/inspirations/ibm-design.svg' },
  { name: 'Lune Croissanterie', src: '/images/inspirations/lune-croissanterie.svg' },
  { name: 'NASA Manual', src: '/images/inspirations/nasa-manual.svg' },
  { name: 'Qoni', src: '/images/inspirations/qoni.svg' },
  { name: 'Sutherland Press', src: '/images/inspirations/sutherland-press.svg' },
  { name: 'Tenth Muse', src: '/images/inspirations/tenth-muse.svg' },
  { name: 'Yellow Owl', src: '/images/inspirations/yellow-owl.svg' },
  { name: 'Zonzo Estate', src: '/images/inspirations/zonzo-estate.svg' },
];

const metrics = [
  {
    label: 'Revenue Impact',
    value: 12.5,
    suffix: 'M',
    description: 'Generated across marketing engines',
  },
  {
    label: 'Systems Deployed',
    value: 47,
    description: 'Full-funnel builds shipped',
  },
  {
    label: 'Reliability',
    value: 99.9,
    suffix: '%',
    description: 'Uptime across stacks',
    decimalPlaces: 1,
  },
];

const Home: React.FC = () => {
  return (
    <OceanAuroraBackground className="bg-brand-dark" style={{ minHeight: '100vh', height: 'auto' }}>
      <ScrollProgress />
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <FloatingParticles count={30} />
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <p className="text-sm font-mono uppercase tracking-[0.2em] text-brand-muted">
                Marketing Director + Technologist
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 lg:auto-rows-[minmax(260px,1fr)] gap-6">
              <EnhancedBentoCard span="1" rowSpan="2" className="flex flex-col justify-between">
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight"
                  >
                    I Build Marketing Engines that{' '}
                    <AnimatedGradientText
                      text="Scale Revenue."
                      className="text-4xl md:text-5xl lg:text-6xl font-bold"
                      delay={0.3}
                    />
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-lg md:text-xl text-brand-muted"
                  >
                    Fractional CMO rigor with hands-on engineering chops. Systems thinking, creative
                    direction, and automation under one roof.
                  </motion.p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-brand-teal text-brand-dark font-semibold rounded-lg shadow-[0_10px_30px_rgba(64,224,208,0.25)] hover:bg-white transition-colors"
                  >
                    View Proof
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-brand-teal/40 text-brand-text font-semibold rounded-lg hover:border-brand-teal hover:text-brand-teal transition-colors"
                  >
                    Services
                  </Link>
                </div>
              </EnhancedBentoCard>

              <EnhancedBentoCard span="1" rowSpan="2" className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wide text-brand-muted">
                      Tech Profile
                    </span>
                    <p className="text-sm text-brand-muted">Signal-locked to the grid</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <TechProfile size="lg" className="mx-auto" />
                </div>
              </EnhancedBentoCard>

              <EnhancedBentoCard span="1" rowSpan="2" className="flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wide text-brand-muted">
                      System Telemetry
                    </span>
                    <p className="text-sm text-brand-muted">Live throughput from recent builds</p>
                  </div>
                </div>
                <div className="space-y-5">
                  {metrics.map((metric, idx) => (
                    <div key={metric.label} className="p-4 rounded-lg bg-brand-surface/60 border border-brand-teal/10">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-brand-text">{metric.label}</p>
                        <span className="text-xs text-brand-muted">#{idx + 1}</span>
                      </div>
                      <div className="text-3xl font-bold text-brand-text mt-2 flex items-baseline gap-1">
                        <OceanCountingNumber
                          number={metric.value}
                          decimalPlaces={metric.decimalPlaces ?? 0}
                          suffix={metric.suffix}
                        />
                      </div>
                      <p className="text-xs text-brand-muted mt-1">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </EnhancedBentoCard>

              <EnhancedBentoCard
                span="3"
                enable3DTilt={false}
                enableMagnetic={false}
                className="lg:col-span-3"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wide text-brand-muted">
                        The Trust Wall
                      </span>
                      <p className="text-brand-text text-lg font-semibold">Signal from recent partners</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-brand-surface/70 border border-brand-teal/20 text-xs text-brand-muted">
                      Infinite scroll - Hover to pause
                    </div>
                  </div>
                  <OceanMarquee speed={28} pauseOnHover className="py-4">
                    {brandLogos.map((brand) => (
                      <OceanMarqueeItem key={brand.name}>
                        <motion.div
                          className="flex items-center justify-center h-16 w-24 mx-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                          whileHover={{ scale: 1.05, y: -4 }}
                        >
                          <img
                            src={brand.src}
                            alt={brand.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </motion.div>
                      </OceanMarqueeItem>
                    ))}
                  </OceanMarquee>
                </div>
              </EnhancedBentoCard>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <StrategicPillars />
          </div>
        </section>

        <SectionDivider />

        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ProcessFlow />
          </div>
        </section>

        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-brand-text text-center mb-12"
            >
              System Logs
            </motion.h2>
            <TestimonialTerminal useFeatured autoPlay interval={8000} />
          </div>
        </section>
      </div>
    </OceanAuroraBackground>
  );
};

export default Home;
