import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaPython, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiFastapi, SiFlask } from 'react-icons/si';

const skills = [
  { id: 'react', name: 'React', icon: <FaReact className="text-sky-500" /> },
  { id: 'tailwind', name: 'TailwindCSS', icon: <SiTailwindcss className="text-cyan-400" /> },
  { id: 'fastapi', name: 'FastAPI', icon: <SiFastapi className="text-green-500" /> },
  { id: 'flask', name: 'Flask', icon: <SiFlask className="text-slate-600" /> },
  { id: 'python', name: 'Python', icon: <FaPython className="text-yellow-500" /> },
  { id: 'nodejs', name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
];

const SkillGrid = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Core Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {skills.map(skill => (
            <motion.div
              key={skill.id}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl">{skill.icon}</div>
              <p className="mt-2 text-sm font-medium text-slate-700">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillGrid;
