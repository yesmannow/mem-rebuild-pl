export interface SideProject {
  id: string;
  title: string;
  category: string; // "Branding" | "Web" | "Strategy" | "Product"
  tags: string[];
  description: string; // Short summary for card
  image: string;
  year: string;
  challenge: string;
  solution: string;
  impact: string[];
  stack?: string[];
}

export type { PhotoItem } from './utils/loadPhotography';

export interface Metric {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  techStack: string[];
  highlight?: string;
}

export interface VolunteerItem {
  role: string;
  organization: string;
  period: string;
  description?: string;
}

export interface EducationItem {
  school: string;
  degree: string;
  year: string;
  honors?: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  items: string[];
  accent?: 'teal' | 'orange' | 'blue';
}

export interface LabItem {
  id: string;
  title: string;
  type: 'app' | 'tool'; // 'app' = Client Facing, 'tool' = Internal Engineering
  category: string;
  tagline: string;
  techStack: Array<{ name: string; reason: string }>; // Architectural rationale per tool
  context: {
    problem: string;   // The Strategic Challenge
    solution: string;  // The Technical Architecture
    impact: string;    // The ROI / Outcome
    target: string;    // Target Audience
    usage: string;     // Operational Context
  };
  link?: string;       // For Apps
  command?: string;    // For Tools
}
