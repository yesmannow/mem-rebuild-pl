import type { LucideIcon } from 'lucide-react';
import {
  Briefcase,
  Rocket,
  FlaskConical,
  Palette,
  User,
  Mail,
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
    name: 'Ventures',
    path: '/side-projects',
    icon: Rocket,
    description: 'Independent experiments and creative labs',
  },
  {
    name: 'The Lab',
    path: '/apps',
    icon: FlaskConical,
    description: 'Automation tools, telemetry, and command center',
  },
  {
    name: 'Studio',
    path: '/studio',
    icon: Palette,
    description: 'Creative direction, brand, and visual systems',
  },
  {
    name: 'Bio',
    path: '/about',
    icon: User,
    description: 'Professional background and systems architect story',
  },
  {
    name: 'Contact',
    path: '/contact',
    icon: Mail,
    description: 'Get in touch for opportunities and collaborations',
  },
];
