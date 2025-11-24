import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

interface InteractiveBackgroundProps {
  variant?: 'particles' | 'gradient' | 'mesh';
  className?: string;
  particleCount?: number;
}

/**
 * InteractiveBackground - Unique background system with Ocean Pearl palette
 * 
 * Variants:
 * - particles: Subtle particle system with mouse interaction
 * - gradient: Animated gradient mesh
 * - mesh: Moving gradient mesh
 * 
 * Features:
 * - Light/dark mode adaptive
 * - Performance optimized with RAF
 * - Respects prefers-reduced-motion
 * - Ocean Pearl color palette
 */
const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  variant = 'particles',
  className = '',
  particleCount = 50,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  // Ocean Pearl palette
  const colors = [
    'rgba(0, 109, 119, 0.6)', // Stormy Teal
    'rgba(131, 197, 190, 0.5)', // Pearl Aqua
    'rgba(237, 246, 249, 0.4)', // Alice Blue
    'rgba(255, 221, 210, 0.5)', // Almond Silk
    'rgba(226, 149, 120, 0.6)', // Tangerine Dream
  ];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || variant === 'gradient') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
      }));
    };
    initParticles();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx -= (dx / distance) * force * 0.1;
          particle.vy -= (dy / distance) * force * 0.1;
        }

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 120) * 0.2;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [prefersReducedMotion, variant, particleCount]);

  if (variant === 'gradient') {
    return (
      <div className={`interactive-background-gradient absolute inset-0 -z-10 ${className}`}>
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(131, 197, 190, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(226, 149, 120, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(131, 197, 190, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(131, 197, 190, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 70% 40%, rgba(0, 109, 119, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 60%, rgba(255, 221, 210, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 60% 20%, rgba(0, 109, 119, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 40%, rgba(0, 109, 119, 0.4) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
    );
  }

  if (variant === 'mesh') {
    return (
      <div className={`interactive-background-mesh absolute inset-0 -z-10 overflow-hidden ${className}`}>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mesh-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(131, 197, 190, 0.3)" />
              <stop offset="100%" stopColor="rgba(226, 149, 120, 0.3)" />
            </linearGradient>
            <linearGradient id="mesh-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 109, 119, 0.3)" />
              <stop offset="100%" stopColor="rgba(255, 221, 210, 0.3)" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="20%"
            cy="30%"
            r="40%"
            fill="url(#mesh-grad-1)"
            animate={{
              cx: ['20%', '30%', '20%'],
              cy: ['30%', '40%', '30%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.circle
            cx="80%"
            cy="70%"
            r="35%"
            fill="url(#mesh-grad-2)"
            animate={{
              cx: ['80%', '70%', '80%'],
              cy: ['70%', '60%', '70%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </svg>
      </div>
    );
  }

  // Default: particles variant
  return (
    <canvas
      ref={canvasRef}
      className={`interactive-background-particles absolute inset-0 -z-10 ${className}`}
      style={{ opacity: prefersReducedMotion ? 0 : 1 }}
    />
  );
};

export default InteractiveBackground;
