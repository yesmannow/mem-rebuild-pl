import React from 'react';
import CountUp from 'react-countup';

type Win = { label: string; value: number; suffix?: string; prefix?: string };
const wins: Win[] = [
  { label: 'Clinicians Served', value: 30000, suffix: '+' },
  { label: 'Automations Deployed', value: 400, suffix: '+' },
  { label: 'Support Ticket Reduction', value: 70, suffix: '%' },
  { label: 'Years Experience', value: 15, suffix: '+' },
];

export default function QuickWinsAnimated() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {wins.map((w, i) => (
          <div
            key={i}
            className="p-5 bg-slate-50 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
          >
            <div className="text-3xl font-extrabold text-blue-600 tabular-nums">
              <CountUp end={w.value} duration={1.4} />
              {w.suffix}
            </div>
            <p className="mt-1 text-sm font-medium text-slate-600">{w.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
