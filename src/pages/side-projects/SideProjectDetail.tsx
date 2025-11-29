import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Tag, Sparkles } from 'lucide-react';
import { sideProjects } from '../../data/sideProjects';
import './SideProjectDetail.css';

const SideProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = sideProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="side-project-detail not-found">
        <div className="not-found-content">
          <p>Project not found.</p>
          <Link to="/side-projects" className="back-link">
            <ArrowLeft size={18} />
            Back to Side Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="side-project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="project-nav">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <Link to="/side-projects" className="back-link">
          <span>All Projects</span>
        </Link>
      </nav>

      <section className="project-hero">
        <div className="hero-background">
          <div className="hero-image">
            <img src={project.image} alt={project.title} />
          </div>
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="project-meta">
            <span className="category">{project.category}</span>
            <span className="year">{project.year}</span>
          </div>
          <h1 className="project-title">{project.title}</h1>
          <div className="project-details">
            <div className="detail-item">
              <Tag size={16} />
              <span>{project.tags.join(', ')}</span>
            </div>
            <div className="detail-item">
              <ExternalLink size={16} />
              <span>Case Study</span>
            </div>
          </div>
          <p className="hero-summary">{project.description}</p>
        </div>
      </section>

      <div className="project-content">
        <div className="container">
          <section className="content-section challenge-solution">
            <div className="section-grid">
              <div className="section-card">
                <h2>The Challenge</h2>
                <p>{project.challenge}</p>
              </div>
              <div className="section-card">
                <h2>The Solution</h2>
                <p>{project.solution}</p>
              </div>
            </div>
          </section>

          <section className="content-section impact-section">
            <div className="section-header">
              <Sparkles size={28} />
              <h2>Impact</h2>
            </div>
            <div className="impact-grid">
              {project.impact.map((metric) => (
                <motion.div
                  key={metric}
                  className="impact-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="impact-value">{metric}</div>
                  <div className="impact-label">Result</div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="content-section stack-tags">
            <div className="section-grid">
              <div className="section-card">
                <h3>Stack</h3>
                <div className="badge-row">
                  {(project.stack || []).map((tech) => (
                    <span key={tech} className="badge">
                      {tech}
                    </span>
                  ))}
                  {(!project.stack || project.stack.length === 0) && <span className="badge">Custom Toolkit</span>}
                </div>
              </div>
              <div className="section-card">
                <h3>Tags</h3>
                <div className="badge-row">
                  {project.tags.map((tag) => (
                    <span key={tag} className="badge">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="content-section cta">
            <h3>Interested in a similar build?</h3>
            <p>Let’s apply these playbooks to your brand.</p>
            <Link to="/contact" className="cta-button">
              Start a Conversation
              <ExternalLink size={18} />
            </Link>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default SideProjectDetail;
