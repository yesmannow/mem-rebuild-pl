import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers } from 'lucide-react';

interface TechStackVisualizationProps {
  techStack: string[];
  architecture?: string;
  className?: string;
}

/**
 * AppTechStackVisualization
 * Visual representation of tech stack with architecture info
 */
export const AppTechStackVisualization: React.FC<TechStackVisualizationProps> = ({
  techStack,
  architecture,
  className = '',
}) => {
  // Group technologies by category (simple heuristic)
  const categorizeTech = (tech: string): string => {
    const lower = tech.toLowerCase();
    if (lower.includes('react') || lower.includes('vue') || lower.includes('angular')) return 'Frontend';
    if (lower.includes('node') || lower.includes('express') || lower.includes('fastapi')) return 'Backend';
    if (lower.includes('postgres') || lower.includes('mysql') || lower.includes('mongo')) return 'Database';
    if (lower.includes('aws') || lower.includes('azure') || lower.includes('docker')) return 'Infrastructure';
    if (lower.includes('typescript') || lower.includes('javascript')) return 'Language';
    return 'Other';
  };

  const categorized = techStack.reduce((acc, tech) => {
    const category = categorizeTech(tech);
    if (!acc[category]) acc[category] = [];
    acc[category].push(tech);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className={`app-tech-stack-viz ${className}`}>
      {architecture && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-brand-turquoise" />
            <h3 className="text-lg font-semibold text-brand-text">Architecture</h3>
          </div>
          <p className="text-sm text-brand-muted bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
            {architecture}
          </p>
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="w-5 h-5 text-brand-turquoise" />
          <h3 className="text-lg font-semibold text-brand-text">Technology Stack</h3>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(categorized).map(([category, techs], categoryIndex) => (
          <motion.div
            key={category}
            className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1, duration: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-brand-turquoise mb-3 uppercase tracking-wider">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 + techIndex * 0.05, duration: 0.2 }}
                  className="px-3 py-1.5 rounded-md text-sm font-mono bg-slate-900/50 text-brand-text border border-slate-700/50 hover:border-brand-turquoise/50 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppTechStackVisualization;
