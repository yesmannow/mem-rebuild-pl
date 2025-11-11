import React from 'react';
import { icons, IconDef } from '../data/icons';

export interface IconProps {
  slug: string;
  className?: string;
  title?: string;
}

const Icon: React.FC<IconProps> = ({ slug, className = '', title }) => {
  const iconData: IconDef | undefined = icons[slug];

  // Fallback icon (question mark) if slug not found
  const fallbackPath =
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z';

  const path = iconData?.path || fallbackPath;
  const iconTitle = title || iconData?.title || `Icon: ${slug}`;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-labelledby={`icon-${slug}-title`}
    >
      <title id={`icon-${slug}-title`}>{iconTitle}</title>
      <path d={path} />
    </svg>
  );
};

export default Icon;
