import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import TerminalBlock from '../components/ui/TerminalBlock';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const LatencyGlobe = React.lazy(() => import('../components/ui/LatencyGlobe'));
const CodeVelocity = React.lazy(() => import('../components/ui/CodeVelocity'));

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
    description: 'Real-time nodes maintaining 99.9% availability for the last sliding window.',
    decimals: 1,
  },
  {
    label: 'Requests / sec',
    value: 1284,
    suffix: ' r/s',
    description: 'Average throughput across Asia, Europe, and the Americas.',
    decimals: 0,
  },
  {
    label: 'Global latency',
    value: 24,
    suffix: ' ms',
    description: 'Median RTT after edge caching and LiteSpeed tuning.',
    decimals: 0,
  },
];

const WarRoom = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#40E0D0] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.4em] text-[#40E0D0]/70">
            <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-[#40E0D0]" />
            ALL SYSTEMS OPERATIONAL
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            War Room / Command Center
          </h1>
          <p className="max-w-3xl text-lg text-white/70">
            Live telemetry for the marketing infrastructure. Everything is monitored like a mission control bridge
            — no fluff, just the critical telemetry verbs and actions flowing through the stack.
          </p>
        </motion.div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((card) => (
            <motion.article
              key={card.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-[#40E0D0]/30 bg-[#0b1220]/60 p-6 shadow-[0_15px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#FFA500]/70">{card.label}</p>
              <div className="mt-3">
                <AnimatedCounter
                  value={card.value}
                  prefix=""
                  suffix={card.suffix}
                  decimals={card.decimals}
                  className="text-4xl md:text-5xl text-[#40E0D0]"
                />
              </div>
              <p className="mt-3 text-sm text-white/60">{card.description}</p>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <TerminalBlock title="Boot Sequence" className="min-h-[360px] border-[#40E0D0]/30 bg-[#0f172a]/80">
            <div className="space-y-3 text-sm font-mono text-white/80">
              {bootSequence.map((line) => (
                <p key={line} className="leading-relaxed">
                  <span className="text-[#FFA500]">{line}</span>
                  <span className="ml-2 text-[#40E0D0]/70">[OK]</span>
                </p>
              ))}
            </div>
          </TerminalBlock>

          <Suspense
            fallback={
              <div className="flex h-full min-h-[360px] items-center justify-center rounded-3xl border border-[#40E0D0]/30 bg-[#0f172a]/60 text-sm text-[#40E0D0]/80">
                Streaming telemetry...
              </div>
            }
          >
            <LatencyGlobe />
          </Suspense>
        </section>

        <section className="space-y-4">
          <Suspense
            fallback={
              <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-[#40E0D0]/30 bg-[#0f172a]/60 text-sm text-[#40E0D0]/80">
                Loading velocity heatmap...
              </div>
            }
          >
            <CodeVelocity />
          </Suspense>
        </section>

        <section className="flex flex-col gap-2 border-t border-[#40E0D0]/20 pt-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-3 w-3 rounded-full bg-[#40E0D0] animate-ping" />
            <span className="text-xs uppercase tracking-[0.4em] text-[#40E0D0]/70">
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
          <p className="text-sm text-white/60">
            Edge telemetry, cache health, and incident counters are green. Drive-by anomalies get escalated to
            War Room channels instantly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default WarRoom;
