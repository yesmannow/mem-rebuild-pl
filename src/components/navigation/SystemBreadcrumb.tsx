import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useSystemStore } from '../../store/useSystemStore';

// ─── Module → human-readable path map ─────────────────────────────────────
const MODULE_PATH: Record<string, string[]> = {
  hero:              ['SYSTEM', 'HOME'],
  home:              ['SYSTEM', 'HOME'],
  lab:               ['SYSTEM', 'LAB'],
  'brand-builder':   ['SYSTEM', 'LAB', 'BRAND_BUILDER'],
  'marketing-simulator': ['SYSTEM', 'LAB', 'MKT_SIMULATOR'],
  'email-simulator': ['SYSTEM', 'LAB', 'EMAIL_STUDIO'],
  'social-simulator':['SYSTEM', 'LAB', 'SOCIAL_ENGINE'],
  'growth-engine':   ['SYSTEM', 'LAB', 'GROWTH_ENGINE'],
  ventures:          ['SYSTEM', 'VENTURES'],
  studio:            ['SYSTEM', 'STUDIO'],
  resume:            ['SYSTEM', 'DOSSIER'],
  contact:           ['SYSTEM', 'COMMS'],
  'war-room':        ['SYSTEM', 'WAR_ROOM'],
};

const SystemBreadcrumb: React.FC = () => {
  const { activeModule } = useSystemStore();
  const segments = MODULE_PATH[activeModule] ?? ['SYSTEM', activeModule.toUpperCase().replace(/-/g, '_')];

  return (
    <motion.div
      className="fixed top-[3.75rem] left-4 z-[190] hidden md:flex items-center gap-1 pointer-events-none"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <div
        className="flex items-center gap-1 px-2.5 py-1 rounded-md"
        style={{
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex items-center gap-1"
          >
            {segments.map((seg, i) => (
              <React.Fragment key={seg}>
                <span
                  className="text-[9px] font-mono uppercase tracking-[0.25em]"
                  style={{
                    color: i === segments.length - 1
                      ? '#22d3ee'
                      : 'rgba(113,113,122,0.7)',
                  }}
                >
                  {seg}
                </span>
                {i < segments.length - 1 && (
                  <ChevronRight size={8} className="text-zinc-700 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Blinking cursor */}
        <span
          className="inline-block w-px h-2.5 ml-0.5 bg-cyan-400 animate-pulse"
          style={{ animationDuration: '1s' }}
        />
      </div>
    </motion.div>
  );
};

export default SystemBreadcrumb;
