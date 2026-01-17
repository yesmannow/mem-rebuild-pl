import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import './ArchitectLogo.css';

interface ArchitectLogoProps {
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { dimension: 32, fontSize: '10px' },
  md: { dimension: 44, fontSize: '12px' },
  lg: { dimension: 54, fontSize: '13px' },
};

const ArchitectLogo: React.FC<ArchitectLogoProps> = ({
  className = '',
  showLabel = true,
  size = 'md',
}) => {
  const shouldReduceMotion = useReducedMotion();
  const dimensions = sizeMap[size];

  const orbitVariants = {
    static: { rotate: 0 },
    rotate: {
      rotate: 360,
      transition: { repeat: Infinity, ease: 'linear', duration: 18 },
    },
  };

  const shimmerVariants = {
    rest: { opacity: 0.55, scale: 0.96 },
    hover: {
      opacity: 0.85,
      scale: 1.04,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const pulseVariants = {
    rest: { opacity: 0.35, scale: 0.92 },
    hover: {
      opacity: 0.55,
      scale: 1.05,
      transition: { duration: 1.4, ease: 'easeInOut' },
    },
  };

  return (
    <Link
      to="/"
      className={`architect-logo-container ${className}`}
      aria-label="Home"
    >
      <div className="relative inline-flex items-center gap-3">
        {/* Ambient glow */}
        <motion.div
          className="architect-logo-spotlight"
          variants={pulseVariants}
          initial="rest"
          animate="rest"
          whileHover="hover"
        />

        {/* Emblem */}
        <motion.div
          className="architect-logo-emblem"
          initial="rest"
          animate="rest"
          whileHover="hover"
          variants={shimmerVariants}
        >
          <motion.svg
            width={dimensions.dimension}
            height={dimensions.dimension}
            viewBox="0 0 64 64"
            className="architect-logo-svg"
            variants={orbitVariants}
            initial="static"
            animate={shouldReduceMotion ? 'static' : 'rotate'}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="aurora-core" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7CF3E2" />
                <stop offset="40%" stopColor="#7B8CFF" />
                <stop offset="100%" stopColor="#3BFFFF" />
              </linearGradient>
              <radialGradient id="aurora-halo" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(124, 243, 226, 0.6)" />
                <stop offset="80%" stopColor="rgba(59, 255, 255, 0)" />
              </radialGradient>
              <linearGradient id="aurora-ring" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#9AE6FF" />
                <stop offset="50%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>

            {/* Soft halo */}
            <circle cx="32" cy="32" r="24" fill="url(#aurora-halo)" opacity="0.55" />

            {/* Core */}
            <circle cx="32" cy="32" r="16" fill="url(#aurora-core)" />

            {/* Orbit ring */}
            <motion.path
              d="M10 28c6-8 16-12 26-10 6.5 1.3 12.2 5.4 16 10 2.6 3.2 0.2 8.2-3.8 9.1-10 2.5-20.5 2.6-30.7-0.4C12.7 34.8 9.3 31.3 10 28Z"
              fill="none"
              stroke="url(#aurora-ring)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />

            {/* Light trails */}
            <motion.path
              d="M18 26c5-6 13-8 20-5.4"
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />
            <motion.path
              d="M24 38c3.5 1.8 7.6 2 11.3 0.7"
              fill="none"
              stroke="#C7D2FE"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Spark */}
            <circle cx="44" cy="22" r="3" fill="#E0F2FE" />
            <circle cx="22" cy="44" r="2" fill="#A5F3FC" />
          </motion.svg>
        </motion.div>

        {/* Wordmark */}
        {showLabel && (
          <div className="architect-logo-wordmark">
            <div className="architect-logo-name">JACOB DARLING</div>
            <div className="architect-logo-sub">marketing portfolio</div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ArchitectLogo;
