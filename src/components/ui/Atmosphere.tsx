import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { backgroundTextures } from '../../data/backgrounds';

const pickTextures = (count: number) => {
  const shuffled = [...backgroundTextures].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const Atmosphere: React.FC = () => {
  const textures = useMemo(() => pickTextures(Math.random() > 0.5 ? 2 : 1), []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {textures.map((src, idx) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0.1, rotate: 0, scale: 1 }}
          animate={{
            opacity: 0.18,
            rotate: 360,
            scale: 1.1,
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: 'linear',
            delay: idx * 4,
          }}
          style={{
            mixBlendMode: 'soft-light',
          }}
        >
          <img
            src={src}
            alt="Atmospheric texture"
            className="w-full h-full object-cover opacity-50 blur-3xl"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Atmosphere;
