import React, { useMemo, useState } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, Tag, Filter, Palette } from 'lucide-react';
import { sideProjects } from '../data/sideProjects';
import { SideProject } from '../types';
import ProjectVault from '../components/ui/ProjectVault';

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

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as Easing },
  },
};

const mapToVaultProjects = (projects: SideProject[]): VaultProject[] =>
  projects.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.id,
    category: p.category,
    tags: p.tags,
    images: [p.image],
    year: p.year,
  }));

const SideProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set<string>(sideProjects.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return mapToVaultProjects(sideProjects);
    return mapToVaultProjects(sideProjects.filter((p) => p.category === activeFilter));
  }, [activeFilter]);

  return (
    <motion.div
      className="side-projects-page bg-[var(--ink-900)] text-[var(--parchment-050)]"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <section className="side-projects-hero relative overflow-hidden py-16 md:py-20">
        <div className="hero-background absolute inset-0">
          <div className="hero-gradient" />
          <div className="hero-particles" />
        </div>

        <div className="hero-content relative container mx-auto px-6">
          <motion.div
            className="hero-text max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="hero-title font-display text-4xl md:text-5xl font-bold tracking-tight">
              The Vault
              <span className="gradient-text text-[var(--signal-500)]"> — Side Projects</span>
            </h1>
            <p className="hero-subtitle mt-4 text-lg md:text-xl text-[var(--parchment-050)]/70">
              11 detailed branding, product, and web engagements with filters to explore by category.
            </p>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="stat-item">
              <span className="stat-number">{sideProjects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Independent</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Multi</span>
              <span className="stat-label">Industries</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="projects-grid-section py-12">
        <div className="container mx-auto px-6">
          <motion.div
            className="section-header mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold">Case Studies Vault</h2>
            <p className="text-[var(--parchment-050)]/70 mt-2">
              Filter by category to browse the 11 cinematic side projects.
            </p>
          </motion.div>

          <motion.div
            className="filter-bar sticky top-16 z-10 bg-[var(--ink-900)]/80 backdrop-blur-md border border-[var(--ink-700)] rounded-xl p-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="filter-bar-content">
              <div className="filter-label flex items-center gap-2 text-[var(--parchment-050)]/70">
                <Filter size={18} />
                <span>Filter:</span>
              </div>
              <div className="filter-buttons flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-button ${
                      activeFilter === category ? 'active' : ''
                    } px-3 py-1.5 rounded-full border border-[var(--ink-700)]/60 text-sm hover:border-[var(--signal-500)]/60 transition`}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category === 'Logo Design' && <Palette size={14} />}
                    <span>{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div>
            <ProjectVault projects={filteredProjects} />
          </div>
        </div>
      </section>

      <section className="cta-section container mx-auto px-6 py-16">
        <motion.div
          className="cta-content rounded-2xl border border-[var(--ink-700)] bg-[var(--ink-800)]/40 p-8 md:p-10 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold">Ready to Start Your Project?</h2>
          <p className="text-[var(--parchment-050)]/70 mt-2">
            Let's create something extraordinary together. From concept to completion, I bring
            strategic thinking and creative execution to every project.
          </p>
          <Link
            to="/contact"
            className="cta-button inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold"
          >
            <span>Start a Conversation</span>
            <ExternalLink size={20} />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default SideProjects;
