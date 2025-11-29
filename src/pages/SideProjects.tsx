import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Filter, Sparkles, Palette, Compass, Layers, LineChart, Tag as TagIcon, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sideProjects } from '../data/sideProjects';
import { SideProjectCard, SideProjectCardData } from '../components/ui/SideProjectCard';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';
import SectionDivider from '../components/ui/SectionDivider';
import { SpotlightCard } from '../components/ui/SpotlightCard';

/**
 * Side Projects Page - Independent Studio Vault
 *
 * A modern showcase of side projects matching the Studio page design:
 * - Deep Slate background matching Studio
 * - 3D tilt cards with spotlight effects
 * - Category filtering
 * - Stats and insights
 * - Tag cloud visualization
 */
const SideProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>(sideProjects.map((p) => p.category));
    return ['All', ...Array.from(set).sort()];
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
    const projects = activeFilter === 'All'
      ? sideProjects
      : sideProjects.filter((p) => p.category === activeFilter);

    return projects.map((p): SideProjectCardData => ({
      id: p.id,
      title: p.title,
      slug: p.id,
      image: p.image,
      category: p.category,
      tags: p.tags,
      year: p.year,
      description: p.description,
    }));
  }, [activeFilter]);

  const heroStats = [
    { label: 'Side Projects', value: sideProjects.length },
    { label: 'Categories', value: categories.length - 1 },
    { label: 'Focus Areas', value: uniqueTagsCount },
    { label: 'Archive Span', text: yearSpanLabel },
  ];

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

  return (
    <>
      <Helmet>
        <title>Side Projects | Independent Studio Vault</title>
        <meta
          name="description"
          content="Modern side projects engineered with the same care as flagship launches. Branding, packaging, retail campaigns, and digital experiments."
        />
      </Helmet>

      {/* Deep Slate Background - Matching Studio page */}
      <div className="min-h-screen bg-slate-900 relative">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 pointer-events-none" />

        {/* Main Content */}
        <main className="relative z-10 pt-24 pb-32 px-4 sm:px-6 lg:px-8">
          <section className="max-w-6xl mx-auto">
            {/* Header Section - Matching Studio */}
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-brand-teal/70 mb-6">
                <Sparkles size={14} />
                Independent Studio Vault
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                <AnimatedGradientText text="Side Projects" className="text-5xl md:text-6xl font-bold" />
              </h1>
              <motion.p
                className="text-lg text-slate-400 max-w-2xl mx-auto mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Modern side projects engineered with the same care as flagship launches.
                <span className="block mt-1 text-slate-500 text-sm font-mono">
                  Branding, packaging, retail campaigns, and digital experiments.
                </span>
              </motion.p>

              <motion.div
                className="intro-section max-w-3xl mx-auto text-left bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <p className="text-slate-300 leading-relaxed mb-4">
                  This collection showcases independent projects built between enterprise deployments. Each piece represents
                  a blend of strategic thinking and creative execution—from brand identity systems to digital products.
                  Scroll through cinematic cards, filter by focus, and explore the tooling behind each build.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <span className="px-3 py-1 bg-brand-teal/20 border border-brand-teal/30 rounded-full text-sm text-brand-teal">
                    Brand Systems
                  </span>
                  <span className="px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 rounded-full text-sm text-brand-orange">
                    Digital Products
                  </span>
                  <span className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-sm text-slate-300">
                    Community & Retail
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Experience Pillars */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {experiencePillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <SpotlightCard key={pillar.id} className="p-5">
                    <div className="flex items-center gap-3 text-sm uppercase tracking-wide text-brand-teal/70 mb-3">
                      <span className="rounded-full bg-brand-teal/15 p-2 text-brand-teal">
                        <Icon size={18} />
                      </span>
                      {pillar.title}
                    </div>
                    <p className="text-sm text-slate-300">{pillar.description}</p>
                  </SpotlightCard>
                );
              })}
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {heroStats.map((stat) => (
                <SpotlightCard key={stat.label} className="p-4 text-center">
                  {stat.value !== undefined ? (
                    <OceanCountingNumber
                      number={stat.value}
                      className="text-3xl md:text-4xl font-semibold text-white mb-2"
                    />
                  ) : (
                    <span className="text-3xl md:text-4xl font-semibold text-white mb-2 block">
                      {stat.text}
                    </span>
                  )}
                  <p className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</p>
                </SpotlightCard>
              ))}
            </motion.div>

            <SectionDivider />

            {/* Filter Section */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard className="p-6 md:p-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        <Filter size={14} />
                        Filter by focus
                      </p>
                      <p className="text-lg font-semibold text-white">
                        Browse {sideProjects.length} cinematic cards by discipline.
                      </p>
                    </div>
                    <p className="text-sm text-slate-400">
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
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition touch-target ${
                            isActive
                              ? 'border-brand-teal/60 bg-brand-teal/20 text-white shadow-lg shadow-brand-teal/20'
                              : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/30'
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
              </SpotlightCard>
            </motion.section>

            {/* Category Intel Cards */}
            {topCategories.length > 0 && (
              <motion.section
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topCategories.map((category) => (
                    <SpotlightCard key={category.label} className="p-6">
                      <div className="flex items-center gap-3 text-sm uppercase tracking-wide text-slate-400 mb-4">
                        <span className="rounded-full bg-brand-orange/10 p-2 text-brand-orange">
                          <LineChart size={16} />
                        </span>
                        {category.label}
                      </div>
                      <OceanCountingNumber
                        number={category.count}
                        className="text-4xl font-semibold text-white mb-2"
                      />
                      <p className="text-sm text-slate-400">
                        {categoryDescriptions[category.label] ?? 'Multi-channel experiments.'}
                      </p>
                    </SpotlightCard>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Projects Grid */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">The Vault</p>
                <h2 className="text-3xl font-semibold text-white mb-2">Interactive Gallery</h2>
                <p className="text-sm text-slate-400 max-w-xl">
                  Cards tilt, shimmer, and surface brand palettes. Hover to feel the same kinetic energy as the rest of the site.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <SideProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </motion.section>

            <SectionDivider />

            {/* Tag Cloud */}
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard spotlightColor="rgba(255, 165, 0, 0.3)" className="p-6 md:p-10">
                <div className="space-y-6">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-brand-teal/15 p-3 text-brand-teal">
                        <TagIcon size={20} />
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Stack & Tooling</p>
                        <p className="text-lg font-semibold text-white">
                          Tags aggregated from {sideProjects.length} explorations.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">
                      Quick glance at the skills that repeat across the vault.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {tagHighlights.map((tag) => (
                      <motion.span
                        key={tag.tag}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-4 py-2 text-sm font-semibold text-white touch-target"
                      >
                        {tag.tag}
                        <span className="text-xs text-brand-teal/80">+{tag.count}</span>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.section>

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard className="p-8 text-center max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold text-white mb-3">Need a similar build?</h2>
                <p className="text-base text-slate-300 mb-6">
                  From napkin sketch to launch campaign, we can port this modern workflow into your next
                  launch. Tell me about the constraints and I will show you a matching playbook.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-orange/30 touch-target"
                >
                  Start a Conversation
                  <ExternalLink size={18} />
                </Link>
              </SpotlightCard>
            </motion.section>
          </section>
        </main>
      </div>
    </>
  );
};

export default SideProjects;
