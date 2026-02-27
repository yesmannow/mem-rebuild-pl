import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { caseStudies, getCategories } from '../data/caseStudies';
import CaseStudyStack from '../components/case-studies/CaseStudyStack';
import FilterIsland from '../components/case-studies/FilterIsland';
import './CaseStudiesStack.css';

const CATEGORIES = ['All', ...getCategories()];

const CaseStudies: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredStudies = useMemo(() => {
    let out = caseStudies;
    if (activeFilter !== 'All') {
      out = out.filter(s => s.category.includes(activeFilter) || s.tags.includes(activeFilter));
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      out = out.filter(
        s =>
          s.title.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.tags.some(t => t.toLowerCase().includes(q)) ||
          s.category.some(c => c.toLowerCase().includes(q)),
      );
    }
    return out;
  }, [activeFilter, searchTerm]);

  return (
    <div className="cs-revamp">
      {/* ── Page header ─────────────────────────────────────────────── */}
      <section
        className="relative bg-[#07090f] pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-label="Case studies header"
      >
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,242,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        {/* Cyan corner glow */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(0,242,255,0.06), transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb / telemetry bar */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-cyan-400/50">
              [ SYSTEM // FIELD-REPORTS ]
            </span>
            <span className="w-8 h-px bg-cyan-400/20" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
              {caseStudies.length} ENGAGEMENTS LOGGED
            </span>
          </motion.div>

          {/* Headline — distinct from home teaser */}
          <motion.h1
            className="font-sans font-black text-white leading-none mb-6"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Every <span className="text-cyan-400">Engagement.</span>
            <br />
            Every Result.
          </motion.h1>

          <motion.p
            className="font-mono text-white/40 text-sm max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Real systems. Measurable outcomes. Each card shows the challenge, the architecture built to solve it, and the numbers that followed.
          </motion.p>

          {/* Stat row */}
          <motion.div
            className="flex flex-wrap items-center gap-8 mb-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {[
              { value: String(caseStudies.length), label: 'Total Engagements' },
              { value: String(caseStudies.filter(s => s.featured).length), label: 'Featured Deep Dives' },
              { value: '100%', label: 'Verified Results' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="font-black font-mono text-2xl text-cyan-400 tabular-nums">{stat.value}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Filter island — inlined into the header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <FilterIsland
              categories={CATEGORIES}
              activeFilter={activeFilter}
              searchTerm={searchTerm}
              onFilterChange={setActiveFilter}
              onSearchChange={setSearchTerm}
              resultCount={filteredStudies.length}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Case study stack ───────────────────────────────────────── */}
      <CaseStudyStack
        studies={filteredStudies}
        activeFilter={activeFilter}
      />
    </div>
  );
};

export default CaseStudies;