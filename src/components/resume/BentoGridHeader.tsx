/**
 * BentoGridHeader - High-impact personal branding header
 * Features a Bento Grid layout with interactive tiles
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import HeroProfileCarousel from '../hero/HeroProfileCarousel';
import { MetricVisualizer } from '../visuals/MetricVisualizer';
import { useSystemSound } from '../../hooks/useSystemSound';
import { MouseSpotlight } from './MouseSpotlight';
import { SystemStatusTicker } from './SystemStatusTicker';

interface BentoGridHeaderProps {
  executiveSummary: string;
  className?: string;
}

export const BentoGridHeader: React.FC<BentoGridHeaderProps> = ({
  executiveSummary,
  className = '',
}) => {
  const { playSwitch } = useSystemSound();
  const [isCompiling, setIsCompiling] = useState(false);

  const handleDownloadPDF = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Prevent default link behavior
    if (isCompiling) return;

    setIsCompiling(true);

    // Play mechanical switch sound
    playSwitch();

    // Show Sonner toast with system notification style and animation
    toast.success('Compiling Personnel Dossier...', {
      description: 'System Access Authorized',
      duration: 800,
    });

    // Simulated delay (800ms)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Trigger actual download
    const link = document.createElement('a');
    link.href = '/resume/resume-jd-draft.pdf';
    link.download = 'Jacob-Darling-Resume.pdf';
    link.click();

    setIsCompiling(false);
  };

  const handleBookConsultation = () => {
    // Navigate to contact page or open calendar booking
    window.location.href = '/contact';
  };

  return (
    <div className={`bento-grid-header ${className} relative overflow-hidden`}>
      {/* MouseSpotlight Effect */}
      <MouseSpotlight className="absolute inset-0 pointer-events-none z-0" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] relative z-10">
        {/* Tile A: Profile Visual (2x2) - HeroProfileCarousel - Always visible on mobile */}
        <div className="col-span-1 md:col-span-2 md:row-span-2 bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-4 md:p-6 hover:border-brand-turquoise/40 transition-colors duration-300 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
            <HeroProfileCarousel className="h-full w-full" />
          </div>
        </div>

        {/* Tile B: Identity Core (2x1) - Name, Title, Bio snippet - Always visible on mobile */}
        <div className="col-span-1 md:col-span-2 row-span-1 bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-4 md:p-6 hover:border-brand-turquoise/40 transition-colors duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-full flex flex-col justify-center"
          >
            <h1 className="text-4xl font-bold text-brand-text mb-2">Jacob Darling</h1>
            <h2 className="text-xl text-brand-turquoise mb-4">Systems Architect</h2>
            <p className="text-brand-muted line-clamp-3 mb-4">{executiveSummary}</p>
            <SystemStatusTicker />
          </motion.div>
        </div>

        {/* Tile C: Key Metric 1 (1x1) - '15+ Years Experience' - Hidden on mobile */}
        <div className="hidden md:block col-span-1 row-span-1 bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-4 md:p-6 hover:border-brand-turquoise/40 transition-colors duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <MetricVisualizer
            label="Years Experience"
            value="15+"
            accentColor="#40E0D0"
            className="h-full"
          />
        </div>

        {/* Tile D: Key Metric 2 (1x1) - '22+ Clients Served' - Hidden on mobile */}
        <div className="hidden md:block col-span-1 row-span-1 bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-4 md:p-6 hover:border-brand-turquoise/40 transition-colors duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <MetricVisualizer
            label="Clients Served"
            value="22+"
            accentColor="#40E0D0"
            className="h-full"
          />
        </div>

        {/* Tile E: Actions (2x1) - Download CV + Book Consultation */}
        <div className="col-span-1 md:col-span-2 row-span-1 bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-4 md:p-6 hover:border-brand-turquoise/40 transition-colors duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <div className="h-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
            {/* Download CV Button - Primary */}
            <motion.button
              onClick={handleDownloadPDF}
              disabled={isCompiling}
              whileHover={{ scale: isCompiling ? 1 : 1.05 }}
              whileTap={{ scale: isCompiling ? 1 : 0.95 }}
              className={`flex-1 flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-brand-turquoise text-white font-semibold rounded-xl hover:bg-brand-turquoise/90 transition-colors shadow-lg shadow-brand-turquoise/20 text-sm md:text-base ${
                isCompiling ? 'opacity-75 cursor-wait' : ''
              }`}
            >
              <Download size={18} className={isCompiling ? 'animate-pulse' : ''} />
              <span>{isCompiling ? 'Compiling...' : 'Download CV'}</span>
            </motion.button>

            {/* Book Consultation Button - Secondary */}
            <motion.button
              onClick={handleBookConsultation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 bg-slate-800/50 text-brand-text font-semibold rounded-xl border border-white/10 hover:bg-slate-800/70 hover:border-brand-turquoise/40 transition-colors text-sm md:text-base"
            >
              <Calendar size={18} />
              <span>Book Consultation</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
