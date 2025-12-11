import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { caseStudies, getCategories } from '../data/caseStudies';
import Icon from '../components/Icon';
import { TiltCaseCard } from '../components/ui/TiltCaseCard';
import { Sparkles, TrendingUp, Award } from 'lucide-react';
import MagneticCursor from '../components/ui/MagneticCursor';
import { HeroWithApiBackground } from '../components/layout/PageWithApiBackground';
import { AppBadge } from '../ui/AppBadge';
import './CaseStudies.css';
import './CaseStudiesEnhanced.css';
import './CaseStudiesLandingEnhanced.css';

const CaseStudies: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'recent' | 'featured'>('default');
  const categories = ['All', ...getCategories()];

  const getTechIconSlug = (techName: string): string => {
    const techMap: { [key: string]: string } = {
      React: 'react',
      'Node.js': 'node',
      TypeScript: 'typescript',
      'Tailwind CSS': 'tailwind',
      Vite: 'vite',
      'Git/GitHub': 'github',
      Python: 'python',
      Flask: 'flask',
      FastAPI: 'fastapi',
      Docker: 'docker',
      AWS: 'aws',
      Azure: 'azure',
      PostgreSQL: 'postgres',
      MySQL: 'mysql',
      Redis: 'redis',
      GraphQL: 'graphql',
      PHP: 'php',
      WordPress: 'wordpress',
      'Google Tag Manager': 'gtm',
      GA4: 'ga4',
      JavaScript: 'javascript',
      WooCommerce: 'woocommerce',
      Stripe: 'stripe',
      'Gravity Forms': 'gravityforms',
      ACF: 'acf',
    };
    return techMap[techName] || 'react';
  };

  const filteredStudies = useMemo(() => {
    let filtered = caseStudies;

    if (activeFilter !== 'All') {
      filtered = filtered.filter(study => study.category.includes(activeFilter));
    }

    if (searchTerm) {
      filtered = filtered.filter(
        study =>
          study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.challenge.toLowerCase().includes(searchTerm.toLowerCase()) ||
          study.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'recent') {
      filtered = [...filtered].reverse();
    } else if (sortBy === 'featured') {
      filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [activeFilter, searchTerm, sortBy]);

  const featuredCount = caseStudies.filter(s => s.featured).length;
  const hasActiveFilters = activeFilter !== 'All' || searchTerm.trim().length > 0 || sortBy !== 'default';

  const handleResetFilters = () => {
    setActiveFilter('All');
    setSearchTerm('');
    setSortBy('default');
  };

  return (
    <div className="case-studies-page">
      <MagneticCursor color="#40E0D0" enabled={true} />
      {/* Hero Section - Dark Theme with API Background */}
      <HeroWithApiBackground theme="portfolio,design,creative,work" height="auto">
        <section className="case-studies-hero-section">
          <div className="case-studies-hero-container">
            <div className="case-studies-hero-wrapper">
              <div className="case-studies-hero-content">
              <motion.div
                className="case-studies-hero relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="hero-content-cases">
                  {/* Animated badge with pulse effect */}
                  <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <motion.span
                      className="badge-pulse"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Sparkles size={14} className="badge-icon" />
                    <span>Case Study Portfolio</span>
                  </motion.div>

                  {/* Animated title with stagger effect */}
                  <motion.h1
                    className="case-studies-title"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <span className="title-line">Proven Results. </span>
                    <span className="title-line">Real Impact.</span>
                  </motion.h1>

                <motion.p
                  className="case-studies-subtitle"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Explore detailed case studies showcasing measurable marketing outcomes,
                  technical implementations, and transformative business impact.
                </motion.p>

                {/* Interactive Stats with hover effects */}
                <motion.div
                  className="case-stats"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <motion.div 
                    className="stat-item stat-interactive"
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className="stat-icon-wrapper">
                      <TrendingUp size={18} className="stat-icon" />
                    </div>
                    <motion.div 
                      className="stat-number"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                    >
                      {caseStudies.length}
                    </motion.div>
                    <div className="stat-label">Case Studies</div>
                  </motion.div>
                  <motion.div 
                    className="stat-item stat-interactive stat-featured"
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className="stat-icon-wrapper">
                      <Award size={18} className="stat-icon" />
                    </div>
                    <motion.div 
                      className="stat-number"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
                    >
                      {featuredCount}
                    </motion.div>
                    <div className="stat-label">Featured</div>
                  </motion.div>
                  <motion.div 
                    className="stat-item stat-interactive stat-results"
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <div className="stat-icon-wrapper">
                      <Sparkles size={18} className="stat-icon" />
                    </div>
                    <motion.div 
                      className="stat-number"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.0, type: 'spring', stiffness: 200 }}
                    >
                      100%
                    </motion.div>
                    <div className="stat-label">Real Results</div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      </section>
      </HeroWithApiBackground>

      {/* Main Content Area - Two Column Layout */}
      <main className="case-studies-main">
        <div className="case-studies-content-wrapper">
          {/* Sidebar Filter Section */}
          <section id="filters" className="filter-section">
            <motion.div
              className="filter-controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="results-meta">
                <div>
                  <p className="results-count" aria-live="polite">
                    Showing <span>{filteredStudies.length}</span>{' '}
                    {filteredStudies.length === 1 ? 'case study' : 'case studies'}
                    {activeFilter !== 'All' && <span className="results-filter"> | {activeFilter}</span>}
                  </p>
                  <p className="results-note">Search by industry, filter by focus, or toggle the layout.</p>
                </div>
                {hasActiveFilters && (
                  <button type="button" className="filter-reset" onClick={handleResetFilters}>
                    Reset filters
                  </button>
                )}
              </div>

              <div className="search-controls">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search case studies..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-input"
                    aria-label="Search case studies"
                  />
                  <Icon slug="search" className="search-icon h-5 w-5" />
                </div>
              </div>

              <div className="filter-row">
                <div className="filter-pills">
                  {categories.map((category, idx) => (
                    <motion.button
                      key={category}
                      className={`filter-pill ${activeFilter === category ? 'active' : ''}`}
                      onClick={() => setActiveFilter(category)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + idx * 0.03 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>

                <div className="controls-group">
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as 'default' | 'name' | 'recent' | 'featured')}
                    className="sort-select"
                    title="Sort by"
                    aria-label="Sort case studies"
                  >
                    <option value="default">Default</option>
                    <option value="featured">Featured</option>
                    <option value="name">Name</option>
                    <option value="recent">Recent</option>
                  </select>

                  <div className="view-toggle" role="group" aria-label="Toggle card layout">
                    <button
                      type="button"
                      className={viewMode === 'grid' ? 'active' : ''}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                      title="Grid view"
                    >
                      <Icon slug="grid" className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className={viewMode === 'list' ? 'active' : ''}
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                      title="List view"
                    >
                      <Icon slug="list" className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Cases Grid Section */}
          <section className="cases-section">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter + viewMode}
                className={`cases-${viewMode}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {filteredStudies.map((study, index) => (
                  <TiltCaseCard
                    key={study.slug}
                    study={study}
                    index={index}
                    getTechIconSlug={getTechIconSlug}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredStudies.length === 0 && (
              <motion.div className="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="no-results-icon">
                  <Icon slug="search" className="h-10 w-10" />
                </div>
                <h3>No case studies found</h3>
                <p>Update your filters or search to surface a new combination.</p>
              </motion.div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default CaseStudies;
