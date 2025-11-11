import React from 'react';

export default function HeroGradient({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Subtle cave arch silhouette */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 128 128"
      >
        <path
          d="M59.375 34.531c-3.9769 0.15314-6.5777 2.9379-9.3438 5.3125s-5.7292 4.3454-9.1562 5.3125..."
          fill="url(#archGradient)"
        />
        <defs>
          <linearGradient id="archGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">{children}</div>
    </section>
  );
}
