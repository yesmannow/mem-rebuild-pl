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
                Marketing Director + Technologist
              </p>
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
    { label: 'View Work', href: '/case-studies', tone: 'primary' as const },
    { label: 'Open Terminal', href: '/war-room', tone: 'secondary' as const },
    { label: 'Contact', href: '/contact', tone: 'accent' as const },
  ];

  const toneClasses = {
    primary: 'bg-brand-teal text-slate-900 shadow-accent hover:brightness-110',
    secondary: 'border border-brand-teal/40 text-brand-text hover:border-brand-teal',
    accent: 'bg-[#FFA500] text-slate-900 hover:brightness-110',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
