import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target, Users } from 'lucide-react';

interface WinCard {
  icon: React.ReactNode;
  metric: string;
  label: string;
  description: string;
  color: string;
}

const wins: WinCard[] = [
  {
    icon: <Zap className="w-8 h-8" />,
    metric: '400+',
    label: 'Automations Built',
    description: 'Automated marketing workflows reducing manual work by 70%',
    color: 'var(--signal-500)',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    metric: '+212%',
    label: 'Lead Growth',
    description: 'Transformed static directory into qualified lead engine',
    color: 'var(--telemetry-400)',
  },
  {
    icon: <Target className="w-8 h-8" />,
    metric: '68%',
    label: 'Ticket Reduction',
    description: 'AI-powered compliance assistant cutting support load',
    color: 'var(--signal-500)',
  },
  {
    icon: <Users className="w-8 h-8" />,
    metric: '30K+',
    label: 'Users Supported',
    description: 'Marketing systems serving thousands across industries',
    color: 'var(--telemetry-400)',
  },
];

const QuickWins: React.FC = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-[var(--ink-900)] to-[var(--ink-800)] overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--signal-500)]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-[var(--parchment-050)] mb-4">
            Impact at a Glance
          </h2>
          <p className="text-lg text-[var(--parchment-050)]/60 max-w-2xl mx-auto font-body">
            Real metrics from systems that drive measurable business results
          </p>
        </motion.div>

        {/* Wins Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {wins.map((win, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-[var(--ink-700)]/80 backdrop-blur-sm border border-[var(--ink-700)] rounded-xl p-6 h-full transition-all duration-300 group-hover:border-[var(--signal-500)]/30">
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-lg mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${win.color}15`,
                    color: win.color,
                  }}
                >
                  {win.icon}
                </div>

                {/* Metric */}
                <div
                  className="text-4xl md:text-5xl font-bold font-mono mb-2 transition-colors duration-300"
                  style={{ color: win.color }}
                >
                  {win.metric}
                </div>

                {/* Label */}
                <h3 className="text-xl font-display font-bold text-[var(--parchment-050)] mb-3">
                  {win.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--parchment-050)]/60 font-body leading-relaxed">
                  {win.description}
                </p>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  style={{
                    background: `radial-gradient(circle at center, ${win.color}10, transparent 70%)`,
                  }}
                />
              </div>

              {/* Floating accent dot */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100"
                style={{ backgroundColor: win.color }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-[var(--parchment-050)]/60 font-body mb-6">
            Want to see the full story behind these numbers?
          </p>
          <a
            href="/case-studies"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(255,107,61,0.3)]"
          >
            Explore Case Studies
            <TrendingUp className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickWins;
