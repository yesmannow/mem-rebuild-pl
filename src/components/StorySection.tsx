import React, { useState } from 'react';

export default function StorySection() {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => setExpanded(!expanded);

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Why I Do This</h2>
          <p className="text-slate-700 leading-relaxed">
            I believe systems create freedom. My work empowers teams with clarity and reproducibility.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">How I Work</h2>
          <button onClick={toggleAccordion} aria-expanded={expanded} className="text-left w-full">
            <h3 className="text-xl font-semibold mb-2">
              {expanded ? '▼' : '►'} Principles
            </h3>
          </button>
          {expanded && (
            <ul className="list-disc ml-5 space-y-2 text-slate-700">
              <li>Clarity first</li>
              <li>Measurable outcomes</li>
              <li>Scalable systems</li>
              <li>Assistant-ready workflows</li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}