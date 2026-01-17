import React, { useEffect, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Shield, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import './BearCaveHero.css';

interface ChipIndicator {
  label: string;
  value: string;
  icon?: React.ReactNode;
  color?: 'turquoise' | 'creamsicle';
}

interface BearCaveHeroProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  chips?: ChipIndicator[];
}

const defaultChips: ChipIndicator[] = [
  { label: 'Systems', value: 'Online', icon: <Cpu size={14} />, color: 'turquoise' },
  { label: 'Performance', value: 'Optimal', icon: <Zap size={14} />, color: 'creamsicle' },
  { label: 'Security', value: 'Active', icon: <Shield size={14} />, color: 'turquoise' },
  { label: 'Code', value: 'Production', icon: <Code size={14} />, color: 'creamsicle' },
];

const BearCaveHero: React.FC<BearCaveHeroProps> = ({
  title = 'Jacob Darling',
  subtitle = 'Systems Architect',
  primaryCTA = { text: 'View Portfolio', href: '/case-studies' },
  secondaryCTA = { text: 'Get in Touch', href: '/contact' },
  chips = defaultChips,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Looping tech backdrop animation
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

    // Tech grid pattern with animated particles
    const gridSize = 50;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animated grid
      ctx.strokeStyle = 'rgba(64, 224, 208, 0.1)';
      ctx.lineWidth = 1;

      const offsetX = (time * 0.1) % gridSize;
      const offsetY = (time * 0.1) % gridSize;

      for (let x = -offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = -offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animated particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, 'rgba(64, 224, 208, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 165, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(64, 224, 208, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="bearcave-hero" aria-labelledby="bearcave-hero-title">
      {/* Looping tech backdrop */}
      <canvas
        ref={canvasRef}
        className="bearcave-hero__canvas"
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div className="bearcave-hero__overlay" />

      {/* Content */}
      <div className="bearcave-hero__container">
        <motion.div
          className="bearcave-hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Chip Indicators */}
          <div className="bearcave-hero__chips">
            {chips.map((chip, index) => (
              <motion.div
                key={chip.label}
                className={`bearcave-hero__chip bearcave-hero__chip--${chip.color || 'turquoise'}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {chip.icon && (
                  <span className="bearcave-hero__chip-icon">{chip.icon}</span>
                )}
                <span className="bearcave-hero__chip-label">{chip.label}</span>
                <span className="bearcave-hero__chip-value">{chip.value}</span>
                <span className="bearcave-hero__chip-indicator" />
              </motion.div>
            ))}
          </div>

          {/* Title */}
          <h1 id="bearcave-hero-title" className="bearcave-hero__title">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="bearcave-hero__subtitle">{subtitle}</p>

          {/* Gradient CTAs */}
          <div className="bearcave-hero__ctas">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link
                to={primaryCTA.href}
                className="bearcave-hero__cta bearcave-hero__cta--primary"
              >
                <span>{primaryCTA.text}</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            {secondaryCTA && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link
                  to={secondaryCTA.href}
                  className="bearcave-hero__cta bearcave-hero__cta--secondary"
                >
                  <span>{secondaryCTA.text}</span>
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="bearcave-hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-hidden="true"
      >
        <motion.div
          className="bearcave-hero__scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default BearCaveHero;
