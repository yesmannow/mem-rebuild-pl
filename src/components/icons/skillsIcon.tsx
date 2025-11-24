/**
 * SkillsIcon
 * Generated icon component from skills.svg
 * Matches design system: 2px stroke, currentColor theming
 */

import React from 'react';

export interface SkillsIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export const SkillsIcon: React.FC<SkillsIconProps> = ({
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
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaLabel ? 'img' : 'presentation'}
    >
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
  <circle cx="12" cy="8" r="6" />
    </svg>
  );
};

export default SkillsIcon;
