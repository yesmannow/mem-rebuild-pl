/**
 * Standardized System Types
 * Central type definitions for Lab tools, AppShell, and system components
 */

import type { ReactNode } from 'react';

export type SystemStatus = 'OPTIMIZED' | 'STABLE' | 'BETA' | 'DEPLOYING' | 'OFFLINE';

export interface Tool {
  id: string;
  name: string;
  version: string;
  status: SystemStatus;
  icon: string | ReactNode;
  component: ReactNode;
  description?: string;
  category?: 'Analytics' | 'Branding' | 'Infrastructure' | 'Strategy' | 'Case Study';
  stats?: {
    label: string;
    value: string;
    trend: 'up' | 'down' | 'neutral';
  }[];
}
