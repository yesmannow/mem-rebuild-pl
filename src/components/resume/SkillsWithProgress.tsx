import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

interface SkillWithProgress {
  name: string;
  level: number; // 0-100
  category?: string;
}

// Define skill levels based on experience and expertise
const skillsWithProgress: SkillWithProgress[] = [
  // Strategic & Leadership (High proficiency)
  { name: 'Strategic Marketing & Leadership', level: 95, category: 'Leadership' },
  { name: 'Brand Strategy & Transformation', level: 90, category: 'Strategy' },
  { name: 'Team Leadership & Collaboration', level: 92, category: 'Leadership' },

  // Technical & Development (High proficiency)
  { name: 'Full-Stack Web Development', level: 85, category: 'Technical' },
  { name: 'WordPress Development', level: 90, category: 'Technical' },
  { name: 'JavaScript & React', level: 80, category: 'Technical' },
  { name: 'CRM Architecture & Automation', level: 95, category: 'Technical' },

  // Marketing & Analytics (Very High proficiency)
  { name: 'Lifecycle & Email Marketing', level: 93, category: 'Marketing' },
  { name: 'Content Strategy & Technical SEO', level: 88, category: 'Marketing' },
  { name: 'Data Analytics & Attribution', level: 90, category: 'Analytics' },
  { name: 'Custom Analytics Dashboards', level: 85, category: 'Analytics' },

  // Platforms & Tools (High proficiency)
  { name: 'AI & GPT-Powered Integration', level: 85, category: 'Technical' },
  { name: 'Performance & Security Optimization', level: 88, category: 'Technical' },
  { name: 'LMS & E-Commerce Integration', level: 90, category: 'Technical' },
  { name: 'Serverless Development', level: 80, category: 'Technical' },

  // Management (High proficiency)
  { name: 'Agile Project Management', level: 90, category: 'Management' },
  { name: 'Annual Budget Management ($500K+)', level: 92, category: 'Management' },
];

interface SkillsWithProgressProps {
  className?: string;
}

const SkillsWithProgress: React.FC<SkillsWithProgressProps> = ({ className = '' }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = Array.from(new Set(skillsWithProgress.map(s => s.category || 'Other')));

  const filteredSkills = activeCategory
    ? skillsWithProgress.filter(s => s.category === activeCategory)
    : skillsWithProgress;

  return (
    <div className={className}>
      {/* Category Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <motion.button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === null
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Filter size={14} className="inline mr-2" />
          All Skills
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {categories.map((category, categoryIndex) => {
        const categorySkills = filteredSkills.filter(s => s.category === category);

        if (categorySkills.length === 0) return null;

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
              {category}
              <span className="text-sm text-gray-500 ml-auto">({categorySkills.length})</span>
            </h3>

            <div className="space-y-4">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  whileHover={{ x: 4, scale: 1.01 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 font-medium group-hover:text-white transition-colors">{skill.name}</span>
                    <motion.span
                      className="text-blue-400 text-sm font-semibold"
                      whileHover={{ scale: 1.2 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: (categoryIndex * 0.1) + (index * 0.05), ease: "easeOut" }}
                    />
                    {/* Tooltip on hover */}
                    <motion.div
                      className="absolute top-0 right-0 h-full bg-white/20 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: `${100 - skill.level}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SkillsWithProgress;

