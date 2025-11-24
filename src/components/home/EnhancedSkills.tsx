import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../ui/GlassCard';
import SkillBadge from '../ui/SkillBadge';
import { OceanGradientText } from '../ui/OceanGradientText';

const skillCategories = [
  {
    category: 'Marketing Automation',
    icon: '⚡',
    skills: [
      { name: 'FluentCRM', icon: '📧', level: 'expert' as const },
      { name: 'HubSpot', icon: '🎯', level: 'advanced' as const },
      { name: 'Zapier', icon: '⚙️', level: 'expert' as const },
      { name: 'Automated Campaigns', icon: '🚀', level: 'expert' as const },
    ],
    gradient: 'from-[#006d77]/10 to-[#006d77]/5',
  },
  {
    category: 'Analytics & Data',
    icon: '📊',
    skills: [
      { name: 'Google Analytics 4', icon: '📈', level: 'expert' as const },
      { name: 'Tag Manager', icon: '🏷️', level: 'advanced' as const },
      { name: 'Data Visualization', icon: '📉', level: 'advanced' as const },
      { name: 'A/B Testing', icon: '🧪', level: 'expert' as const },
    ],
    gradient: 'from-[#83c5be]/10 to-[#83c5be]/5',
  },
  {
    category: 'Development',
    icon: '💻',
    skills: [
      { name: 'React', icon: '⚛️', level: 'advanced' as const },
      { name: 'TypeScript', icon: '📘', level: 'advanced' as const },
      { name: 'WordPress', icon: '📝', level: 'expert' as const },
      { name: 'REST APIs', icon: '🔌', level: 'advanced' as const },
      { name: 'PHP', icon: '🐘', level: 'intermediate' as const },
    ],
    gradient: 'from-green-500/10 to-green-600/5',
  },
  {
    category: 'Paid Media & SEO',
    icon: '🎯',
    skills: [
      { name: 'Google Ads', icon: '🔎', level: 'expert' as const },
      { name: 'Meta Ads', icon: '📱', level: 'advanced' as const },
      { name: 'LinkedIn Ads', icon: '💼', level: 'advanced' as const },
      { name: 'Technical SEO', icon: '🔧', level: 'expert' as const },
    ],
    gradient: 'from-amber-500/10 to-amber-600/5',
  },
  {
    category: 'Design & Content',
    icon: '🎨',
    skills: [
      { name: 'Brand Systems', icon: '🎭', level: 'advanced' as const },
      { name: 'UI/UX Design', icon: '✨', level: 'advanced' as const },
      { name: 'Copywriting', icon: '✍️', level: 'expert' as const },
      { name: 'Content Strategy', icon: '📋', level: 'expert' as const },
    ],
    gradient: 'from-pink-500/10 to-pink-600/5',
  },
  {
    category: 'Infrastructure',
    icon: '🏗️',
    skills: [
      { name: 'Cloudflare', icon: '☁️', level: 'advanced' as const },
      { name: 'CI/CD', icon: '🔄', level: 'intermediate' as const },
      { name: 'Security', icon: '🔒', level: 'advanced' as const },
      { name: 'CDN Optimization', icon: '⚡', level: 'expert' as const },
    ],
    gradient: 'from-[#83c5be]/10 to-[#006d77]/5',
  },
];

const EnhancedSkills: React.FC = () => {
  return (
    <section className="container-px mx-auto max-w-7xl py-16 md:py-24">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
          <OceanGradientText
            text="Where Strategy Meets Stack"
            className="text-[#edf6f9]"
          />
        </h2>
        <p className="text-lg text-[#edf6f9]/70 max-w-3xl mx-auto font-body">
          From first click to final sale — systems that scale, connect, and convert.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          >
            <GlassCard gradient={category.gradient} className="p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-hidden="true">
                  {category.icon}
                </span>
                <h3 className="text-xl font-semibold text-[#edf6f9] font-display">
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="group relative"
                    onMouseEnter={() => {}}
                  >
                    <SkillBadge
                      skill={skill.name}
                      icon={skill.icon}
                      level={skill.level}
                      category={category.category}
                      delay={categoryIndex * 0.1 + skillIndex * 0.05}
                    />
                    {/* Custom tooltip for skill */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-[#006d77] text-[#edf6f9] px-3 py-2 rounded-md text-xs shadow-xl border border-[#83c5be]/20 whitespace-nowrap">
                        <div className="font-bold">{skill.name}</div>
                        <div className="text-[#83c5be] text-[10px] mt-0.5">
                          {category.category} • {skill.level}
                        </div>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#006d77] rotate-45 border-r border-b border-[#83c5be]/20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EnhancedSkills;
