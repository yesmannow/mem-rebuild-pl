import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FolderOpen, Radio, Activity } from 'lucide-react';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import ScrollProgress from '../components/ui/ScrollProgress';
import { SimpleSection } from '../components/ui/SimpleSection';
import { OceanRippleButton } from '../components/ui/OceanRippleButton';
import ScrollReveal from '../components/animations/ScrollReveal';
import MagneticCursor from '../components/ui/MagneticCursor';
import { FeaturedAppsShowcase } from '../components/home/FeaturedAppsShowcase';
import TechBackdrop from '../components/hero/TechBackdrop';
import HeroProfileCarousel from '../components/hero/HeroProfileCarousel';
import { EndorsementTicker } from '../components/resume/EndorsementTicker';
import { BackgroundGrid } from '../components/ui/BackgroundGrid';
import { LiveTerminal } from '../components/home/LiveTerminal';
import { IsometricStack } from '../components/home/IsometricStack';
import { LiveCommitTicker } from '../components/home/LiveCommitTicker';

const Home: React.FC = () => {
  // System metrics for War Room module
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: '99.9%',
    deployments: '1,402',
    coffee: '100%',
  });

  // System status typing effect
  const [systemStatusText, setSystemStatusText] = useState('');
  const systemStatusFull = 'System Status: Online // Ready for Deployment';
  const [showCursor, setShowCursor] = useState(true);

  // Type system status on mount
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < systemStatusFull.length) {
        setSystemStatusText(systemStatusFull.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

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
    <OceanAuroraBackground className="bg-brand-dark" style={{ minHeight: '100vh', height: 'auto' }}>
      <MagneticCursor color="#40E0D0" enabled={true} />
      <ScrollProgress />
      <LiveTerminal />
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* A. Hero Module - 'The Architect' */}
        <SimpleSection
          variant="default"
          padding="none"
          container={false}
          className="relative overflow-hidden min-h-[90vh] flex items-center"
        >
          {/* Tech Backdrop - Looping grid animation (behind content) */}
          <TechBackdrop className="absolute inset-0 z-0" />

          {/* Content Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
            {/* Mobile: flex-col-reverse (Text first for SEO), Desktop: grid */}
            <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column: Hero Content */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-8 text-center md:text-left"
              >
                <p className="text-sm font-mono uppercase tracking-[0.35em] text-brand-muted">
                  MODULE 01 // THE ARCHITECT
                </p>
                <ScrollReveal direction="up" speed="slow">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-brand-text leading-tight">
                    Transforming marketing challenges into <span className="text-gradient">measurable business results</span>
                  </h1>
                </ScrollReveal>
                <div className="space-y-4 max-w-3xl mx-auto md:mx-0">
                  <p className="text-base sm:text-lg md:text-xl text-brand-muted">
                    <span className="text-brand-turquoise font-mono inline-flex items-center">
                      {systemStatusText || systemStatusFull}
                      {showCursor && (
                        <motion.span
                          initial={{ opacity: 1 }}
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.53, repeat: Infinity }}
                          className="ml-1 inline-block w-0.5 h-[1em] bg-brand-teal"
                        />
                      )}
                    </span>
                  </p>
                  <p className="text-base sm:text-lg md:text-xl text-brand-muted">
                    Marketing strategist and systems architect with 15+ years of experience building revenue-driving marketing infrastructure for global healthcare brands. Proven track record of transforming complex marketing challenges into measurable business results through strategic thinking, technical execution, and data-driven decision making.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                  <OceanRippleButton
                    asLink
                    href="/resume"
                    variant="primary"
                    className="inline-flex items-center gap-2 w-full sm:w-auto justify-center touch-target"
                  >
                    View Resume
                    <ArrowRight size={16} />
                  </OceanRippleButton>
                  <OceanRippleButton
                    asLink
                    href="/case-studies"
                    variant="outline"
                    className="inline-flex items-center gap-2 w-full sm:w-auto justify-center touch-target"
                  >
                    View Work
                    <ArrowRight size={16} />
                  </OceanRippleButton>
                </div>
              </motion.div>

              {/* Right Column: Bio Photo Carousel + Isometric Stack */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex justify-center md:justify-end relative"
              >
                {/* Glow Effect Behind Carousel */}
                <div className="absolute inset-0 -z-10 bg-brand-turquoise/20 blur-3xl rounded-2xl transform scale-110" aria-hidden="true" />

                {/* Isometric Tech Stack - Background Visual */}
                <div className="absolute inset-0 -z-[5] opacity-20 hidden lg:block">
                  <IsometricStack />
                </div>

                <div className="relative w-full max-w-md mx-auto md:mx-0 z-10">
                  <HeroProfileCarousel
                    images={[
                      '/images/bio/bio pic 2.png',
                      '/images/bio/bio pic 3.png',
                      '/images/bio/bio-photo.jpg',
                      '/images/bio/IMG_20230707_235448_262~2.jpg',
                      '/images/bio/QVZlSmkxeURiak5tajdscg.jpeg',
                    ]}
                    interval={4000}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </SimpleSection>

        {/* B. 'The Lab' Module - Featured Work */}
        <SimpleSection
          variant="bordered"
          padding="xl"
          container={false}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center mb-12">
                <p className="text-sm font-mono uppercase tracking-[0.3em] text-brand-muted mb-4">
                  MODULE 02 // THE LAB
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text mb-4">
                  Active Prototypes
                </h2>
                <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                  Live systems and interactive tools demonstrating marketing mastery
                </p>
              </div>
            </ScrollReveal>
            <FeaturedAppsShowcase />
          </div>
        </SimpleSection>

        {/* C. 'War Room' Module - System Status Banner */}
        <SimpleSection
          variant="default"
          padding="none"
          container={false}
          className="relative"
        >
          <div className="w-full bg-slate-950 border-y border-brand-teal/30 relative overflow-hidden">
            <BackgroundGrid />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left: LIVE TELEMETRY */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-brand-teal rounded-full animate-ping opacity-75" />
                      <div className="relative w-3 h-3 bg-brand-teal rounded-full" />
                    </div>
                    <p className="text-sm font-mono uppercase tracking-[0.2em] text-brand-teal">
                      LIVE TELEMETRY
                    </p>
                  </div>
                </div>

                {/* Center: System Metrics + Live Commit Feed */}
                <div className="flex-1 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-8 flex-wrap justify-center">
                    <div className="text-center">
                      <p className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-1">UPTIME</p>
                      <p className="text-lg font-bold text-brand-text font-mono">{systemMetrics.uptime}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-1">DEPLOYMENTS</p>
                      <p className="text-lg font-bold text-brand-text font-mono">{systemMetrics.deployments}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-1">COFFEE</p>
                      <p className="text-lg font-bold text-brand-text font-mono">{systemMetrics.coffee}</p>
                    </div>
                  </div>

                  {/* Live Commit Ticker */}
                  <div className="w-full max-w-4xl">
                    <p className="text-xs font-mono uppercase tracking-wider text-brand-muted mb-2 text-center">
                      LIVE COMMIT FEED
                    </p>
                    <LiveCommitTicker />
                  </div>
                </div>

                {/* Right: Enter War Room Button */}
                <div>
                  <OceanRippleButton
                    asLink
                    href="/war-room"
                    variant="primary"
                    className="inline-flex items-center gap-2 font-mono"
                  >
                    <Activity size={16} />
                    Enter War Room
                    <ArrowRight size={16} />
                  </OceanRippleButton>
                </div>
              </div>
            </div>
          </div>
        </SimpleSection>

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
    </OceanAuroraBackground>
  );
};

export default Home;
