import type { LucideIcon } from 'lucide-react';
import { Briefcase, FlaskConical, Home, Mail, Palette, User, Wrench } from 'lucide-react';

export const productMakerIcons = {
  home: Home,
  projects: Briefcase,
  lab: FlaskConical,
  studio: Palette,
  bio: User,
  contact: Mail,
  toolbox: Wrench,
} satisfies Record<string, LucideIcon>;

export type ProductMakerIconKey = keyof typeof productMakerIcons;

export const getProductMakerIcon = (key: ProductMakerIconKey): LucideIcon => productMakerIcons[key];
