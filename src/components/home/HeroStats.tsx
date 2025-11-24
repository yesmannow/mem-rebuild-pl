import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

const AnimatedStat: React.FC<StatProps> = ({ value, suffix = '', label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="text-center space-y-3">
        {/* Stat Value */}
        <div className="relative">
          <motion.div
            className="text-5xl md:text-6xl font-bold font-mono text-[var(--signal-500)] relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {count}{suffix}
          </motion.div>
          
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-[var(--signal-500)]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Stat Label */}
        <div className="text-sm md:text-base text-[var(--parchment-050)]/70 font-body uppercase tracking-wider">
          {label}
        </div>
      </div>

      {/* Decorative line */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[var(--signal-500)]/50 to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      />
    </motion.div>
  );
};

const HeroStats: React.FC = () => {
  const stats = [
    { value: 16, suffix: '+', label: 'Years Experience', delay: 0 },
    { value: 200, suffix: '+', label: 'Projects Delivered', delay: 0.1 },
    { value: 50, suffix: '+', label: 'Clients Served', delay: 0.2 },
    { value: 100, suffix: '+', label: 'Systems Built', delay: 0.3 },
  ];

  return (
    <section className="relative py-20 bg-[var(--ink-900)] overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--parchment-050) 1px, transparent 1px),
            linear-gradient(90deg, var(--parchment-050) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--parchment-050)] mb-4">
            Proven Track Record
          </h2>
          <p className="text-lg text-[var(--parchment-050)]/60 max-w-2xl mx-auto font-body">
            Real results from systems-first marketing
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <div className="w-px h-16 bg-gradient-to-b from-[var(--signal-500)] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroStats;
