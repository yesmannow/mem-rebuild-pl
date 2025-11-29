/**
 * LinkedinIcon
 * Generated icon component from linkedin.svg
 * Matches design system: 2px stroke, currentColor theming
 */

import React from 'react';

export interface LinkedinIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export const LinkedinIcon: React.FC<LinkedinIconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = !ariaLabel,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaLabel ? 'img' : 'presentation'}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
  <rect width="4" height="12" x="2" y="9" />
  <circle cx="4" cy="4" r="2" />
    </svg>
  );
};

export default LinkedinIcon;
