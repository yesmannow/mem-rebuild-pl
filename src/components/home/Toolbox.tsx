import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Code, Palette, Database, Globe, Zap, Camera, Wrench } from 'lucide-react';
import './Toolbox.css';

gsap.registerPlugin(ScrollTrigger);

interface Tool {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  proficiency: number;
  link?: string;
  color: string;
  glowColor: string;
}

const tools: Tool[] = [
  // Design & Creative
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    icon: <Palette className="w-6 h-6" />,
    description: 'UI/UX Design & Prototyping',
    proficiency: 95,
    link: 'https://figma.com',
    color: 'from-purple-400 to-pink-400',
    glowColor: 'rgba(147, 51, 234, 0.3)',
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'Design',
    icon: <Camera className="w-6 h-6" />,
    description: 'Photo Editing & Digital Art',
    proficiency: 90,
    link: 'https://adobe.com/photoshop',
    color: 'from-blue-400 to-cyan-400',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    category: 'Design',
    icon: <Palette className="w-6 h-6" />,
    description: 'Vector Graphics & Branding',
    proficiency: 85,
    link: 'https://adobe.com/illustrator',
    color: 'from-orange-400 to-yellow-400',
    glowColor: 'rgba(249, 115, 22, 0.3)',
  },

  // Development
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    icon: <Code className="w-6 h-6" />,
    description: 'Component-Based UI Development',
    proficiency: 95,
    link: 'https://react.dev',
    color: 'from-cyan-400 to-blue-400',
    glowColor: 'rgba(6, 182, 212, 0.3)',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    icon: <Code className="w-6 h-6" />,
    description: 'Type-Safe JavaScript Development',
    proficiency: 90,
    link: 'https://typescriptlang.org',
    color: 'from-blue-400 to-indigo-400',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    icon: <Database className="w-6 h-6" />,
    description: 'Server-Side JavaScript Runtime',
    proficiency: 85,
    link: 'https://nodejs.org',
    color: 'from-green-400 to-emerald-400',
    glowColor: 'rgba(34, 197, 94, 0.3)',
  },

  // Marketing & Automation
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'Marketing',
    icon: <Zap className="w-6 h-6" />,
    description: 'CRM & Marketing Automation',
    proficiency: 95,
    link: 'https://hubspot.com',
    color: 'from-orange-400 to-red-400',
    glowColor: 'rgba(249, 115, 22, 0.3)',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'Automation',
    icon: <Zap className="w-6 h-6" />,
    description: 'Workflow Automation Platform',
    proficiency: 90,
    link: 'https://zapier.com',
    color: 'from-yellow-400 to-orange-400',
    glowColor: 'rgba(245, 158, 11, 0.3)',
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'CMS',
    icon: <Globe className="w-6 h-6" />,
    description: 'Content Management & Development',
    proficiency: 90,
    link: 'https://wordpress.org',
    color: 'from-blue-400 to-gray-400',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },

  // Development Tools
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Development',
    icon: <Code className="w-6 h-6" />,
    description: 'Primary Code Editor & IDE',
    proficiency: 95,
    link: 'https://code.visualstudio.com',
    color: 'from-blue-400 to-purple-400',
    glowColor: 'rgba(59, 130, 246, 0.3)',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Development',
    icon: <Wrench className="w-6 h-6" />,
    description: 'Version Control & Collaboration',
    proficiency: 90,
    link: 'https://git-scm.com',
    color: 'from-red-400 to-pink-400',
    glowColor: 'rgba(239, 68, 68, 0.3)',
  },
  {
    id: 'gsap',
    name: 'GSAP',
    category: 'Animation',
    icon: <Zap className="w-6 h-6" />,
    description: 'High-Performance Web Animations',
    proficiency: 85,
    link: 'https://greensock.com/gsap',
    color: 'from-green-400 to-teal-400',
    glowColor: 'rgba(34, 197, 94, 0.3)',
  },
];

const categories = [
  'All',
  'Design',
  'Frontend',
  'Backend',
  'Marketing',
  'Automation',
  'CMS',
  'Development',
  'Animation',
];

const Toolbox: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTools =
    selectedCategory === 'All' ? tools : tools.filter(tool => tool.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for tool cards
      gsap.fromTo(
        '.tool-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Category filter animation
      gsap.fromTo(
        '.category-filter',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.category-filters',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating animation for cards
      gsap.to('.tool-card', {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, [filteredTools]);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-black via-gray-900/20 to-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full mb-6 shadow-2xl"
            whileHover={{
              scale: 1.1,
              rotate: 360,
              boxShadow: '0 0 40px rgba(147, 51, 234, 0.6)',
            }}
            transition={{ duration: 0.8 }}
          >
            <Wrench className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Creative Toolbox
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The arsenal of tools, technologies, and platforms that power innovative solutions — from
            design conception to technical execution.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="category-filters flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map(category => (
            <motion.button
              key={category}
              className={`category-filter px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white border border-gray-700'
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              className="tool-card group relative"
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: `0 20px 40px ${tool.glowColor}`,
              }}
            >
              {/* Card Background */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden group-hover:border-white/20 transition-all duration-300">
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl mb-4 shadow-lg`}
                >
                  <div className="text-white">{tool.icon}</div>
                </div>

                {/* Tool Info */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {tool.name}
                    </h3>
                    {tool.link && (
                      <motion.a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    )}
                  </div>

                  <p className="text-sm text-gray-400 mb-4">{tool.description}</p>

                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-800/50 text-gray-300 rounded-full border border-gray-700">
                      {tool.category}
                    </span>

                    {/* Proficiency Bar */}
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${tool.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tool.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 font-mono">{tool.proficiency}%</span>
                    </div>
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="tool-hover-glow" data-glow-color={tool.glowColor} />

                {/* Corner Accent */}
                <div
                  className={`absolute top-2 right-2 w-2 h-2 bg-gradient-to-br ${tool.color} rounded-full opacity-60`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {tools.length}+
              </div>
              <div className="text-sm text-gray-400">Tools Mastered</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {categories.length - 1}
              </div>
              <div className="text-sm text-gray-400">Specializations</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                15+
              </div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
          </div>

          <p className="text-gray-500 text-sm font-mono uppercase tracking-wider mt-8">
            DESIGN / CODE / AUTOMATE / OPTIMIZE
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Toolbox;
