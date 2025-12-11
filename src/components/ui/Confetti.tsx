import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  trigger: boolean;
  duration?: number;
  count?: number;
}

/**
 * Celebration confetti animation
 * Triggers on important user achievements or milestones
 */
export const Confetti: React.FC<ConfettiProps> = ({
  trigger,
  duration = 3000,
  count = 50,
}) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; rotation: number; color: string }>>([]);

  useEffect(() => {
    if (trigger) {
      const colors = ['#40E0D0', '#88ABF2', '#EC4899', '#10B981', '#F59E0B'];
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [trigger, count, duration]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: '-10vh',
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: '110vh',
            rotate: particle.rotation * 4,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: duration / 1000,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
        />
      ))}
    </div>
  );
};
