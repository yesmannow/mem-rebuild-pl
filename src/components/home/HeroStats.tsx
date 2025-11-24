import React from 'react';
import { motion } from 'framer-motion';
import { OceanCountingNumber } from '../ui/OceanCountingNumber';
import { OceanGradientText } from '../ui/OceanGradientText';

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}

const AnimatedStat: React.FC<StatProps> = ({ value, suffix = '', label, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="text-center space-y-3">
        {/* Stat Value */}
        <div className="relative">
          <motion.div
            className="text-5xl md:text-6xl font-bold font-mono relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <OceanCountingNumber
              number={value}
              className="text-[#006d77]"
              transition={{ stiffness: 90, damping: 50 }}
            />
            {suffix}
          </motion.div>

          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-[#006d77]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Stat Label */}
        <div className="text-sm md:text-base text-[#edf6f9]/70 font-body uppercase tracking-wider">
          {label}
        </div>
      </div>

      {/* Decorative line */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-[#006d77]/50 to-transparent"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
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
    <section className="relative py-20 bg-[#006d77] overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(#edf6f9 1px, transparent 1px),
            linear-gradient(90deg, #edf6f9 1px, transparent 1px)
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
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            <OceanGradientText
              text="Proven Track Record"
              className="text-[var(--parchment-050)]"
            />
          </h2>
          <p className="text-lg text-[#edf6f9]/60 max-w-2xl mx-auto font-body">
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
          <div className="w-px h-16 bg-gradient-to-b from-[#006d77] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroStats;
