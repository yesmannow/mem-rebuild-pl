import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface EnhancedBentoCardProps {
  className?: string;
  children: React.ReactNode;
  span?: '1' | '2' | '3' | '4';
  rowSpan?: '1' | '2' | '3';
  enable3DTilt?: boolean;
  enableMagnetic?: boolean;
  tiltIntensity?: number;
  magneticIntensity?: number;
}

export const EnhancedBentoCard: React.FC<EnhancedBentoCardProps> = ({
  className,
  children,
  span = '1',
  rowSpan = '1',
  enable3DTilt = true,
  enableMagnetic = true,
  tiltIntensity = 8,
  magneticIntensity = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);

  // Magnetic effect (subtle translation)
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], [
    -magneticIntensity * 20,
    magneticIntensity * 20,
  ]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], [
    -magneticIntensity * 20,
    magneticIntensity * 20,
  ]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const spanClasses = {
    '1': 'md:col-span-1',
    '2': 'md:col-span-2',
    '3': 'md:col-span-3',
    '4': 'md:col-span-4',
  };

  const rowSpanClasses = {
    '1': 'md:row-span-1',
    '2': 'md:row-span-2',
    '3': 'md:row-span-3',
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: enable3DTilt ? rotateX : undefined,
        rotateY: enable3DTilt ? rotateY : undefined,
        x: enableMagnetic ? translateX : undefined,
        y: enableMagnetic ? translateY : undefined,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative rounded-xl border border-brand-muted/20 bg-brand-surface/50 backdrop-blur-sm p-6 overflow-hidden',
        'hover:border-brand-teal/40 transition-all duration-300',
        spanClasses[span],
        rowSpanClasses[rowSpan],
        className
      )}
    >
      {/* Enhanced glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 via-brand-teal/0 to-brand-orange/0 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0.1],
            background: [
              'linear-gradient(135deg, rgba(64, 224, 208, 0) 0%, rgba(255, 165, 0, 0) 100%)',
              'linear-gradient(135deg, rgba(64, 224, 208, 0.15) 0%, rgba(255, 165, 0, 0.1) 100%)',
              'linear-gradient(135deg, rgba(64, 224, 208, 0.1) 0%, rgba(255, 165, 0, 0.05) 100%)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      )}

      {/* Content with 3D depth */}
      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
};

