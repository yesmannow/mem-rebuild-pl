import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Search, BookOpen, ChevronRight } from 'lucide-react';
import { SimpleSection } from '../ui/SimpleSection';

interface LegalSection {
  id: string;
  title: string;
  content: string;
  subsections?: LegalSection[];
}

interface LegalDocumentViewerProps {
  title: string;
  sections: LegalSection[];
  className?: string;
}

/**
 * LegalDocumentViewer
 * Interactive legal document viewer with search and navigation
 */
export const LegalDocumentViewer: React.FC<LegalDocumentViewerProps> = ({
  title,
  sections,
  className = '',
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(sections[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set([sections[0]?.id || '']));

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeContent = sections.find(s => s.id === activeSection);

  return (
    <div className={`legal-document-viewer ${className}`}>
      <SimpleSection variant="elevated" padding="lg" animated>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8 text-brand-turquoise" />
              <h1 className="text-3xl font-bold text-brand-text">{title}</h1>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-muted" />
              <input
                type="text"
                placeholder="Search document..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-turquoise/50"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <h2 className="text-lg font-semibold text-brand-text mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-brand-turquoise" />
                  Sections
                </h2>
                <nav className="space-y-2">
                  {filteredSections.map(section => (
                    <div key={section.id}>
                      <button
                        onClick={() => {
                          setActiveSection(section.id);
                          if (section.subsections) {
                            toggleSection(section.id);
                          }
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          activeSection === section.id
                            ? 'bg-brand-turquoise/20 text-brand-turquoise border border-brand-turquoise/30'
                            : 'bg-slate-900/50 text-brand-text hover:bg-slate-700/50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{section.title}</span>
                          {section.subsections && (
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${
                                expandedSections.has(section.id) ? 'rotate-90' : ''
                              }`}
                            />
                          )}
                        </div>
                      </button>
                      {section.subsections && expandedSections.has(section.id) && (
                        <div className="ml-4 mt-2 space-y-1">
                          {section.subsections.map(subsection => (
                            <button
                              key={subsection.id}
                              onClick={() => setActiveSection(subsection.id)}
                              className={`w-full text-left px-3 py-2 rounded text-sm transition-all ${
                                activeSection === subsection.id
                                  ? 'bg-brand-turquoise/10 text-brand-turquoise'
                                  : 'text-brand-muted hover:text-brand-text'
                              }`}
                            >
                              {subsection.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {activeContent && (
                  <motion.div
                    key={activeContent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50"
                  >
                    <h2 className="text-2xl font-bold text-brand-text mb-6">{activeContent.title}</h2>
                    <div
                      className="prose prose-invert max-w-none text-brand-text"
                      dangerouslySetInnerHTML={{ __html: activeContent.content }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </SimpleSection>
    </div>
  );
};

export default LegalDocumentViewer;
