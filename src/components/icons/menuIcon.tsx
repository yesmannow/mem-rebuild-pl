/**
 * MenuIcon
 * Generated icon component from menu.svg
 * Matches design system: 2px stroke, currentColor theming
 */

import React from 'react';

export interface MenuIconProps {
  className?: string;
  size?: number | string;
  color?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export const MenuIcon: React.FC<MenuIconProps> = ({
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
      <path d="M4 5h16" />
  <path d="M4 12h16" />
  <path d="M4 19h16" />
    </svg>
  );
};

export default MenuIcon;
