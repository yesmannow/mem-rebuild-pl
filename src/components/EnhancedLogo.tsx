import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EnhancedLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

const EnhancedLogo: React.FC<EnhancedLogoProps> = ({
  className = '',
  size = 40,
  showText = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Logo Container */}
      <motion.div
        className={`relative transition-all duration-300 ${
          isHovered
            ? 'drop-shadow-[0_0_30px_rgba(64,224,208,0.8),0_0_25px_rgba(255,165,0,0.6)]'
            : 'drop-shadow-[0_0_15px_rgba(64,224,208,0.5)]'
        }`}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Professional, Highly Visible SVG Logo */}
        <motion.svg
          width={size}
          height={size}
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300"
        >
          <defs>
            {/* J gradient (bright teal) */}
            <linearGradient id="jd-gradient-j" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#40E0D0" stopOpacity="1" />
              <stop offset="50%" stopColor="#20B2AA" stopOpacity="1" />
              <stop offset="100%" stopColor="#0F766E" stopOpacity="1" />
            </linearGradient>

            {/* D gradient (bright orange) */}
            <linearGradient id="jd-gradient-d" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA500" stopOpacity="1" />
              <stop offset="50%" stopColor="#FF8C00" stopOpacity="1" />
              <stop offset="100%" stopColor="#C2410C" stopOpacity="1" />
            </linearGradient>

            {/* Combined gradient for accents */}
            <linearGradient id="jd-gradient-combined" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#40E0D0" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="1" />
            </linearGradient>

            {/* Strong glow filter for visibility */}
            <filter id="jd-glow-strong" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Outline filter for better contrast */}
            <filter id="jd-outline" x="-50%" y="-50%" width="200%" height="200%">
              <feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken"/>
              <feGaussianBlur in="thicken" stdDeviation="2" result="blurred"/>
              <feFlood floodColor="#000" floodOpacity="0.5" result="glowColor"/>
              <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow"/>
              <feMerge>
                <feMergeNode in="softGlow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Shadow for depth and contrast */}
            <filter id="jd-shadow-strong" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity="0.6"/>
            </filter>
          </defs>

          {/* Subtle background circle for depth */}
          <circle
            cx="60"
            cy="60"
            r="58"
            fill="url(#jd-gradient-combined)"
            opacity={isHovered ? 0.15 : 0.08}
            className="transition-opacity duration-300"
          />

          {/* J Letter - Bold, Professional, Highly Visible */}
          <g transform="translate(60, 60)">
            {/* J main vertical stroke - extra thick for visibility */}
            <motion.rect
              x="-36"
              y="-35"
              width="16"
              height="58"
              rx="3"
              fill="url(#jd-gradient-j)"
              filter="url(#jd-outline)"
              stroke="#000"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              animate={{
                opacity: [1, 0.98, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* J horizontal top bar - wider and thicker */}
            <motion.rect
              x="-36"
              y="-35"
              width="24"
              height="10"
              rx="3"
              fill="url(#jd-gradient-j)"
              filter="url(#jd-outline)"
              stroke="#000"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
            {/* J curved hook bottom - smoother curve */}
            <motion.path
              d="M -20 23 Q -12 23, -12 18 Q -12 13, -20 13 L -20 23 Z"
              fill="url(#jd-gradient-j)"
              filter="url(#jd-glow-strong)"
              stroke="#000"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
            {/* J inner highlight for depth */}
            <motion.rect
              x="-34"
              y="-33"
              width="12"
              height="54"
              rx="2"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              opacity={isHovered ? 0.4 : 0.2}
            />
          </g>

          {/* D Letter - Bold, Professional, Highly Visible */}
          <g transform="translate(60, 60)">
            {/* D main vertical stroke - extra thick */}
            <motion.rect
              x="8"
              y="-35"
              width="16"
              height="70"
              rx="3"
              fill="url(#jd-gradient-d)"
              filter="url(#jd-outline)"
              stroke="#000"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              animate={{
                opacity: [1, 0.98, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.1,
              }}
            />
            {/* D curved right side - top half */}
            <motion.path
              d="M 24 -35 L 36 -35 Q 44 -35, 44 -25 L 44 -15 Q 44 -5, 36 -5 L 24 -5 Z"
              fill="url(#jd-gradient-d)"
              filter="url(#jd-outline)"
              stroke="#000"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
            {/* D curved right side - bottom half */}
            <motion.path
              d="M 24 5 L 36 5 Q 44 5, 44 15 L 44 25 Q 44 35, 36 35 L 24 35 Z"
              fill="url(#jd-gradient-d)"
              filter="url(#jd-outline)"
              stroke="#000"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />
            {/* D inner highlight for depth */}
            <motion.ellipse
              cx="30"
              cy="0"
              rx="8"
              ry="24"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
              opacity={isHovered ? 0.5 : 0.3}
              filter="url(#jd-glow-strong)"
            />
          </g>

          {/* Connecting accent element between J and D */}
          <motion.path
            d="M 32 60 Q 42 58, 52 60"
            fill="none"
            stroke="url(#jd-gradient-combined)"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={isHovered ? 0.7 : 0.4}
            filter="url(#jd-glow-strong)"
            animate={{
              pathLength: isHovered ? [0, 1] : [0, 0.5],
              opacity: isHovered ? [0.4, 0.7, 0.4] : 0.4,
            }}
            transition={{
              duration: 0.6,
            }}
          />

          {/* Status indicator - Top right corner */}
          <motion.circle
            cx="98"
            cy="22"
            r="5"
            fill="#40E0D0"
            filter="url(#jd-glow-strong)"
            stroke="#000"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            animate={{
              opacity: [0.9, 1, 0.9],
              scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Status inner glow */}
          <motion.circle
            cx="98"
            cy="22"
            r="2.5"
            fill="#40E0D0"
            opacity={0.9}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.svg>
      </motion.div>

      {/* Text label with enhanced styling */}
      {showText && (
        <motion.span
          className="ml-3 text-brand-text font-bold text-lg tracking-tight"
          animate={{
            color: isHovered ? '#40E0D0' : undefined,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="bg-gradient-to-r from-brand-teal to-brand-orange bg-clip-text text-transparent">
            Jacob Darling
          </span>
        </motion.span>
      )}
    </div>
  );
};

export default EnhancedLogo;
