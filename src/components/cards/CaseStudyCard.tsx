import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// @ts-ignore - manifest may not exist during dev
import manifest from '@data/images.manifest.json';
import OptimizedImage from '@components/media/OptimizedImage';

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
  impactValue?: number; // 0-1 for impact bar visualization
  thumbnail?: string; // filename in /public/images
}

function ImpactBar({ value = 0.45 }: { value: number }) {
  return (
    <div className="mt-5 h-1.5 w-full rounded-full bg-neutral-800">
      <div
        className="h-1.5 rounded-full bg-gradient-to-r from-brand-400 to-accent-400"
        style={{ width: `${Math.min(100, Math.max(0, value * 100))}%` }}
      />
    </div>
  );
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
  impactValue,
  thumbnail,
}) => {
  // Read dominant color from manifest for ambient glow
  const m = thumbnail ? (manifest as any)[thumbnail] : null;
  const dominantColor = m?.color ?? "rgb(73 195 178 / 0.25)"; // fallback brand color

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
          boxShadow: "0 8px 32px -8px rgba(0,0,0,0.45)",
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
        {/* Ambient glow from dominant color */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(60% 60% at 50% 40%, ${dominantColor}, transparent 70%)`
          }}
        />

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `0px 0px 40px ${glowColor}`,
          }}
        />

        {/* Optional thumbnail */}
        {thumbnail && (
          <div className="mb-4 -mx-8 -mt-8">
            <OptimizedImage
              src={thumbnail}
              alt={title}
              className="h-40 w-full rounded-t-2xl object-cover"
            />
          </div>
        )}

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

          {/* Impact Bar */}
          {impactValue !== undefined && <ImpactBar value={impactValue} />}
        </div>
      </motion.div>
    </Link>
  );
};

export default CaseStudyCard;

