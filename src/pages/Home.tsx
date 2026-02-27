import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FolderOpen, Radio } from 'lucide-react';
import { SimpleSection } from '../components/ui/SimpleSection';
import ScrollReveal from '../components/animations/ScrollReveal';
import { EndorsementTicker } from '../components/resume/EndorsementTicker';
import HeroCinematicStatic from '../components/hero/HeroCinematicStatic';
import TheLabWorkbench from '../components/home/TheLabWorkbench';
import WarRoomCTA from '../components/home/WarRoomCTA';
import CinematicCaseStudies from '../components/case-studies/CinematicCaseStudies';
import { caseStudies } from '../data/caseStudies';
import { useSystemStore } from '../store/useSystemStore';

const Home: React.FC = () => {
  const { setCommandPalette } = useSystemStore();

  // System metrics for War Room module
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: '99.9%',
    deployments: '1,402',
    coffee: '100%',
  });

  // Rotate metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics((prev) => ({
        ...prev,
        deployments: String(parseInt(prev.deployments.replace(/,/g, '')) + Math.floor(Math.random() * 3)),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#080C12]" style={{ minHeight: '100vh' }}>
      {/* A. Cinematic Hero — h-screen photography parallax, single viewport */}
      <HeroCinematicStatic onOpenCommandPalette={() => setCommandPalette(true)} />

      {/* Mosaic section divider — terrain texture strip between hero and case studies */}
      <div
        aria-hidden="true"
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(120px, 16vw, 220px)',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* top fade from hero bg */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, #080C12 0%, transparent 40%, transparent 60%, #080C12 100%)',
        }} />
        <img
          src="/images/svgs/prettysleepy1-mosaic-3347635.svg"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 70%',
            opacity: 0.22,
            filter: 'saturate(0.2) brightness(0.6) hue-rotate(165deg) contrast(1.2)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* B. Cinematic Case Studies — Vertical sticky stack */}
      <CinematicCaseStudies studies={caseStudies} />

      <div className="relative z-10 w-full flex flex-col">
        {/* C. 'The Lab' Module - Workbench UI */}
        <TheLabWorkbench />

        {/* D. 'War Room' Module - Secure CTA */}
        <WarRoomCTA systemMetrics={systemMetrics} />

        {/* D. 'Peer Signals' Module - Social Proof */}
        <SimpleSection
          variant="inset"
          padding="lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="mb-12 text-center">
                <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted mb-4">
                  MODULE 03 // PEER SIGNALS
                </p>
                <h2 className="text-3xl font-bold text-brand-text mb-2">Peer Signals</h2>
                <p className="text-brand-muted">Endorsements from partners and colleagues</p>
              </div>
            </ScrollReveal>
            <EndorsementTicker />
          </div>
        </SimpleSection>

        {/* E. 'The Dossier' Module - Resume/Bio */}
        <SimpleSection
          variant="elevated"
          padding="lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="mb-12 text-center">
                <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted mb-4">
                  MODULE 04 // THE DOSSIER
                </p>
                <h2 className="text-3xl font-bold text-brand-text mb-2">Access Intelligence</h2>
                <p className="text-brand-muted">Full professional dossier and communication uplink</p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resume Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to="/resume"
                  className="block h-full group"
                >
                  <div className="h-full p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm hover:border-brand-teal/50 hover:bg-slate-900/70 transition-all duration-300 relative overflow-hidden">
                    {/* File Folder Icon Background */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <FolderOpen size={64} className="text-brand-teal" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <FolderOpen size={24} className="text-brand-teal" />
                        <p className="text-sm font-mono uppercase tracking-[0.2em] text-brand-muted">
                          FILE FOLDER
                        </p>
                      </div>
                      <h3 className="text-2xl font-bold text-brand-text mb-2">Full Professional Dossier</h3>
                      <p className="text-brand-muted mb-6">
                        Complete resume, credentials, and professional history
                      </p>
                      <div className="inline-flex items-center gap-2 text-brand-teal font-semibold group-hover:gap-3 transition-all">
                        Access Dossier
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Link
                  to="/contact"
                  className="block h-full group"
                >
                  <div className="h-full p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm hover:border-brand-teal/50 hover:bg-slate-900/70 transition-all duration-300 relative overflow-hidden">
                    {/* Radio/Comms Icon Background */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Radio size={64} className="text-brand-teal" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <Radio size={24} className="text-brand-teal" />
                        <p className="text-sm font-mono uppercase tracking-[0.2em] text-brand-muted">
                          COMMS LINK
                        </p>
                      </div>
                      <h3 className="text-2xl font-bold text-brand-text mb-2">Initialize Uplink</h3>
                      <p className="text-brand-muted mb-6">
                        Establish communication channel for project inquiries
                      </p>
                      <div className="inline-flex items-center gap-2 text-brand-teal font-semibold group-hover:gap-3 transition-all">
                        Open Channel
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </SimpleSection>
      </div>
    </div>
  );
};

export default Home;
