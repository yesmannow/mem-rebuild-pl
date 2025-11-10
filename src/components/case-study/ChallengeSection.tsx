import React from 'react';
import { motion } from 'framer-motion';

export interface RichSection {
  paragraphs?: string[];
  bullets?: string[];
}

export interface NarrativeSectionProps {
  title: string;
  content: string | RichSection;
  visualIdentity?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
}

const renderContent = (content: string | RichSection) => {
  if (typeof content === 'string') {
    // Parse string into paragraphs
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    return (
      <>
        {paragraphs.map((para, idx) => (
          <p key={idx} className="mb-4 text-lg leading-relaxed">
            {para}
          </p>
        ))}
      </>
    );
  }

  // Render structured content
  return (
    <>
      {content.paragraphs?.map((para, idx) => (
        <p key={idx} className="mb-4 text-lg leading-relaxed">
          {para}
        </p>
      ))}
      {content.bullets && (
        <ul className="list-disc list-inside space-y-2 mb-4 text-lg">
          {content.bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      )}
    </>
  );
};

const NarrativeSection: React.FC<NarrativeSectionProps> = ({
  title,
  content,
  visualIdentity,
}) => {
  return (
    <motion.section
      className="py-16 md:py-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2
          className="text-3xl md:text-4xl font-black mb-6 text-gray-900 dark:text-white"
          style={
            visualIdentity?.primaryColor
              ? { color: visualIdentity.primaryColor }
              : undefined
          }
        >
          {title}
        </h2>
        <div className="text-gray-700 dark:text-gray-300">
          {renderContent(content)}
        </div>
      </div>
    </motion.section>
  );
};

export default NarrativeSection;
export type { NarrativeSectionProps };
