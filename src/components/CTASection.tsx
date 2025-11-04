import React from 'react';

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center">
      <h2 className="text-3xl font-bold">Ready to see more?</h2>
      <p className="mt-2">Explore my case studies or download my résumé.</p>
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <a href="/case-studies" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100">
          Explore Case Studies
        </a>
        <a href="/branding/resume.pdf" className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-blue-700">
          Download Résumé
        </a>
      </div>
    </section>
  );
}