import React, { useState } from 'react';

const principles = [
  {
    id: 1,
    title: 'Clarity first',
    detail: 'Every system I design starts with clear goals and transparent workflows.',
  },
  {
    id: 2,
    title: 'Measurable outcomes',
    detail: 'I focus on metrics that prove impact, not vanity stats.',
  },
  {
    id: 3,
    title: 'Scalable systems',
    detail: 'Solutions are built to grow with your team and technology.',
  },
  {
    id: 4,
    title: 'Assistant-ready workflows',
    detail: 'I design processes that humans and AI can both execute seamlessly.',
  },
];

export default function StorySectionAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">How I Work</h2>
        <ul className="space-y-4">
          {principles.map(p => (
            <li key={p.id} className="border rounded-lg">
              <button
                className="w-full flex justify-between items-center p-4"
                onClick={() => setOpenIndex(openIndex === p.id ? null : p.id)}
              >
                <span>{p.title}</span>
                <span>{openIndex === p.id ? '−' : '+'}</span>
              </button>
              {openIndex === p.id && <div className="p-4 border-t">{p.detail}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
