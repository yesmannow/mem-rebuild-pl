import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEOHead from '../components/seo/SEOHead';
import TerminalBlock from '../components/ui/TerminalBlock';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { labItems } from '../data/labItems';

const LatencyGlobe = React.lazy(() => import('../components/ui/LatencyGlobe'));
const CodeVelocity = React.lazy(() => import('../components/ui/CodeVelocity'));

type ViewMode = 'app' | 'tool' | 'telemetry';

const bootSequence = [
  '> INITIALIZING KERNEL MODULES...',
  '> PROVISIONING CLOUDFLARE EDGE ADAPTERS...',
  '> VALIDATING TLS CIRCUITS...',
  '> WARMING CACHE LAYERS: CLEAR SIGNAL RECEIVED',
  '> SCHEDULING HYPER-CRON TASKS...',
  '> ATTACHING HEARTBEAT MONITOR (SOURCE: /dev/pulse)',
];

const statCards = [
  {
    label: 'Uptime',
    value: 99.9,
    suffix: '%',
    description: 'Real-time nodes maintaining 99.9% availability.',
    decimals: 1,
  },
  {
    label: 'Requests / sec',
    value: 1284,
    suffix: ' r/s',
    description: 'Average throughput across global edge nodes.',
    decimals: 0,
  },
  {
    label: 'Global latency',
    value: 24,
    suffix: ' ms',
    description: 'Median RTT after edge caching and optimization.',
    decimals: 0,
  },
];

const Lab: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('app');

  const filteredItems = viewMode === 'telemetry'
    ? []
    : labItems.filter((item) => item.type === viewMode);

  const isAppMode = viewMode === 'app';
  const isToolMode = viewMode === 'tool';
  const isTelemetryMode = viewMode === 'telemetry';

  return (
    <>
      <SEOHead
        title="The Lab | Living Documentation System"
        description="Explore client-facing applications, internal engineering tools, and live system telemetry. A living documentation system showcasing technical architecture and business impact."
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

        {/* Ambient Glow - Orange for Apps, Teal for Tools/Telemetry */}
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
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-brand-teal/70 mb-2">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-brand-teal" />
              ALL SYSTEMS OPERATIONAL
            </div>
            <h1 className="text-4xl md:text-5xl font-clash font-bold mb-3 text-white">The Lab</h1>
            <p className="text-brand-muted max-w-2xl mx-auto">
              Explore the technical architecture behind client-facing applications, internal
              engineering tools, and live system telemetry. Each system includes strategic context,
              technology rationale, and measurable business impact.
            </p>
          </motion.div>

          {/* Context Shift Toggle - Three modes */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-10"
          >
            <div className="inline-flex rounded-xl bg-slate-800/50 border border-slate-700 p-1.5 flex-wrap justify-center gap-1">
              <button
                onClick={() => setViewMode('app')}
                className={`
                  relative px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
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
                <span className="relative z-10">Applications</span>
              </button>
              <button
                onClick={() => setViewMode('tool')}
                className={`
                  relative px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                  ${isToolMode
                    ? 'text-[#40E0D0]'
                    : 'text-brand-muted hover:text-brand-text'
                  }
                `}
              >
                {isToolMode && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-[#40E0D0]/10 border border-[#40E0D0]/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Engineering</span>
              </button>
              <button
                onClick={() => setViewMode('telemetry')}
                className={`
                  relative px-4 sm:px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                  ${isTelemetryMode
                    ? 'text-[#40E0D0]'
                    : 'text-brand-muted hover:text-brand-text'
                  }
                `}
              >
                {isTelemetryMode && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-[#40E0D0]/10 border border-[#40E0D0]/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">Command Center</span>
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
              { label: 'Edge Nodes', value: 12, color: 'text-[#FFA500]' },
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

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {isTelemetryMode ? (
              /* War Room / Command Center Content */
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Telemetry Stats Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {statCards.map((card) => (
                    <motion.article
                      key={card.label}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="rounded-3xl border border-brand-teal/30 bg-slate-900/60 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                    >
                      <p className="text-[10px] uppercase tracking-[0.4em] text-brand-orange/70">{card.label}</p>
                      <div className="mt-3">
                        <AnimatedCounter
                          value={card.value}
                          prefix=""
                          suffix={card.suffix}
                          decimals={card.decimals}
                          className="text-4xl md:text-5xl text-brand-teal"
                        />
                      </div>
                      <p className="mt-3 text-sm text-white/60">{card.description}</p>
                    </motion.article>
                  ))}
                </section>

                {/* Terminal and Globe Grid */}
                <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <TerminalBlock title="Boot Sequence" className="min-h-[360px] border-brand-teal/30 bg-slate-900/80">
                    <div className="space-y-3 text-sm font-mono text-white/80">
                      {bootSequence.map((line) => (
                        <p key={line} className="leading-relaxed">
                          <span className="text-brand-orange">{line}</span>
                          <span className="ml-2 text-brand-teal/70">[OK]</span>
                        </p>
                      ))}
                    </div>
                  </TerminalBlock>

                  <Suspense
                    fallback={
                      <div className="flex h-full min-h-[360px] items-center justify-center rounded-3xl border border-brand-teal/30 bg-slate-900/60 text-sm text-brand-teal/80">
                        Streaming telemetry...
                      </div>
                    }
                  >
                    <LatencyGlobe />
                  </Suspense>
                </section>

                {/* Code Velocity Heatmap */}
                <section className="space-y-4">
                  <Suspense
                    fallback={
                      <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-[#40E0D0]/30 bg-slate-900/60 text-sm text-[#40E0D0]/80">
                        Loading velocity heatmap...
                      </div>
                    }
                  >
                    <CodeVelocity />
                  </Suspense>
                </section>

                {/* Status Footer */}
                <section className="flex flex-col gap-2 border-t border-[#40E0D0]/20 pt-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-3 w-3 rounded-full bg-[#40E0D0] animate-ping" />
                    <span className="text-xs uppercase tracking-[0.4em] text-[#40E0D0]/70">
                      ALL SYSTEMS OPERATIONAL
                    </span>
                  </div>
                  <p className="text-sm text-white/60">
                    Edge telemetry, cache health, and incident counters are green. Drive-by anomalies get escalated to
                    alert channels instantly.
                  </p>
                </section>
              </motion.div>
            ) : (
              /* Applications & Tools Vertical Interactive List */
              <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 relative"
              >
                {filteredItems.map((item, index) => {
                  const status = 'OPERATIONAL';
                  const version = '4.2.0';
                  const imageUrl = (item as { imageUrl?: string; liveUrl?: string }).imageUrl ||
                                   (item as { imageUrl?: string; liveUrl?: string }).liveUrl ?
                                   `https://image.thum.io/get/width/1200/crop/800/${(item as { imageUrl?: string; liveUrl?: string }).liveUrl}` : null;
                  const description = item.context.solution || item.tagline;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative block w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:bg-white/10 transition-colors duration-300 overflow-hidden cursor-pointer"
                    >
                      {/* Large background hover reveal */}
                      {imageUrl && (
                        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                          <img src={imageUrl} alt="" className="w-full h-full object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
                        </div>
                      )}

                      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 border border-cyan-400/30 px-2 py-1 rounded">
                              {item.category}
                            </span>
                            <span className="font-mono text-[10px] text-white/50">
                              STATUS: {status} {"//"} v{version}
                            </span>
                          </div>

                          <h2 className="font-clash font-black tracking-tighter text-4xl text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {item.title}
                          </h2>
                          <p className="font-['Geist',_sans-serif] text-sm text-white/70 max-w-2xl leading-relaxed">
                            {description}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">Initialize Module</span>
                          <span className="p-2 rounded-full border border-cyan-400/50 text-cyan-400">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14"></path>
                              <path d="m12 5 7 7-7 7"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!isTelemetryMode && filteredItems.length === 0 && (
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
