import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedProject {
  title: string;
  subtitle: string;
  metric: {
    value: string;
    label: string;
  };
  image?: string;
  href: string;
  gradient: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    title: 'The Launchpad',
    subtitle: 'Growth Engine Architecture',
    metric: { value: '340%', label: 'Revenue Growth' },
    href: '/case-studies/the-launchpad',
    gradient: 'from-brand-teal/20 to-emerald-500/20',
  },
  {
    title: 'The Engine Room',
    subtitle: 'Performance Optimization',
    metric: { value: '99.9%', label: 'Uptime' },
    href: '/case-studies/the-engine-room',
    gradient: 'from-brand-orange/20 to-amber-500/20',
  },
  {
    title: 'The Compass',
    subtitle: 'Analytics Dashboard',
    metric: { value: '2.5x', label: 'Faster Decisions' },
    href: '/case-studies/the-compass',
    gradient: 'from-sky-500/20 to-blue-500/20',
  },
];

const FeaturedWorkHighlight: React.FC = () => {
  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-brand-muted mb-2">
            Proof of Concept
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text">
            Featured <span className="text-brand-teal">Work</span>
          </h2>
        </div>
        <Link
          to="/case-studies"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10 transition-colors text-sm font-medium"
        >
          View All
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link
              to={project.href}
              className="group block relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur p-6 h-full hover:border-brand-teal/30 transition-all"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-brand-teal/10 border border-brand-teal/20">
                    <Star size={20} className="text-brand-teal" />
                  </div>
                  <ArrowUpRight 
                    size={20} 
                    className="text-brand-muted group-hover:text-brand-teal group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
                  />
                </div>

                <h3 className="text-xl font-bold text-brand-text mb-1 group-hover:text-brand-teal transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-brand-muted mb-6">{project.subtitle}</p>

                {/* Metric Highlight */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-brand-teal drop-shadow-neon">
                      {project.metric.value}
                    </span>
                    <span className="text-sm text-brand-muted pb-1">
                      {project.metric.label}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile View All Link */}
      <div className="mt-6 md:hidden text-center">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-teal/30 text-brand-teal hover:bg-brand-teal/10 transition-colors text-sm font-medium"
        >
          View All Case Studies
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedWorkHighlight;
