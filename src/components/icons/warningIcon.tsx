/**
 * WarningIcon
 * Generated icon component from warning.svg
 * Matches design system: 2px stroke, currentColor theming
 */

import React from 'react';

export interface WarningIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export const WarningIcon: React.FC<WarningIconProps> = ({
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
  <path d="M12 9v4" />
  <path d="M12 17h.01" />
    </svg>
  );
};

export default WarningIcon;
