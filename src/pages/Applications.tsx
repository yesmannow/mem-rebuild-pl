import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { applications, getAllCategories } from '../data/applications';
import { staggerContainer, staggerItem } from '../utils/animations';
import AnimatedSection from '../components/animations/AnimatedSection';
import AppDemoModal from '../components/modals/AppDemoModal';
import TiltCard from '../components/ui/TiltCard';
import { useSwipe } from '../hooks/useGestures';
import { SimpleSection } from '../components/ui/SimpleSection';
import TechBackdrop from '../components/hero/TechBackdrop';
import { TechReveal } from '../components/animations/TechReveal';
import './Applications.css';

// Component for individual app card with video hover logic
const AppCard: React.FC<{
  app: typeof applications[0];
  imageErrors: Set<string>;
  onImageError: (id: string) => void;
  onLaunch: (app: typeof applications[0]) => void;
}> = ({ app, imageErrors, onImageError, onLaunch }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  // Check if app has videoUrl (extend Application interface as needed)
  const videoUrl = (app as any).videoUrl;

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <TiltCard
      className="application-card"
      maxTilt={15}
      perspective={1000}
      scale={1.02}
      glareEnable={true}
    >
      {/* Screenshot Section */}
      <div
        className="app-screenshot-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onLaunch(app)}
      >
        <div className="screenshot-frame">
          {imageErrors.has(app.id) ? (
            <div className="app-screenshot-placeholder">
              <div className="placeholder-icon">{app.icon}</div>
              <div className="placeholder-text">{app.title}</div>
            </div>
          ) : (
            <>
              {videoUrl && isHovering ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="app-screenshot app-video"
                  muted
                  loop
                  playsInline
                  onLoadedData={() => {
                    if (videoRef.current && isHovering) {
                      videoRef.current.play().catch(() => {
                        // Handle autoplay restrictions
                      });
                    }
                  }}
                />
              ) : (
                <img
                  src={app.thumbnail}
                  alt={`${app.title} screenshot`}
                  className="app-screenshot"
                  onError={() => onImageError(app.id)}
                />
              )}
            </>
          )}
          <div className="screenshot-overlay">
            <button className="overlay-content" type="button">
              <span className="preview-label">Click to Launch Live App</span>
            </button>
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
          <div className="app-icon-badge bg-slate-800 border border-white/10 text-brand-turquoise">
            <span className="icon-emoji">{app.icon}</span>
          </div>
          <div className="app-meta">
            <h3>
              <TechReveal text={app.title} triggerOnMount={false} triggerOnHover={true} />
            </h3>
            <p className="app-tagline">{app.tagline}</p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="tech-stack">
          {app.technicalDetails.techStack.slice(0, 3).map((tech, idx) => (
            <span key={idx} className="tech-pill">
              <span>{tech}</span>
            </span>
          ))}
          {app.technicalDetails.techStack.length > 3 && (
            <span className="tech-pill more">
              +{app.technicalDetails.techStack.length - 3}
            </span>
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

        {/* Metrics - Tremor Style */}
        {app.metrics && app.metrics.length > 0 && (
          <div className="app-metrics">
            {app.metrics.slice(0, 2).map((metric, idx) => {
              // Check if value is positive (contains + or is a high percentage)
              const isPositive = metric.value.includes('+') ||
                                (metric.value.includes('%') && !metric.value.includes('-'));
              return (
                <div key={idx} className="metric-item">
                  <div className="metric-label">{metric.label}</div>
                  <div className="metric-value-wrapper">
                    {isPositive && <span className="metric-indicator"></span>}
                    <span className="metric-value">{metric.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div className="app-card-actions">
          <button className="app-btn primary group" onClick={() => onLaunch(app)}>
            <span>Launch Live App</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link to={`/applications/${app.id}`} className="app-btn secondary">
            <span>Deep Dive</span>
          </Link>
        </div>
      </div>
    </TiltCard>
  );
};

const TheLab: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'recent'>('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [modalApp, setModalApp] = useState<{
    title: string;
    url: string;
    embeddable?: boolean;
    thumbnail?: string;
  } | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const categories = ['All', ...getAllCategories()];

  const handleLaunch = (app: typeof applications[0]) => {
    if (!app.demoUrl) return;

    let isSameOrigin = false;
    try {
      const url = new URL(app.demoUrl, window.location.href);
      isSameOrigin = url.origin === window.location.origin;
    } catch {
      isSameOrigin = false;
    }

    const embeddable = app.embeddable !== false && isSameOrigin;

    if (!embeddable) {
      window.open(app.demoUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    setModalApp({
      title: app.title,
      url: app.demoUrl,
      embeddable: app.embeddable,
      thumbnail: app.thumbnail
    });
  };

  // Add swipe gesture support for mobile tab navigation
  const swipeRef = useSwipe({
    onSwipeLeft: () => {
      const currentIndex = categories.indexOf(activeFilter);
      if (currentIndex < categories.length - 1) {
        setActiveFilter(categories[currentIndex + 1]);
      }
    },
    onSwipeRight: () => {
      const currentIndex = categories.indexOf(activeFilter);
      if (currentIndex > 0) {
        setActiveFilter(categories[currentIndex - 1]);
      }
    },
    threshold: 50,
  });

  const filteredApplications = useMemo(() => {
    let filtered = applications;

    // Filter by category
    if (activeFilter !== 'All') {
      filtered = filtered.filter(app => app.category.includes(activeFilter));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        app =>
          app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort
    if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'recent') {
      filtered = [...filtered].reverse();
    }

    return filtered;
  }, [activeFilter, searchTerm, sortBy]);

  const totalApps = applications.length;
  const totalTechnologies = new Set(applications.flatMap(app => app.technicalDetails.techStack))
    .size;

  return (
    <div className="applications-page-wrapper">
      <main className="applications-page relative z-10" ref={swipeRef}>
        {/* Hero Section with TechBackdrop */}
        <SimpleSection variant="default" padding="none" container={false} className="relative min-h-[90vh] flex items-center overflow-hidden">
          <TechBackdrop className="absolute inset-0" />
          <div className="relative z-10 w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection>
                <section className="applications-header">
          <div className="header-badge">
            <span className="badge-dot"></span>
            <span>Live & Interactive</span>
          </div>
          <h1>Developer Tools & Projects</h1>
          <p className="header-subtitle">
            Custom tools and applications I've built to solve real problems. Production-ready web
            tools demonstrating full-stack development, UX design, and complex problem-solving
            across marketing, sales, and clinical domains.
          </p>

          {/* Stats Overview */}
          <div className="apps-stats">
            <div className="stat-item">
              <span className="stat-value">{totalApps}</span>
              <span className="stat-label">Live Tools</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{totalTechnologies}+</span>
              <span className="stat-label">Technologies Used</span>
            </div>
          </div>
        </section>
      </AnimatedSection>
            </div>
          </div>
        </SimpleSection>

        <SimpleSection variant="bordered" padding="md" animated>
          <AnimatedSection delay={0.2}>
            {/* Grid Layout Container */}
            <div className={`grid gap-8 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'grid-cols-1 lg:grid-cols-[280px_1fr]' : 'grid-cols-1 lg:grid-cols-[0px_1fr]'}`}>
              {/* Sidebar */}
              <motion.aside
                initial={{ x: 0, opacity: 1 }}
                animate={{
                  x: isSidebarOpen ? 0 : -50,
                  opacity: isSidebarOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="lg:sticky lg:top-24 h-fit overflow-hidden"
                style={{
                  pointerEvents: isSidebarOpen ? 'auto' : 'none'
                }}
              >
                <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 space-y-6">
                  {/* Sidebar Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-brand-text">Filters</h2>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors text-brand-muted hover:text-brand-text"
                      aria-label="Collapse sidebar"
                      title="Collapse sidebar"
                    >
                      <PanelLeftClose size={20} />
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="search-container">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search tools..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    {searchTerm && (
                      <button className="search-clear" onClick={() => setSearchTerm('')}>
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Category Menu - Vertical */}
                  <div className="category-command-center">
                    <div className="command-center-header">
                      <span className="command-indicator"></span>
                      <span className="command-label">Select Category</span>
                    </div>
                    <div className="filter-buttons filter-toggle-group flex-col" role="tablist" aria-label="Filter by category">
                      {categories.map(category => (
                        <motion.button
                          key={category}
                          role="tab"
                          aria-selected={activeFilter === category}
                          aria-controls="tools-panel"
                          className={`filter-btn filter-toggle ${activeFilter === category ? 'active' : ''}`}
                          onClick={() => setActiveFilter(category)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="toggle-indicator"></span>
                          {category}
                          {category !== 'All' && activeFilter === category && (
                            <span className="filter-count">
                              {applications.filter(app => app.category.includes(category)).length}
                            </span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Sort Select */}
                  <div>
                    <label className="block text-sm font-medium text-brand-muted mb-2">Sort By</label>
                    <select
                      className="sort-select w-full"
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as typeof sortBy)}
                      title="Sort tools"
                      aria-label="Sort tools"
                    >
                      <option value="default">Default Order</option>
                      <option value="name">A-Z</option>
                      <option value="recent">Most Recent</option>
                    </select>
                  </div>
                </div>
              </motion.aside>

              {/* Main Content */}
              <main className="min-w-0">
                {/* Main Content Header */}
                <div className="flex items-center justify-between mb-6">
                  {/* Show Filters Button (when sidebar is closed) */}
                  {!isSidebarOpen && (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      onClick={() => setIsSidebarOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-white/10 hover:bg-slate-700/50 transition-colors text-brand-text text-sm font-medium"
                      aria-label="Show filters"
                    >
                      <PanelLeftOpen size={18} />
                      <span>Show Filters</span>
                    </motion.button>
                  )}
                </div>

                {/* Results Info */}
                <div className="results-info mb-6">
                  <span className="results-count">
                    {filteredApplications.length} {filteredApplications.length === 1 ? 'Tool' : 'Tools'}
                    {searchTerm && ` matching "${searchTerm}"`}
                  </span>
                </div>

                {/* Applications Grid */}
                <section id="tools-panel" role="tabpanel" className="applications-grid-section">
                  <LayoutGroup>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${activeFilter}-${searchTerm}`}
                        className="applications-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        layout
                      >
                        {filteredApplications.map(app => (
                          <motion.div
                            key={app.id}
                            className="app-card-wrapper"
                            variants={staggerItem}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, layout: { duration: 0.4, ease: 'easeInOut' } }}
                          >
                            <AppCard
                              app={app}
                              imageErrors={imageErrors}
                              onImageError={(id) => setImageErrors(prev => new Set(prev).add(id))}
                              onLaunch={handleLaunch}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </LayoutGroup>

                  {filteredApplications.length === 0 && (
                    <motion.div
                      className="no-results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="no-results-icon">🔍</div>
                      <h3>No Tools Found</h3>
                      <p>No tools match your current filters or search term.</p>
                      <button
                        className="reset-filters-btn"
                        onClick={() => {
                          setActiveFilter('All');
                          setSearchTerm('');
                        }}
                      >
                        Reset Filters
                      </button>
                    </motion.div>
                  )}
                </section>
              </main>
            </div>
          </AnimatedSection>
        </SimpleSection>

        {/* App Demo Modal */}
        {modalApp && (
          <AppDemoModal
            isOpen={!!modalApp}
            onClose={() => setModalApp(null)}
            appTitle={modalApp.title}
            appUrl={modalApp.url}
            embeddable={modalApp.embeddable}
            thumbnail={modalApp.thumbnail}
          />
        )}
      </main>
    </div>
  );
};

export default TheLab;
