import React, { useMemo, useRef, lazy, Suspense, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Printer, ChevronRight, ChevronDown, Briefcase, GraduationCap, Award, Heart, Sparkles } from 'lucide-react';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import { BentoCard, BentoGrid } from '../components/ui/BentoGrid';
import { SchematicBackground } from '../components/ui/SchematicBackground';
import { OceanRippleButton } from '../components/ui/OceanRippleButton';
import { experience, education, volunteering, awards, metrics, skillCategories, executiveSummary } from '../data/resume';
import type { ExperienceItem, SkillCategory as SkillCategoryType } from '../types';

// Lazy load TechProfile for better initial page load
const TechProfile = lazy(() => import('../components/TechProfile'));

const timelineVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 * index, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const badgeColors: Record<string, string> = {
  teal: 'bg-brand-teal/15 text-brand-teal border-brand-teal/30',
  orange: 'bg-brand-orange/15 text-brand-orange border-brand-orange/30',
  blue: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
};

const TimelineItem: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false); // All items collapsed by default

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={timelineVariants}
      className="relative pl-10 pb-8"
    >
      {/* Timeline dot */}
      <span className="absolute left-0 top-2 h-4 w-4 rounded-full bg-brand-teal shadow-[0_0_0_6px_rgba(64,224,208,0.1)]" />

      {/* Year marker */}
      <div className="absolute -left-16 top-1 text-xs font-mono text-brand-muted hidden lg:block">
        {item.period.split(' - ')[0].split(' ').pop()}
      </div>

      <div
        className={`rounded-2xl border bg-slate-900/50 backdrop-blur-lg shadow-soft-dark transition-all duration-300 overflow-hidden ${
          isExpanded ? 'border-brand-teal/50' : 'border-white/5 hover:border-brand-teal/30'
        }`}
      >
        {/* Header - Always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 text-left flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 text-sm uppercase tracking-[0.2em] text-brand-muted mb-2">
              <span>{item.period}</span>
              <span className="text-brand-orange">•</span>
              <span>{item.location}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <p className="text-xl font-semibold text-brand-text">{item.role}</p>
              <span className="text-brand-orange text-sm font-medium">{item.company}</span>
            </div>
            <p className="text-brand-muted line-clamp-2">{item.description}</p>

            {/* Highlight badge if exists */}
            {item.highlight && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-brand-teal/20 border border-brand-teal/30 rounded-full">
                <Sparkles size={14} className="text-brand-teal" />
                <span className="text-sm font-semibold text-brand-teal">{item.highlight}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-brand-muted">{item.achievements.length} achievements</span>
            <ChevronDown
              size={20}
              className={`text-brand-teal transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-white/5 pt-4">
                {/* Achievements */}
                <h4 className="text-sm uppercase tracking-[0.2em] text-brand-muted mb-4">
                  Key Achievements ({item.achievements.length})
                </h4>
                <ul className="space-y-3 text-brand-muted/90 text-sm mb-6">
                  {item.achievements.map((ach, achIdx) => (
                    <motion.li
                      key={achIdx}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: achIdx * 0.05 }}
                    >
                      <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-brand-teal flex-shrink-0" />
                      <span>{ach}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <h4 className="text-sm uppercase tracking-[0.2em] text-brand-muted mb-3">Tech Stack</h4>
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
          )}
        </AnimatePresence>
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
        className="bg-slate-900/50 backdrop-blur border border-white/5 shadow-soft-dark hover:border-brand-teal/30 transition-all"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-text">{cat.title}</h3>
          <div
            className={`text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
              badgeColors[cat.accent || 'teal']
            }`}
          >
            {cat.id === 'tools' ? 'Stack' : 'Skills'}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {cat.items.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-brand-text/90 hover:border-brand-teal/30 hover:bg-brand-teal/5 transition-all"
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
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const heroMetrics = useMemo(() => metrics, []);

  return (
    <>
      <Helmet>
        <title>Bio | Jacob Darling - Marketing Strategist & Systems Architect</title>
        <meta
          name="description"
          content="Marketing strategist and systems architect with 15+ years of experience building revenue-driving marketing infrastructure for global healthcare brands."
        />
      </Helmet>

      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="min-h-screen bg-brand-dark text-brand-text relative overflow-hidden">
        {/* Animated Schematic Background */}
        <SchematicBackground variant="default" showGrid={true} showOrbs={true} showBeams={true} />

        <main className="relative z-10 pt-24 pb-16 px-6">
          {/* Hero Header */}
          <header className="max-w-6xl mx-auto mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-brand-orange uppercase tracking-[0.3em] text-xs mb-3"
            >
              Professional Experience
            </motion.p>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              {/* Left Side - Text Content */}
              <div className="flex-1">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                >
                  Marketing Leader & <span className="text-brand-teal drop-shadow-neon">Systems Architect</span>
                </motion.h1>

                {/* Executive Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur p-6 mb-6"
                >
                  <h2 className="text-sm uppercase tracking-[0.2em] text-brand-muted mb-3">Executive Summary</h2>
                  <p className="text-brand-muted leading-relaxed">
                    {executiveSummary}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-brand-muted">Focus:</span>
                  <span className="text-sm font-semibold text-brand-teal">Marketing Strategy</span>
                  <span className="text-brand-orange mx-2">•</span>
                  <span className="text-sm font-semibold text-brand-orange">Technical Leadership</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="no-print flex items-center gap-3 mt-6"
                >
                <a
                  href="/resume/resume-jd-draft.pdf"
                  download="Jacob-Darling-Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-teal text-brand-dark px-4 py-2 font-semibold shadow-lg hover:shadow-brand-teal/30 transition glow-teal"
                >
                  <Printer size={16} />
                  Download Resume
                </a>
                </motion.div>
              </div>

              {/* Right Side - TechProfile Holographic Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex-shrink-0 flex justify-center lg:justify-end"
              >
                <Suspense fallback={
                  <div className="w-64 h-64 rounded-2xl bg-slate-800/50 animate-pulse border border-brand-teal/20" />
                }>
                  <TechProfile size="lg" className="transform hover:scale-105 transition-transform duration-300" />
                </Suspense>
              </motion.div>
            </div>
          </header>

          {/* Impact Metrics */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {heroMetrics.map((metric, idx) => (
                <motion.div
                  key={metric.id}
                  className="rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur p-5 shadow-soft-dark print-friendly hover:border-brand-teal/30 transition-all hover:glow-teal"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.1 }}
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

          {/* Career Journey Timeline */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-full bg-brand-teal/20 border border-brand-teal/50 flex items-center justify-center text-brand-teal">
                <Briefcase size={18} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-muted">Career Journey</p>
                <h2 className="text-3xl font-bold text-brand-text">A progression through strategic growth</h2>
              </div>
            </div>

            <p className="text-brand-muted mb-8 max-w-3xl">
              A progression through strategic growth, technical innovation, and transformative leadership
            </p>

            <div ref={timelineRef} className="relative lg:ml-20">
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
                <p className="text-sm uppercase tracking-[0.2em] text-brand-muted">Skills & Expertise</p>
                <h2 className="text-3xl font-bold text-brand-text">A comprehensive toolkit</h2>
              </div>
            </div>
            <p className="text-brand-muted mb-4">
              Spanning strategy, development, and automation
            </p>
            <SkillsGrid categories={skillCategories} />
          </section>

          {/* Education & Awards */}
          <section className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur p-6 shadow-soft-dark print-friendly"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-brand-teal/20 border border-brand-teal/50 flex items-center justify-center text-brand-teal">
                  <GraduationCap size={16} />
                </div>
                <h3 className="text-xl font-semibold text-brand-text">Education</h3>
              </div>
              {education.map((edu) => (
                <div key={edu.school} className="mb-3">
                  <p className="text-brand-teal font-semibold">{edu.school}</p>
                  <p className="text-brand-text">{edu.degree}</p>
                  <p className="text-brand-muted text-sm">{edu.year}</p>
                  {edu.honors && <p className="text-brand-orange text-sm mt-1">🏆 {edu.honors}</p>}
                </div>
              ))}
            </motion.div>

            {/* Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-white/5 bg-slate-900/60 backdrop-blur p-6 shadow-soft-dark print-friendly"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-brand-orange/20 border border-brand-orange/50 flex items-center justify-center text-brand-orange">
                  <Award size={16} />
                </div>
                <h3 className="text-xl font-semibold text-brand-text">Awards & Recognition</h3>
              </div>
              <ul className="space-y-3">
                {awards.map((award) => (
                  <li key={award.title} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-teal flex-shrink-0" />
                    <div>
                      <p className="text-brand-text font-semibold">{award.title}</p>
                      <p className="text-brand-muted text-sm">
                        {award.organization} — {award.year}
                      </p>
                      {award.description && (
                        <p className="text-brand-muted/70 text-xs mt-1">{award.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </section>

          {/* Volunteer Experience */}
          <section className="max-w-6xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-400">
                <Heart size={18} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-muted">Volunteer Experience</p>
                <h2 className="text-3xl font-bold text-brand-text">Giving Back</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {volunteering.map((vol, idx) => (
                <motion.div
                  key={`${vol.role}-${vol.organization}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur p-4 hover:border-brand-teal/30 transition-all"
                >
                  <p className="text-brand-text font-semibold">{vol.role}</p>
                  <p className="text-brand-teal text-sm">{vol.organization}</p>
                  <p className="text-brand-muted text-xs mt-1">{vol.period}</p>
                  {vol.description && (
                    <p className="text-brand-muted/70 text-xs mt-2 line-clamp-2">{vol.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Vault CTA */}
          <section className="max-w-6xl mx-auto">
            <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/10 backdrop-blur p-8 shadow-soft-dark flex flex-col md:flex-row md:items-center md:justify-between gap-6 print-friendly">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-muted mb-2">The Vault</p>
                <h3 className="text-2xl font-bold text-brand-text">Side Projects & Experiments</h3>
                <p className="text-brand-muted mt-2 max-w-2xl">
                  Explore the grid of prototypes, brand systems, and interactive tools.
                </p>
              </div>
              <OceanRippleButton
                asLink
                href="/side-projects"
                variant="primary"
                size="md"
                className="inline-flex items-center gap-2"
              >
                Enter The Vault
                <ChevronRight size={18} />
              </OceanRippleButton>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default About;
