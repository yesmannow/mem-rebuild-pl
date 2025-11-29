import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

interface TiltStackCardProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  title: string;
  technologies: string[];
  onTechHover?: (tech: string) => void;
}

export const TiltStackCard: React.FC<TiltStackCardProps> = ({
  children,
  className = '',
  icon,
  title,
  technologies,
  onTechHover,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

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
        transformStyle: 'preserve-3d'
      }}
      className={`rounded-xl border border-[var(--ink-700)]/60 bg-[var(--ink-800)]/40 p-4 sm:p-5 w-full ${className}`}
      whileHover={!isMobile ? { scale: 1.05, z: 50 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        style={{
          background: 'radial-gradient(circle at center, rgba(64, 224, 208, 0.1), transparent 70%)',
          boxShadow: '0 0 30px rgba(64, 224, 208, 0.2)',
        }}
      />

      <div className="relative z-10">
        <div className="stack-header flex items-center gap-2 mb-3">
          {icon && <span className="stack-icon text-[var(--signal-500)]">{icon}</span>}
          <h3 className="font-semibold">{title}</h3>
        </div>
        {children}
      </div>
    </motion.div>
  );
};

