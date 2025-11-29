import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CurrentProject {
  title: string;
  status: 'in-progress' | 'planning' | 'testing';
  description: string;
  progress: number;
  link?: string;
}

const currentProjects: CurrentProject[] = [
  {
    title: 'Portfolio Enhancement',
    status: 'in-progress',
    description: 'Ocean Pearl UI upgrade with holographic profiles and animated counters',
    progress: 85,
    link: '/about',
  },
  {
    title: 'Marketing Automation Hub',
    status: 'planning',
    description: 'Next-gen lead scoring and campaign orchestration system',
    progress: 25,
    link: '/apps',
  },
];

const statusConfig = {
  'in-progress': {
    label: 'In Progress',
    color: 'bg-brand-teal text-brand-dark',
    pulseColor: 'bg-brand-teal',
  },
  'planning': {
    label: 'Planning',
    color: 'bg-brand-orange/20 text-brand-orange border border-brand-orange/30',
    pulseColor: 'bg-brand-orange',
  },
  'testing': {
    label: 'Testing',
    color: 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
    pulseColor: 'bg-sky-400',
  },
};

const CurrentlyWorkingOn: React.FC = () => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-brand-teal/20 border border-brand-teal/50 flex items-center justify-center">
            <Zap size={18} className="text-brand-teal" />
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-muted">Live Status</p>
            <h2 className="text-xl font-bold text-brand-text">Currently Building</h2>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-brand-muted">
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>Live updates</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur p-5 hover:border-brand-teal/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig[project.status].color}`}>
                  <motion.span
                    className={`w-1.5 h-1.5 rounded-full ${statusConfig[project.status].pulseColor}`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  {statusConfig[project.status].label}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-brand-muted">
                <Clock size={12} />
                <span>{project.progress}%</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-brand-text mb-2">{project.title}</h3>
            <p className="text-sm text-brand-muted mb-4">{project.description}</p>

            {/* Progress Bar */}
            <div className="relative h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand-teal to-brand-orange rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${project.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>

            {project.link && (
              <Link
                to={project.link}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-teal hover:text-brand-orange transition-colors group-hover:gap-3"
              >
                View Details
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CurrentlyWorkingOn;
