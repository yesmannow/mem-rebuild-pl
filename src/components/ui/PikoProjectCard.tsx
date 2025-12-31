import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SideProjectCardData } from './SideProjectCard';

interface PikoProjectCardProps {
  project: SideProjectCardData;
  index: number;
  className?: string;
}

/**
 * Specialized Project Card for Piko Fg Music
 * Industrial "Urban Syndicate" aesthetic with brutalist design
 */
export const PikoProjectCard: React.FC<PikoProjectCardProps> = ({
  project,
  index,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  // Vault Entry Reveal: Staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: index * 0.05,
      },
    },
  };

  const imageVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const tagVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn('relative group', className)}
    >
      <Link
        to={`/side-projects/${project.slug}`}
        className="block h-full"
        aria-label={`View ${project.title} project`}
      >
        {/* Brutalist Card Container - 0px border-radius, Midnight Black */}
        <motion.div
          className="relative h-full overflow-hidden bg-[#050505] border-2 transition-all duration-300"
          style={{ borderRadius: '0px' }}
          animate={{
            borderColor: isHovered ? '#FFD700' : '#333333',
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Concrete Grit Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              opacity: 0.05,
            }}
          />

          {/* Image Section with CCTV Hover Effect */}
          <div className="relative aspect-[4/3] overflow-hidden bg-black">
            <motion.img
              variants={imageVariants}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ filter: isHovered ? 'grayscale(100%)' : 'grayscale(0%)' }}
              transition={{ duration: 0.4 }}
              loading="lazy"
            />

            {/* Logo Overlay - Top Right Corner */}
            <motion.img
              src="/images/projects/Piko Fg Music/piko-logo.png"
              alt="Piko Logo"
              className="absolute top-4 right-4 w-16 h-16 object-contain z-20"
              style={{
                filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8))',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            />

            {/* CCTV Scan-Line Animation on Hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-15"
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'linear-gradient(180deg, transparent 0%, rgba(255, 215, 0, 0.15) 50%, transparent 100%)',
                  height: '30%',
                }}
              />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/60 to-transparent" />

            {/* Yellow Glow Box Shadow on Hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 0 15px #FFD700',
                }}
              />
            )}
          </div>

          {/* Content Section */}
          <div className="p-5 relative z-10">
            {/* Tactical Header - Lexend Black Italic with -12deg skew */}
            <motion.h3
              className="text-2xl font-black italic text-white mb-3 uppercase tracking-wider"
              style={{
                transform: 'skew(-12deg)',
                fontFamily: '"Lexend", sans-serif',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              }}
            >
              {project.title}
            </motion.h3>

            {/* Technical Specs - JetBrains Mono */}
            <div className="mb-4">
              <p 
                className="text-xs text-[#FFD700] font-mono uppercase tracking-widest"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                TECH: {project.tags?.slice(0, 3).join(' // ') || 'NEXT.JS // WASM // THREE.JS'}
              </p>
            </div>

            {/* Description */}
            {project.description && (
              <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                {project.description}
              </p>
            )}

            {/* Technical Tags - Staggered fade-in from bottom */}
            {project.tags && project.tags.length > 0 && (
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                variants={tagVariants}
              >
                {project.tags.slice(0, 4).map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className="px-2 py-1 text-xs font-mono uppercase tracking-wider"
                    style={{
                      borderRadius: '0px',
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #FFD700',
                      color: '#FFD700',
                    }}
                    variants={tagVariants}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Footer with External Links */}
            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid #333' }}>
              <motion.a
                href="https://piko-artist-website.vercel.app/studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#FFD700] font-bold flex items-center gap-1 hover:text-white transition-colors"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                LIVE SITE
                <ExternalLink size={12} />
              </motion.a>
              <motion.a
                href="https://github.com/yesmannow/piko-artist-website-v3"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-[#FFD700] transition-colors font-mono"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                REPO →
              </motion.a>
            </div>
          </div>

          {/* Safety Yellow Progress Indicator - Animated */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFD700]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};
