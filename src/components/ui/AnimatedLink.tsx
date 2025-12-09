/**
 * AnimatedLink - Enhanced link component with hover animations
 * Adds micro-interactions and visual feedback
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface AnimatedLinkProps {
  to: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  showArrow?: boolean;
  className?: string;
  external?: boolean;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  to,
  children,
  variant = 'default',
  showArrow = false,
  className = '',
  external = false,
}) => {
  const baseStyles = 'inline-flex items-center gap-2 relative overflow-hidden group transition-all duration-300';
  
  const variants = {
    default: 'text-brand-muted hover:text-brand-teal',
    primary: 'px-6 py-3 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 hover:shadow-[0_0_20px_rgba(64,224,208,0.3)]',
    secondary: 'px-6 py-3 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/90 hover:shadow-[0_0_20px_rgba(255,165,0,0.3)]',
    ghost: 'px-6 py-3 border border-brand-teal/30 text-brand-teal rounded-lg hover:bg-brand-teal/10 hover:border-brand-teal',
  };

  const content = (
    <>
      {/* Animated background shine effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {showArrow && (
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <ArrowRight size={16} />
          </motion.span>
        )}
      </span>

      {/* Underline animation for default variant */}
      {variant === 'default' && (
        <motion.span
          className="absolute bottom-0 left-0 h-[2px] bg-brand-teal"
          initial={{ width: 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}
    </>
  );

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <motion.a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Link to={to} className={combinedClassName}>
        {content}
      </Link>
    </motion.div>
  );
};

export default AnimatedLink;
