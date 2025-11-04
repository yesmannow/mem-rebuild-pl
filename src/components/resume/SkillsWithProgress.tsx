import React from 'react';
import { motion } from 'framer-motion';

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
  const categories = Array.from(new Set(skillsWithProgress.map(s => s.category || 'Other')));

  return (
    <div className={className}>
      {categories.map((category, categoryIndex) => {
        const categorySkills = skillsWithProgress.filter(s => s.category === category);

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
            </h3>

            <div className="space-y-4">
              {categorySkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-blue-400 text-sm font-semibold">{skill.level}%</span>
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

