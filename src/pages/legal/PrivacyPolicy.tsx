import React from 'react';
import { motion } from 'framer-motion';
import { SimpleSection } from '../../components/ui/SimpleSection';
import TechBackdrop from '../../components/hero/TechBackdrop';
import { LegalDocumentViewer } from '../../components/legal/LegalDocumentViewer';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        <p>
          This portfolio exists to showcase work, process, and outcomes. We respect your privacy and
          collect only what is necessary to deliver a quality experience.
        </p>
      `,
    },
    {
      id: 'what-we-collect',
      title: 'What We Collect',
      content: `
        <ul>
          <li>Basic browsing data (e.g., pages visited, device type, approximate location).</li>
          <li>Form submissions you choose to send (name, email, and message contents).</li>
        </ul>
      `,
    },
    {
      id: 'how-we-use',
      title: 'How We Use It',
      content: `
        <ul>
          <li>To respond to inquiries and showcase relevant work.</li>
          <li>To improve performance and usability of the site.</li>
        </ul>
      `,
    },
    {
      id: 'storage-analytics',
      title: 'Storage & Analytics',
      content: `
        <p>
          We use local storage for preferences and Google Analytics for performance monitoring. No
          data is sold or shared with third parties for advertising.
        </p>
      `,
    },
    {
      id: 'cookies',
      title: 'Cookies & Preferences',
      content: `
        <p>
          Optional cookies may be used for remembering preferences. You can decline non-essential
          cookies via the on-page consent banner.
        </p>
      `,
    },
    {
      id: 'data-requests',
      title: 'Data Requests',
      content: `
        <p>
          To request deletion of any submitted information, email
          <a href="mailto:hoosierdarling@gmail.com" class="text-brand-turquoise hover:underline">hoosierdarling@gmail.com</a>.
        </p>
      `,
    },
    {
      id: 'changes',
      title: 'Changes',
      content: `
        <p>
          This policy may be updated periodically. Material changes will be reflected on this page
          with a revised date.
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
                Privacy Policy
              </h1>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Please review our legal documents. Questions? Use the Portfolio Concierge in the bottom right corner.
              </p>
            </motion.div>
          </div>
        </div>
      </SimpleSection>

      {/* Document Viewer */}
      <LegalDocumentViewer title="Privacy Policy" sections={sections} />
    </>
  );
};

export default PrivacyPolicy;
