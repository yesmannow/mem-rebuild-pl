import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './TechBackdrop.css';

interface TechBackdropProps {
  className?: string;
  backgroundImage?: string | null;
}

/**
 * TechBackdrop - Subtle looping grid animation with floating geometric shapes
 * Features:
 * - Animated grid pattern in slate-dark background
 * - Floating geometric shapes (triangles, circles, squares)
 * - Smooth, looping animations using Framer Motion
 * - Performance optimized with CSS transforms
 */
const TechBackdrop: React.FC<TechBackdropProps> = ({ className = '', backgroundImage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Grid animation using canvas for smooth performance
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Grid configuration
    const gridSize = 60;
    const gridColor = 'rgba(64, 224, 208, 0.08)'; // Subtle turquoise
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animated grid lines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      const offsetX = (time * 0.05) % gridSize;
      const offsetY = (time * 0.05) % gridSize;

      // Vertical lines
      for (let x = -offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = -offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Subtle glow at grid intersections
      ctx.fillStyle = 'rgba(64, 224, 208, 0.03)';
      for (let x = -offsetX; x < canvas.width + gridSize; x += gridSize) {
        for (let y = -offsetY; y < canvas.height + gridSize; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      time += 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Floating geometric shapes
  const shapes = [
    { type: 'triangle', delay: 0, duration: 20 },
    { type: 'circle', delay: 2, duration: 25 },
    { type: 'square', delay: 4, duration: 18 },
    { type: 'triangle', delay: 6, duration: 22 },
    { type: 'circle', delay: 8, duration: 28 },
    { type: 'square', delay: 10, duration: 20 },
  ];

  return (
    <div className={`tech-backdrop ${className}`} aria-hidden="true">
      {/* Dynamic background image */}
      {backgroundImage && (
        <div
          className="tech-backdrop__background-image"
          style={{
            backgroundImage: backgroundImage.startsWith('linear-gradient')
              ? backgroundImage
              : `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay',
            opacity: 0.4, // opacity-40 equivalent
          }}
        />
      )}

      {/* Animated grid canvas */}
      <canvas
        ref={canvasRef}
        className="tech-backdrop__grid"
        aria-hidden="true"
      />

      {/* Floating geometric shapes */}
      <div className="tech-backdrop__shapes">
        {shapes.map((shape, index) => (
          <motion.div
            key={index}
            className={`tech-backdrop__shape tech-backdrop__shape--${shape.type}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
              x: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              y: [
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
                `${Math.random() * 100}%`,
              ],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: shape.duration,
              delay: shape.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Gradient overlay for depth */}
      <div className="tech-backdrop__overlay" />
    </div>
  );
};

export default TechBackdrop;
