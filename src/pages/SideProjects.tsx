import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, Tag, Filter, Palette } from 'lucide-react';
import sideProjectsData from '../data/side-projects-structured.json';

// Try to derive a logo image from /images/side-projects when a project has no images
const getFallbackLogoForSlug = (slug: string): string[] => {
  const base = `/images/side-projects/${slug}`;
  // Common extensions we ship in public/images/side-projects
  return [
    `${base}.svg`,
    `${base}.webp`,
    `${base}.avif`,
    `${base}.png`,
    `${base}.jpg`,
  ];
};

gsap.registerPlugin(ScrollTrigger);

const SideProjects: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    // Hero parallax animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelector('.hero-content'),
        {
          opacity: 0,
          y: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      );
    }

    // Grid items stagger animation
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.project-card');

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotateX: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, []);

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as Easing },
    },
  };

  const cardHoverVariants: Variants = {
    hover: {
      y: -8,
      scale: 1.02,
      rotateY: 2,
      transition: { duration: 0.4, ease: 'easeOut' as Easing },
    },
  };

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return sideProjectsData.projects;
    if (activeFilter === 'Logo Design')
      return sideProjectsData.projects.filter(p => p.logoOnly === true);
    return sideProjectsData.projects.filter(
      p =>
        p.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
        p.services.some(s => s.toLowerCase().includes(activeFilter.toLowerCase()))
    );
  }, [activeFilter]);

  // Get unique categories for filter buttons
  const categories = useMemo(() => {
    const cats = [...new Set(sideProjectsData.projects.map(p => p.category))];
    return ['All', 'Logo Design', ...cats].slice(0, 6); // Limit to 6 for UI
  }, []);

  return (
  <motion.div
    className="side-projects-page bg-[var(--ink-900)] text-[var(--parchment-050)]"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Cinematic Hero Section */}
    <section className="side-projects-hero relative overflow-hidden py-16 md:py-20" ref={heroRef}>
      <div className="hero-background absolute inset-0">
          <div className="hero-gradient"></div>
          <div className="hero-particles"></div>
        </div>

      <div className="hero-content relative container mx-auto px-6">
          <motion.div
          className="hero-text max-w-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
          <h1 className="hero-title font-display text-4xl md:text-5xl font-bold tracking-tight">
              Marketing
            <span className="gradient-text text-[var(--signal-500)]"> Services</span>
            </h1>
          <p className="hero-subtitle mt-4 text-lg md:text-xl text-[var(--parchment-050)]/70">
              Contract marketing, branding, and design projects across diverse industries. From
              healthcare to hospitality, e-commerce to non-profits—each project delivered with
              strategic insight and creative excellence as an independent contractor.
            </p>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="stat-item">
              <span className="stat-number">{sideProjectsData.projects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {sideProjectsData.projects.filter(p => p.logoOnly).length}
              </span>
              <span className="stat-label">Logo Designs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{sideProjectsData.metadata.categories.length}</span>
              <span className="stat-label">Industries</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
    <section className="projects-grid-section py-12">
      <div className="container mx-auto px-6">
          <motion.div
          className="section-header mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
          <h2 className="text-2xl md:text-3xl font-semibold">Contract Projects</h2>
          <p className="text-[var(--parchment-050)]/70 mt-2">
              Strategic marketing, branding, and design solutions delivered as an independent
              contractor across diverse industries and business types.
            </p>
          </motion.div>

          {/* Filter Bar */}
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
                {categories.map(category => (
                  <button
                    key={category}
                  className={`filter-button ${activeFilter === category ? 'active' : ''} px-3 py-1.5 rounded-full border border-[var(--ink-700)]/60 text-sm hover:border-[var(--signal-500)]/60 transition`}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category === 'Logo Design' && <Palette size={14} />}
                    <span>{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        <div className="projects-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3" ref={gridRef}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                variants={cardHoverVariants}
                whileHover="hover"
              >
                <Link to={`/side-projects/${project.slug}`} className="card-link">
                <div className="card-image relative overflow-hidden rounded-xl border border-[var(--ink-700)]/60">
                  {(() => {
                    const primary = project.images && project.images.length > 0 ? project.images[0] : null;
                    const fallbacks = getFallbackLogoForSlug(project.slug);
                    const candidates = primary ? [primary, ...fallbacks] : fallbacks;
                    // Render first candidate; rely on browser cache + onError to move to next via srcset-like manual swap
                    // Simple approach: use first candidate and let overlay/placeholder show if it fails
                    return primary ? (
                      <img src={primary} alt={project.title} loading="lazy" className="w-full h-56 object-cover" />
                    ) : (
                      <picture>
                        <source srcSet={candidates[0]} />
                        <img src={candidates[0]} alt={project.title} loading="lazy" className="w-full h-56 object-contain p-6 bg-[var(--ink-800)]" />
                      </picture>
                    );
                  })()}
                    <div className="card-overlay">
                      <div className="overlay-content">
                        <ExternalLink size={24} />
                        <span>View Case Study</span>
                      </div>
                    </div>
                  </div>

                <div className="card-content p-4">
                    <div className="card-meta">
                      <div className="category-row">
                        <span className="category">{project.category}</span>
                        {project.logoOnly && (
                        <span className="logo-badge inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[var(--signal-500)]/10 text-[var(--signal-500)]">
                            <Palette size={12} />
                            Logo Only
                          </span>
                        )}
                      </div>
                      <div className="meta-items">
                        <div className="meta-item">
                          <Calendar size={14} />
                          <span>{project.year}</span>
                        </div>
                        <div className="meta-item">
                          <Tag size={14} />
                          <span>{project.services[0] || 'Logo Design'}</span>
                        </div>
                      </div>
                    </div>

                  <h3 className="card-title text-lg font-semibold mt-2">{project.title}</h3>
                  <p className="card-description text-[var(--parchment-050)]/70 mt-1">{project.challenge}</p>

                  <div className="card-tags mt-3 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag text-xs px-2 py-1 rounded-full bg-[var(--ink-800)] border border-[var(--ink-700)]/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
        <Link to="/contact" className="cta-button inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold">
            <span>Start a Conversation</span>
            <ExternalLink size={20} />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default SideProjects;
