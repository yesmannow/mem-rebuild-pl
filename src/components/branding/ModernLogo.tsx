import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';

interface ModernLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  animated?: boolean;
}

const ModernLogo: React.FC<ModernLogoProps> = ({
  className = '',
  size = 40,
  showText = true,
  animated = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!animated || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center flex-shrink-0 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Logo Container with 3D Transform */}
      <motion.div
        style={{
          rotateX: animated ? rotateX : 0,
          rotateY: animated ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="relative"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Glow Orb Background */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(64, 224, 208, 0.4), rgba(255, 165, 0, 0.3), transparent 70%)',
          }}
          animate={{
            scale: isHovered ? [1, 1.3, 1] : 1,
            opacity: isHovered ? [0.6, 0.9, 0.6] : 0.4,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Logo Icon Container */}
        <div className="relative z-10">
          {/* Gradient Circle Background */}
          <motion.div
            className="relative rounded-full overflow-hidden"
            style={{
              width: size,
              height: size,
              background: 'linear-gradient(135deg, rgba(64, 224, 208, 0.2), rgba(255, 165, 0, 0.2))',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
            }}
            animate={{
              borderColor: isHovered
                ? ['rgba(64, 224, 208, 0.5)', 'rgba(255, 165, 0, 0.5)', 'rgba(64, 224, 208, 0.5)']
                : 'rgba(64, 224, 208, 0.3)',
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Animated Gradient Overlay */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #40E0D0 0%, #FFA500 50%, #40E0D0 100%)',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              initial={{ opacity: 0.3 }}
              whileHover={{ opacity: 0.6 }}
            />

            {/* JD Monogram - Modern Typography with Gradient */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <motion.div
                className="font-bold relative"
                style={{
                  fontSize: size * 0.5,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '-0.05em',
                  fontWeight: 800,
                }}
                animate={{
                  scale: isHovered ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Gradient Text with Glow */}
                <span
                  className="bg-gradient-to-br from-[#40E0D0] via-white to-[#FFA500] bg-clip-text text-transparent"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(64, 224, 208, 0.6)) drop-shadow(0 0 4px rgba(255, 165, 0, 0.4))',
                    WebkitTextStroke: '0.5px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  JD
                </span>
                {/* Animated Glow Overlay */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-br from-[#40E0D0] via-white to-[#FFA500] bg-clip-text text-transparent blur-sm opacity-50"
                  animate={{
                    opacity: isHovered ? [0.5, 0.8, 0.5] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  JD
                </motion.span>
              </motion.div>
            </div>

            {/* Animated Particles */}
            <AnimatePresence>
              {isHovered && animated && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 3,
                        height: 3,
                        background: i % 2 === 0 ? '#40E0D0' : '#FFA500',
                        left: '50%',
                        top: '50%',
                        filter: 'blur(1px)',
                      }}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        x: [
                          Math.cos((i * 60) * Math.PI / 180) * (size * 0.6),
                          Math.cos((i * 60) * Math.PI / 180) * (size * 0.8),
                        ],
                        y: [
                          Math.sin((i * 60) * Math.PI / 180) * (size * 0.6),
                          Math.sin((i * 60) * Math.PI / 180) * (size * 0.8),
                        ],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Status Indicator */}
            <motion.div
              className="absolute top-1 right-1 rounded-full"
              style={{
                width: size * 0.2,
                height: size * 0.2,
                background: '#40E0D0',
                boxShadow: '0 0 8px rgba(64, 224, 208, 0.8)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Outer Glow Ring - Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              width: size * 1.15,
              height: size * 1.15,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              border: '2px solid transparent',
              background: 'linear-gradient(135deg, rgba(64, 224, 208, 0.4), rgba(255, 165, 0, 0.4)) border-box',
              WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              borderRadius: '50%',
            }}
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.2 : 1,
              opacity: isHovered ? [0.6, 0.9, 0.6] : 0.4,
            }}
            transition={{
              rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
              scale: { duration: 0.3 },
              opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        </div>
      </motion.div>

      {/* Text Label with Gradient Animation */}
      {showText && (
        <motion.span
          className="ml-2.5 font-bold text-lg tracking-tight relative whitespace-nowrap"
          animate={{
            color: isHovered ? undefined : undefined,
          }}
          transition={{ duration: 0.3 }}
        >
          <span
            className="bg-gradient-to-r from-[#40E0D0] via-[#FFA500] to-[#40E0D0] bg-[length:200%_auto] bg-clip-text text-transparent"
            style={{
              animation: 'gradient-shift 3s ease infinite',
            }}
          >
            Jacob Darling
          </span>
          <style>{`
            @keyframes gradient-shift {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
          `}</style>
        </motion.span>
      )}
    </div>
  );
};

export default ModernLogo;

