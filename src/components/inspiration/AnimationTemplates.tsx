import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, Easing } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Particle System Animation
export const ParticleSystem: React.FC<{ count?: number; className?: string }> = ({
  count = 50,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = Array.from({ length: count }, (_, i) => {
      const particle = document.createElement('div');
      particle.className =
        'absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      containerRef.current?.appendChild(particle);
      return particle;
    });

    // Animate particles
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        rotation: 360,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1,
      });
    });

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, [count]);

  return <div ref={containerRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
};

// Morphing Shapes Animation
export const MorphingShapes: React.FC<{ className?: string }> = ({ className = '' }) => {
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shapesRef.current) return;

    const shapes = shapesRef.current.children;

    gsap.to(shapes, {
      scale: 'random(0.8, 1.2)',
      rotation: 'random(0, 360)',
      x: 'random(-50, 50)',
      y: 'random(-50, 50)',
      duration: 'random(2, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.2,
    });
  }, []);

  return (
    <div ref={shapesRef} className={`absolute inset-0 ${className}`}>
      <div className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60" />
      <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 transform rotate-45 opacity-60" />
      <div className="absolute bottom-20 left-1/2 w-20 h-20 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg opacity-60" />
      <div className="absolute bottom-40 right-40 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60" />
    </div>
  );
};

// Floating Elements Animation
export const FloatingElements: React.FC<{
  elements: Array<{
    content: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
  }>;
  className?: string;
}> = ({ elements, className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.className || ''}`}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [-5, 5, -5],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: element.duration || 4,
            repeat: Infinity,
            ease: 'easeInOut' as Easing,
            delay: element.delay || index * 0.5,
          }}
        >
          {element.content}
        </motion.div>
      ))}
    </div>
  );
};

// Scroll Reveal Animation
export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}> = ({ children, direction = 'up', delay = 0, duration = 0.8, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 100, opacity: 0 };
      case 'down':
        return { y: -100, opacity: 0 };
      case 'left':
        return { x: 100, opacity: 0 };
      case 'right':
        return { x: -100, opacity: 0 };
      default:
        return { y: 100, opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
        return { y: 0, opacity: 1 };
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
        return { x: 0, opacity: 1 };
      case 'right':
        return { x: 0, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={controls}
      variants={{
        visible: getAnimatePosition(),
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut' as Easing,
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger Animation
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.1, className = '' }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item
export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: 'easeOut' as Easing,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic Hover Effect
export const MagneticHover: React.FC<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}> = ({ children, strength = 0.3, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        // TODO: GSAP ease type issue - using type assertion for compatibility
        ease: 'easeOut' as any,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// Parallax Scroll Effect
export const ParallaxScroll: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => -(window.innerHeight * speed),
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// Text Reveal Animation
export const TextReveal: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.1,
            ease: 'easeOut' as Easing,
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// Loading Spinner with Custom Animation
export const LoadingSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-purple-400 border-t-transparent rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear' as Easing,
      }}
    />
  );
};

export default {
  ParticleSystem,
  MorphingShapes,
  FloatingElements,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  MagneticHover,
  ParallaxScroll,
  TextReveal,
  LoadingSpinner,
};
