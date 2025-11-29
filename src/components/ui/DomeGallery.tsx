import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DomeGalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

interface DomeGalleryProps {
  images: DomeGalleryImage[];
  title?: string;
  description?: string;
  linkTo?: string;
  linkText?: string;
  maxItems?: number;
  className?: string;
}

/**
 * Dome Gallery Component - Inspired by ReactBits.dev
 * Features 3D tilt effects, spotlight interactions, and smooth animations
 * Perfect for showcasing studio images with an impressive visual presentation
 */
export const DomeGallery: React.FC<DomeGalleryProps> = ({
  images,
  title,
  description,
  linkTo,
  linkText = 'View Full Gallery',
  maxItems = 6,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const displayedImages = images.slice(0, maxItems);

  return (
    <section className={cn('relative py-12 sm:py-16 lg:py-20', className)}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--signal-500)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#40E0D0]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || description) && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-[var(--parchment-050)]/70 text-lg max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </motion.div>
        )}

        {/* Gallery Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {displayedImages.map((image, index) => (
            <DomeGalleryItem
              key={image.id}
              image={image}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Link to Full Gallery */}
        {linkTo && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to={linkTo}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--signal-500)] to-[#40E0D0] text-[var(--ink-900)] font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,165,0,0.4)] transition-all duration-300"
            >
              {linkText}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

interface DomeGalleryItemProps {
  image: DomeGalleryImage;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const DomeGalleryItem: React.FC<DomeGalleryItemProps> = ({
  image,
  index,
  isHovered,
  onHover,
  onLeave,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onLeave();
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group"
    >
      {/* Spotlight Effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(600px circle at 50% 50%, rgba(64, 224, 208, 0.3), transparent 70%)`,
          }}
        />
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--ink-700)]/60 bg-[var(--ink-800)]/40 aspect-square">
        {/* Image */}
        <motion.img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {image.title && (
            <h3 className="font-semibold text-lg mb-1 drop-shadow-lg">{image.title}</h3>
          )}
          {image.category && (
            <p className="text-sm text-white/80 drop-shadow-lg">{image.category}</p>
          )}
        </motion.div>

        {/* Glow Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          animate={{
            borderColor: isHovered
              ? ['rgba(64, 224, 208, 0.5)', 'rgba(255, 165, 0, 0.5)', 'rgba(64, 224, 208, 0.5)']
              : 'transparent',
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </motion.div>
    </motion.div>
  );
};

