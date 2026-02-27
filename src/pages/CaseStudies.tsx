import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { caseStudies, getCategories } from '../data/caseStudies';
import MagneticCursor from '../components/ui/MagneticCursor';
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
      <MagneticCursor color="#40E0D0" enabled={true} />

      {/* ── Cinematic hero ─────────────────────────────────────────── */}
      <section className="cs-revamp__hero" aria-label="Case studies hero">
        <div className="cs-revamp__hero-glow cs-revamp__hero-glow--left" aria-hidden="true" />
        <div className="cs-revamp__hero-glow cs-revamp__hero-glow--right" aria-hidden="true" />

        <div className="cs-revamp__hero-inner">
          <motion.p
            className="cs-revamp__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Field Reports // Case Studies
          </motion.p>

          <motion.h1
            className="cs-revamp__headline"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Work That{' '}
            <span className="cs-revamp__headline-accent">Moves</span>
            <br />
            Numbers.
          </motion.h1>

          <motion.p
            className="cs-revamp__subline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Scroll through every engagement. Each card reveals the system, the strategy, and the result.
          </motion.p>

          <motion.div
            className="cs-revamp__stats"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="cs-revamp__stat">
              <span className="cs-revamp__stat-value">{caseStudies.length}</span>
              <span className="cs-revamp__stat-label">Engagements</span>
            </div>
            <div className="cs-revamp__stat-sep" aria-hidden="true" />
            <div className="cs-revamp__stat">
              <span className="cs-revamp__stat-value">{caseStudies.filter(s => s.featured).length}</span>
              <span className="cs-revamp__stat-label">Featured</span>
            </div>
            <div className="cs-revamp__stat-sep" aria-hidden="true" />
            <div className="cs-revamp__stat">
              <span className="cs-revamp__stat-value">100%</span>
              <span className="cs-revamp__stat-label">Real Results</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="cs-revamp__scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          aria-hidden="true"
        >
          <div className="cs-revamp__scroll-line" />
          <span className="cs-revamp__scroll-label">Scroll to explore</span>
        </motion.div>
      </section>

      {/* ── Floating filter island ──────────────────────────────────── */}
      <div className="cs-revamp__island-wrap">
        <FilterIsland
          categories={CATEGORIES}
          activeFilter={activeFilter}
          searchTerm={searchTerm}
          onFilterChange={setActiveFilter}
          onSearchChange={setSearchTerm}
          resultCount={filteredStudies.length}
        />
      </div>

      {/* ── Sticky-stack ───────────────────────────────────────────── */}
      <CaseStudyStack
        studies={filteredStudies}
        activeFilter={activeFilter}
      />
    </div>
  );
};

export default CaseStudies;