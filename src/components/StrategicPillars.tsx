import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, DollarSign, Users } from 'lucide-react';

interface StrategicPillar {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
}

const pillars: StrategicPillar[] = [
  {
    icon: TrendingUp,
    title: 'Go-to-Market Strategy',
    description: 'GTM frameworks that connect product, sales, and marketing into a unified growth engine.',
    details: [
      'Market positioning & messaging',
      'Channel strategy & mix modeling',
      'Pricing & packaging strategy',
      'Launch planning & execution',
    ],
  },
  {
    icon: DollarSign,
    title: 'Revenue Operations',
    description: 'Financial discipline meets marketing performance. Budgets that scale with results and prove ROI at every level.',
    details: [
      'Marketing budget planning',
      'Cost per acquisition modeling',
      'Revenue attribution & forecasting',
      'P&L optimization strategies',
    ],
  },
  {
    icon: Users,
    title: 'Team & Brand',
    description: 'Leadership that sets vision, aligns teams, and builds brand systems that scale.',
    details: [
      'Team leadership & development',
      'Brand voice & messaging frameworks',
      'Cross-functional collaboration',
      'Organizational alignment',
    ],
  },
];

const StrategicPillars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
            Strategic Pillars
          </h2>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            The Director-level capabilities that drive strategic marketing decisions and team alignment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const itemRef = useRef<HTMLDivElement>(null);
            const itemInView = useInView(itemRef, { once: true, margin: '-100px' });

            return (
              <motion.div
                key={pillar.title}
                ref={itemRef}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={
                  itemInView
                    ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }
                    : { opacity: 0, y: 50, scale: 0.9 }
                }
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-8 hover:border-brand-teal/40 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 via-brand-teal/0 to-brand-orange/0 group-hover:via-brand-teal/10 group-hover:to-brand-orange/10 transition-all duration-500 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-lg bg-brand-teal/20 flex items-center justify-center mb-6 group-hover:bg-brand-teal/30 transition-colors"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {pillar.title === 'Go-to-Market Strategy' && (
                      <img src="/images/concepts/strategy.svg" alt="Strategy" className="w-8 h-8" />
                    )}
                    {pillar.title === 'Revenue Operations' && (
                      <img src="/images/concepts/revenue.svg" alt="Revenue" className="w-8 h-8" />
                    )}
                    {pillar.title === 'Team & Brand' && (
                      <img src="/images/concepts/leadership.svg" alt="Leadership" className="w-8 h-8" />
                    )}
                    {!['Go-to-Market Strategy', 'Revenue Operations', 'Team & Brand'].includes(pillar.title) && (
                      <Icon className="w-8 h-8 text-brand-teal" />
                    )}
                  </motion.div>
                  <motion.h3
                    className="text-2xl font-bold text-brand-text mb-3"
                    initial={{ opacity: 0 }}
                    animate={itemInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    {pillar.title}
                  </motion.h3>
                  <motion.p
                    className="text-brand-muted mb-6 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={itemInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    {pillar.description}
                  </motion.p>
                  <motion.ul
                    className="space-y-2"
                    initial={{ opacity: 0 }}
                    animate={itemInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                  >
                    {pillar.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-brand-muted"
                        initial={{ opacity: 0, x: -10 }}
                        animate={itemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.15 + 0.5 + idx * 0.05 }}
                      >
                        <span className="text-brand-teal mt-1">•</span>
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StrategicPillars;

