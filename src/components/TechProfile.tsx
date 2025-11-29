import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TechProfileProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const TechProfile: React.FC<TechProfileProps> = ({
  className = '',
  size = 'md'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [blurDataUri, setBlurDataUri] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked animation for mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Transform scroll progress into rotation values
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Load blur data on mount
  useEffect(() => {
    // Use try-catch and check if fetch is available
    if (typeof fetch !== 'undefined') {
      fetch('/images/profile-main-blur.json')
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Blur data not found');
        })
        .then(data => {
          if (data && data.blurDataUri) {
            setBlurDataUri(data.blurDataUri);
          }
        })
        .catch(() => {
          // Fallback if blur data doesn't exist - component will work without it
          setBlurDataUri(null);
        });
    }
  }, []);

  // Handle mouse movement for 3D parallax effect (desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10 degrees

    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setMousePosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const sizeClasses = {
    sm: 'w-48 h-48',
    md: 'w-64 h-64',
    lg: 'w-80 h-80',
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${sizeClasses[size]} ${className}`}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Card Container */}
      <motion.div
        ref={cardRef}
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          ...(isTouchDevice
            ? {
                // Mobile: Use scroll-linked animation
                rotateX,
                rotateY,
              }
            : {
                // Desktop: Use mouse position
                transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                transition: 'transform 0.1s ease-out',
              }
          ),
        }}
      >
        {/* Pulsing Glow Background */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(64, 224, 208, 0.3) 0%, rgba(64, 224, 208, 0) 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: (isHovered || isTouchDevice) ? [0.5, 0.8, 0.5] : [0.3, 0.5, 0.3],
            scale: (isHovered || isTouchDevice) ? [1, 1.1, 1] : [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Main Card */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-brand-teal/30 bg-brand-dark/50 backdrop-blur-sm">
          {/* Image Container */}
          <div className="relative w-full h-full">
            {/* Blur Placeholder */}
            {blurDataUri && (
              <img
                src={blurDataUri}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
              />
            )}

            {/* Main Image */}
            <motion.img
              src="/images/design/jacob-brady-resized.webp"
              alt="Jacob Darling - Marketing Technologist"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: (isHovered || isTouchDevice) ? 'grayscale(0%)' : 'grayscale(100%)',
                transition: 'filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Scanner Line Effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 0%, rgba(64, 224, 208, 0.3) 50%, transparent 100%)',
                height: '2px',
                top: '0%',
              }}
              animate={{
                top: ['0%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'linear',
              }}
            />

            {/* Data HUD Overlay (appears on hover or always visible on mobile) */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: (isHovered || isTouchDevice) ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Corner Brackets - Using divs for better control */}
              <div className="absolute inset-0">
                {/* Top Left Corner */}
                <div className="absolute top-5 left-5 w-5 h-5">
                  <div className="absolute top-0 left-0 w-5 h-0.5 bg-brand-orange" style={{ boxShadow: '0 0 8px rgba(255, 165, 0, 0.8)' }} />
                  <div className="absolute top-0 left-0 w-0.5 h-5 bg-brand-orange" style={{ boxShadow: '0 0 8px rgba(255, 165, 0, 0.8)' }} />
                </div>

                {/* Top Right Corner */}
                <div className="absolute top-5 right-5 w-5 h-5">
                  <div className="absolute top-0 right-0 w-5 h-0.5 bg-brand-orange" style={{ boxShadow: '0 0 8px rgba(255, 165, 0, 0.8)' }} />
                  <div className="absolute top-0 right-0 w-0.5 h-5 bg-brand-orange" style={{ boxShadow: '0 0 8px rgba(255, 165, 0, 0.8)' }} />
                </div>

                {/* Bottom Left Corner */}
                <div className="absolute bottom-5 left-5 w-5 h-5">
                  <div className="absolute bottom-0 left-0 w-5 h-0.5 bg-brand-orange" style={{ boxShadow: '0 0 8px rgba(255, 165, 0, 0.8)' }} />
                  <div className="absolute bottom-0 left-0 w-0.5 h-5 bg-brand-orange" style={{ boxShadow: '0 0 8px rgba(255, 165, 0, 0.8)' }} />
                </div>

                {/* Bottom Right Corner */}
                <div className="absolute bottom-5 right-5 w-5 h-5">
                  <div className="absolute bottom-0 right-0 w-5 h-0.5 bg-brand-orange" style={{ boxShadow: '0 0 8px rgba(255, 165, 0, 0.8)' }} />
                  <div className="absolute bottom-0 right-0 w-0.5 h-5 bg-brand-orange" style={{ boxShadow: '0 0 8px rgba(255, 165, 0, 0.8)' }} />
                </div>
              </div>

              {/* Grid Lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 165, 0, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 165, 0, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }} />
            </motion.div>

            {/* Status Badge */}
            <motion.div
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-dark/90 backdrop-blur-sm border border-brand-teal/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span className="text-xs font-mono font-bold text-brand-teal">
                STATUS: ONLINE
              </span>
            </motion.div>
          </div>
        </div>

        {/* Additional Glow on Hover (or always on mobile) */}
        {(isHovered || isTouchDevice) && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255, 165, 0, 0.2) 0%, transparent 70%)',
              filter: 'blur(15px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default TechProfile;

