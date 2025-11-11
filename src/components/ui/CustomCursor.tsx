import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('cursor-hover') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('cursor-hover') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(false);
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  // Hide on mobile devices
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <div className="w-4 h-4 bg-white rounded-full" />
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.3,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        <div className="w-10 h-10 border-2 border-white rounded-full" />
      </motion.div>

      {/* Branded Cursor (when hovering) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 30,
          y: mousePosition.y - 30,
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
      >
        <div className="w-15 h-15 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-xs font-bold">JD</span>
        </div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        animate={{
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
          scale: isHovering ? 1.2 : 0.8,
          opacity: isHovering ? 0.6 : 0.2,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 25,
        }}
      >
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-xl" />
      </motion.div>

      {/* CSS to hide default cursor */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          * {
            cursor: none !important;
          }
          
          @media (max-width: 768px) {
            * {
              cursor: auto !important;
            }
          }
        `,
        }}
      />
    </>
  );
};

export default CustomCursor;
