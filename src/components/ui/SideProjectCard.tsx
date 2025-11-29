import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Palette, Calendar, Tag } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SideProjectCardData {
  id: string;
  title: string;
  slug: string;
  image: string;
  category?: string;
  tags?: string[];
  year?: string;
  description?: string;
}

interface SideProjectCardProps {
  project: SideProjectCardData;
  index: number;
  className?: string;
}

/**
 * Modern Side Project Card with 3D tilt effects
 * Matches the design aesthetic of Studio page and DomeGallery
 */
export const SideProjectCard: React.FC<SideProjectCardProps> = ({
  project,
  index,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: !isMobile ? rotateX : 0,
        rotateY: !isMobile ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={cn('relative group', className)}
    >
      <Link
        to={`/side-projects/${project.slug}`}
        className="block h-full"
        aria-label={`View ${project.title} project`}
      >
        {/* Spotlight Effect */}
        {isHovered && !isMobile && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(600px circle at 50% 50%, rgba(64, 224, 208, 0.2), transparent 70%)`,
            }}
          />
        )}

        {/* Card Container - Updated with proper colors for dark background */}
        <div className="relative h-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/60 backdrop-blur-sm transition-all duration-300 hover:border-brand-teal/60 hover:shadow-lg hover:shadow-brand-teal/10">
          {/* Image Section */}
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
            {!imageError ? (
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
                <Palette size={48} className="text-brand-teal/30" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Hover Overlay Content */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <ExternalLink size={20} className="text-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* Content Section - Updated with visible text colors */}
          <div className="p-5">
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-brand-teal transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            {project.description && (
              <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                {project.description}
              </p>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-xs text-slate-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 + idx * 0.05 }}
                  >
                    <Tag size={10} />
                    {tag}
                  </motion.span>
                ))}
                {project.tags.length > 3 && (
                  <span className="inline-flex items-center px-2 py-1 text-xs text-slate-400">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
              {project.year && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar size={12} />
                  <span>{project.year}</span>
                </div>
              )}
              <motion.span
                className="text-xs text-brand-teal font-semibold flex items-center gap-1"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                View Project
                <ExternalLink size={12} />
              </motion.span>
            </div>
          </div>

          {/* Glow Border Animation */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
            animate={{
              borderColor: isHovered
                ? ['rgba(64, 224, 208, 0.5)', 'rgba(255, 165, 0, 0.5)', 'rgba(64, 224, 208, 0.5)']
                : 'transparent',
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

