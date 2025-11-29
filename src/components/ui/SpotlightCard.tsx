import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '', onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-[var(--ink-700)]/60 bg-[var(--ink-800)]/40 ${className}`}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Spotlight effect */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0"
          animate={{ opacity: 0.3 }}
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(64, 224, 208, 0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Border glow on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0"
          animate={{ opacity: 1 }}
          style={{
            boxShadow: '0 0 20px rgba(64, 224, 208, 0.3), inset 0 0 20px rgba(64, 224, 208, 0.1)',
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

