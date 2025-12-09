/**
 * CaseStudyCard - Card component for displaying case studies
 * Used in portfolio galleries and case study listings
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface CaseStudyCardProps {
  slug: string;
  title: string;
  tagline: string;
  image?: string;
  gradient?: string;
  hoverGlow?: string;
  statLine?: string;
  tags?: string[];
  icon?: React.ReactNode;
  index?: number;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  slug,
  title,
  tagline,
  image,
  gradient = 'linear-gradient(135deg, #006d77 0%, #5a7a7d 40%, #83c5be 100%)',
  hoverGlow = '#40E0D0',
  statLine,
  tags = [],
  icon,
  index = 0,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="case-study-card group"
    >
      <Link to={`/case-studies/${slug}`} className="block h-full">
        <div
          className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl h-full"
          style={{
            background: gradient,
          }}
        >
          {/* Hover Glow Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${hoverGlow}, transparent 70%)`,
            }}
          />

          {/* Image Section */}
          {image && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
            </div>
          )}

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Icon & Title */}
            <div className="flex items-start gap-3">
              {icon && <div className="text-3xl">{icon}</div>}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-200">
                  {title}
                </h3>
                {statLine && (
                  <p className="text-sm text-cyan-400 font-semibold mt-1">{statLine}</p>
                )}
              </div>
            </div>

            {/* Tagline */}
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">{tagline}</p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-white/10 text-slate-300 rounded-md border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all duration-200">
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CaseStudyCard;
