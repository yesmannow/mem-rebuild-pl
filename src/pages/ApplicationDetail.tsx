import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getApplicationById } from "../data/applications";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";
import AnimatedSection from "../components/animations/AnimatedSection";
import AppDemoModal from "../components/modals/AppDemoModal";
import "./ApplicationDetail.css";

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'demo'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const app = id ? getApplicationById(id) : undefined;

  if (!app) {
    return <Navigate to="/applications" replace />;
  }

  return (
    <main className="application-detail">
      <AnimatedSection>
        <div className="back-nav">
          <Link to="/applications" className="back-link">
            ← Back to Developer Tools
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <header className="detail-header">
          <div
            className="app-icon-large"
            style={{ background: app.accentGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            {app.icon}
          </div>
          <motion.div variants={fadeInUp}>
            <h1>{app.title}</h1>
            <p className="tagline">{app.tagline}</p>
          </motion.div>

          <motion.div className="header-meta" variants={fadeInUp}>
            <div className="categories">
              {app.category.map(cat => (
                <span key={cat} className="category-badge">{cat}</span>
              ))}
            </div>
            <div className="tags">
              {app.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div className="header-actions" variants={fadeInUp}>
            <button
              className="cta-btn primary"
              onClick={() => setIsModalOpen(true)}
            >
              🚀 Launch Live Demo
            </button>
            {app.githubUrl && (
              <a href={app.githubUrl} className="cta-btn secondary" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                View Source Code
              </a>
            )}
          </motion.div>
        </header>
      </AnimatedSection>

      {app.metrics && (
        <AnimatedSection delay={0.2}>
          <section className="metrics-showcase">
            <motion.div
              className="metrics-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {app.metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className="metric-card"
                  variants={staggerItem}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 12px 32px rgba(136, 171, 242, 0.2)"
                  }}
                >
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-label">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </AnimatedSection>
      )}

      <div className="content-tabs">
        <div className="tab-nav">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview & Value
          </button>
          <button
            className={`tab-btn ${activeTab === 'technical' ? 'active' : ''}`}
            onClick={() => setActiveTab('technical')}
          >
            Technical Deep Dive
          </button>
          <button
            className={`tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            Live Demo
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <AnimatedSection>
              <div className="tab-panel">
                <section className="content-section overview">
                  <div className="section-icon">💡</div>
                  <h2>The Spark</h2>
                  <p>{app.overview}</p>
                </section>

                <section className="content-section problem">
                  <div className="section-icon">⚠️</div>
                  <h2>The Problem</h2>
                  <p>{app.valueProposition.problem}</p>
                </section>

                <section className="content-section solution">
                  <div className="section-icon">🎯</div>
                  <h2>The Solution</h2>
                  <p>{app.valueProposition.solution}</p>
                </section>

                <section className="content-section impact">
                  <div className="section-icon">🚀</div>
                  <h2>The Impact</h2>
                  <ul className="impact-list">
                    {app.valueProposition.impact.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section className="content-section features">
                  <h2>Key Features</h2>
                  <div className="features-grid">
                    {app.features.map((feature, idx) => (
                      <div key={idx} className="feature-card">
                        {feature.icon && <div className="feature-icon">{feature.icon}</div>}
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {app.testimonial && (
                  <section className="content-section testimonial">
                    <blockquote>
                      <p>"{app.testimonial.quote}"</p>
                      <footer>
                        <strong>{app.testimonial.author}</strong>
                        <span>{app.testimonial.role}</span>
                      </footer>
                    </blockquote>
                  </section>
                )}
              </div>
            </AnimatedSection>
          )}

          {activeTab === 'technical' && (
            <AnimatedSection>
              <div className="tab-panel">
                <section className="content-section architecture">
                  <div className="section-icon">🏗️</div>
                  <h2>Architecture Overview</h2>
                  <p>{app.technicalDetails.architecture}</p>
                </section>

                <section className="content-section tech-stack">
                  <h2>Technology Stack</h2>
                  <div className="tech-stack-grid">
                    {app.technicalDetails.techStack.map((tech, idx) => (
                      <div key={idx} className="tech-item">
                        <span className="tech-bullet">▸</span>
                        {tech}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="content-section components">
                  <h2>Key Components & Complexity Analysis</h2>
                  <div className="components-list">
                    {app.technicalDetails.keyComponents.map((component, idx) => (
                      <div key={idx} className="component-card">
                        <div className="component-header">
                          <h3>{component.name}</h3>
                          <span className={`complexity-badge ${component.complexity.toLowerCase()}`}>
                            {component.complexity} Complexity
                          </span>
                        </div>
                        <p>{component.purpose}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="content-section code-highlights">
                  <h2>Code Highlights & Implementation Details</h2>
                  {app.technicalDetails.codeHighlights.map((highlight, idx) => (
                    <div key={idx} className="code-highlight">
                      <h3>{highlight.title}</h3>
                      <p className="code-description">{highlight.description}</p>
                      {highlight.snippet && (
                        <pre className="code-block">
                          <code className={`language-${highlight.language}`}>
                            {highlight.snippet}
                          </code>
                        </pre>
                      )}
                    </div>
                  ))}
                </section>
              </div>
            </AnimatedSection>
          )}

          {activeTab === 'demo' && (
            <AnimatedSection>
              <div className="tab-panel">
                <section className="content-section demo-section">
                  <h2>Interactive Demo</h2>
                  <p>Experience the application in action. This is a fully functional demo running the production code.</p>
                  <div className="demo-container">
                    <iframe
                      src={app.demoUrl}
                      title={`${app.title} Demo`}
                      className="demo-iframe"
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                  <div className="demo-actions">
                    <button
                      className="cta-btn primary"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Launch Interactive Demo
                    </button>
                    <a
                      href={app.demoUrl}
                      className="cta-btn secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in New Tab
                    </a>
                  </div>
                </section>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>

      <AnimatedSection delay={0.6}>
        <section className="cta-section">
          <div className="cta-content">
            <h3>Interested in similar solutions?</h3>
            <p>Let's discuss how I can build custom tools and applications for your business needs.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-btn primary">
                Start a Conversation
              </Link>
              <Link to="/applications" className="cta-btn secondary">
                View More Tools
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* App Demo Modal */}
      <AppDemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appTitle={app.title}
        appUrl={app.demoUrl}
      />
    </main>
  );
};

export default ApplicationDetail;