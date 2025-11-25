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
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <FloatingParticles count={30} />
          <div className="max-w-7xl mx-auto w-full text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-brand-text leading-tight mb-6"
            >
              I Build Marketing Engines That{' '}
              <AnimatedGradientText
                text="Scale Revenue."
                className="text-5xl md:text-7xl font-bold"
                delay={0.3}
              />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-brand-muted max-w-3xl mx-auto mb-12"
            >
              Fractional CMO & Marketing Technologist
            </motion.p>
          </div>
          <ScrollIndicator />
        </section>

        {/* Strategic Pillars Section */}
        <StrategicPillars />

        {/* Bento Grid Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <BentoGrid className="mb-12">
            {/* Card 1: Latest Win (Large) with Metrics Dashboard */}
            <EnhancedBentoCard
              span="2"
              enable3DTilt={true}
              enableMagnetic={true}
              className="group cursor-pointer"
            >
              <Link
                to="/case-studies/the-launchpad"
                className="flex h-full flex-col justify-between relative z-10"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-brand-teal" />
                    <span className="text-sm font-mono text-brand-teal uppercase tracking-wide">
                      Latest Win
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-3">
                    The Launchpad
                  </h2>
                  <p className="text-brand-muted text-lg mb-6">
                    Transforming a static directory into a revenue engine for practitioners
                  </p>

                  {/* Animated Metrics Dashboard */}
                  <AnimatedMetricsDashboard
                    metrics={[
                      { label: 'Qualified Leads', value: '+212%', trend: 'up', change: 'vs. baseline' },
                      { label: 'Lead-to-Demo', value: '+38%', trend: 'up', change: 'conversion' },
                      { label: 'New Revenue', value: '$310K', trend: 'up', change: '6 months' },
                    ]}
                    chartData={[
                      { month: 'Jan', value: 45 },
                      { month: 'Feb', value: 68 },
                      { month: 'Mar', value: 89 },
                      { month: 'Apr', value: 112 },
                      { month: 'May', value: 145 },
                      { month: 'Jun', value: 212 },
                    ]}
                    className="mt-6"
                  />
                </div>
                <div className="flex items-center justify-end mt-4">
                  <ArrowRight className="w-6 h-6 text-brand-muted group-hover:text-brand-teal group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </EnhancedBentoCard>

            {/* Card 2: Tech Profile (Tall) */}
            <EnhancedBentoCard
              span="1"
              rowSpan="2"
              enable3DTilt={true}
              enableMagnetic={true}
              className="flex flex-col items-center justify-center relative overflow-hidden group"
            >
              <GlowEffect intensity="low" color="teal" />
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-sm font-mono text-brand-teal uppercase tracking-wide">
                    Tech Profile
                  </span>
                </div>
                <TechProfile size="md" className="mx-auto" />
              </div>
            </EnhancedBentoCard>

            {/* Card 3: My Stack (Wide) - Tech Stack Cloud */}
            <EnhancedBentoCard
              span="2"
              enable3DTilt={true}
              enableMagnetic={true}
              className="flex flex-col relative overflow-hidden group"
            >
              <GlowEffect intensity="low" color="orange" />
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-sm font-mono text-brand-teal uppercase tracking-wide">
                    My Stack
                  </span>
                </div>
                <TechStackCloud
                  tech={techStack.map((t) => ({ name: t.name, slug: t.slug }))}
                  className="flex-1"
                />
              </div>
            </EnhancedBentoCard>

            {/* Card 4: Philosophy (Wide) */}
            <EnhancedBentoCard
              span="2"
              enable3DTilt={true}
              enableMagnetic={true}
              className="flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-sm font-mono text-brand-teal uppercase tracking-wide">
                    Philosophy
                  </span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-bold text-brand-text">
                    <AnimatedGradientText text="Strategy. Systems. Shipping." delay={0.1} />
                  </h3>
                  <p className="text-brand-muted text-lg max-w-2xl">
                    Every marketing engine starts with strategy, gets built with systems, and delivers through consistent shipping. No hand-waving, no vanity metrics—just revenue that scales.
                  </p>
                </div>
              </div>
            </EnhancedBentoCard>
          </BentoGrid>
        </section>

        <SectionDivider />

        {/* Process Flow Section */}
        <ProcessFlow />

        {/* Testimonials Section */}
        <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
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

        {/* Trust Section */}
        <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-brand-text text-center mb-12"
            >
              Trusted by Leading Brands
            </motion.h2>
            <OceanMarquee speed={30} pauseOnHover={true} className="py-8">
              {brandLogos.map((brand, index) => (
                <OceanMarqueeItem key={`${brand.name}-${index}`}>
                  <motion.div
                    className="flex items-center justify-center h-24 w-32 mx-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
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
        </section>
      </div>
    </OceanAuroraBackground>
  );
};

export default Home;
