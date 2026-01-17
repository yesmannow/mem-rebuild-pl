import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Zap, TrendingUp } from 'lucide-react';
import { Application } from '../../data/applications';

interface AppSpotlightCardProps {
  app: Application;
  variant?: 'default' | 'featured' | 'compact';
  className?: string;
}

/**
 * AppSpotlightCard
 * Enhanced card component for showcasing applications with metrics and features
 */
export const AppSpotlightCard: React.FC<AppSpotlightCardProps> = ({
  app,
  variant = 'default',
  className = '',
}) => {
  const isFeatured = variant === 'featured';

  return (
    <motion.div
      className={`app-spotlight-card ${variant} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="app-spotlight-card__header"
        style={{
          background: app.accentGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div className="app-spotlight-card__icon">{app.icon}</div>
        {isFeatured && (
          <div className="app-spotlight-card__badge">
            <Zap className="w-4 h-4" />
            <span>Featured</span>
          </div>
        )}
      </div>

      <div className="app-spotlight-card__content">
        <div className="app-spotlight-card__meta">
          <h3 className="app-spotlight-card__title">{app.title}</h3>
          <p className="app-spotlight-card__tagline">{app.tagline}</p>
        </div>

        {/* Categories */}
        <div className="app-spotlight-card__categories">
          {app.category.map(cat => (
            <span key={cat} className="app-spotlight-card__category">
              {cat}
            </span>
          ))}
        </div>

        {/* Metrics */}
        {app.metrics && app.metrics.length > 0 && (
          <div className="app-spotlight-card__metrics">
            {app.metrics.slice(0, 2).map((metric, idx) => (
              <div key={idx} className="app-spotlight-card__metric">
                <TrendingUp className="w-4 h-4 text-brand-turquoise" />
                <div>
                  <div className="app-spotlight-card__metric-value">{metric.value}</div>
                  <div className="app-spotlight-card__metric-label">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Preview */}
        <div className="app-spotlight-card__tech">
          <span className="app-spotlight-card__tech-label">Tech Stack:</span>
          <div className="app-spotlight-card__tech-tags">
            {app.technicalDetails.techStack.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="app-spotlight-card__tech-tag">
                {tech}
              </span>
            ))}
            {app.technicalDetails.techStack.length > 3 && (
              <span className="app-spotlight-card__tech-tag app-spotlight-card__tech-tag--more">
                +{app.technicalDetails.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="app-spotlight-card__actions">
          <a
            href={app.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="app-spotlight-card__btn app-spotlight-card__btn--primary"
          >
            <span>Launch App</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          {app.githubUrl && (
            <a
              href={app.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="app-spotlight-card__btn app-spotlight-card__btn--secondary"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AppSpotlightCard;
