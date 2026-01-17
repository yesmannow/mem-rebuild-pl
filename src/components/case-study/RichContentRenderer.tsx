import React from 'react';
import { RichSection } from '../../data/caseStudies';

interface RichContentRendererProps {
  content?: string | RichSection;
  className?: string;
}

/**
 * RichContentRenderer
 * Renders case study content that can be either a string or RichSection object
 */
export const RichContentRenderer: React.FC<RichContentRendererProps> = ({
  content,
  className = '',
}) => {
  if (!content) {
    return null;
  }

  // If content is a RichSection object
  if (typeof content === 'object' && ('paragraphs' in content || 'bullets' in content)) {
    return (
      <div className={`rich-content ${className}`}>
        {content.paragraphs && content.paragraphs.length > 0 && (
          <div className="space-y-4 mb-6">
            {content.paragraphs.map((paragraph, idx) => (
              <p
                key={`p-${idx}`}
                className="text-brand-text leading-relaxed text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
        {content.bullets && content.bullets.length > 0 && (
          <ul className="space-y-3 list-none">
            {content.bullets.map((bullet, idx) => (
              <li
                key={`bullet-${idx}`}
                className="flex items-start gap-3 text-brand-text leading-relaxed"
              >
                <span className="text-brand-turquoise mt-1.5 flex-shrink-0">▸</span>
                <span className="text-lg">{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // If content is a string, render as paragraph
  if (typeof content === 'string') {
    return (
      <div className={`rich-content ${className}`}>
        <p className="text-brand-text leading-relaxed text-lg">{content}</p>
      </div>
    );
  }

  return null;
};

export default RichContentRenderer;
