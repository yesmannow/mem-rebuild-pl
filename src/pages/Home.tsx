import React, { Suspense, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Cpu, LineChart, ShieldCheck, Users, CheckCircle2, Code } from 'lucide-react';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import ScrollProgress from '../components/ui/ScrollProgress';
import SectionDivider from '../components/ui/SectionDivider';
import TerminalBlock from '../components/ui/TerminalBlock';
import { OceanRippleButton } from '../components/ui/OceanRippleButton';
import ScrollReveal from '../components/animations/ScrollReveal';
import StaggerChildren, { StaggerItem } from '../components/animations/StaggerChildren';
import MagneticCursor from '../components/ui/MagneticCursor';
import TiltCard from '../components/ui/TiltCard';
import { AppCard } from '../ui/AppCard';
import { AppSection } from '../ui/AppSection';
import { AppButton } from '../ui/AppButton';
import { PageParticleBackground } from '../components/PageParticleBackground';
import { FeaturedAppsShowcase } from '../components/home/FeaturedAppsShowcase';

const FloatingParticles = React.lazy(() => import('../components/ui/FloatingParticles'));
const TechProfile = React.lazy(() => import('../components/TechProfile'));

const snapshotItems = [
  {
    title: 'Strategic Consulting',
    description: 'Board-level clarity without the full-time spend.',
    bullets: ['Fractional CMO partnership', 'Positioning, GTM, and revenue modeling'],
    href: '/services',
    cta: 'See Services',
    icon: Target,
  },
  {
    title: 'MarTech Implementation',
    description: 'Systems that talk to each other and surface live intelligence.',
    bullets: ['CRM and automation architecture', 'Dashboards, attribution, and RevOps'],
    href: '/toolbox',
    cta: 'Explore Toolbox',
    icon: Cpu,
  },
  {
    title: 'Performance Marketing',
    description: 'Campaigns engineered to convert and scale.',
    bullets: ['Acquisition funnels and CRO', 'Case studies and proof of execution'],
    href: '/case-studies',
    cta: 'View Work',
    icon: LineChart,
  },
];

const operatingSignals = [
  'WEEKLY SIGNAL REPORTS + KPI MONITORS',
  'DONE-WITH-YOU IMPLEMENTATION',
  'EXECUTIVE ALIGNMENT + TEAM ENABLEMENT',
  'PLAYBOOKS THAT OUTLIVE THE ENGAGEMENT',
];

const Home: React.FC = () => {
  const HeroRightColumn = useMemo(
    () => (
      <div className="space-y-6">
        <div className="rounded-2xl border border-white/5 bg-slate-950/60 backdrop-blur p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-brand-muted">Operator Profile</p>
            <ShieldCheck size={16} className="text-brand-teal" />
          </div>
          <Suspense fallback={<div className="h-32 rounded-xl bg-slate-900/70 animate-pulse" />}>
            <TechProfile size="lg" className="mx-auto" />
          </Suspense>
        </div>
      </div>
    ),
    []
  );

  return (
    <OceanAuroraBackground className="bg-brand-dark" style={{ minHeight: '100vh', height: 'auto' }}>
      <MagneticCursor color="#40E0D0" enabled={true} />
      <ScrollProgress />
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <PageParticleBackground 
            particleCount={40}
            particleColor="#40E0D0"
            opacity={0.08}
            speed={0.4}
          />
          <Suspense fallback={<div className="h-16" />}>
            <FloatingParticles count={24} />
          </Suspense>
          <div className="max-w-7xl mx-auto grid gap-8 sm:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <p className="text-sm font-mono uppercase tracking-[0.35em] text-brand-muted">
                Fractional CMO & Marketing Technologist
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight">
                Transforming marketing challenges into <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-turquoise to-brand-creamsicle">measurable business results</span>
              </h1>
              <div className="space-y-4 max-w-3xl">
                <p className="text-base sm:text-lg md:text-xl text-brand-muted">
                  Marketing strategist and systems architect with 15+ years of experience building revenue-driving marketing infrastructure for global healthcare brands. Proven track record of transforming complex marketing challenges into measurable business results through strategic thinking, technical execution, and data-driven decision making.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-brand-muted">
                  I bridge the gap between creative marketing vision and technical implementation, delivering systems that scale while driving measurable ROI. My expertise spans marketing automation, CRM architecture, web development, and revenue operations—positioning me uniquely to lead growth initiatives from strategy through execution.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <OceanRippleButton
                  asLink
                  href="/resume"
                  variant="primary"
                  className="inline-flex items-center gap-2 w-full sm:w-auto justify-center touch-target"
                >
                  View Resume
                  <ArrowRight size={16} />
                </OceanRippleButton>
                <OceanRippleButton
                  asLink
                  href="/case-studies"
                  variant="outline"
                  className="inline-flex items-center gap-2 w-full sm:w-auto justify-center touch-target"
                >
                  View Work
                  <ArrowRight size={16} />
                </OceanRippleButton>
              </div>
            </motion.div>
            {HeroRightColumn}
          </div>
        </section>

        <SectionDivider />

        <AppSection padding="lg" container={false}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="flex-1">
                  <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">Navigation snapshot</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-text">Choose your entry point</h2>
                </div>
                <p className="text-brand-muted max-w-lg text-sm sm:text-base">
                  Three operating modes that cover strategy, systems, and performance. Pick one or mix across engagements.
                </p>
              </div>
            </ScrollReveal>
            <StaggerChildren staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {snapshotItems.map((item, index) => (
                <StaggerItem key={item.title}>
                  <TiltCard
                    maxTilt={10}
                    scale={1.02}
                    glareEnable={true}
                    glareMaxOpacity={0.2}
                    className="h-full"
                  >
                    <AppCard
                      variant="glass"
                      padding="lg"
                      hover={false}
                      className="h-full group"
                      whileHover={{ y: 0 }}
                    >
                      <Link
                        to={item.href}
                        className="flex flex-col justify-between h-full hover:border-brand-teal/60 transition"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <span className="p-3 rounded-full bg-brand-teal/15 text-brand-teal">
                              <item.icon size={20} />
                            </span>
                            <h3 className="text-xl font-semibold text-brand-text">{item.title}</h3>
                          </div>
                          <p className="text-brand-muted mb-5">{item.description}</p>
                          <ul className="space-y-2 text-sm text-brand-muted">
                            {item.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2">
                                <span className="text-brand-teal mt-1">-</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-6 inline-flex items-center gap-2 text-brand-teal font-semibold">
                          {item.cta}
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </AppCard>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </AppSection>

        <SectionDivider />

        {/* Featured Apps Showcase */}
        <FeaturedAppsShowcase />

        <SectionDivider />

        <WhyFractionalSection />

        <SectionDivider />

        {/* Technical Stack Preview */}
        <AppSection padding="lg" container={false}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
                <div className="flex-1">
                  <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">Technical Expertise</p>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-text">Full-stack marketing technology</h2>
                </div>
                <p className="text-brand-muted max-w-lg text-sm sm:text-base">
                  From automation platforms to custom development—here&apos;s a snapshot of the tools and technologies I work with.
                </p>
              </div>
            </ScrollReveal>
            <StaggerChildren staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Marketing Automation */}
              <StaggerItem>
                <TiltCard maxTilt={10} scale={1.02} glareEnable={true} className="h-full">
                  <AppCard variant="glass" padding="lg" hover={false} className="h-full" whileHover={{ y: 0 }}>
                    <Link
                      to="/toolbox"
                      className="group block h-full"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-lg bg-brand-teal/15 text-brand-teal">
                          <Cpu size={20} />
                        </div>
                        <h3 className="text-lg font-semibold text-brand-text">Marketing Automation</h3>
                      </div>
                      <p className="text-sm text-brand-muted mb-4">CRM architecture and workflow automation</p>
                      <div className="flex flex-wrap gap-2">
                        {['HubSpot', 'Marketo', 'Salesforce', 'FluentCRM'].map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-md bg-slate-900/50 border border-white/5 text-brand-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </AppCard>
                </TiltCard>
              </StaggerItem>

              {/* Analytics & Tracking */}
              <StaggerItem>
                <TiltCard maxTilt={10} scale={1.02} glareEnable={true} className="h-full">
                  <AppCard variant="glass" padding="lg" hover={false} className="h-full" whileHover={{ y: 0 }}>
                    <Link
                      to="/toolbox"
                      className="group block h-full"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-lg bg-brand-teal/15 text-brand-teal">
                          <LineChart size={20} />
                        </div>
                        <h3 className="text-lg font-semibold text-brand-text">Analytics & Tracking</h3>
                      </div>
                      <p className="text-sm text-brand-muted mb-4">Data-driven insights and conversion optimization</p>
                      <div className="flex flex-wrap gap-2">
                        {['GA4', 'GTM', 'Google Ads', 'Meta Ads'].map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-md bg-slate-900/50 border border-white/5 text-brand-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </AppCard>
                </TiltCard>
              </StaggerItem>

              {/* Development Stack */}
              <StaggerItem>
                <TiltCard maxTilt={10} scale={1.02} glareEnable={true} className="h-full">
                  <AppCard variant="glass" padding="lg" hover={false} className="h-full" whileHover={{ y: 0 }}>
                    <Link
                      to="/toolbox"
                      className="group block h-full"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-lg bg-brand-teal/15 text-brand-teal">
                          <Code size={20} />
                        </div>
                        <h3 className="text-lg font-semibold text-brand-text">Development Stack</h3>
                      </div>
                      <p className="text-sm text-brand-muted mb-4">Full-stack web development and infrastructure</p>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'WordPress', 'Node.js'].map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-md bg-slate-900/50 border border-white/5 text-brand-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Link>
                  </AppCard>
                </TiltCard>
              </StaggerItem>
            </StaggerChildren>
            <div className="text-center">
              <OceanRippleButton
                asLink
                href="/toolbox"
                variant="outline"
                className="inline-flex items-center gap-2"
              >
                Explore Full Technical Stack
                <ArrowRight size={16} />
              </OceanRippleButton>
            </div>
          </div>
        </AppSection>

        <SectionDivider />

        <AppSection padding="lg" container={false}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up" delay={0.2}>
              <div className="max-w-5xl mx-auto text-center">
                <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">Final CTA</p>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">Ready to scale your growth?</h2>
                <p className="text-brand-muted text-lg mb-8">
                  Tell me where you want the business to go. I&apos;ll architect the plan, build the stack, and keep the entire go-to-market motion honest.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                <OceanRippleButton
                  asLink
                  href="/contact"
                  variant="primary"
                  className="inline-flex items-center gap-2"
                >
                  Start the Conversation
                  <ArrowRight size={16} />
                </OceanRippleButton>
                <OceanRippleButton
                  asLink
                  href="/services"
                  variant="outline"
                  className="inline-flex items-center gap-2"
                >
                  Review Services
                  <ArrowRight size={16} />
                </OceanRippleButton>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </AppSection>
      </div>
    </OceanAuroraBackground>
  );
};

const WhyFractionalSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const leftInView = useInView(leftColumnRef, { once: true, margin: '-50px' });
  const rightInView = useInView(rightColumnRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 via-transparent to-brand-teal/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
        {/* Left Column - Content */}
        <motion.div
          ref={leftColumnRef}
          initial={{ opacity: 0, x: -30 }}
          animate={leftInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">Why work with me?</p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-brand-text"
          >
            Board-ready strategy. Full-stack implementation. Measurable results.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-brand-muted text-lg leading-relaxed"
          >
            With 15+ years of experience building marketing systems and revenue engines, I bring both strategic vision and hands-on technical execution.
            I&apos;ve architected solutions for SaaS companies, healthcare organizations, and e-commerce brands—delivering measurable impact through data-driven strategies and full-stack implementation.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={leftInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4 text-brand-text/80"
          >
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex gap-3 group"
            >
              <ShieldCheck size={20} className="text-brand-teal mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>Board-ready strategy with clear KPIs, accountability frameworks, and executive-level reporting.</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex gap-3 group"
            >
              <Users size={20} className="text-brand-teal mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>Direct collaboration with cross-functional teams—product, sales, RevOps, and engineering—no middle layers.</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="flex gap-3 group"
            >
              <Cpu size={20} className="text-brand-teal mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>Full-stack implementation expertise—from strategy to code to deployment—optimizing your existing tech stack.</span>
            </motion.li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <OceanRippleButton
              asLink
              href="/case-studies"
              variant="outline"
              size="md"
              className="inline-flex items-center gap-2"
            >
              View Case Studies
              <ArrowRight size={16} />
            </OceanRippleButton>
            <OceanRippleButton
              asLink
              href="/contact"
              variant="primary"
              size="md"
              className="inline-flex items-center gap-2"
            >
              Let&apos;s Connect
              <ArrowRight size={16} />
            </OceanRippleButton>
          </motion.div>
        </motion.div>

        {/* Right Column - Signals */}
        <motion.div
          ref={rightColumnRef}
          initial={{ opacity: 0, x: 30 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Operating Signals Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <TerminalBlock title="Operating Signals">
              <div className="space-y-3 font-mono text-sm">
                <AnimatePresence>
                  {operatingSignals.map((signal, index) => (
                    <motion.div
                      key={signal}
                      initial={{ opacity: 0, x: -10 }}
                      animate={rightInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                      className="flex items-center gap-2 text-brand-text group"
                    >
                      <span className="text-brand-teal">&gt;</span>
                      <span className="group-hover:text-brand-teal transition-colors">{signal}</span>
                      <motion.div
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        <CheckCircle2 size={14} className="text-brand-teal" />
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TerminalBlock>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
