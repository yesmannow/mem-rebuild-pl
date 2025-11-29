import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, BarChart3, Code, Palette, Users, Zap } from 'lucide-react';

interface Skill {
  name: string;
  category: string;
  level: number;
  icon: React.ReactNode;
  description: string;
  years?: number;
}

const skills: Skill[] = [
  { name: 'Marketing Strategy', category: 'Strategy', level: 95, icon: <Briefcase size={20} />, description: 'Go-to-market planning, campaign architecture, ROI analysis', years: 15 },
  { name: 'Analytics & Attribution', category: 'Analytics', level: 88, icon: <BarChart3 size={20} />, description: 'GA4, GTM, data visualization, conversion tracking', years: 12 },
  { name: 'Full-Stack Development', category: 'Engineering', level: 90, icon: <Code size={20} />, description: 'React, WordPress, PHP, JavaScript, API integration', years: 10 },
  { name: 'Brand & Creative', category: 'Creative', level: 80, icon: <Palette size={20} />, description: 'Brand systems, UI/UX, content strategy, design', years: 15 },
  { name: 'Team Leadership', category: 'Leadership', level: 92, icon: <Users size={20} />, description: 'Cross-functional teams, project management, mentoring', years: 8 },
  { name: 'Marketing Automation', category: 'Automation', level: 92, icon: <Zap size={20} />, description: 'HubSpot, FluentCRM, Zapier, workflow design', years: 10 },
];

const InteractiveSkillMatrix: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="interactive-skill-matrix p-8 bg-brand-surface/50 border border-brand-teal/20 rounded-2xl backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-brand-text mb-6 text-center">Interactive Skills Matrix</h3>
      <p className="text-brand-muted text-center mb-8">Click any skill to explore details</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {skills.map((skill, index) => (
          <motion.button
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedSkill(skill)}
            onMouseEnter={() => setHoveredCategory(skill.category)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`relative p-4 rounded-xl border-2 transition-all text-left ${
              selectedSkill?.name === skill.name
                ? 'border-brand-teal bg-brand-teal/10 scale-105'
                : hoveredCategory === skill.category
                ? 'border-brand-teal/50 bg-brand-teal/5'
                : 'border-brand-teal/20 bg-brand-surface/30'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-brand-teal">{skill.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-brand-text text-sm">{skill.name}</div>
                <div className="text-xs text-brand-muted">{skill.category}</div>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-brand-muted">Proficiency</span>
                <span className="text-xs font-bold text-brand-teal">{skill.level}%</span>
              </div>
              <div className="h-2 bg-brand-dark rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-teal to-brand-orange"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-surface border border-brand-teal/30 rounded-2xl p-8 max-w-md w-full relative"
            >
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 text-brand-muted hover:text-brand-text"
              >
                ✕
              </button>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl text-brand-teal">{selectedSkill.icon}</div>
                <div>
                  <h4 className="text-2xl font-bold text-brand-text">{selectedSkill.name}</h4>
                  <div className="text-brand-orange">{selectedSkill.category}</div>
                </div>
              </div>
              <p className="text-brand-muted mb-4">{selectedSkill.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-muted">Proficiency Level</span>
                  <span className="text-lg font-bold text-brand-teal">{selectedSkill.level}%</span>
                </div>
                {selectedSkill.years && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-muted">Years of Experience</span>
                    <span className="text-lg font-bold text-brand-orange">{selectedSkill.years}+</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveSkillMatrix;

