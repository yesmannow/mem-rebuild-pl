import React, { useMemo, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Filter,
  Palette,
  Sparkles,
  Compass,
  Layers,
  LineChart,
  Tag as TagIcon,
} from 'lucide-react';
import { sideProjects } from '../data/sideProjects';
import { SideProject } from '../types';
import ProjectVault from '../components/ui/ProjectVault';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { OceanGradientAnimation } from '../components/ui/OceanGradientAnimation';
import FloatingParticles from '../components/ui/FloatingParticles';
import GlowEffect from '../components/ui/GlowEffect';
import './SideProjects.css';

type VaultProject = {
  id: string;
  title: string;
  slug: string;
  images: string[];
  category?: string;
  tags?: string[];
  year?: string;
  featured?: boolean;
};

const projectLogoOverrides: Record<string, string[]> = {
  'primary-care-indy': [
    '/images/projects/Primarycare Indy/Primary Care Logo with PMC.webp',
    '/images/projects/Primarycare Indy/Primary Care Logo with PMC.png',
  ],
  '317-bbq': ['/images/projects/317 bbq/317BBQLogo_wht.webp'],
  'taco-ninja': ['/images/projects/Taco Ninja/taco ninja logo.webp'],
  'perpetual-fitness': [
    '/images/projects/Perpetual Movement Fitness/Perpetual Movement Fitness - Primary Logo TM.webp',
  ],
  'tbm-strategy': ['/images/projects/Tuohy Bailey & Moore LLP/TBM-Small-1.webp'],
};

const experiencePillars = [
  {
    id: 'brand',
    title: 'Brand Systems',
    description: 'Logos, signage, and complete identity systems for owners who need polish fast.',
    icon: Palette,
  },
  {
    id: 'product',
    title: 'Digital Product',
    description: 'Web builds, booking flows, and responsive prototypes instrumented with telemetry.',
    icon: Compass,
  },
  {
    id: 'community',
    title: 'Community & Retail',
    description: 'Pop-ups, hospitality menus, fundraising campaigns, and social-ready collateral.',
    icon: Layers,
  },
] as const;

const categoryDescriptions: Record<string, string> = {
  Branding: 'Identity refreshes, packaging, signage, and experience roll-outs.',
  'Web Design': 'Conversion-tuned responsive builds, CMS handoffs, and SEO updates.',
  Strategy: 'Playbooks, naming exercises, and cross-channel governance.',
  Product: 'Packaging systems, regulatory copy, and fulfillment-driven assets.',
  Retail: 'Launch campaigns, physical collateral, and loyalty activations.',
  Lifestyle: 'Minimalist marks and systems for calm, everyday rituals.',
  'Logo Design': 'Standalone marks and mascots with merch-ready fidelity.',
  'Non-Profit': 'Community campaigns with sponsorship tiers and reporting.',
};

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const mapToVaultProjects = (projects: SideProject[]): VaultProject[] =>
  projects.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.id,
    category: p.category,
    tags: p.tags,
    images: projectLogoOverrides[p.id] ?? [p.image],
    year: p.year,
  }));

const SideProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>(sideProjects.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, []);

  const categoryBreakdown = useMemo(() => {
    const counts = sideProjects.reduce<Record<string, number>>((acc, project) => {
      acc[project.category] = (acc[project.category] ?? 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const topCategories = useMemo(() => categoryBreakdown.slice(0, 3), [categoryBreakdown]);

  const uniqueTagsCount = useMemo(() => {
    const set = new Set<string>();
    sideProjects.forEach((project) => project.tags.forEach((tag) => set.add(tag)));
    return set.size;
  }, []);

  const tagHighlights = useMemo(() => {
    const counts = new Map<string, number>();
    sideProjects.forEach((project) => {
      project.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1));
    });

    return Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, []);

  const yearSpanLabel = useMemo(() => {
    const years = sideProjects
      .map((project) => Number(project.year))
      .filter((year) => !Number.isNaN(year))
      .sort((a, b) => a - b);

    if (!years.length) return 'On-going';
    const first = years[0];
    const last = years[years.length - 1];
    return first === last ? `${first}` : `${first} – ${last}`;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return mapToVaultProjects(sideProjects);
    return mapToVaultProjects(sideProjects.filter((p) => p.category === activeFilter));
  }, [activeFilter]);

  const heroStats = [
    { label: 'Side Projects', value: sideProjects.length },
    { label: 'Categories', value: categories.length - 1 },
    { label: 'Focus Areas', value: uniqueTagsCount },
    { label: 'Archive Span', text: yearSpanLabel },
  ];

  return (
    <motion.div
      className="side-projects-page relative overflow-hidden text-[var(--parchment-050)]"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <OceanGradientAnimation
        containerClassName="relative overflow-hidden"
        className="relative z-10 px-6 py-24"
        interactive
        size="70%"
        blendingValue="soft-light"
      >
        <motion.section
          className="mx-auto flex max-w-6xl flex-col gap-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-parchment-50/70">
            <Sparkles size={14} />
            Independent Studio Vault
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-4xl leading-tight text-white md:text-5xl">
              Modern side projects engineered with the same care as flagship launches.
            </h1>
            <p className="max-w-3xl text-base text-parchment-50/80 md:text-lg">
              Branding, packaging, retail campaigns, and digital experiments that kept skills sharp
              between enterprise deployments. Scroll through cinematic cards, filter by focus, and
              tap into the tooling behind each build.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {experiencePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="studio-pillars-card relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center gap-3 text-sm uppercase tracking-wide text-parchment-50/70">
                    <span className="rounded-full bg-brand-teal/15 p-2 text-brand-teal">
                      <Icon size={18} />
                    </span>
                    {pillar.title}
                  </div>
                  <p className="mt-3 text-sm text-parchment-50/80">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl"
                whileHover={{ y: -4 }}
              >
                {stat.value !== undefined ? (
                  <AnimatedCounter
                    value={stat.value}
                    className="text-3xl font-semibold text-white md:text-4xl"
                  />
                ) : (
                  <span className="text-3xl font-semibold text-white md:text-4xl">{stat.text}</span>
                )}
                <p className="mt-2 text-xs uppercase tracking-wide text-parchment-50/70">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <FloatingParticles count={30} className="opacity-60" />
      </OceanGradientAnimation>

      <section className="relative z-10 px-6 py-12">
        <motion.div
          className="side-projects-filter relative overflow-hidden rounded-[30px] border border-white/10 p-6 md:p-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <GlowEffect intensity="low" />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-parchment-50/70">
                  <Filter size={14} />
                  Filter by focus
                </p>
                <p className="text-lg font-semibold text-white">
                  Browse {sideProjects.length} cinematic cards by discipline.
                </p>
              </div>
              <p className="text-sm text-parchment-50/70">
                Each filter rehydrates the vault grid below. Tap a chip to re-order the showcase.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? 'border-brand-teal/60 bg-brand-teal/20 text-white shadow-accent'
                        : 'border-white/10 bg-white/5 text-parchment-50/80 hover:border-white/30'
                    }`}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category === 'Logo Design' && <Palette size={14} />}
                    <span>{category}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 pb-8">
        <motion.div
          className="grid gap-4 md:grid-cols-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {topCategories.map((category) => (
            <motion.div
              key={category.label}
              whileHover={{ y: -6 }}
              className="category-intel-card relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 text-sm uppercase tracking-wide text-parchment-50/70">
                <span className="rounded-full bg-brand-orange/10 p-2 text-brand-orange">
                  <LineChart size={16} />
                </span>
                {category.label}
              </div>
              <AnimatedCounter
                value={category.count}
                className="mt-4 text-4xl font-semibold text-white"
              />
              <p className="mt-2 text-sm text-parchment-50/80">
                {categoryDescriptions[category.label] ?? 'Multi-channel experiments.'}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="relative z-10 px-6 pb-12">
        <div className="project-vault-shell relative overflow-hidden rounded-[30px] border border-white/10 bg-black/30 p-6 md:p-10">
          <GlowEffect intensity="low" />
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-parchment-50/70">The Vault</p>
                <h2 className="text-3xl font-semibold text-white">Interactive gallery</h2>
              </div>
              <p className="max-w-xl text-sm text-parchment-50/70">
                Cards tilt, shimmer, and surface brand palettes inside ProjectVault. Hover to feel
                the same kinetic energy as the rest of the site.
              </p>
            </div>
            <ProjectVault projects={filteredProjects} />
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-16">
        <motion.div
          className="side-projects-tag-cloud relative overflow-hidden rounded-[30px] border border-white/10 p-6 md:p-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <GlowEffect color="orange" intensity="low" />
          <div className="relative z-10 space-y-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-brand-teal/15 p-3 text-brand-teal">
                  <TagIcon size={20} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-parchment-50/70">
                    Stack & Tooling
                  </p>
                  <p className="text-lg font-semibold text-white">
                    Tags aggregated from {sideProjects.length} explorations.
                  </p>
                </div>
              </div>
              <p className="text-sm text-parchment-50/70">
                Quick glance at the skills that repeat across the vault. It mirrors the modern cards
                used across the rest of the site.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {tagHighlights.map((tag) => (
                <motion.span
                  key={tag.tag}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-4 py-2 text-sm font-semibold text-white"
                >
                  {tag.tag}
                  <span className="text-xs text-brand-teal/80">+{tag.count}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 pb-20">
        <motion.div
          className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-brand-teal/10 p-8 text-center shadow-cta"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-white">Need a similar build?</h2>
          <p className="mt-3 text-base text-parchment-50/80">
            From napkin sketch to launch campaign, we can port this modern workflow into your next
            launch. Tell me about the constraints and I will show you a matching playbook.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 font-semibold text-black transition hover:-translate-y-0.5"
          >
            Start a Conversation
            <ExternalLink size={18} />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default SideProjects;
