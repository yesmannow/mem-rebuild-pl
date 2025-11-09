import React from 'react';
import { motion } from 'framer-motion';
import { Code, TrendingUp, Zap, BarChart3, Palette, Users, Target, Layers } from 'lucide-react';

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Marketing Automation',
    icon: <Zap className="w-5 h-5" />,
    skills: ['FluentCRM', 'HubSpot', 'Zapier', 'Workflows', 'Email Campaigns'],
    color: 'from-yellow-400 to-orange-500',
  },
  {
    name: 'Analytics & Data',
    icon: <BarChart3 className="w-5 h-5" />,
    skills: ['Google Analytics 4', 'Google Tag Manager', 'Data Visualization', 'A/B Testing'],
    color: 'from-blue-400 to-cyan-500',
  },
  {
    name: 'Development',
    icon: <Code className="w-5 h-5" />,
    skills: ['JavaScript', 'TypeScript', 'React', 'WordPress', 'PHP', 'REST APIs'],
    color: 'from-green-400 to-emerald-500',
  },
  {
    name: 'SEO & SEM',
    icon: <TrendingUp className="w-5 h-5" />,
    skills: ['Technical SEO', 'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Keyword Strategy'],
    color: 'from-purple-400 to-pink-500',
  },
  {
    name: 'Design & Branding',
    icon: <Palette className="w-5 h-5" />,
    skills: ['Brand Identity', 'UI/UX Design', 'Visual Design', 'Content Creation'],
    color: 'from-pink-400 to-rose-500',
  },
  {
    name: 'Strategy & Leadership',
    icon: <Target className="w-5 h-5" />,
    skills: [
      'Marketing Strategy',
      'Cross-functional Teams',
      'Project Management',
      'ROI Optimization',
    ],
    color: 'from-indigo-400 to-blue-500',
  },
  {
    name: 'CRM & Platforms',
    icon: <Users className="w-5 h-5" />,
    skills: ['FluentCRM', 'WooCommerce', 'WordPress', 'LearnDash', 'ACF Pro'],
    color: 'from-teal-400 to-cyan-500',
  },
  {
    name: 'Infrastructure',
    icon: <Layers className="w-5 h-5" />,
    skills: ['Cloudflare', 'CDN Optimization', 'Performance', 'Security', 'CI/CD'],
    color: 'from-amber-400 to-yellow-500',
  },
];

const SkillsShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900/30 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Core Competencies
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A unique blend of marketing strategy and technical execution—turning ideas into
            measurable results.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:border-white/20 transition-all duration-300">
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl mb-4 shadow-lg`}
                >
                  <div className="text-white">{category.icon}</div>
                </div>

                {/* Category Name */}
                <h3 className="text-white font-bold text-lg mb-4">{category.name}</h3>

                {/* Skills List */}
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li
                      key={skillIndex}
                      className="text-gray-400 text-sm flex items-center gap-2 group-hover:text-gray-300 transition-colors"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color} opacity-60`}
                      />
                      {skill}
                    </li>
                  ))}
                </ul>

                {/* Hover Glow - using CSS class instead of inline style */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br ${category.color} blur-xl`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-gray-500 text-sm font-mono uppercase tracking-wider mb-4">
            Ready to discuss how these skills can drive your business forward?
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsShowcase;
