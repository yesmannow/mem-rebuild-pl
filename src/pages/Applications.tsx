import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { applications, getAllCategories } from "../data/applications";
import { staggerContainer, staggerItem } from "../utils/animations";
import AnimatedSection from "../components/animations/AnimatedSection";
import SimpleIcon from "../components/icons/SimpleIcon";
import "./Applications.css";


const Applications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"default" | "name" | "recent">("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const categories = ["All", ...getAllCategories()];

  const filteredApplications = useMemo(() => {
    let filtered = applications;

    // Filter by category
    if (activeFilter !== "All") {
      filtered = filtered.filter(app => app.category.includes(activeFilter));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "recent") {
      filtered = [...filtered].reverse();
    }

    return filtered;
  }, [activeFilter, searchTerm, sortBy]);

  const getAppImage = (appId: string) => {
    const imageMap: { [key: string]: string } = {
      'clinical-compass': '/apps/clinical-compass-thumbnail.png',
      'gt9-pricing-sheet': '/apps/gt9-pricing-thumbnail.png',
      'license-requirements-tool': '/apps/license-requirements-thumbnail.png',
      'roi-calculator': '/apps/roi-calculator-thumbnail.png',
      'graston-growth-engine': '/apps/graston-growth-engine-thumbnail.png'
    };
    return imageMap[appId] || '';
  };

  const getAppIcon = (appId: string) => {
    const iconMap: { [key: string]: { icon: string; gradient: string } } = {
      'clinical-compass': { icon: '🧠', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      'gt9-pricing-sheet': { icon: '💎', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
      'license-requirements-tool': { icon: '📚', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
      'roi-calculator': { icon: '📊', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
      'graston-growth-engine': { icon: '🚀', gradient: 'linear-gradient(135deg, #88ABF2 0%, #EC4899 100%)' }
    };
    return iconMap[appId] || { icon: '🎓', gradient: 'linear-gradient(135deg, #88ABF2 0%, #B8D0D9 100%)' };
  };

  const totalApps = applications.length;
  const totalTechnologies = new Set(applications.flatMap(app => app.technicalDetails.techStack)).size;

  return (
    <main className="applications-page">
      <AnimatedSection>
        <section className="applications-header">
          <div className="header-badge">
            <span className="badge-dot"></span>
            <span>Live & Interactive</span>
          </div>
          <h1>Interactive Applications</h1>
          <p className="header-subtitle">
            Explore production-ready web applications demonstrating full-stack development,
            UX design, and complex problem-solving across marketing, sales, and clinical domains.
          </p>

          {/* Stats Overview */}
          <div className="apps-stats">
            <div className="stat-item">
              <span className="stat-value">{totalApps}</span>
              <span className="stat-label">Live Applications</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{totalTechnologies}+</span>
              <span className="stat-label">Technologies Used</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">100%</span>
              <span className="stat-label">Functional</span>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <section className="controls-bar">
          {/* Search */}
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="search-clear" onClick={() => setSearchTerm("")}>
                ✕
              </button>
            )}
          </div>

          {/* Filters & Controls */}
          <div className="controls-group">
            {/* Category Filter */}
            <div className="filter-buttons">
              {categories.map(category => (
                <motion.button
                  key={category}
                  className={`filter-btn ${activeFilter === category ? "active" : ""}`}
                  onClick={() => setActiveFilter(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                  {category !== "All" && activeFilter === category && (
                    <span className="filter-count">
                      {applications.filter(app => app.category.includes(category)).length}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Sort & View Controls */}
            <div className="view-controls">
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                title="Sort applications"
                aria-label="Sort applications"
              >
                <option value="default">Default Order</option>
                <option value="name">A-Z</option>
                <option value="recent">Most Recent</option>
              </select>

              <div className="view-toggle">
                <button
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1" y="1" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                    <rect x="10" y="1" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                    <rect x="1" y="10" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                    <rect x="10" y="10" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <button
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                  title="List View"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <line x1="1" y1="3" x2="17" y2="3" stroke="currentColor" strokeWidth="2"/>
                    <line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="2"/>
                    <line x1="1" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section className="applications-grid-section">
        {/* Results Info */}
        <div className="results-info">
          <span className="results-count">
            {filteredApplications.length} {filteredApplications.length === 1 ? 'Application' : 'Applications'}
            {searchTerm && ` matching "${searchTerm}"`}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${searchTerm}-${viewMode}`}
            className={`applications-grid ${viewMode}`}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredApplications.map((app) => {
              const iconData = getAppIcon(app.id);

              return (
                <motion.div
                  key={app.id}
                  className="app-card-wrapper"
                  variants={staggerItem}
                  whileHover={{ y: -8 }}
                  layout
                >
                  <div className="application-card">
                    {/* Screenshot Section */}
                    <div className="app-screenshot-wrapper">
                      <div className="screenshot-frame">
                        <img
                          src={getAppImage(app.id)}
                          alt={`${app.title} screenshot`}
                          className="app-screenshot"
                        />
                        <div className="screenshot-overlay">
                          <div className="overlay-content">
                            <span className="preview-label">Click to Launch Live App</span>
                          </div>
                        </div>
                      </div>

                      {/* Live Indicator */}
                      <div className="live-indicator">
                        <span className="live-dot"></span>
                        <span>Live</span>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="app-card-content">
                      <div className="app-header">
                        <div className="app-icon-badge" data-gradient={iconData.gradient}>
                          <span className="icon-emoji">{iconData.icon}</span>
                        </div>
                        <div className="app-meta">
                          <h3>{app.title}</h3>
                          <p className="app-tagline">{app.tagline}</p>
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="tech-stack">
                        {app.technicalDetails.techStack.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="tech-pill">
                            <SimpleIcon name={tech} size={16} className="tech-pill-icon" />
                            <span>{tech}</span>
                          </span>
                        ))}
                        {app.technicalDetails.techStack.length > 3 && (
                          <span className="tech-pill more">+{app.technicalDetails.techStack.length - 3}</span>
                        )}
                      </div>

                      {/* Features */}
                      <div className="app-features">
                        {app.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="feature-item">
                            <span className="feature-check">✓</span>
                            <span className="feature-text">{feature.title}</span>
                          </div>
                        ))}
                      </div>

                      {/* Metrics */}
                      {app.metrics && app.metrics.length > 0 && (
                        <div className="app-metrics">
                          {app.metrics.slice(0, 2).map((metric, idx) => (
                            <div key={idx} className="metric-item">
                              <span className="metric-value">{metric.value}</span>
                              <span className="metric-label">{metric.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="app-card-actions">
                        <a
                          href={app.demoUrl}
                          className="app-btn primary group"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            // Prevent default and handle external link safely
                            try {
                              window.open(app.demoUrl, '_blank', 'noopener,noreferrer,width=1200,height=800');
                              e.preventDefault();
                            } catch (error) {
                              console.warn('Failed to open app demo:', error);
                              // Fallback to default behavior
                            }
                          }}
                        >
                          <span>Launch Live App</span>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                        <Link to={`/applications/${app.id}`} className="app-btn secondary">
                          <span>Deep Dive</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredApplications.length === 0 && (
          <motion.div
            className="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="no-results-icon">🔍</div>
            <h3>No Applications Found</h3>
            <p>No applications match your current filters or search term.</p>
            <button
              className="reset-filters-btn"
              onClick={() => {
                setActiveFilter("All");
                setSearchTerm("");
              }}
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default Applications;