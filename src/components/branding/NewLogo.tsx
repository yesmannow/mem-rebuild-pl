import React from "react";
import { motion } from "framer-motion";

interface NewLogoProps {
  className?: string;
  size?: number;
  variant?: "header" | "splash" | "footer";
  animated?: boolean;
}

const NewLogo: React.FC<NewLogoProps> = ({ 
  className = "", 
  size = 48, 
  variant = "header",
  animated = true 
}) => {
  const logoVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.svg
      className={`new-logo ${className} logo-${variant}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      variants={animated ? logoVariants : undefined}
      initial={animated ? "initial" : undefined}
      animate={animated ? "animate" : undefined}
      whileHover={animated ? "hover" : undefined}
    >
      {/* Outer ring */}
      <motion.circle
        cx="60"
        cy="60"
        r="55"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Inner geometric pattern */}
      <motion.path
        d="M30 60 L60 30 L90 60 L60 90 Z"
        stroke="url(#gradient2)"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      />
      
      {/* Central "JD" monogram */}
      <motion.text
        x="60"
        y="70"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="url(#gradient3)"
        fontFamily="system-ui, -apple-system, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        JD
      </motion.text>
      
      {/* Accent dots */}
      <motion.circle
        cx="60"
        cy="25"
        r="3"
        fill="#3B82F6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      />
      <motion.circle
        cx="60"
        cy="95"
        r="3"
        fill="#EC4899"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 1.4 }}
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1F2937" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export default NewLogo;
