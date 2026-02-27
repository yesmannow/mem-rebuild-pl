import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  hero: string;
  stack: string[];
}

const shardCoords = [
  '0,0 50,0 25,50',
  '50,0 100,0 75,50',
  '0,0 25,50 0,100',
  '100,0 100,100 75,50',
  '0,100 50,100 25,50',
  '50,100 100,100 75,50',
];

const SystemLog = ({ techStack }: { techStack: string[] }) => (
  <div className="fixed bottom-10 right-10 z-50 text-[10px] text-cyan-500/40">
    <div className="border-l border-cyan-500/20 pl-4 uppercase tech-label">
      <p className="animate-pulse text-cyan-400">_BOOTING_MANIFEST...</p>
      {techStack.map((item) => (
        <p key={item}>[OK] DEPLOYING::{item}.pkg</p>
      ))}
      <p className="mt-2">STATUS: SYSTEM_ACTIVE</p>
    </div>
  </div>
);

export const ArtifactDossier: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const [showArchitecture, setShowArchitecture] = useState(false);

  const architectureNodes = useMemo(
    () => [
      { id: 'gateway', x: '22%', y: '24%' },
      { id: 'api', x: '55%', y: '34%' },
      { id: 'db', x: '74%', y: '58%' },
      { id: 'cache', x: '35%', y: '70%' },
      { id: 'queue', x: '60%', y: '78%' },
    ],
    []
  );

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed inset-0 z-50 bg-neutral-950 flex flex-col md:flex-row overflow-hidden"
    >
      {/* Hero Image Section */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden">
        <motion.img
          layoutId={`img-${project.id}`}
          src={project.hero}
          alt={project.name}
          className={`w-full h-full object-cover transition-all duration-500 ${showArchitecture ? 'grayscale contrast-125 brightness-50' : ''}`}
        />

        {!showArchitecture && (
          <div className="absolute inset-0 pointer-events-none">
            {shardCoords.map((coords, index) => (
              <motion.div
                key={coords}
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(${coords})`,
                  backgroundImage: `url(${project.hero})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mixBlendMode: 'screen',
                  opacity: 0.2,
                }}
                initial={{ opacity: 0.45, scale: 0.96 }}
                animate={{ opacity: 0, scale: 1.14, x: (index - 2.5) * 10, y: (index % 2 === 0 ? -1 : 1) * 8 }}
                transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.015 }}
              />
            ))}
          </div>
        )}

        {showArchitecture && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 border border-cyan-400/35" />
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.16) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            {architectureNodes.map((node) => (
              <motion.div
                key={node.id}
                className="absolute w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.85)]"
                style={{ left: node.x, top: node.y }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.65, 1, 0.65] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M22 24 Q40 20 55 34" stroke="rgba(34,211,238,0.55)" strokeWidth="0.4" fill="none" />
              <path d="M55 34 Q67 46 74 58" stroke="rgba(34,211,238,0.55)" strokeWidth="0.4" fill="none" />
              <path d="M55 34 Q42 52 35 70" stroke="rgba(34,211,238,0.55)" strokeWidth="0.4" fill="none" />
              <path d="M35 70 Q48 76 60 78" stroke="rgba(34,211,238,0.55)" strokeWidth="0.4" fill="none" />
            </svg>
          </div>
        )}

        {/* Overlay gradient for text legibility if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent md:bg-gradient-to-r" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>

        <button
          onClick={() => setShowArchitecture((prev) => !prev)}
          className="absolute top-6 right-6 z-10 rounded-full border border-cyan-400/35 bg-black/60 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-cyan-300 tech-label hover:bg-cyan-500/10"
        >
          {showArchitecture ? 'Hide Architecture' : 'View Architecture'}
        </button>
      </div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full md:w-1/2 h-[50vh] md:h-screen overflow-y-auto p-8 md:p-16 flex flex-col"
      >
        <div className="flex-1 max-w-2xl">
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="px-3 py-1 text-xs font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-8 text-neutral-400 text-lg leading-relaxed">
            <p>
              This is a placeholder for the deep-dive content of the {project.name} dossier.
              The transition uses Framer Motion&apos;s shared layout to seamlessly expand the physical
              card from the vault into this full-screen immersive view.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[0, 1, 2].map((tile) => (
                <motion.div
                  key={`${project.id}-artifact-${tile}`}
                  drag
                  dragElastic={0.2}
                  dragTransition={{ bounceStiffness: 160, bounceDamping: 12 }}
                  className="relative h-36 rounded-xl overflow-hidden border border-cyan-400/30 cursor-grab active:cursor-grabbing"
                  style={{ backgroundImage: `url(${project.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  whileHover={{ scale: 1.03, rotate: tile % 2 === 0 ? -1 : 1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[10px] tech-label uppercase tracking-[0.16em] text-cyan-200">
                    Fragment {tile + 1}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-neutral-900 border border-white/5 font-mono text-sm">
              <h3 className="text-white mb-4 uppercase tracking-widest text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                System Log // Analytics
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between"><span>Status:</span> <span className="text-green-400">Deployed</span></li>
                <li className="flex justify-between"><span>Performance:</span> <span className="text-cyan-400">98/100</span></li>
                <li className="flex justify-between"><span>Architecture:</span> <span>Modern Edge</span></li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <SystemLog techStack={project.stack} />
    </motion.div>
  );
};
