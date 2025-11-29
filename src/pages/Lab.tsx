import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/seo/SEOHead';
import SystemCard from '../components/ui/SystemCard';
import { labItems } from '../data/labItems';

type ViewMode = 'app' | 'tool';

const Lab: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('app');

  const filteredItems = labItems.filter((item) => item.type === viewMode);
  const isAppMode = viewMode === 'app';

  return (
    <>
      <SEOHead
        title="The Lab | Living Documentation System"
        description="Explore client-facing applications and internal engineering tools. A living documentation system showcasing technical architecture and business impact."
      />
      <main className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-brand-text overflow-hidden">
        {/* ActiveGrid Background with Reactive Lighting */}
        <div
          className="fixed inset-0 pointer-events-none transition-all duration-700"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)',
          }}
        />

        {/* Ambient Glow - Orange for Apps, Teal for Tools */}
        <div
          className="fixed inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: isAppMode
              ? 'radial-gradient(ellipse at 50% 0%, rgba(255,165,0,0.08) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 50% 0%, rgba(64,224,208,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-brand-muted mb-2">
              Living Documentation System
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">The Lab</h1>
            <p className="text-brand-muted max-w-2xl mx-auto">
              Explore the technical architecture behind client-facing applications and internal
              engineering tools. Each system includes strategic context, technology rationale, and
              measurable business impact.
            </p>
          </motion.div>

          {/* Context Shift Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex rounded-xl bg-slate-800/50 border border-slate-700 p-1.5">
              <button
                onClick={() => setViewMode('app')}
                className={`
                  relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                  ${isAppMode
                    ? 'text-[#FFA500]'
                    : 'text-brand-muted hover:text-brand-text'
                  }
                `}
              >
                {isAppMode && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-[#FFA500]/10 border border-[#FFA500]/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Applications (Revenue)</span>
              </button>
              <button
                onClick={() => setViewMode('tool')}
                className={`
                  relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                  ${!isAppMode
                    ? 'text-[#40E0D0]'
                    : 'text-brand-muted hover:text-brand-text'
                  }
                `}
              >
                {!isAppMode && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-[#40E0D0]/10 border border-[#40E0D0]/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Engineering (Code)</span>
              </button>
            </div>
          </motion.div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: 'Live Systems', value: labItems.filter((i) => i.type === 'app').length, color: 'text-green-400' },
              { label: 'Internal Tools', value: labItems.filter((i) => i.type === 'tool').length, color: 'text-[#40E0D0]' },
              { label: 'Technologies', value: new Set(labItems.flatMap((i) => i.techStack.map((t) => t.name))).size, color: 'text-brand-muted' },
              { label: 'Categories', value: new Set(labItems.map((i) => i.category)).size, color: 'text-brand-muted' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/30"
              >
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-brand-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Card Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {filteredItems.map((item, index) => (
                <SystemCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-brand-muted">No items found for this category.</p>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
};

export default Lab;
