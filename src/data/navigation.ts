import type { LucideIcon } from 'lucide-react';
import {
  Briefcase,
  Sparkles,
  FlaskConical,
  Wrench,
  Palette,
  Terminal,
  User,
} from 'lucide-react';

export interface MainNavigationLink {
  name: string;
  path: string;
  description: string;
  icon: LucideIcon;
}

export const mainNavigationLinks: MainNavigationLink[] = [
  {
    name: 'Projects',
    path: '/case-studies',
    icon: Briefcase,
    description: 'Systems-focused case studies and operational wins',
  },
  {
    name: 'Side Projects',
    path: '/side-projects',
    icon: Sparkles,
    description: 'Independent experiments and creative labs',
  },
  {
    name: 'The Lab',
    path: '/apps',
    icon: FlaskConical,
    description: 'Automation tools and internal applications',
  },
  {
    name: 'Toolbox',
    path: '/toolbox',
    icon: Wrench,
    description: 'Technical frameworks, automations, and utilities',
  },
  {
    name: 'Studio',
    path: '/studio',
    icon: Palette,
    description: 'Creative direction, brand, and visual systems',
  },
  {
    name: 'War Room',
    path: '/war-room',
    icon: Terminal,
    description: 'Live DevOps command center with streaming telemetry',
  },
  {
    name: 'Bio',
    path: '/about',
    icon: User,
    description: 'Professional background and systems architect story',
  },
];
