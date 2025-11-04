import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudies, getCategories } from "../data/caseStudies";
import Icon from "../components/Icon";
import "./CaseStudies.css";
import "./CaseStudiesEnhanced.css";
import CaseStudyExplorer from "../components/CaseStudyExplorer";
import WaveDivider from "../components/WaveDivider";

const CaseStudies: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"default" | "name" | "recent" | "featured">("default");
  const categories = ["All", ...getCategories()];

  // Map technology names to icon slugs
  const getTechIconSlug = (techName: string): string => {
    const techMap: { [key: string]: string } = {
      'React': 'react',
      'Node.js': 'node',
      'TypeScript': 'typescript',
      'Tailwind CSS': 'tailwind',
      'Vite': 'vite',
      'Git/GitHub': 'github',
      'Python': 'python',
      'Flask': 'flask',
      'FastAPI': 'fastapi',
      'Docker': 'docker',
      'AWS': 'aws',
      'Azure': 'azure',
      'PostgreSQL': 'postgres',
      'MySQL': 'mysql',
      'Redis': 'redis',
      'GraphQL': 'graphql',
      'PHP': 'php',
      'WordPress': 'wordpress',
      'Google Tag Manager': 'gtm',
      'GA4': 'ga4',
      'JavaScript': 'javascript',
      'WooCommerce': 'woocommerce',
      'Stripe': 'stripe',
      'Gravity Forms': 'gravityforms',
      'ACF': 'acf'
    };
    return techMap[techName] || 'react'; // fallback to react icon
  };

  const filteredStudies = useMemo(() => {
    let filtered = caseStudies;

    // Filter by category
    if (activeFilter !== "All") {
      filtered = filtered.filter(study => study.category.includes(activeFilter));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(study =>
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.challenge.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "recent") {
      filtered = [...filtered].reverse();
    } else if (sortBy === "featured") {
      filtered = [...filtered].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [activeFilter, searchTerm, sortBy]);

  // Get featured count
  const featuredCount = caseStudies.filter(s => s.featured).length;

  return (
    <main className="case-studies-modern">
      {/* Hero Section */}
      <motion.section
        className="case-studies-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content-cases">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ★ Tech & Marketing
          </motion.div>

          <motion.h1
            className="case-studies-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Selected Works
          </motion.h1>

          <motion.p
            className="case-studies-subtitle"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Deep dives into transformative projects that showcase the power of strategic
            marketing combined with technical excellence
          </motion.p>

          {/* Stats */}
          <motion.div
            className="case-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="stat-item">
              <div className="stat-number">{caseStudies.length}</div>
              <div className="stat-label">Case Studies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{featuredCount}</div>
              <div className="stat-label">Featured Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Real Results</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Interactive Case Study Explorer */}
      <WaveDivider />
      <CaseStudyExplorer />
      <WaveDivider flip />

      {/* Enhanced Filter Bar */}
      <section className="filter-section">
        <motion.div
          className="filter-controls"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {/* Search Bar */}
          <div className="search-controls">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
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
                  transition={{ delay: 0.8 + idx * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            <div className="controls-group">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="sort-select"
                title="Sort by"
                aria-label="Sort by"
              >
                <option value="default">Default</option>
                <option value="featured">Featured</option>
                <option value="name">Name</option>
                <option value="recent">Recent</option>
              </select>

              {/* View Toggle */}
              <div className="view-toggle">
                <button
                  className={viewMode === "grid" ? "active" : ""}
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <Icon slug="grid" className="h-5 w-5" />
                </button>
                <button
                  className={viewMode === "list" ? "active" : ""}
                  onClick={() => setViewMode("list")}
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

      {/* Case Studies Grid */}
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
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Link to={`/case-studies/${study.slug}`} className="case-card">
                  <div className="case-card-inner">
                    {/* Icon Header */}
                    <div className="case-icon" data-color={study.color}>
                      <span className="icon-emoji" data-color={study.color}>
                        {study.icon}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="case-content">
                      <div className="case-header">
                        <h3 className="case-title">{study.title}</h3>
                        <p className="case-tagline">{study.tagline}</p>
                      </div>

                      {/* Categories */}
                      <div className="case-categories">
                        {study.category.map(cat => (
                          <span key={cat} className="category-tag" data-color={study.color}>
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Technology Stack */}
                      {study.technologies && study.technologies.length > 0 && (
                        <div className="case-tech-stack">
                          <div className="tech-stack-icons">
                            {study.technologies.slice(0, 4).map(tech => (
                              <Icon
                                key={tech}
                                slug={getTechIconSlug(tech)}
                                className="tech-stack-icon h-4 w-4"
                                title={tech}
                              />
                            ))}
                            {study.technologies.length > 4 && (
                              <span className="tech-stack-more">+{study.technologies.length - 4}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Challenge Preview */}
                      <div className="case-preview">
                        <p className="preview-label">Challenge</p>
                        <p className="preview-text">{study.challenge}</p>
                      </div>

                      {/* Metrics */}
                      <div className="case-metrics">
                        {study.metrics.slice(0, 2).map((metric, idx) => (
                          <div key={idx} className="metric-item">
                            <div className="metric-icon">✓</div>
                            <div className="metric-content">
                              <div className="metric-label">{metric.label}</div>
                              <div className="metric-value" data-color={study.color}>
                                {metric.value}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Tags */}
                      <div className="case-tech-tags">
                        {study.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tech-tag">
                            <span>{tag}</span>
                          </span>
                        ))}
                        {study.tags.length > 3 && (
                          <span className="tech-tag-more">+{study.tags.length - 3}</span>
                        )}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="case-footer">
                      <span className="view-case">
                        View Case Study
                        <Icon slug="chevron-right" className="h-4 w-4" />
                      </span>
                    </div>

                    {/* Hover Gradient */}
                    <div
                      className="case-gradient-overlay"
                      data-color={study.color}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredStudies.length === 0 && (
          <motion.div
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="no-results-icon">🔍</div>
            <h3>No case studies found</h3>
            <p>Try selecting a different category filter</p>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default CaseStudies;
