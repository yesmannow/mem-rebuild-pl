import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TechBlock {
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'tools';
  color: string;
  x: number;
  y: number;
}

const techStack: TechBlock[] = [
  // Frontend Row
  { name: 'React', category: 'frontend', color: '#61DAFB', x: 0, y: 0 },
  { name: 'TypeScript', category: 'frontend', color: '#3178C6', x: 1, y: 0 },
  { name: 'Next.js', category: 'frontend', color: '#000000', x: 2, y: 0 },
  { name: 'Tailwind', category: 'frontend', color: '#06B6D4', x: 3, y: 0 },

  // Backend Row
  { name: 'Node.js', category: 'backend', color: '#339933', x: 0, y: 1 },
  { name: 'Python', category: 'backend', color: '#3776AB', x: 1, y: 1 },
  { name: 'PostgreSQL', category: 'backend', color: '#336791', x: 2, y: 1 },
  { name: 'MongoDB', category: 'backend', color: '#47A248', x: 3, y: 1 },

  // Cloud Row
  { name: 'AWS', category: 'cloud', color: '#FF9900', x: 0, y: 2 },
  { name: 'Azure', category: 'cloud', color: '#0078D4', x: 1, y: 2 },
  { name: 'Docker', category: 'cloud', color: '#2496ED', x: 2, y: 2 },
  { name: 'K8s', category: 'cloud', color: '#326CE5', x: 3, y: 2 },

  // Tools Row
  { name: 'Git', category: 'tools', color: '#F05032', x: 0, y: 3 },
  { name: 'Figma', category: 'tools', color: '#F24E1E', x: 1, y: 3 },
  { name: 'HubSpot', category: 'tools', color: '#FF7A59', x: 2, y: 3 },
  { name: 'Salesforce', category: 'tools', color: '#00A1E0', x: 3, y: 3 },
];

const categoryColors = {
  frontend: '#40E0D0',
  backend: '#40E0D0',
  cloud: '#40E0D0',
  tools: '#40E0D0',
};

export const IsometricStack: React.FC = () => {
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
      <div
        className="relative"
        style={{
          transform: 'rotateX(60deg) rotateZ(-45deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="grid grid-cols-4 gap-3">
          {techStack.map((tech) => {
            const isHovered = hoveredBlock === tech.name;
            const blockSize = 50;
            const depth = 15;

            return (
              <motion.div
                key={tech.name}
                className="relative cursor-pointer"
                style={{
                  width: `${blockSize}px`,
                  height: `${blockSize}px`,
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => setHoveredBlock(tech.name)}
                onMouseLeave={() => setHoveredBlock(null)}
                animate={{
                  z: isHovered ? depth : 0,
                  scale: isHovered ? 1.15 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Top Face - Isometric */}
                <div
                  className="absolute inset-0 border border-white/20 rounded-sm flex items-center justify-center font-mono text-[9px] font-bold text-white transition-all duration-300"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${tech.color} 0%, ${tech.color}dd 100%)`
                      : `linear-gradient(135deg, ${tech.color}66 0%, ${tech.color}44 100%)`,
                    borderColor: isHovered ? categoryColors[tech.category] : 'rgba(255,255,255,0.2)',
                    boxShadow: isHovered
                      ? `0 0 20px ${categoryColors[tech.category]}80, 0 0 40px ${categoryColors[tech.category]}40`
                      : 'none',
                    transform: `translateZ(${depth / 2}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <span className="text-center leading-tight px-1">
                    {tech.name}
                  </span>
                </div>

                {/* Right Face */}
                <div
                  className="absolute border border-white/10 rounded-sm"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${tech.color}dd 0%, ${tech.color}aa 100%)`
                      : `linear-gradient(135deg, ${tech.color}44 0%, ${tech.color}33 100%)`,
                    borderColor: isHovered ? categoryColors[tech.category] : 'rgba(255,255,255,0.1)',
                    width: `${depth}px`,
                    height: `${blockSize}px`,
                    transform: `rotateY(90deg) translateX(${blockSize / 2}px) translateZ(${depth / 2}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                />

                {/* Left Face */}
                <div
                  className="absolute border border-white/10 rounded-sm"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${tech.color}aa 0%, ${tech.color}88 100%)`
                      : `linear-gradient(135deg, ${tech.color}33 0%, ${tech.color}22 100%)`,
                    borderColor: isHovered ? categoryColors[tech.category] : 'rgba(255,255,255,0.1)',
                    width: `${blockSize}px`,
                    height: `${depth}px`,
                    transform: `rotateX(-90deg) translateY(${blockSize / 2}px) translateZ(${depth / 2}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredBlock && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-md border border-brand-teal/50 rounded px-3 py-1.5 pointer-events-none z-50"
        >
          <p className="text-xs font-mono text-brand-teal whitespace-nowrap">
            {hoveredBlock}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default IsometricStack;
