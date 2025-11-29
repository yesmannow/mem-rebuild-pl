import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import { OceanMarquee, OceanMarqueeItem } from '../components/ui/OceanMarquee';
import TestimonialTerminal from '../components/TestimonialTerminal';
import ProcessFlow from '../components/ProcessFlow';
import StrategicPillars from '../components/StrategicPillars';
import ScrollProgress from '../components/ui/ScrollProgress';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';
import SectionDivider from '../components/ui/SectionDivider';
import TerminalBlock from '../components/ui/TerminalBlock';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import { GALLERY_MANIFESTS } from '../data/config';

// Lazy-load heavy visuals to reduce main-thread blocking on initial load
const FloatingParticles = React.lazy(() => import('../components/ui/FloatingParticles'));
const BentoGrid = React.lazy(() =>
  import('../components/ui/BentoGrid').then((mod) => ({ default: mod.BentoGrid }))
);
const BentoCard = React.lazy(() =>
  import('../components/ui/BentoGrid').then((mod) => ({ default: mod.BentoCard }))
);
const TechProfile = React.lazy(() => import('../components/TechProfile'));
const CurrentlyWorkingOn = React.lazy(() => import('../components/CurrentlyWorkingOn'));

// Toolkit logos for the partner carousel
const toolkitLogos = [
  { name: 'WordPress', src: '/images/tech-icons/wordpress.svg', caption: 'CMS & Development' },
  { name: 'React', src: '/images/tech-icons/react.svg', caption: 'Frontend Framework' },
  { name: 'JavaScript', src: '/images/tech-icons/javascript.svg', caption: 'Core Language' },
  { name: 'HubSpot', src: '/images/tech-icons/hubspot.svg', caption: 'CRM Automation' },
  { name: 'FluentCRM', src: '/images/tech-icons/fluentcrm.svg', caption: 'Email Automation' },
  { name: 'WP Fusion', src: '/images/tech-icons/wp-fusion.svg', caption: 'CRM Integration' },
  { name: 'LearnDash', src: '/images/tech-icons/learndash.svg', caption: 'LMS Platform' },
  { name: 'WooCommerce', src: '/images/tech-icons/woocommerce.svg', caption: 'E-commerce' },
  { name: 'Google Analytics', src: '/images/tech-icons/google-analytics.svg', caption: 'Analytics' },
  { name: 'Google Tag Manager', src: '/images/tech-icons/gtm.svg', caption: 'Tag Management' },
  { name: 'Mapbox', src: '/images/tech-icons/mapbox.svg', caption: 'Maps & Location' },
  { name: 'Cloudflare Workers', src: '/images/tech-icons/cloudflare.svg', caption: 'Serverless' },
  { name: 'Cloudflare CDN', src: '/images/tech-icons/cloudflare.svg', caption: 'CDN & Performance' },
  { name: 'WP Rocket', src: '/images/tech-icons/wp-rocket.svg', caption: 'Performance' },
  { name: 'LiteSpeed', src: '/images/tech-icons/litespeed.svg', caption: 'Web Server' },
  { name: 'ACF Pro', src: '/images/tech-icons/acf.svg', caption: 'Custom Fields' },
  { name: 'FacetWP', src: '/images/tech-icons/facetwp.svg', caption: 'Search & Filter' },
  { name: 'Figma', src: '/images/tech-icons/figma.svg', caption: 'Design Tool' },
  { name: 'Adobe Creative Suite', src: '/images/tech-icons/adobe.svg', caption: 'Creative Tools' },
  { name: 'Canva', src: '/images/tech-icons/canva.svg', caption: 'Design Tool' },
  { name: 'Photoshop', src: '/images/tech-icons/photoshop.svg', caption: 'Image Editing' },
];

interface AssetCounts {
  photo?: number;
  design?: number;
}

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

  return (
    <OceanAuroraBackground className="bg-brand-dark" style={{ minHeight: '100vh', height: 'auto' }}>
      <ScrollProgress />
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <Suspense fallback={<div className="h-24" />}>
            <FloatingParticles count={30} />
          </Suspense>
          <div className="max-w-7xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <p className="text-sm font-mono uppercase tracking-[0.2em] text-brand-muted">
                Marketing Director + Developer + Automation Architect
              </p>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight"
              >
                I Build Marketing Systems that{' '}
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
                className="text-lg md:text-xl text-brand-muted mt-4 max-w-3xl"
              >
                Spanning strategy, development, and automation—I architect end-to-end marketing engines that drive measurable growth.
              </motion.p>
            </motion.div>

            <Suspense fallback={<div className="h-96 w-full animate-pulse bg-brand-dark/50" />}>
              <BentoGrid className="auto-rows-[minmax(220px,_1fr)]">
                <BentoCard span="2" rowSpan="2" className="p-0">
                  <SystemTerminal counts={counts} />
                </BentoCard>

                <BentoCard span="2" rowSpan="2" className="flex flex-col">
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
                    <Suspense fallback={<div className="h-24 w-full animate-pulse bg-brand-dark/50" />}>
                      <TechProfile size="lg" className="mx-auto" />
                    </Suspense>
                  </div>
                </BentoCard>

                <BentoCard span="2" rowSpan="1" className="flex flex-col justify-center">
                  <AssetMonitor counts={counts} />
                </BentoCard>

                <BentoCard span="2" rowSpan="1" className="flex flex-col justify-center">
                  <QuickActions />
                </BentoCard>
              </BentoGrid>
            </Suspense>

            <div className="rounded-2xl border border-brand-teal/20 bg-brand-surface/50 backdrop-blur-md p-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wide text-brand-muted">
                    Comprehensive Toolkit
                  </span>
                  <p className="text-brand-text text-lg font-semibold">Technologies & Platforms</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-brand-surface/70 border border-brand-teal/20 text-xs text-brand-muted">
                  Infinite scroll - Hover to pause
                </div>
              </div>
              <OceanMarquee speed={28} pauseOnHover className="py-4">
                {toolkitLogos.map((tool) => (
                  <OceanMarqueeItem key={tool.name}>
                    <motion.div
                      className="flex flex-col items-center justify-center h-20 w-32 mx-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                      whileHover={{ scale: 1.05, y: -4 }}
                    >
                      <img
                        src={tool.src}
                        alt={tool.name}
                        className="max-h-12 max-w-full object-contain mb-1"
                        onError={(e) => {
                          // Fallback to text if image doesn't exist
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.tool-fallback')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'tool-fallback text-xs text-brand-muted text-center';
                            fallback.textContent = tool.name;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                      <span className="text-[10px] text-brand-muted mt-1 text-center">{tool.caption}</span>
                    </motion.div>
                  </OceanMarqueeItem>
                ))}
              </OceanMarquee>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Comprehensive Toolkit Section */}
        <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
                A Comprehensive Toolkit
              </h2>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Spanning strategy, development, and automation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Strategy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-6 hover:border-brand-teal/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-brand-text mb-4">Strategy</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-brand-muted mb-2">Skills</p>
                    <ul className="space-y-2 text-sm text-brand-muted">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-teal mt-1">•</span>
                        <span>Strategic Marketing & Leadership</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-teal mt-1">•</span>
                        <span>Brand Strategy & Transformation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-teal mt-1">•</span>
                        <span>Content Strategy & Technical SEO</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-teal mt-1">•</span>
                        <span>Team Leadership & Cross-Functional Collaboration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Automation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-6 hover:border-brand-teal/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-brand-text mb-4">Automation</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-brand-muted mb-2">Skills</p>
                    <ul className="space-y-2 text-sm text-brand-muted">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-teal mt-1">•</span>
                        <span>CRM Architecture & Automation (HubSpot, FluentCRM, WP Fusion)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Analytics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-6 hover:border-brand-teal/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-brand-text mb-4">Analytics</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-brand-muted mb-2">Skills</p>
                    <ul className="space-y-2 text-sm text-brand-muted">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-teal mt-1">•</span>
                        <span>Data Analytics & Attribution Modeling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-teal mt-1">•</span>
                        <span>Custom Analytics Dashboards (GA4, GTM, Mapbox)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-6 hover:border-brand-teal/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-brand-text mb-4">Development</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-brand-muted mb-2">Skills</p>
                    <ul className="space-y-2 text-sm text-brand-muted">
                      <li className="flex items-start gap-2">
                        <span className="text-brand-teal mt-1">•</span>
                        <span>Full-Stack Web Development (WordPress, JavaScript, React)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-brand-teal mt-1">•</span>
                        <span>Serverless Development (Cloudflare Workers)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tools Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-brand-text">Tools Stack</h3>
                <Link
                  to="/toolbox"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-teal/40 text-brand-text hover:border-brand-teal hover:bg-brand-teal/10 transition-all text-sm"
                >
                  <span>Explore Full Toolbox</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  'WordPress', 'JavaScript', 'React', 'HubSpot', 'FluentCRM', 'WP Fusion', 'LearnDash',
                  'WooCommerce', 'Google Analytics', 'Google Tag Manager', 'Mapbox', 'Cloudflare Workers',
                  'Cloudflare CDN', 'WP Rocket', 'LiteSpeed', 'ACF Pro', 'FacetWP', 'Figma',
                  'Adobe Creative Suite', 'Canva', 'Photoshop'
                ].map((tool) => (
                  <div
                    key={tool}
                    className="text-center p-3 rounded-lg bg-brand-dark/50 border border-brand-muted/10 hover:border-brand-teal/30 transition-all"
                  >
                    <p className="text-sm text-brand-muted">{tool}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* Currently Working On Section */}
        <section className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="h-64 animate-pulse bg-slate-900/50 rounded-2xl" />}>
              <CurrentlyWorkingOn />
            </Suspense>
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

interface AssetMonitorProps {
  counts: AssetCounts;
}

const AssetMonitor: React.FC<AssetMonitorProps> = ({ counts }) => {
  const items = [
    { label: 'Photography', count: counts.photo ?? 0 },
    { label: 'Design', count: counts.design ?? 0 },
  ];

  return (
    <div className="rounded-lg border border-brand-teal/30 bg-slate-900/80 p-4 backdrop-blur">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-muted">Asset Monitor</p>
        <span className="inline-flex items-center gap-2 text-xs text-brand-muted">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-md border border-white/10 bg-slate-950/60 px-3 py-2 shadow-soft-dark"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-brand-muted">{item.label}</p>
            <div className="mt-1 flex items-baseline gap-1 font-mono text-brand-text">
              <OceanCountingNumber number={item.count} />
              <span className="text-xs text-brand-muted">Items</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickActions: React.FC = () => {
  const actions = [
    { label: 'Case Studies', href: '/case-studies', tone: 'primary' as const },
    { label: 'Services', href: '/services', tone: 'secondary' as const },
    { label: 'Resume', href: '/resume', tone: 'secondary' as const },
    { label: 'Contact', href: '/contact', tone: 'accent' as const },
  ];

  const toneClasses = {
    primary: 'bg-brand-teal text-slate-900 shadow-accent hover:brightness-110',
    secondary: 'border border-brand-teal/40 text-brand-text hover:border-brand-teal',
    accent: 'bg-[#FFA500] text-slate-900 hover:brightness-110',
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((action) => (
        <Link
          key={action.label}
          to={action.href}
          className={`flex items-center justify-between rounded-lg px-4 py-3 font-semibold transition ${toneClasses[action.tone]}`}
        >
          <span>{action.label}</span>
          <ArrowRight size={16} />
        </Link>
      ))}
    </div>
  );
};

export default Home;
