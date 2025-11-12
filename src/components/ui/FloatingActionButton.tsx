import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingActionButtonProps {
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  magnetic?: boolean;
  className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  label,
  onClick,
  href,
  position = 'bottom-right',
  magnetic = true,
  className = '',
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magnetic) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / 5;
    const y = (e.clientY - centerY) / 5;
    
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const buttonContent = (
    <motion.div
      animate={{ x: mousePos.x, y: mousePos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative inline-flex items-center justify-center
        w-16 h-16 rounded-full
        bg-gradient-to-br from-[#88ABF2] to-[#6B8FD6]
        shadow-lg shadow-[#88ABF2]/50
        hover:shadow-xl hover:shadow-[#88ABF2]/60
        transition-shadow duration-300
        cursor-pointer
        ${className}
      `}
    >
      {/* Icon */}
      <div className="text-white text-2xl">
        {icon}
      </div>

      {/* Label tooltip */}
      {label && (
        <div className="absolute right-full mr-4 px-3 py-2 bg-neutral-900 text-sm text-white rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {label}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="border-8 border-transparent border-l-neutral-900" />
          </div>
        </div>
      )}

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className={`fixed z-50 ${positionClasses[position]}`}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`fixed z-50 ${positionClasses[position]}`}>
      {buttonContent}
    </button>
  );
};

export default FloatingActionButton;
