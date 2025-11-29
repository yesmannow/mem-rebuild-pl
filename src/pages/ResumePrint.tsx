import React, { useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Printer } from 'lucide-react';
import { resumeData } from '../data/resumeData';

/**
 * ResumePrint - ATS-Optimized, Print-Ready Resume Page
 * 
 * Design Philosophy:
 * - Chronological Resume format with Minimalist Design
 * - NO dark mode - White background, black text
 * - NO graphic lines/dividers (bad for ATS)
 * - Left-aligned body text, Center-aligned header
 * - Inter font for clean readability
 */

const ResumePrint: React.FC = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePrint();
    }
  }, [handlePrint]);

  return (
    <>
      <Helmet>
        <title>Resume - Jacob Darling | Marketing Director & Systems Architect</title>
        <meta 
          name="description" 
          content="ATS-optimized resume for Jacob Darling - Marketing Director & Systems Architect with 15+ years experience building revenue-driving infrastructure for healthcare brands."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: white !important;
          }
          nav, footer, header, .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .resume-container {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0.5in !important;
          }
          @page {
            size: letter;
            margin: 0.5in;
          }
        }
        @media screen {
          .print-only {
            display: none;
          }
        }
      `}</style>

      {/* Print Button - Hidden on Print */}
      <div className="no-print fixed top-4 right-4 z-50 print:hidden">
        <button
          onClick={handlePrint}
          onKeyDown={handleKeyDown}
          className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg 
                     hover:bg-brand-teal/90 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2
                     shadow-lg hover:shadow-xl"
          aria-label="Save resume as PDF"
          tabIndex={0}
        >
          <Printer size={18} aria-hidden="true" />
          <span className="font-medium">🖨️ Save as PDF</span>
        </button>
      </div>

      {/* Resume Container */}
      <div 
        className="min-h-screen bg-gray-100 py-8 print:bg-white print:py-0"
        role="main"
        aria-label="Printable Resume"
      >
        <div 
          ref={resumeRef}
          className="resume-container max-w-[8.5in] mx-auto bg-white text-black p-[0.75in] shadow-lg print:shadow-none font-inter"
        >
          {/* Header - Center Aligned */}
          <header className="text-center mb-6" role="banner">
            <h1 className="text-3xl font-bold tracking-widest uppercase text-black mb-1">
              {resumeData.header.name}
            </h1>
            <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide mb-3">
              {resumeData.header.title}
            </p>
            <div 
              className="text-[11px] text-gray-600 flex flex-wrap justify-center gap-x-3 gap-y-1"
              aria-label="Contact information"
            >
              {resumeData.header.contact.map((item, idx) => (
                <span key={idx} className="whitespace-nowrap">
                  {item}
                  {idx < resumeData.header.contact.length - 1 && (
                    <span className="ml-3 text-gray-400" aria-hidden="true">|</span>
                  )}
                </span>
              ))}
            </div>
          </header>

          {/* Summary Section */}
          <section className="mb-6" aria-labelledby="summary-heading">
            <h2 
              id="summary-heading"
              className="text-lg font-bold uppercase text-black mb-2 border-b border-gray-200 pb-1"
            >
              Professional Summary
            </h2>
            <p className="text-[11px] leading-relaxed text-gray-900">
              {resumeData.summary}
            </p>
          </section>

          {/* Core Competencies Section */}
          <section className="mb-6" aria-labelledby="competencies-heading">
            <h2 
              id="competencies-heading"
              className="text-lg font-bold uppercase text-black mb-2 border-b border-gray-200 pb-1"
            >
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1">
              {resumeData.coreCompetencies.map((competency, idx) => (
                <span key={idx} className="text-[11px] text-gray-900 flex items-start">
                  <span className="text-brand-teal mr-2" aria-hidden="true">•</span>
                  {competency}
                </span>
              ))}
            </div>
          </section>

          {/* Professional Experience Section */}
          <section className="mb-6" aria-labelledby="experience-heading">
            <h2 
              id="experience-heading"
              className="text-lg font-bold uppercase text-black mb-3 border-b border-gray-200 pb-1"
            >
              Professional Experience
            </h2>
            
            {resumeData.experience.map((job, jobIdx) => (
              <article 
                key={jobIdx} 
                className="mb-5 last:mb-0"
                aria-labelledby={`job-${jobIdx}-title`}
              >
                {/* Job Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                  <div>
                    <h3 
                      id={`job-${jobIdx}-title`}
                      className="text-base font-bold uppercase text-black"
                    >
                      {job.role}
                    </h3>
                    <p className="text-base font-semibold text-gray-800">
                      {job.company}
                    </p>
                  </div>
                  <div className="text-[11px] text-gray-600 sm:text-right mt-1 sm:mt-0">
                    <p>{job.period}</p>
                    <p>{job.location}</p>
                  </div>
                </div>

                {/* Tech Stack */}
                <p className="text-[10px] italic text-gray-600 mb-2">
                  {job.stack}
                </p>

                {/* Bullets */}
                <ul className="space-y-1" role="list">
                  {job.bullets.map((bullet, bulletIdx) => (
                    <li 
                      key={bulletIdx} 
                      className="text-[11px] leading-relaxed text-gray-900 flex items-start"
                    >
                      <span className="text-brand-teal mr-2 flex-shrink-0" aria-hidden="true">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          {/* Education Section */}
          <section aria-labelledby="education-heading">
            <h2 
              id="education-heading"
              className="text-lg font-bold uppercase text-black mb-2 border-b border-gray-200 pb-1"
            >
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
              <div>
                <p className="text-base font-bold text-black">
                  {resumeData.education.degree}
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {resumeData.education.school}
                </p>
              </div>
              <p className="text-[11px] text-gray-600 mt-1 sm:mt-0">
                {resumeData.education.year}
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ResumePrint;
