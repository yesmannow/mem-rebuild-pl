/**
 * Pricing Data for Growth Engine Suite
 * Extracted from legacy "Smart Sales & Pricing Tool.html"
 */

export interface BundleData {
  name: string;
  features: string[];
  regularPrice: number;
  salePrice: number;
}

export interface PricingBundle {
  [key: string]: BundleData;
}

export const PRICING_DATA: PricingBundle = {
  '2890': {
    name: 'Essential Practitioner Bundle',
    features: ['Essential Training', '6-Piece Instrument Set'],
    regularPrice: 3045,
    salePrice: 2890,
  },
  '3250': {
    name: 'Advanced Practitioner Bundle',
    features: [
      'Essential Training',
      'Advanced Training',
      '6-Piece Instrument Set',
      'GT Specialist Exam Access',
    ],
    regularPrice: 3639,
    salePrice: 3250,
  },
  '3655': {
    name: 'Master Practitioner Bundle',
    features: [
      'Essential Training',
      'Advanced Training',
      '6-Piece Instrument Set',
      'Upper Quadrant Course',
      'GT Specialist Exam Access',
    ],
    regularPrice: 4290,
    salePrice: 3655,
  },
  '650': {
    name: 'Essential Training Only',
    features: ['Essential Training', 'Training Manual', '1oz Emollient Jar'],
    regularPrice: 650,
    salePrice: 650,
  },
  '1370': {
    name: 'Advanced Practitioner Bundle (No Instruments)',
    features: [
      'Essential Training',
      'Advanced Training',
      'Training Manual',
      '1oz Emollient Jar',
      'GT Specialist Exam Access',
    ],
    regularPrice: 1444,
    salePrice: 1370,
  },
  '1710': {
    name: 'Master Practitioner Bundle (No Instruments)',
    features: [
      'Essential Training',
      'Advanced Training',
      'Training Manual',
      '1oz Emollient Jar',
      'Upper Quadrant Course',
      'GT Specialist Exam Access',
    ],
    regularPrice: 1903,
    salePrice: 1710,
  },
};

