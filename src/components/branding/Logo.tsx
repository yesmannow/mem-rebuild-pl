import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  animated?: boolean;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", animated = true, size = 48 }) => {
  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const Component = animated ? motion.svg : "svg";
  const PathComponent = animated ? motion.path : "path";

  return (
    <Component
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={animated ? "hidden" : undefined}
      animate={animated ? "visible" : undefined}
      variants={animated ? logoVariants : undefined}
    >
      {/* Outer hexagon frame */}
      <PathComponent
        d="M50 5 L85 27.5 L85 72.5 L50 95 L15 72.5 L15 27.5 Z"
        stroke="url(#gradient1)"
        strokeWidth="2.5"
        fill="none"
        strokeLinejoin="round"
        variants={animated ? pathVariants : undefined}
      />
      
      {/* Inner geometric "JD" monogram */}
      {/* Letter J */}
      <PathComponent
        d="M38 30 L38 55 Q38 65 45 65 Q50 65 50 60"
        stroke="url(#gradient2)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        variants={animated ? pathVariants : undefined}
      />
      
      {/* Letter D */}
      <PathComponent
        d="M58 30 L58 65 Q58 65 65 60 Q72 55 72 47.5 Q72 40 65 35 Q58 30 58 30"
        stroke="url(#gradient2)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={animated ? pathVariants : undefined}
      />

      {/* Accent dot */}
      <motion.circle
        cx="50"
        cy="82"
        r="2.5"
        fill="#88ABF2"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={animated ? { delay: 1.5, duration: 0.3 } : undefined}
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#88ABF2" />
          <stop offset="100%" stopColor="#a8c5ff" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#88ABF2" />
          <stop offset="50%" stopColor="#a8c5ff" />
          <stop offset="100%" stopColor="#88ABF2" />
        </linearGradient>
      </defs>
    </Component>
  );
};

export default Logo;
