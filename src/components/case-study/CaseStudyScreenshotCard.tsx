/**
 * CaseStudyScreenshotCard Component
 *
 * Enhanced case study card with live screenshot thumbnail
 * Uses screenshot API for dynamic thumbnails of live projects
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudyScreenshotCardProps {
  title: string;
  slug: string;
  tagline: string;
  siteUrl?: string;
  category: string[];
  featured?: boolean;
  className?: string;
}

export const CaseStudyScreenshotCard: React.FC<CaseStudyScreenshotCardProps> = ({
  title,
  slug,
  tagline,
  siteUrl,
  category,
  featured = false,
  className = '',
}) => {
  const [screenshotUrl, setScreenshotUrl] = useState<string>('');
  const [screenshotLoaded, setScreenshotLoaded] = useState(false);
  const [screenshotError, setScreenshotError] = useState(false);

  useEffect(() => {
    if (siteUrl) {
      // Generate screenshot URL using our API proxy
      const url = `/api/screenshot?url=${encodeURIComponent(siteUrl)}&width=1200&height=630`;
      setScreenshotUrl(url);
    }
  }, [siteUrl]);

  const handleImageLoad = () => {
    setScreenshotLoaded(true);
    setScreenshotError(false);
  };

  const handleImageError = () => {
    setScreenshotError(true);
    setScreenshotLoaded(false);
  };

  return (
    <motion.div
      className={`group relative rounded-2xl overflow-hidden bg-slate-950/60 border border-white/10 hover:border-brand-turquoise/50 transition-all duration-300 ${className}`}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/case-studies/${slug}`} className="block">
        {/* Screenshot Thumbnail */}
        <div className="relative aspect-[1.91/1] overflow-hidden bg-slate-900/50">
          {siteUrl && screenshotUrl && !screenshotError ? (
            <>
              {/* Loading skeleton */}
              {!screenshotLoaded && (
                <div className="absolute inset-0 bg-slate-900/70 animate-pulse flex items-center justify-center">
                  <ImageIcon size={32} className="text-brand-muted" />
                </div>
              )}

              {/* Screenshot image */}
              <img
                src={screenshotUrl}
                alt={`Screenshot of ${title}`}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  screenshotLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            // Fallback gradient
            <div className="absolute inset-0 bg-gradient-to-br from-brand-turquoise/20 via-brand-dark to-brand-creamsicle/20 flex items-center justify-center">
              <div className="text-center px-6">
                <ImageIcon size={40} className="text-brand-muted mx-auto mb-3" />
                <p className="text-sm text-brand-muted">
                  {screenshotError ? 'Preview unavailable' : 'No preview'}
                </p>
              </div>
            </div>
          )}

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-creamsicle/90 backdrop-blur-sm">
              <span className="text-xs font-semibold text-white">Featured</span>
            </div>
          )}

          {/* Live site link */}
          {siteUrl && (
            <motion.a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 left-4 p-2 rounded-lg bg-slate-950/80 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-brand-turquoise/20 hover:border-brand-turquoise/50"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} className="text-brand-text" />
            </motion.a>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-3">
            {category.slice(0, 3).map((cat, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-md bg-brand-turquoise/10 text-brand-turquoise border border-brand-turquoise/20"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-brand-text mb-2 group-hover:text-brand-turquoise transition-colors duration-300">
            {title}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-brand-muted line-clamp-2 mb-4">
            {tagline}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-brand-turquoise">
            <span>View Case Study</span>
            <motion.span
              className="inline-block"
              initial={{ x: 0 }}
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </Link>

      {/* Card border animation */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border-2 border-brand-turquoise/0 group-hover:border-brand-turquoise/30 transition-colors duration-300" />
      </div>
    </motion.div>
  );
};

export default CaseStudyScreenshotCard;
