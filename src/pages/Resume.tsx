import React, { Suspense, useEffect, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Unlock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TechBackdrop from '../components/hero/TechBackdrop';
import { EndorsementTicker } from '../components/resume/EndorsementTicker';
import { TerminalHero } from '../components/resume/TerminalHero';
// Heavy components — lazy load for better code splitting
const ZAxisTunnel = lazy(() => import('../components/resume/ZAxisTunnel').then(m => ({ default: m.ZAxisTunnel })));
const SkillConstellation = lazy(() => import('../components/resume/SkillConstellation').then(m => ({ default: m.SkillConstellation })));
import GlitchOverlay from '../components/home/GlitchOverlay';
import ResumePrint from './ResumePrint';
import {
  experience,
  education,
  volunteering,
  awards,
  certifications,
  skillCategories,
  executiveSummary,
} from '../data/resume';

/* ─────────────────────────────────────────────────────────────────────────── */
/*  SR-ONLY SEO LAYER — invisible to screen, crawlable by bots                */
/* ─────────────────────────────────────────────────────────────────────────── */
const SeoLayer: React.FC = () => (
  <div className="sr-only" aria-hidden="false">
    <h1>Jacob Darling — Marketing Director &amp; Systems Architect</h1>
    <p>{executiveSummary}</p>

    <section aria-label="Professional Experience">
      <h2>Professional Experience</h2>
      {experience.map((job) => (
        <article key={job.id}>
          <h3>{job.role} — {job.company}</h3>
          <p>{job.period} · {job.location}</p>
          <p>{job.description}</p>
          <ul>
            {job.achievements.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </article>
      ))}
    </section>

    <section aria-label="Education">
      <h2>Education</h2>
      {education.map((edu) => (
        <div key={edu.school}>
          <p>{edu.degree} — {edu.school} ({edu.year})</p>
          {edu.honors && <p>{edu.honors}</p>}
        </div>
      ))}
    </section>

    <section aria-label="Certifications">
      <h2>Certifications</h2>
      {certifications.map((cert) => (
        <p key={cert.name}>{cert.name} — {cert.issuer} {cert.year ? `(${cert.year})` : ''}</p>
      ))}
    </section>

    <section aria-label="Awards">
      <h2>Awards</h2>
      {awards.map((a) => (
        <p key={a.title}>{a.title} — {a.organization} ({a.year})</p>
      ))}
    </section>

    <section aria-label="Volunteer Experience">
      <h2>Volunteer Experience</h2>
      {volunteering.map((v, i) => (
        <p key={i}>{v.role} — {v.organization} ({v.period})</p>
      ))}
    </section>

    <section aria-label="Skills">
      <h2>Skills</h2>
      {skillCategories.map((cat) => (
        <div key={cat.id}>
          <h3>{cat.title}</h3>
          <ul>{cat.items.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      ))}
    </section>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/*  CREDENTIALS DECK — Education / Awards / Certifications                    */
/* ─────────────────────────────────────────────────────────────────────────── */
const CredentialsDeck: React.FC = () => (
  <div>
    <div className="mb-8">
      <h2 className="font-clash font-black tracking-tighter text-[clamp(1.75rem,4vw,3rem)] text-white mb-1 flex items-center gap-3">
        <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-orange-400 rounded-full" />
        Credentials Deck
      </h2>
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        Education · Recognition · Community
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Education */}
      <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-colors duration-300">
        <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/70 mb-4">Education</p>
        {education.map((edu) => (
          <div key={edu.school}>
            <p className="text-white font-semibold text-sm mb-0.5">{edu.school}</p>
            <p className="text-white/60 text-xs mb-1 font-mono">{edu.degree}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-2">{edu.year}</p>
            {edu.honors && (
              <p className="text-orange-400/80 text-xs font-mono">🏆 {edu.honors}</p>
            )}
          </div>
        ))}
      </div>

      {/* Awards */}
      <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-orange-400/30 transition-colors duration-300">
        <p className="font-mono text-[10px] uppercase tracking-widest text-orange-400/70 mb-4">Awards</p>
        {awards.map((award) => (
          <div key={award.title}>
            <p className="text-white font-semibold text-sm mb-0.5">{award.title}</p>
            <p className="text-white/50 text-xs mb-1 font-mono">{award.organization}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">{award.year}</p>
            {award.description && (
              <p className="text-white/40 text-xs mt-1 font-mono">{award.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-colors duration-300">
        <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/70 mb-4">Certifications</p>
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.name}>
              <p className="text-white font-semibold text-xs mb-0.5">{cert.name}</p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/*  PEER SIGNALS SECTION                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
const PeerSignals: React.FC = () => (
  <div>
    <div className="mb-10 text-center">
      <h2 className="font-clash font-black tracking-tighter text-[clamp(1.75rem,4vw,3rem)] text-white mb-1">
        Peer Signals
      </h2>
      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        Endorsements from partners and colleagues
      </p>
    </div>
    <EndorsementTicker />
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MAIN PAGE                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
const Resume: React.FC = () => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Jacob Darling',
      jobTitle: 'Systems Architect & Fractional CMO',
      url: 'https://jacobdarling.com/resume',
      sameAs: ['https://linkedin.com/in/jacobdarling', 'https://github.com/JdarlingGT'],
      hasOccupation: experience.map((job) => ({
        '@type': 'Role',
        roleName: job.role,
        startDate: job.period?.split('–')[0]?.trim() ?? '',
        description: job.description,
        occupationLocation: { '@type': 'City', name: job.location },
      })),
    };
    const existing = document.getElementById('resume-jsonld');
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.id = 'resume-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => { document.getElementById('resume-jsonld')?.remove(); };
  }, []);

  return (
    <>
      <Helmet>
        <title>Jacob Darling | Systems Architect & Marketing Technologist</title>
        <meta
          name="description"
          content="15+ years building revenue-driving marketing infrastructure for global healthcare brands. Marketing Director, Systems Architect, Full-Stack Developer."
        />
      </Helmet>

      {/* ── PRINT STYLES ──────────────────────────────────────────────── */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .print-hide { display: none !important; }
          .print-show { display: block !important; }
          canvas, .webgl-canvas, [data-r3f], .tech-backdrop { display: none !important; }
          .data-slab { position: static !important; opacity: 1 !important;
            transform: none !important; filter: none !important;
            break-inside: avoid; margin-bottom: 1rem; }
          .sr-only { position: static !important; width: auto !important;
            height: auto !important; overflow: visible !important;
            clip: auto !important; white-space: normal !important;
            color: black !important; background: white !important; }
          h1, h2, h3 { font-family: 'Clash Display', sans-serif !important; }
          p, li, span { font-family: 'Geist Mono', monospace !important; }
        }
      `}</style>

      {/* ── PRINT-ONLY ATS RESUME ─────────────────────────────────────── */}
      <div className="hidden print:block fixed inset-0 z-50 bg-white">
        <ResumePrint />
      </div>

      {/* ── SCREEN DASHBOARD ──────────────────────────────────────────── */}
      <main className="min-h-screen bg-black text-white relative overflow-hidden print-hide">
        <TechBackdrop className="absolute inset-0 opacity-20 pointer-events-none" />

        {/* SEO ghost layer */}
        <SeoLayer />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pt-24 pb-32">

          {/* PHASE 1 — Terminal Boot Hero */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            aria-label="Identity Matrix"
          >
            <div className="mb-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/60">
                {'// DOSSIER INIT'}
              </p>
              <h1 className="font-clash font-black tracking-tighter text-[clamp(2.5rem,8vw,6rem)] text-white leading-none mt-1">
                Jacob Darling
              </h1>
            </div>
            <TerminalHero />
          </motion.section>

          {/* PHASE 3 — Skill Constellation (WebGL) */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            aria-label="Skill Constellation"
          >
            <Suspense fallback={<GlitchOverlay isBooting={true} />}>
              <SkillConstellation categories={skillCategories} />
            </Suspense>
          </motion.section>

          {/* PHASE 2 — Z-Axis Career Tunnel */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            aria-label="Career Timeline"
          >
            <Suspense fallback={<GlitchOverlay isBooting={true} />}>
              <ZAxisTunnel experiences={experience} />
            </Suspense>
          </motion.section>

          {/* Peer Signals */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            aria-label="Peer Signals"
          >
            <PeerSignals />
          </motion.section>

          {/* Credentials Deck */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            aria-label="Credentials"
          >
            <CredentialsDeck />
          </motion.section>

          {/* Project Archives Banner */}
          <motion.section
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <Link to="/side-projects" className="block group">
              <div className="relative overflow-hidden bg-gradient-to-r from-cyan-400/10 via-orange-400/10 to-cyan-400/10 border border-cyan-400/20 rounded-2xl p-6 md:p-8 hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-8 h-8">
                      <Lock size={28} className="text-cyan-400/70 group-hover:opacity-0 transition-opacity duration-300 absolute" />
                      <Unlock size={28} className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div>
                      <h2 className="font-clash font-black tracking-tighter text-[clamp(1.5rem,3vw,2.5rem)] text-white mb-1">
                        Project Archives
                      </h2>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                        Independent experiments &amp; side projects
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={28} className="text-cyan-400/50 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-200 hidden sm:block" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </motion.section>

        </div>
      </main>
    </>
  );
};

export default Resume;
