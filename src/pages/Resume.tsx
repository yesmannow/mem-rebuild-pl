import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { GraduationCap, Trophy, Award as AwardIcon, ArrowRight, Heart, Lock, Unlock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SimpleSection } from '../components/ui/SimpleSection';
import TechBackdrop from '../components/hero/TechBackdrop';
import { BentoGridHeader } from '../components/resume/BentoGridHeader';
import { SkillCluster } from '../components/resume/SkillCluster';
import { CinematicTimeline } from '../components/resume/CinematicTimeline';
import { EndorsementTicker } from '../components/resume/EndorsementTicker';
import { VirtualizedVolunteerFeed } from '../components/resume/VirtualizedVolunteerFeed';
import ResumePrint from './ResumePrint';
import { experience, education, volunteering, awards, certifications, skillCategories, executiveSummary } from '../data/resume';

const Resume: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Systems Architect & Strategist | Executive Dossier</title>
        <meta
          name="description"
          content="Interactive executive career dashboard showcasing 15+ years of experience in marketing strategy, systems architecture, and full-stack development."
        />
      </Helmet>

      {/* Print-Only Section - ATS-Friendly Resume */}
      <div className="hidden print:block print:fixed print:inset-0 print:z-50 print:bg-white">
        <ResumePrint />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
        }
      `}</style>

      {/* Dashboard - Hidden on Print */}
      <div className="min-h-screen bg-brand-dark text-brand-text relative overflow-hidden print:hidden">
        {/* Background Effect */}
        <TechBackdrop className="absolute inset-0 opacity-30" />

        {/* Bento Grid Header */}
        <SimpleSection variant="default" padding="md" container={true} className="relative z-10 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BentoGridHeader executiveSummary={executiveSummary} />
          </motion.div>
        </SimpleSection>

        {/* Skills Cluster Section */}
        <SimpleSection variant="elevated" padding="lg" animated className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <SkillCluster categories={skillCategories} />
          </motion.div>
        </SimpleSection>

        {/* Experience Timeline Section */}
        <SimpleSection variant="elevated" padding="lg" animated className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <CinematicTimeline experiences={experience} />
          </motion.div>
        </SimpleSection>

        {/* Endorsement Ticker Section */}
        <SimpleSection variant="inset" padding="lg" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-2">Peer Signals</h2>
              <p className="text-brand-muted text-center">Endorsements from partners and colleagues</p>
            </div>
            <EndorsementTicker />
          </motion.div>
        </SimpleSection>

        {/* Credentials Deck Section - Asymmetric Grid */}
        <SimpleSection variant="elevated" padding="lg" animated className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-brand-text mb-2 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-brand-teal to-brand-orange rounded-full" />
                Credentials Deck
              </h2>
              <p className="text-brand-muted text-sm">
                Education, recognition, and community involvement
              </p>
            </div>

            {/* Asymmetric 2-Column Grid - Stacks on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 md:gap-6">
              {/* Left Column: Credentials Stack */}
              <div className="space-y-6">
                {/* Education Card */}
                <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-brand-turquoise/40 transition-colors duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-brand-teal/20 border border-brand-teal/30">
                      <GraduationCap size={24} className="text-brand-teal" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-text">Education</h3>
                  </div>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      <div key={edu.school}>
                        <p className="text-brand-teal font-semibold text-base mb-1">{edu.school}</p>
                        <p className="text-brand-text text-sm mb-1">{edu.degree}</p>
                        <p className="text-brand-muted text-xs mb-2">{edu.year}</p>
                        {edu.honors && (
                          <p className="text-brand-orange text-sm flex items-center gap-1">
                            <span>🏆</span>
                            <span>{edu.honors}</span>
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards Card */}
                <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-brand-turquoise/40 transition-colors duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-brand-orange/20 border border-brand-orange/30">
                      <Trophy size={24} className="text-brand-orange" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-text">Awards</h3>
                  </div>
                  <div className="space-y-4">
                    {awards.length > 0 ? (
                      awards.map((award) => (
                        <div key={award.title}>
                          <p className="text-brand-text font-semibold text-base mb-1">{award.title}</p>
                          <p className="text-brand-muted text-sm mb-1">
                            {award.organization} — {award.year}
                          </p>
                          {award.description && (
                            <p className="text-brand-muted/70 text-xs">{award.description}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-brand-muted text-sm">No awards listed</p>
                    )}
                  </div>
                </div>

                {/* Certifications Card */}
                <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-brand-turquoise/40 transition-colors duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-brand-teal/20 border border-brand-teal/30">
                      <AwardIcon size={24} className="text-brand-teal" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-text">Certifications</h3>
                  </div>
                  <div className="space-y-4">
                    {certifications.length > 0 ? (
                      certifications.map((cert) => (
                        <div key={cert.name}>
                          <p className="text-brand-text font-semibold text-base mb-1">{cert.name}</p>
                          <p className="text-brand-muted text-sm mb-1">
                            {cert.issuer} {cert.year && `— ${cert.year}`}
                          </p>
                          {cert.description && (
                            <p className="text-brand-muted/70 text-xs">{cert.description}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-brand-muted text-sm">No certifications listed</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Virtualized Volunteer Feed */}
              <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-4 md:p-6 hover:border-brand-turquoise/40 transition-colors duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <div className="p-2 md:p-3 rounded-xl bg-brand-teal/20 border border-brand-teal/30">
                    <Heart size={20} className="md:w-6 md:h-6 text-brand-teal" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-brand-text">Volunteer Experience</h3>
                </div>
                <VirtualizedVolunteerFeed
                  items={volunteering}
                  containerHeight={typeof window !== 'undefined' && window.innerWidth < 1024 ? 300 : 384}
                />
              </div>
            </div>
          </motion.div>
        </SimpleSection>

        {/* Project Archives Banner */}
        <SimpleSection variant="inset" padding="lg" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link
              to="/side-projects"
              className="block group"
            >
              <div className="relative overflow-hidden bg-gradient-to-r from-brand-teal/20 via-brand-orange/20 to-brand-teal/20 border border-brand-turquoise/30 rounded-2xl p-6 md:p-8 hover:border-brand-teal/60 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                      className="relative"
                    >
                      <Lock
                        size={32}
                        className="text-brand-turquoise group-hover:opacity-0 transition-opacity duration-300 absolute"
                      />
                      <Unlock
                        size={32}
                        className="text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </motion.div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-brand-text mb-2">Project Archives</h2>
                      <p className="text-brand-muted text-sm md:text-base">
                        Explore independent experiments and side projects
                      </p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="hidden sm:block"
                  >
                    <ArrowRight size={32} className="text-brand-turquoise" />
                  </motion.div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/0 via-brand-teal/10 to-brand-teal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </motion.div>
        </SimpleSection>
      </div>
    </>
  );
};

export default Resume;
