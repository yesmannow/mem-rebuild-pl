import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar, Tag, Filter, Palette } from 'lucide-react';
import sideProjectsData from '../data/side-projects-structured.json';
import './SideProjects.css';

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
      className="side-projects-page"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Cinematic Hero Section */}
      <section className="side-projects-hero" ref={heroRef}>
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-particles"></div>
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="hero-title">
              Marketing
              <span className="gradient-text"> Services</span>
            </h1>
            <p className="hero-subtitle">
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
      <section className="projects-grid-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Contract Projects</h2>
            <p>
              Strategic marketing, branding, and design solutions delivered as an independent
              contractor across diverse industries and business types.
            </p>
          </motion.div>

          {/* Filter Bar */}
          <motion.div
            className="filter-bar"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="filter-bar-content">
              <div className="filter-label">
                <Filter size={18} />
                <span>Filter:</span>
              </div>
              <div className="filter-buttons">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`filter-button ${activeFilter === category ? 'active' : ''}`}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category === 'Logo Design' && <Palette size={14} />}
                    <span>{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="projects-grid" ref={gridRef}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                variants={cardHoverVariants}
                whileHover="hover"
              >
                <Link to={`/side-projects/${project.slug}`} className="card-link">
                  <div className="card-image">
                    {project.images && project.images.length > 0 ? (
                      <img src={project.images[0]} alt={project.title} loading="lazy" />
                    ) : (
                      <div className="card-image-placeholder">
                        <Palette size={48} />
                        <span>Logo Design</span>
                      </div>
                    )}
                    <div className="card-overlay">
                      <div className="overlay-content">
                        <ExternalLink size={24} />
                        <span>View Case Study</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="card-meta">
                      <div className="category-row">
                        <span className="category">{project.category}</span>
                        {project.logoOnly && (
                          <span className="logo-badge">
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

                    <h3 className="card-title">{project.title}</h3>
                    <p className="card-description">{project.challenge}</p>

                    <div className="card-tags">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">
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
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Your Project?</h2>
          <p>
            Let's create something extraordinary together. From concept to completion, I bring
            strategic thinking and creative execution to every project.
          </p>
          <Link to="/contact" className="cta-button">
            <span>Start a Conversation</span>
            <ExternalLink size={20} />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default SideProjects;
