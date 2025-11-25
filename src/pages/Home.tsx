import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import { BentoGrid, BentoCard } from '../components/ui/BentoGrid';
import { EnhancedBentoCard } from '../components/ui/EnhancedBentoCard';
import AnimatedMetricsDashboard from '../components/ui/AnimatedMetricsDashboard';
import TechStackCloud from '../components/ui/TechStackCloud';
import TechProfile from '../components/TechProfile';
import { OceanMarquee, OceanMarqueeItem } from '../components/ui/OceanMarquee';
import TestimonialTerminal from '../components/TestimonialTerminal';
import ProcessFlow from '../components/ProcessFlow';
import ServiceModules from '../components/ServiceModules';
import StrategicPillars from '../components/StrategicPillars';
import Icon from '../components/Icon';
import ScrollProgress from '../components/ui/ScrollProgress';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';
import MagneticCard from '../components/ui/MagneticCard';
import FloatingParticles from '../components/ui/FloatingParticles';
import GlowEffect from '../components/ui/GlowEffect';
import ScrollIndicator from '../components/ui/ScrollIndicator';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import SectionDivider from '../components/ui/SectionDivider';
import AnimatedCounter from '../components/animations/AnimatedCounter';

// Brand logos for trust section
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

// Tech stack icons for "My Stack" card
const techStack = [
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Tailwind CSS', slug: 'tailwind' },
  { name: 'Node.js', slug: 'node' },
  { name: 'Vite', slug: 'vite' },
  { name: 'GitHub', slug: 'github' },
  { name: 'Python', slug: 'python' },
  { name: 'HubSpot', slug: 'hubspot' },
  { name: 'JavaScript', slug: 'javascript' },
];

const Home: React.FC = () => {
  return (
    <OceanAuroraBackground
      className="bg-brand-dark"
      style={{ minHeight: '100vh', height: 'auto' }}
    >
      <ScrollProgress />
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Hero Section - Executive Hero */}
        <section className="relative min-h-[80vh] flex items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <FloatingParticles count={30} />
          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left: Hero Text (60%) */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 lg:w-[60%] text-center lg:text-left"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-text leading-tight mb-6"
                >
                  I Build Marketing Engines That{' '}
                  <AnimatedGradientText
                    text="Scale Revenue."
                    className="text-5xl md:text-6xl lg:text-7xl font-bold"
                    delay={0.3}
                  />
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl md:text-2xl text-brand-muted mb-8"
                >
                  Fractional CMO & Marketing Technologist
                </motion.p>
              </motion.div>

              {/* Right: Live System Status (40%) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex-1 lg:w-[40%] w-full"
              >
                <div className="bg-brand-surface/50 border border-brand-teal/20 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
                  <div className="mb-6">
                    <span className="text-sm font-mono text-brand-teal uppercase tracking-wide">
                      System Status
                    </span>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-brand-muted uppercase">Revenue Impact</span>
                        <TrendingUp className="w-4 h-4 text-brand-teal" />
                      </div>
                      <div className="text-3xl lg:text-4xl font-bold text-brand-text">
                        $<OceanCountingNumber value={12.5} decimals={1} suffix="M" />
                      </div>
                      <p className="text-sm text-brand-muted mt-1">Generated across systems</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-brand-muted uppercase">Systems Built</span>
                        <TrendingUp className="w-4 h-4 text-brand-teal" />
                      </div>
                      <div className="text-3xl lg:text-4xl font-bold text-brand-text">
                        <OceanCountingNumber value={47} />
                      </div>
                      <p className="text-sm text-brand-muted mt-1">Marketing engines deployed</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-brand-muted uppercase">Uptime</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      </div>
                      <div className="text-3xl lg:text-4xl font-bold text-brand-text">
                        <OceanCountingNumber value={99.9} decimals={1} suffix="%" />
                      </div>
                      <p className="text-sm text-brand-muted mt-1">System reliability</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <ScrollIndicator />
        </section>

        {/* Command Center Section */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-brand-text text-center mb-12"
            >
              Command Center
            </motion.h2>

            {/* CSS Grid Layout for Command Center */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Slot 1: Tech Profile (Large) - Controller */}
              <EnhancedBentoCard
                span="1"
                rowSpan="2"
                enable3DTilt={true}
                enableMagnetic={true}
                className="flex flex-col items-center justify-center relative overflow-hidden group h-full"
              >
                <GlowEffect intensity="low" color="teal" />
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <span className="text-sm font-mono text-brand-teal uppercase tracking-wide">
                      Tech Profile
                    </span>
                    <div className="mt-2 text-xs text-brand-muted font-mono">
                      Hover to scan identity
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <TechProfile size="lg" className="mx-auto" />
                  </div>
                </div>
              </EnhancedBentoCard>

              {/* Slot 2: The Stack (Medium) */}
              <EnhancedBentoCard
                span="1"
                enable3DTilt={true}
                enableMagnetic={true}
                className="flex flex-col relative overflow-hidden group h-full"
              >
                <GlowEffect intensity="low" color="orange" />
                <div className="relative z-10">
                  <div className="mb-4">
                    <span className="text-sm font-mono text-brand-teal uppercase tracking-wide">
                      Operational Stack
                    </span>
                  </div>
                  <TechStackCloud
                    tech={techStack.map((t) => ({ name: t.name, slug: t.slug }))}
                    className="flex-1"
                  />
                </div>
              </EnhancedBentoCard>

              {/* Slot 3: Strategy (Medium) */}
              <EnhancedBentoCard
                span="1"
                enable3DTilt={true}
                enableMagnetic={true}
                className="flex flex-col justify-center relative overflow-hidden group h-full"
              >
                <div className="relative z-10">
                  <div className="mb-4">
                    <span className="text-sm font-mono text-brand-teal uppercase tracking-wide">
                      Philosophy
                    </span>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-brand-text">
                      <AnimatedGradientText text="Strategy. Systems. Shipping." delay={0.1} />
                    </h3>
                    <p className="text-brand-muted text-base">
                      Bridging the gap between Creative Vision and Technical Execution.
                    </p>
                  </div>
                </div>
              </EnhancedBentoCard>

              {/* Slot 4: Trust Wall (Full Width) */}
              <EnhancedBentoCard
                span="3"
                enable3DTilt={false}
                enableMagnetic={false}
                className="relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="mb-6">
                    <span className="text-sm font-mono text-brand-teal uppercase tracking-wide">
                      Trusted by Leading Brands
                    </span>
                  </div>
                  <OceanMarquee speed={30} pauseOnHover={true} className="py-4">
                    {brandLogos.map((brand, index) => (
                      <OceanMarqueeItem key={`${brand.name}-${index}`}>
                        <motion.div
                          className="flex items-center justify-center h-20 w-28 mx-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                          whileHover={{ scale: 1.1, y: -5 }}
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

        {/* Strategic Pillars Section */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <StrategicPillars />
          </div>
        </section>

        <SectionDivider />

        {/* Process Flow Section */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ProcessFlow />
          </div>
        </section>

        {/* Testimonials Section */}
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
            <TestimonialTerminal
              useFeatured={true}
              autoPlay={true}
              interval={8000}
            />
          </div>
        </section>
      </div>
    </OceanAuroraBackground>
  );
};

export default Home;
