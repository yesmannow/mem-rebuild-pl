import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  className,
  intensity = 0.15,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity * 10, -intensity * 10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity * 10, intensity * 10]);

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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn('relative', className)}
    >
      {/* Glow effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-brand-teal via-brand-orange to-brand-teal rounded-xl opacity-20 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div style={{ transform: 'translateZ(0)' }}>{children}</div>
    </motion.div>
  );
};

export default MagneticCard;

