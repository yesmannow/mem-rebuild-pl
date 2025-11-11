import React from 'react';
import { motion } from 'framer-motion';

const timeline = [
  {
    id: 'marketing-director',
    role: 'Marketing Director',
    company: 'Graston Technique®',
    highlight: 'Scaled platform to 30K+ users with GPT-powered support assistant',
  },
  {
    id: 'marketing-manager',
    role: 'Marketing Manager',
    company: 'Riley Bennett Egloff LLP',
    highlight: 'Improved engagement with analytics-driven campaigns',
  },
];

export default function CareerTimeline() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Career Highlights</h2>
        <ol className="relative border-l border-slate-300">
          {timeline.map(entry => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="mb-10 ml-6"
            >
              <span className="absolute -left-3 w-6 h-6 bg-blue-600 rounded-full"></span>
              <h3 className="text-xl font-semibold">
                {entry.role} · {entry.company}
              </h3>
              <p className="mt-2 text-slate-700">{entry.highlight}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
