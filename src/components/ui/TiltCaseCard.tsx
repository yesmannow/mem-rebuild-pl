import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '@components/Icon';
import { useDynamicImage } from '../../hooks/useDynamicImage';

interface TiltCaseCardProps {
  study: any;
  index: number;
  getTechIconSlug: (tech: string) => string;
}

export const TiltCaseCard: React.FC<TiltCaseCardProps> = ({ study, index, getTechIconSlug }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Get dynamic background image from first tag
  const imageQuery = study.tags?.[0] || 'technology';
  const { imageUrl, isLoading } = useDynamicImage(imageQuery);

  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Disable 3D tilt on mobile for better performance
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      style={{
        rotateX: !isMobile ? rotateX : 0,
        rotateY: !isMobile ? rotateY : 0,
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={!isMobile ? { scale: 1.01, z: 50 } : {}}
      className="w-full"
    >
      <Link to={`/case-studies/${study.slug}`} className="case-card cinematic-card">
        <div className="case-card-inner relative overflow-hidden rounded-2xl group isolate" style={{ minHeight: '500px', aspectRatio: '4/5' }}>
          {/* Dynamic Background Image - clipped to card bounds */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl">
            {imageUrl && !imageUrl.startsWith('linear-gradient') && (
              <img
                src={imageUrl}
                alt={study.title}
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
            )}
            {imageUrl && imageUrl.startsWith('linear-gradient') && (
              <div
                className="w-full h-full opacity-90 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: imageUrl,
                }}
              />
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-[1]" />

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none z-[2]"
            whileHover={{ opacity: 1 }}
            style={{
              background: `radial-gradient(circle at center, rgba(64, 224, 208, 0.15), transparent 70%)`,
              boxShadow: '0 0 40px rgba(64, 224, 208, 0.3)',
            }}
          />

          <div className="relative z-10 p-6 flex flex-col h-full gap-4" style={{ minHeight: '100%' }}>
            <div className="flex-shrink-0">
              <div className="case-icon" data-color={study.color}>
                <motion.span
                  className="icon-emoji"
                  data-color={study.color}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {study.icon}
                </motion.span>
              </div>
            </div>

            <div className="case-content text-white flex-1 min-h-0 overflow-y-auto">
              <div className="case-header">
                <h3 className="case-title">{study.title}</h3>
                <p className="case-tagline">{study.tagline}</p>
              </div>

              <div className="case-categories">
                {study.category.map((cat: string) => (
                  <motion.span
                    key={cat}
                    className="category-tag"
                    data-color={study.color}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cat}
                  </motion.span>
                ))}
              </div>

              {study.technologies && study.technologies.length > 0 && (
                <div className="case-tech-stack">
                  <div className="tech-stack-icons">
                    {study.technologies.slice(0, 4).map((tech: string) => (
                      <motion.div
                        key={tech}
                        whileHover={{ scale: 1.3, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon
                          slug={getTechIconSlug(tech)}
                          className="tech-stack-icon h-4 w-4"
                          title={tech}
                        />
                      </motion.div>
                    ))}
                    {study.technologies.length > 4 && (
                      <span className="tech-stack-more">+{study.technologies.length - 4}</span>
                    )}
                  </div>
                </div>
              )}

              <div className="case-preview">
                <p className="preview-label">Challenge</p>
                <p className="preview-text">{study.challenge}</p>
              </div>

              <div className="case-metrics">
                {study.metrics.slice(0, 2).map((metric: any, idx: number) => (
                  <motion.div
                    key={idx}
                    className="metric-item"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="metric-icon" aria-hidden="true">
                      ↗
                    </div>
                    <div className="metric-content">
                      <div className="metric-label">{metric.label}</div>
                      <div className="metric-value" data-color={study.color}>
                        {metric.value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="case-tech-tags">
                {study.tags.slice(0, 3).map((tag: string) => (
                  <motion.span
                    key={tag}
                    className="tech-tag"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(64, 224, 208, 0.1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>{tag}</span>
                  </motion.span>
                ))}
                {study.tags.length > 3 && (
                  <span className="tech-tag-more">+{study.tags.length - 3}</span>
                )}
              </div>
            </div>

            <div className="case-footer flex-shrink-0 mt-auto">
              <motion.span
                className="view-case"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                View case study
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Icon slug="chevron-right" className="h-4 w-4" />
                </motion.span>
              </motion.span>
            </div>
          </div>

          <div className="case-gradient-overlay" data-color={study.color} />
        </div>
      </Link>
    </motion.div>
  );
};

