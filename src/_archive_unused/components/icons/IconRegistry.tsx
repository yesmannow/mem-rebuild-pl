/**
 * Icon Registry
 * Auto-generated registry of all icon components
 * Updated: 2025-11-24T07:09:23.979Z
 */

import React from 'react';

import { AboutIcon } from './aboutIcon';
import { AwardsIcon } from './awardsIcon';
import { CloseIcon } from './closeIcon';
import { DownloadIcon } from './downloadIcon';
import { EmailIcon } from './emailIcon';
import { ErrorIcon } from './errorIcon';
import { GithubIcon } from './githubIcon';
import { LinkedinIcon } from './linkedinIcon';
import { MenuIcon } from './menuIcon';
import { PdfIcon } from './pdfIcon';
import { ProjectsIcon } from './projectsIcon';
import { SkillsIcon } from './skillsIcon';
import { SuccessIcon } from './successIcon';
import { ToolsIcon } from './toolsIcon';
import { TwitterIcon } from './twitterIcon';
import { WarningIcon } from './warningIcon';
import { XIcon } from './xIcon';

export const IconRegistry: Record<string, React.ComponentType<any>> = {
  'about': AboutIcon,
  'awards': AwardsIcon,
  'close': CloseIcon,
  'download': DownloadIcon,
  'email': EmailIcon,
  'error': ErrorIcon,
  'github': GithubIcon,
  'linkedin': LinkedinIcon,
  'menu': MenuIcon,
  'pdf': PdfIcon,
  'projects': ProjectsIcon,
  'skills': SkillsIcon,
  'success': SuccessIcon,
  'tools': ToolsIcon,
  'twitter': TwitterIcon,
  'warning': WarningIcon,
  'x': XIcon,
};

/**
 * Get icon component by name
 */
export function getIcon(name: string): React.ComponentType<any> | null {
  return IconRegistry[name] || null;
}

/**
 * List all available icons
 */
export function listIcons(): string[] {
  return Object.keys(IconRegistry);
}
