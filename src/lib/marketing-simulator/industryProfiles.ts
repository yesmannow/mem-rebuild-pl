import { Industry, CompanySize } from './types';

export interface IndustryProfile {
  name: string;
  baseConversionRate: number;
  avgDealSize: Record<CompanySize, number>;
  salesCycleMonths: number;
  trustBarrier: number;
  regulatoryComplexity: number;
  competitorIntensity: number;
  characteristics: string[];
  keyChannels: string[];
}

export const INDUSTRY_PROFILES: Record<Industry, IndustryProfile> = {
  healthcare: {
    name: 'Healthcare',
    baseConversionRate: 0.02,
    avgDealSize: { startup: 1200, smb: 3500, enterprise: 15000 },
    salesCycleMonths: 6,
    trustBarrier: 0.9,
    regulatoryComplexity: 0.95,
    competitorIntensity: 0.7,
    characteristics: [
      'HIPAA compliance required',
      'High trust barrier',
      'Long sales cycles',
      'Referral-driven',
      'Patient education critical',
    ],
    keyChannels: ['Content Marketing', 'SEO', 'Physician Referrals', 'Local Events'],
  },
  
  legal: {
    name: 'Legal Services',
    baseConversionRate: 0.015,
    avgDealSize: { startup: 2500, smb: 7500, enterprise: 50000 },
    salesCycleMonths: 8,
    trustBarrier: 0.95,
    regulatoryComplexity: 0.85,
    competitorIntensity: 0.75,
    characteristics: [
      'Extremely high trust requirement',
      'Referral-based growth',
      'Professional networking critical',
      'Content authority essential',
      'Reputation-sensitive',
    ],
    keyChannels: ['Referral Programs', 'Content Authority', 'LinkedIn', 'Industry Events'],
  },
  
  ecommerce: {
    name: 'E-commerce',
    baseConversionRate: 0.04,
    avgDealSize: { startup: 85, smb: 150, enterprise: 250 },
    salesCycleMonths: 0.25,
    trustBarrier: 0.4,
    regulatoryComplexity: 0.6,
    competitorIntensity: 0.95,
    characteristics: [
      'Fast purchase cycles',
      'High competition',
      'Data-driven optimization',
      'Seasonal fluctuations',
      'Paid ads heavy',
    ],
    keyChannels: ['Google Ads', 'Facebook Ads', 'Influencer Marketing', 'Email Campaigns'],
  },
  
  saas: {
    name: 'SaaS',
    baseConversionRate: 0.03,
    avgDealSize: { startup: 500, smb: 2500, enterprise: 25000 },
    salesCycleMonths: 3,
    trustBarrier: 0.6,
    regulatoryComplexity: 0.5,
    competitorIntensity: 0.9,
    characteristics: [
      'Freemium model effectiveness',
      'Product-led growth',
      'Retention critical',
      'Demo-driven conversions',
      'Community building important',
    ],
    keyChannels: ['Content Marketing', 'Product-Led Growth', 'LinkedIn Ads', 'Webinars'],
  },
  
  manufacturing: {
    name: 'Manufacturing',
    baseConversionRate: 0.01,
    avgDealSize: { startup: 15000, smb: 75000, enterprise: 500000 },
    salesCycleMonths: 12,
    trustBarrier: 0.85,
    regulatoryComplexity: 0.75,
    competitorIntensity: 0.6,
    characteristics: [
      'Relationship-based sales',
      'Long contract negotiations',
      'Technical credibility required',
      'Trade show presence',
      'Account-based marketing',
    ],
    keyChannels: ['Trade Shows', 'Direct Sales', 'Industry Partnerships', 'Technical Content'],
  },
};

export const getIndustryMultiplier = (industry: Industry, tacticCategory: string): number => {
  const multipliers: Record<Industry, Record<string, number>> = {
    healthcare: {
      'seo': 1.4,
      'content': 1.5,
      'paid-ads': 0.7,
      'social': 0.8,
      'events': 1.2,
      'pr': 1.3,
      'email': 1.1,
      'partnerships': 1.4,
    },
    legal: {
      'seo': 1.3,
      'content': 1.6,
      'paid-ads': 0.6,
      'social': 0.9,
      'events': 1.5,
      'pr': 1.4,
      'email': 1.0,
      'partnerships': 1.6,
    },
    ecommerce: {
      'seo': 1.2,
      'content': 1.0,
      'paid-ads': 1.8,
      'social': 1.6,
      'events': 0.5,
      'pr': 0.8,
      'email': 1.4,
      'partnerships': 1.1,
    },
    saas: {
      'seo': 1.3,
      'content': 1.5,
      'paid-ads': 1.4,
      'social': 1.2,
      'events': 1.1,
      'pr': 1.2,
      'email': 1.3,
      'partnerships': 1.3,
    },
    manufacturing: {
      'seo': 0.9,
      'content': 1.2,
      'paid-ads': 0.7,
      'social': 0.7,
      'events': 1.8,
      'pr': 1.3,
      'email': 0.9,
      'partnerships': 1.7,
    },
  };
  
  return multipliers[industry]?.[tacticCategory] || 1.0;
};

export const getSizeMultiplier = (size: CompanySize, tacticCategory: string): number => {
  const multipliers: Record<CompanySize, Record<string, number>> = {
    startup: {
      'seo': 1.2,
      'content': 1.3,
      'paid-ads': 0.8,
      'social': 1.4,
      'events': 0.7,
      'pr': 1.1,
      'email': 1.2,
      'partnerships': 1.0,
    },
    smb: {
      'seo': 1.1,
      'content': 1.1,
      'paid-ads': 1.0,
      'social': 1.1,
      'events': 1.0,
      'pr': 1.0,
      'email': 1.1,
      'partnerships': 1.1,
    },
    enterprise: {
      'seo': 0.9,
      'content': 0.9,
      'paid-ads': 1.3,
      'social': 0.9,
      'events': 1.4,
      'pr': 1.3,
      'email': 1.0,
      'partnerships': 1.2,
    },
  };
  
  return multipliers[size]?.[tacticCategory] || 1.0;
};
