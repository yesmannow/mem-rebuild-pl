import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { applications } from '../../data/applications';
import { staggerContainer, staggerItem, cardHover } from '../../utils/animations';
import './PlaygroundPreview.css';

const PlaygroundPreview: React.FC = () => {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const featuredApps = applications.slice(0, 4);

  const getAppImage = (appId: string) => {
    const imageMap: { [key: string]: string } = {
      'clinical-compass':
        '/demos/images of apps/Screenshot of Graston Clinical Compass - Intelligent Protocol Builder.jpg',
      'gt9-pricing-sheet':
        '/demos/images of apps/Screenshot of Graston Technique® Smart Pricing Tool.jpg',
      'license-requirements-tool':
        '/demos/images of apps/Screenshot of Practitioner License Requirements _ Graston Technique.jpg',
      'roi-calculator': '/demos/images of apps/Screenshot of Graston Technique ROI Calculator.jpg',
    };
    return imageMap[appId] || '';
  };

  const getAppIcon = (appId: string) => {
    const iconMap: { [key: string]: { icon: string; gradient: string } } = {
      'clinical-compass': {
        icon: '🧠',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      'gt9-pricing-sheet': {
        icon: '💎',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      'license-requirements-tool': {
        icon: '📚',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      'roi-calculator': {
        icon: '📊',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      },
    };
    return (
      iconMap[appId] || {
        icon: '🎓',
        gradient: 'linear-gradient(135deg, #88ABF2 0%, #B8D0D9 100%)',
      }
    );
  };

  return (
    <section className="playground-preview">
      <div className="playground-content">
        <motion.div
          className="playground-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-badge">
            <span className="badge-dot"></span>
            <span>Live & Interactive</span>
          </div>
          <h2>The Playground</h2>
          <p className="playground-subtitle">
            Theory in practice. These are live, production-ready web applications I've built to
            solve real business challenges. Click to explore—they're fully functional.
          </p>
        </motion.div>

        <motion.div
          className="playground-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredApps.map((app, index) => {
            const iconData = getAppIcon(app.id);
            const isHovered = hoveredApp === app.id;

            return (
              <motion.div
                key={app.id}
                className={`playground-app-card ${index === 0 ? 'featured' : ''}`}
                variants={staggerItem}
                onMouseEnter={() => setHoveredApp(app.id)}
                onMouseLeave={() => setHoveredApp(null)}
                whileHover={{ y: -8 }}
              >
                {/* App Screenshot */}
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

                {/* App Info */}
                <div className="app-card-content">
                  <div className="app-header">
                    <div className="app-icon-badge" data-app-gradient={iconData.gradient}>
                      <span className="icon-emoji">{iconData.icon}</span>
                    </div>
                    <div className="app-meta">
                      <h3>{app.title}</h3>
                      <p className="app-tagline">{app.tagline}</p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="tech-stack">
                    {app.technicalDetails.techStack.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="tech-pill">
                        {tech}
                      </span>
                    ))}
                    {app.technicalDetails.techStack.length > 3 && (
                      <span className="tech-pill more">
                        +{app.technicalDetails.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Key Features */}
                  <div className="app-features">
                    {app.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <span className="feature-check">✓</span>
                        <span className="feature-text">{feature.title}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics (if available) */}
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
                      className="app-btn primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Launch App</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M6 3L11 8L6 13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <Link to={`/applications/${app.id}`} className="app-btn secondary">
                      <span>Deep Dive</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="playground-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/applications" className="view-all-apps">
            <span>View All Applications & Technical Deep Dives</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 3L14 10L7 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PlaygroundPreview;
