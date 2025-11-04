import React from 'react';
import { icons, IconData } from '../../data/icons';

export interface IconProps {
  slug: string;
  size?: number;
  color?: string;
  className?: string;
  title?: string;
}

const Icon: React.FC<IconProps> = ({
  slug,
  size = 24,
  color = 'currentColor',
  className = '',
  title
}) => {
  const iconData: IconData | undefined = icons[slug];

  if (!iconData) {
    console.warn(`Icon with slug "${slug}" not found in icons registry`);
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-labelledby={title ? `${slug}-title` : undefined}
      aria-label={title || iconData.title}
    >
      {title && <title id={`${slug}-title`}>{title}</title>}
      <path d={iconData.path} />
    </svg>
  );
};

export default Icon;