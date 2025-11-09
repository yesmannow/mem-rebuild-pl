import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  gradient?: 'blue' | 'purple' | 'pink' | 'cyan';
  delay?: number;
}

export default function Section({
  title,
  subtitle,
  children,
  className = '',
  gradient = 'blue',
  delay = 0,
}: SectionProps) {
  const gradientClasses = {
    blue: 'from-blue-500 to-cyan-400',
    purple: 'from-purple-500 to-pink-500',
    pink: 'from-pink-500 to-rose-400',
    cyan: 'from-cyan-400 to-blue-500',
  };

  const borderClasses = {
    blue: 'border-blue-500/30',
    purple: 'border-purple-500/30',
    pink: 'border-pink-500/30',
    cyan: 'border-cyan-500/30',
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay }}
      className={`mb-16 ${className}`}
    >
      {/* Section Header */}
      <div className="mb-8">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2 }}
          className={`h-px bg-gradient-to-r ${gradientClasses[gradient]} mb-6`}
        />

        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
          className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradientClasses[gradient]} text-transparent bg-clip-text mb-2`}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.4 }}
            className="text-gray-400 text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Section Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.5 }}
        className={`relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-black/50 border ${borderClasses[gradient]} backdrop-blur-sm`}
      >
        {/* Decorative corner elements */}
        <div
          className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${borderClasses[gradient]} rounded-tl-2xl`}
        />
        <div
          className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 ${borderClasses[gradient]} rounded-tr-2xl`}
        />
        <div
          className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 ${borderClasses[gradient]} rounded-bl-2xl`}
        />
        <div
          className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${borderClasses[gradient]} rounded-br-2xl`}
        />

        {children}
      </motion.div>
    </motion.section>
  );
}
