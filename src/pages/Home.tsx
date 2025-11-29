import React, { Suspense, useEffect, useMemo, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Cpu, LineChart, ShieldCheck, Users, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import ScrollProgress from '../components/ui/ScrollProgress';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';
import SectionDivider from '../components/ui/SectionDivider';
import TerminalBlock from '../components/ui/TerminalBlock';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import TestimonialTerminal from '../components/TestimonialTerminal';
import { GALLERY_MANIFESTS } from '../data/config';

const FloatingParticles = React.lazy(() => import('../components/ui/FloatingParticles'));
const TechProfile = React.lazy(() => import('../components/TechProfile'));

interface AssetCounts {
  photo?: number;
  design?: number;
}

const heroStats = [
  { label: 'Revenue influenced', prefix: '$', number: 85, suffix: 'M+', detail: 'Across SaaS, eCommerce, and services' },
  { label: 'Systems shipped', number: 72, suffix: '+ builds', detail: 'CRM, MarTech, and acquisition stacks' },
  { label: 'Avg. sprint launch', number: 6, suffix: ' weeks', detail: 'From discovery to deployed programs' },
];

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

const valueComparisons = [
  {
    label: 'Full-time CMO',
    value: '$250K+ / yr',
    detail: 'Salary, benefits, and onboarding time',
    icon: Users,
    highlight: false,
  },
  {
    label: 'Fractional Partnership',
    value: '$6K-$12K / mo',
    detail: 'Strategy plus execution pods aligned to outcomes',
    icon: Zap,
    highlight: true,
  },
];

const operatingSignals = [
  'WEEKLY SIGNAL REPORTS + KPI MONITORS',
  'DONE-WITH-YOU IMPLEMENTATION',
  'EXECUTIVE ALIGNMENT + TEAM ENABLEMENT',
  'PLAYBOOKS THAT OUTLIVE THE ENGAGEMENT',
];

const trustLogos = [
  'Venture-backed SaaS',
  'Global eCommerce',
  'B2B Services',
  'Healthcare Startups',
  'Manufacturing',
  'Creative Agencies',
];

const aboutHighlights = [
  '15+ years building inside scrappy startups and scaled enterprises',
  'Known for translating C-suite goals into measurable roadmaps',
  'Hands-on with automation, analytics, and the creative craft',
];

const finalCtaLinks = [
  {
    label: 'Email',
    href: 'mailto:hoosierdarling@gmail.com',
    detail: 'Direct line - reply within 24 hours',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jacobdarling',
    detail: 'Connect and message for quick intros',
  },
  {
    label: 'Portfolio',
    href: '/case-studies',
    detail: 'Dive deeper into featured engagements',
  },
];

const Home: React.FC = () => {
  const [counts, setCounts] = useState<AssetCounts>({});

  useEffect(() => {
    const fetchCount = async (url: string): Promise<number | undefined> => {
      try {
        const res = await fetch(url);
        if (!res.ok) return undefined;
        const data = await res.json();
        if (Array.isArray(data?.files)) return data.files.length;
        return undefined;
      } catch {
        return undefined;
      }
    };

    const hydrate = async () => {
      const [photo, design] = await Promise.all([
        fetchCount(GALLERY_MANIFESTS.photography),
        fetchCount(GALLERY_MANIFESTS.design),
      ]);
      setCounts({ photo, design });
    };

    void hydrate();
  }, []);

  const HeroRightColumn = useMemo(
    () => (
      <div className="space-y-6">
        <div className="rounded-2xl border border-brand-teal/30 bg-slate-900/70 backdrop-blur p-6 shadow-soft-dark">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-brand-muted">System Status</p>
              <p className="text-brand-text font-semibold">Command Console</p>
            </div>
            <span className="inline-flex items-center text-xs text-brand-muted gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse" /> online
            </span>
          </div>
          <SystemTerminal counts={counts} />
        </div>

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
    [counts]
  );

  return (
    <OceanAuroraBackground className="bg-brand-dark" style={{ minHeight: '100vh', height: 'auto' }}>
      <ScrollProgress />
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <Suspense fallback={<div className="h-16" />}>
            <FloatingParticles count={24} />
          </Suspense>
          <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <p className="text-sm font-mono uppercase tracking-[0.35em] text-brand-muted">
                Fractional CMO & Marketing Technologist
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight">
                Scaling companies through <AnimatedGradientText text="strategy + technology" className="text-4xl md:text-5xl lg:text-6xl font-bold" />
              </h1>
              <p className="text-lg md:text-xl text-brand-muted max-w-3xl">
                I help CEOs, founders, and operators turn ambiguous growth goals into orchestrated systems.
                You get board-ready strategy, full-stack implementation, and the optimization muscle to prove it works.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-teal text-slate-900 font-semibold shadow-cta hover:brightness-110 transition"
                >
                  Book a Consultation
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-teal/60 text-brand-text hover:border-brand-teal transition"
                >
                  View Work
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-brand-muted mb-2">{stat.label}</p>
                    <div className="text-2xl font-semibold text-brand-text">
                      {stat.prefix}
                      <OceanCountingNumber number={stat.number} />
                      {stat.suffix}
                    </div>
                    <p className="text-sm text-brand-muted mt-1">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            {HeroRightColumn}
          </div>
        </section>

        <SectionDivider />

        <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-6 mb-12">
              <div>
                <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">Navigation snapshot</p>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-text">Choose your entry point</h2>
              </div>
              <p className="text-brand-muted max-w-lg">
                Three operating modes that cover strategy, systems, and performance. Pick one or mix across engagements.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {snapshotItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur p-6 flex flex-col justify-between hover:border-brand-teal/60 transition shadow-soft-dark"
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
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <WhyFractionalSection />

        <SectionDivider />

        <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                <div>
                  <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">Trusted by teams who build</p>
                  <h2 className="text-3xl font-bold text-brand-text">Proof instead of promises</h2>
                </div>
                <p className="text-brand-muted max-w-xl">
                  From Series A startups to global product launches, I partner with leaders who need strategic lift and executional horsepower.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {trustLogos.map((logo) => (
                  <div
                    key={logo}
                    className="h-20 rounded-2xl border border-white/5 bg-slate-900/60 flex items-center justify-center text-center text-sm text-brand-muted"
                  >
                    {logo}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
              <TestimonialTerminal useFeatured autoPlay interval={8000} />
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">About Jacob</p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text">Marketing director meets systems architect.</h2>
              <p className="text-brand-muted text-lg">
                I serve as the executive partner you call when growth is stuck. I speak creative, product, and engineering—then build the connective tissue so every team can see the same dashboard.
              </p>
              <ul className="space-y-3 text-brand-text/80">
                {aboutHighlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="text-brand-teal mt-1">+</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-teal/60 text-brand-text hover:border-brand-teal transition"
              >
                Meet the Builder
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="space-y-6">
              <TerminalBlock title="Current Focus">
                <div className="space-y-2 text-sm text-brand-text">
                  <p>&gt; Scaling demand gen engines for technical founders</p>
                  <p>&gt; Rolling up marketing and sales ops into one RevOps layer</p>
                  <p>&gt; Automating measurement from first touch to booked revenue</p>
                </div>
              </TerminalBlock>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">Final CTA</p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">Ready to scale your growth?</h2>
            <p className="text-brand-muted text-lg mb-8">
              Tell me where you want the business to go. I'll architect the plan, build the stack, and keep the entire go-to-market motion honest.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-teal text-slate-900 font-semibold shadow-cta"
              >
                Start the Conversation
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-teal/60 text-brand-text hover:border-brand-teal transition"
              >
                Review Services
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {finalCtaLinks.map((linkItem) => (
                <a
                  key={linkItem.label}
                  href={linkItem.href}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-left hover:border-brand-teal/60 transition"
                  target={linkItem.href.startsWith('http') ? '_blank' : undefined}
                  rel={linkItem.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">{linkItem.label}</p>
                  <p className="text-lg font-semibold text-brand-text">{linkItem.detail}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </OceanAuroraBackground>
  );
};

const WhyFractionalSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
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
            <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted">Why fractional?</p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-brand-text"
          >
            Cost-efficient leadership. Full-stack execution.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-brand-muted text-lg leading-relaxed"
          >
            By pairing senior marketing leadership with hands-on technical execution, I eliminate the lag between strategy and results.
            I embed with your team, stand up data visibility, and engineer automations that keep revenue programs accountable.
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
              <span>Board-ready operating rhythm with clear KPIs and accountability.</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex gap-3 group"
            >
              <Users size={20} className="text-brand-teal mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>Collaborate directly with product, sales, and RevOps—no agency telephone game.</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={leftInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="flex gap-3 group"
            >
              <Cpu size={20} className="text-brand-teal mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>Technology decisions rooted in what your stack already has, not shiny objects.</span>
            </motion.li>
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={leftInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-brand-teal/60 text-brand-text hover:border-brand-teal hover:bg-brand-teal/10 transition-all duration-300"
            >
              View Service Models
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-teal text-slate-900 font-semibold shadow-cta hover:brightness-110 hover:shadow-[0_0_25px_rgba(64,224,208,0.5)] transition-all duration-300"
            >
              Talk Through Your Roadmap
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Column - Cost Comparison & Signals */}
        <motion.div
          ref={rightColumnRef}
          initial={{ opacity: 0, x: 30 }}
          animate={rightInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Cost Snapshot Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl border border-brand-teal/30 bg-slate-950/70 backdrop-blur-xl p-6 shadow-soft-dark hover:border-brand-teal/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-brand-muted">Cost Snapshot</p>
              <TrendingUp size={16} className="text-brand-teal" />
            </div>
            <div className="space-y-4">
              {valueComparisons.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={rightInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`relative p-5 rounded-xl border transition-all duration-300 ${
                      item.highlight
                        ? 'bg-gradient-to-br from-brand-teal/20 to-brand-teal/5 border-brand-teal/50 shadow-lg shadow-brand-teal/20'
                        : 'bg-slate-900/70 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {item.highlight && (
                      <motion.div
                        className="absolute -top-2 -right-2 px-2 py-1 rounded-full bg-brand-teal text-slate-900 text-xs font-bold"
                        initial={{ scale: 0 }}
                        animate={rightInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                      >
                        RECOMMENDED
                      </motion.div>
                    )}
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${item.highlight ? 'bg-brand-teal/20' : 'bg-slate-800/50'}`}>
                        <Icon size={18} className={item.highlight ? 'text-brand-teal' : 'text-brand-muted'} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${item.highlight ? 'text-brand-text' : 'text-brand-muted'}`}>
                          {item.label}
                        </p>
                      </div>
                    </div>
                    <p className={`text-2xl font-bold mb-1 ${item.highlight ? 'text-brand-teal' : 'text-brand-text'}`}>
                      {item.value}
                    </p>
                    <p className="text-sm text-brand-muted">{item.detail}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Operating Signals Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={rightInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <TerminalBlock title="Operating Signals">
              <div className="space-y-3 font-mono text-sm">
                <AnimatePresence>
                  {operatingSignals.map((signal, index) => (
                    <motion.div
                      key={signal}
                      initial={{ opacity: 0, x: -10 }}
                      animate={rightInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
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

interface SystemTerminalProps {
  counts: AssetCounts;
}

const SystemTerminal: React.FC<SystemTerminalProps> = ({ counts }) => {
  const [lines, setLines] = useState<string[]>([]);

  const photoCount = useMemo(
    () => counts.photo ?? Math.floor(Math.random() * 20) + 12,
    [counts.photo]
  );

  useEffect(() => {
    const seq = [
      '> CONNECTING TO SATELLITE... [OK]',
      '> SYNCING MARKETING METRICS...',
      '> ANALYZING CAMPAIGN PERFORMANCE...',
      '> SYNCING LIGHTROOM ASSETS...',
      `> FOUND ${photoCount} NEW PHOTOS.`,
      '> OPTIMIZING VITE BUILD... [DONE]',
      '> SYSTEM READY. WELCOME, USER.',
    ];

    const timers: NodeJS.Timeout[] = [];
    setLines([]);
    seq.forEach((line, idx) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
        }, idx * 700 + (idx === 1 ? 800 : 0))
      );
    });

    return () => timers.forEach((t) => clearTimeout(t));
  }, [photoCount]);

  return (
    <TerminalBlock title="Command Center">
      <div className="space-y-1 font-mono text-sm text-brand-text">
        <AnimatePresence>
          {lines.map((line) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.25 }}
              className="whitespace-pre"
            >
              {line}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </TerminalBlock>
  );
};

export default Home;
