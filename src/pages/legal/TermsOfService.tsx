import React from 'react';
import { motion } from 'framer-motion';
import { SimpleSection } from '../../components/ui/SimpleSection';
import TechBackdrop from '../../components/hero/TechBackdrop';
import { LegalDocumentViewer } from '../../components/legal/LegalDocumentViewer';

const TermsOfService: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `
        <p>By accessing this site, you agree to the following terms.</p>
      `,
    },
    {
      id: 'portfolio-content',
      title: 'Portfolio Content',
      content: `
        <p>
          Portfolio projects are for demonstration purposes only. Case studies summarize past work and
          outcomes and may reference third-party brands, platforms, or tools.
        </p>
      `,
    },
    {
      id: 'code-assets',
      title: 'Code & Assets',
      content: `
        <p>
          All code and design assets on this site are provided "as-is" without warranty of
          any kind. Do not use or redistribute without explicit permission.
        </p>
      `,
    },
    {
      id: 'availability',
      title: 'Availability',
      content: `
        <p>
          Uptime is not guaranteed. Features may change or be removed at any time without notice.
        </p>
      `,
    },
    {
      id: 'liability',
      title: 'Liability',
      content: `
        <p>
          In no event will the site owner be liable for any damages arising from the use or inability
          to use this site or its content.
        </p>
      `,
    },
    {
      id: 'contact',
      title: 'Contact',
      content: `
        <p>
          For questions about these terms, email
          <a href="mailto:hoosierdarling@gmail.com" class="text-brand-turquoise hover:underline">hoosierdarling@gmail.com</a>.
        </p>
      `,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <SimpleSection variant="default" padding="none" container={false} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <TechBackdrop className="absolute inset-0" />
        <div className="relative z-10 w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Please review our legal documents. Questions? Use the Portfolio Concierge in the bottom right corner.
              </p>
            </motion.div>
          </div>
        </div>
      </SimpleSection>

      {/* Document Viewer */}
      <LegalDocumentViewer title="Terms of Service" sections={sections} />
    </>
  );
};

export default TermsOfService;
