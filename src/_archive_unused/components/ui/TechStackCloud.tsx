import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Icon from '../Icon';

interface TechItem {
  name: string;
  slug: string;
  category?: string;
  size?: 'sm' | 'md' | 'lg';
}

interface TechStackCloudProps {
  tech: TechItem[];
  className?: string;
}

const TechStackCloud: React.FC<TechStackCloudProps> = ({ tech, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Magnetic effect for tech items
  const MagneticTechBadge: React.FC<{ tech: TechItem; index: number }> = ({ tech, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setHoveredTech(null);
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-base',
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHoveredTech(tech.name)}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={
          isInView
            ? {
                opacity: 1,
                scale: hoveredTech === tech.name ? 1.15 : 1,
                y: 0,
                zIndex: hoveredTech === tech.name ? 50 : 1,
              }
            : { opacity: 0, scale: 0.8, y: 20 }
        }
        transition={{
          delay: index * 0.05,
          duration: 0.3,
          type: 'spring',
          stiffness: 200,
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: 1.15,
          y: -8,
          transition: { duration: 0.2 },
        }}
        className={`flex items-center gap-2 ${sizeClasses[tech.size || 'md']} bg-brand-surface/50 border border-brand-muted/20 rounded-lg font-medium text-brand-text hover:border-brand-teal/40 transition-all cursor-pointer relative group/tech`}
      >
        {/* Glow effect on hover */}
        {hoveredTech === tech.name && (
          <motion.div
            className="absolute -inset-1 bg-brand-teal/20 rounded-lg blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
        <div className="relative z-10 flex items-center gap-2">
          <Icon
            slug={tech.slug}
            className="w-5 h-5 text-brand-teal group-hover/tech:scale-110 transition-transform"
          />
          <span>{tech.name}</span>
        </div>
      </motion.div>
    );
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex flex-wrap gap-3 items-center justify-center min-h-[200px]">
        {tech.map((item, index) => (
          <MagneticTechBadge key={item.name} tech={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TechStackCloud;

