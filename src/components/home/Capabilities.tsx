import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BarChart3, Palette, Settings } from 'lucide-react';
import './Capabilities.css';

const capabilities = [
  {
    icon: Zap,
    title: 'Automation',
    description: 'Lifecycle marketing, CRM flows, and operational systems that run without constant oversight.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Data architecture, attribution modeling, and dashboards that turn metrics into decisions.',
  },
  {
    icon: Palette,
    title: 'Creative',
    description: 'Brand systems, visual design, and content that connects with audiences and converts.',
  },
  {
    icon: Settings,
    title: 'CRM/MarTech',
    description: 'Platform integration, data pipelines, and tooling that unifies your marketing stack.',
  },
];

const Capabilities: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="capabilities" className="capabilities container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="capabilities__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">Capabilities</h2>
        <p className="section-subheading">
          Four core disciplines that combine into complete marketing systems.
        </p>
      </motion.div>

      <motion.div
        className="capabilities__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {capabilities.map((capability, index) => {
          const Icon = capability.icon;
          return (
            <motion.div
              key={capability.title}
              className="card capability-card"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="capability-card__icon">
                <Icon size={32} />
              </div>
              <h3 className="capability-card__title">{capability.title}</h3>
              <p className="capability-card__description">{capability.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Capabilities;

