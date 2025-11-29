import React, { useMemo, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll } from 'framer-motion';
import { Printer, Download, ChevronRight } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import { BentoCard, BentoGrid } from '../components/ui/BentoGrid';
import { experience, education, volunteering, awards, metrics, skillCategories } from '../data/resume';
import type { ExperienceItem, SkillCategory as SkillCategoryType } from '../types';

// Lazy load TechProfile for better initial page load
const TechProfile = lazy(() => import('../components/TechProfile'));

const timelineVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 * index, duration: 0.5, ease: 'easeOut' },
  }),
};

const badgeColors: Record<string, string> = {
  teal: 'bg-brand-teal/15 text-brand-teal border-brand-teal/30',
  orange: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
  blue: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
};

const TimelineItem: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={timelineVariants}
      className="relative pl-10 pb-10"
    >
      <span className="absolute left-0 top-2 h-4 w-4 rounded-full bg-brand-teal shadow-[0_0_0_6px_rgba(64,224,208,0.1)]" />
      <div className="rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-lg p-6 shadow-soft-dark hover:border-brand-teal/50 transition-all">
        <div className="flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.2em] text-brand-muted mb-2">
          <span>{item.period}</span>
          <span className="text-brand-orange">•</span>
          <span>{item.location}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <p className="text-xl font-semibold text-brand-text">{item.role}</p>
          <span className="text-brand-orange text-sm">{item.company}</span>
        </div>
        <p className="text-brand-muted mb-4">{item.description}</p>
        <ul className="space-y-2 text-brand-muted/90 text-sm mb-4">
          {item.achievements.map((ach) => (
            <li key={ach} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-teal" />
              <span>{ach}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {item.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SkillsGrid: React.FC<{ categories: SkillCategoryType[] }> = ({ categories }) => (
  <BentoGrid className="mt-8">
    {categories.map((cat) => (
      <BentoCard
        key={cat.id}
        span="2"
        className="bg-slate-900/50 backdrop-blur border border-white/5 shadow-soft-dark"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-text">{cat.title}</h3>
          <div
            className={`text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
              badgeColors[cat.accent || 'teal']
            }`}
          >
            Stack
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {cat.items.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-brand-text/90"
            >
              {skill}
            </span>
          ))}
        </div>
      </BentoCard>
    ))}
  </BentoGrid>
);

const printStyles = `
@media print {
  body { background: white !important; color: black !important; }
  nav, footer, .no-print { display: none !important; }
  .print-friendly { background: white !important; box-shadow: none !important; }
  .bg-slate-900, .bg-brand-dark, .bg-brand-dark\\/60, .bg-brand-surface, .bg-brand-surface\\/50 { background: white !important; }
  .text-brand-teal, .text-brand-orange, .text-brand-text, .text-brand-muted { color: #000 !important; }
}
`;

const About: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Jacob Darling - Dossier',
  });

  const heroMetrics = useMemo(() => metrics, []);

  return (
    <>
      <Helmet>
        <title>Bio | Cinematic Resume</title>
        <meta
          name="description"
          content="A cinematic career journey with live metrics, timeline, and print-ready dossier."
        />
      </Helmet>

      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div ref={printRef} className="min-h-screen bg-brand-dark text-brand-text relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-slate-900/60 to-brand-dark opacity-70" />

        <main className="relative z-10 pt-24 pb-16 px-6">
          <header className="max-w-6xl mx-auto mb-12">
            <p className="text-brand-orange uppercase tracking-[0.3em] text-xs mb-3">
              Cinematic Resume
            </p>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Left Side - Text Content */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  The <span className="text-brand-teal drop-shadow-neon">Architect</span> in the Marketing Room.
                </h1>
                <p className="text-lg text-brand-muted max-w-2xl mt-4">
                  Scroll-triggered journey through systems, storytelling, and the metrics that prove it.
                  Download a print-ready dossier any time.
                </p>
                <div className="flex items-center gap-2 mt-6">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-muted">Role:</span>
                  <span className="text-sm font-semibold text-brand-teal">Architect</span>
                  <span className="text-brand-orange mx-2">/</span>
                  <span className="text-sm font-semibold text-brand-orange">Strategist</span>
                </div>
                <div className="no-print flex items-center gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-teal text-brand-dark px-4 py-2 font-semibold shadow-lg hover:shadow-brand-teal/30 transition glow-teal"
                  >
                    <Printer size={16} />
                    Download Dossier
                  </button>
                </div>
              </div>
              
              {/* Right Side - TechProfile Holographic Card */}
              <div className="flex-shrink-0 flex justify-center lg:justify-end">
                <Suspense fallback={
                  <div className="w-64 h-64 rounded-2xl bg-slate-800/50 animate-pulse border border-brand-teal/20" />
                }>
                  <TechProfile size="lg" className="transform hover:scale-105 transition-transform duration-300" />
                </Suspense>
              </div>
            </div>
          </header>

          {/* Impact Metrics */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {heroMetrics.map((metric) => (
                <motion.div
                  key={metric.id}
                  className="rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur p-5 shadow-soft-dark print-friendly hover:border-brand-teal/30 transition-all hover:glow-teal"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-muted mb-2">
                    {metric.label}
                  </p>
                  <div className="text-3xl font-bold text-brand-text">
                    {metric.prefix}
                    <OceanCountingNumber
                      number={metric.value}
                      suffix={metric.suffix}
                      inView
                      className="text-brand-teal drop-shadow-neon"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-full bg-brand-teal/20 border border-brand-teal/50 flex items-center justify-center text-brand-teal">
                <Download size={18} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-muted">Experience</p>
                <h2 className="text-3xl font-bold text-brand-text">Cinematic Timeline</h2>
              </div>
            </div>

            <div ref={timelineRef} className="relative">
              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="absolute left-[6px] top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-brand-teal via-brand-orange to-transparent"
              />
              <div className="border-l border-white/5 pl-6">
                {experience.map((item, idx) => (
                  <TimelineItem key={item.id} item={item} index={idx} />
                ))}
              </div>
            </div>
          </section>

          {/* Skills Matrix */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-brand-orange/20 border border-brand-orange/50 flex items-center justify-center text-brand-orange">
                <ChevronRight size={18} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-muted">Command Center</p>
                <h2 className="text-3xl font-bold text-brand-text">Skill Bento Grid</h2>
              </div>
            </div>
            <SkillsGrid categories={skillCategories} />
          </section>

          {/* Education & Volunteering */}
          <section className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur p-6 shadow-soft-dark print-friendly">
              <h3 className="text-xl font-semibold text-brand-text mb-4">Education</h3>
              {education.map((edu) => (
                <div key={edu.school} className="mb-3">
                  <p className="text-brand-teal font-semibold">{edu.school}</p>
                  <p className="text-brand-text">{edu.degree}</p>
                  <p className="text-brand-muted text-sm">{edu.year}</p>
                  {edu.honors && <p className="text-brand-orange text-sm mt-1">{edu.honors}</p>}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur p-6 shadow-soft-dark print-friendly">
              <h3 className="text-xl font-semibold text-brand-text mb-4">Volunteering</h3>
              <ul className="space-y-3">
                {volunteering.map((vol) => (
                  <li key={`${vol.role}-${vol.organization}`}>
                    <p className="text-brand-text font-semibold">{vol.role}</p>
                    <p className="text-brand-teal">{vol.organization}</p>
                    <p className="text-brand-muted text-sm">{vol.period}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Awards */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur p-6 shadow-soft-dark print-friendly">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-brand-muted">Recognition</p>
                  <h3 className="text-2xl font-semibold text-brand-text">Awards</h3>
                </div>
              </div>
              <ul className="space-y-3">
                {awards.map((award) => (
                  <li key={award.title} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-brand-teal" />
                    <div>
                      <p className="text-brand-text font-semibold">{award.title}</p>
                      <p className="text-brand-muted text-sm">
                        {award.organization} — {award.year}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Vault CTA */}
          <section className="max-w-6xl mx-auto">
            <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/10 backdrop-blur p-8 shadow-soft-dark flex flex-col md:flex-row md:items-center md:justify-between gap-6 print-friendly">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-muted mb-2">The Vault</p>
                <h3 className="text-2xl font-bold text-brand-text">Side Projects & Experiments</h3>
                <p className="text-brand-muted mt-2 max-w-2xl">
                  Explore the 13-project grid of prototypes, brand systems, and interactive tools.
                </p>
              </div>
              <a
                href="/side-projects"
                className="inline-flex items-center gap-2 rounded-full bg-brand-teal text-brand-dark px-5 py-3 font-semibold shadow-lg hover:shadow-brand-teal/30 transition"
              >
                Enter The Vault
                <ChevronRight size={18} />
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default About;
