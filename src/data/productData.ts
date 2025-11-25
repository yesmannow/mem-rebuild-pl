/**
 * Product Data for Smart Quoter
 * Extracted from legacy "Smart Sales & Pricing Tool.html"
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'training' | 'instruments' | 'bundles' | 'memberships';
  keywords: string;
  bestSeller?: boolean;
  financing?: boolean;
  pricing: {
    retail: number;
    corporate: number;
    student: number;
  };
  savings?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'essential-training',
    name: 'ESSENTIAL Training',
    description: '12 CEU\'s • Foundation level IASTM training',
    category: 'training',
    keywords: 'essential training ceu',
    bestSeller: true,
    pricing: { retail: 650, corporate: 550, student: 550 },
    savings: 'Save $100 vs List Price!',
  },
  {
    id: 'advanced-training',
    name: 'ADVANCED Training',
    description: '14 CEU\'s • Advanced IASTM techniques',
    category: 'training',
    keywords: 'advanced training ceu',
    bestSeller: true,
    pricing: { retail: 695, corporate: 595, student: 595 },
    savings: 'Save $100 vs List Price!',
  },
  {
    id: '6-piece-set',
    name: '6 PIECE Instrument Set',
    description: 'Complete professional Graston Technique® instrument set',
    category: 'instruments',
    keywords: 'instruments tools set 6 piece',
    bestSeller: true,
    financing: true,
    pricing: { retail: 2395, corporate: 2395, student: 1795 },
    savings: 'Students save $600!',
  },
  {
    id: 'upper-quadrant',
    name: 'UPPER QUADRANT Training',
    description: '4 CEU\'s • Specialized upper body IASTM techniques',
    category: 'training',
    keywords: 'upper quadrant training ceu',
    pricing: { retail: 399, corporate: 349, student: 349 },
  },
  {
    id: 'gts-exam',
    name: 'GTS Credential Exam',
    description: 'Credential valid for 2 years',
    category: 'training',
    keywords: 'gts credential exam certification',
    pricing: { retail: 99, corporate: 99, student: 99 },
  },
  {
    id: 'master-bundle',
    name: 'Master Practitioner Bundle (w/Instruments)',
    description: 'ESSENTIAL + ADVANCED + Upper Quad + GTS + Instruments + Case + Emollient + 2mo Premier',
    category: 'bundles',
    keywords: 'master practitioner bundle instruments training',
    bestSeller: true,
    financing: true,
    pricing: { retail: 3655, corporate: 3155, student: 3055 },
    savings: 'Save up to $1,243 vs individual items!',
  },
  {
    id: 'advanced-bundle',
    name: 'Advanced Practitioner Bundle (w/Instruments)',
    description: 'ADVANCED + Instruments + GTS + 2 month Premier',
    category: 'bundles',
    keywords: 'advanced practitioner bundle instruments training',
    financing: true,
    pricing: { retail: 3250, corporate: 2750, student: 2650 },
    savings: 'Save up to $1,189 vs individual items!',
  },
  {
    id: 'essential-bundle',
    name: 'Essential Practitioner Bundle (w/Instruments)',
    description: 'ESSENTIAL + Instruments + 2 month Premier',
    category: 'bundles',
    keywords: 'essential practitioner bundle instruments training',
    financing: true,
    pricing: { retail: 2890, corporate: 2390, student: 2290 },
  },
  {
    id: 'premier-membership',
    name: 'Premier Membership',
    description: 'Premier Listing + Premier Assets + CEU Unlimited + Exclusive Pricing (10% OFF EVERYTHING)',
    category: 'memberships',
    keywords: 'premier membership unlimited ceu',
    pricing: { retail: 299, corporate: 299, student: 299 },
  },
  {
    id: 'ceu-unlimited',
    name: 'CEU Unlimited Membership',
    description: 'Access UP TO 60 CEU Short Courses (ONLY) per year',
    category: 'memberships',
    keywords: 'ceu unlimited membership',
    pricing: { retail: 249, corporate: 249, student: 249 },
  },
];

export type CustomerType = 'retail' | 'corporate' | 'student';

