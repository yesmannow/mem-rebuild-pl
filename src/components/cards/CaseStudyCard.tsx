import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface CaseStudyCardProps {
  title: string;
  microtagline: string;
  emoji: string;
  statLine: string;
  badges: string[];
  gradient: string;
  hoverGlow: string;
  slug: string;
  featured?: boolean;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  microtagline,
  emoji,
  statLine,
  badges,
  gradient,
  hoverGlow,
  slug,
  featured = false,
}) => {
  // Parse hover glow color to rgba
  const parseGlowColor = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, 0.35)`;
  };

  const glowColor = parseGlowColor(hoverGlow);

  return (
    <Link
      to={`/case-studies/${slug}`}
      className="block group"
      aria-label={`Read the ${title} case study`}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl p-8 h-full min-h-[320px] flex flex-col"
        style={{
          background: gradient,
        }}
        initial="rest"
        whileHover="hover"
        variants={{
          rest: {
            scale: 1,
            y: 0,
          },
          hover: {
            scale: 1.05,
            y: -2,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.35, 0, 1],
            },
          },
        }}
      >
        {/* Ambient glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `0px 0px 40px ${glowColor}`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Emoji Icon with parallax */}
          <motion.div
            className="text-5xl mb-4"
            variants={{
              rest: { y: 0 },
              hover: { y: -4, transition: { duration: 0.3, ease: [0.25, 0.35, 0, 1] } },
            }}
          >
            {emoji}
          </motion.div>

          {/* Title with parallax */}
          <motion.h3
            className="text-2xl md:text-3xl font-black text-white mb-2"
            variants={{
              rest: { y: 0 },
              hover: { y: -2, transition: { duration: 0.3, ease: [0.25, 0.35, 0, 1] } },
            }}
          >
            {title}
          </motion.h3>

          {/* Microtagline */}
          <p className="text-white/80 text-sm md:text-base mb-6 flex-grow">
            {microtagline}
          </p>

          {/* Stat Line */}
          <div className="mb-6">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">
              {statLine}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium rounded-full border border-white/20"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CaseStudyCard;

