/**
 * Industries Data
 * 
 * Industry-specific data for law firm "microsites".
 * Based on competitive research and 2025 corporate legal trends.
 */

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  keyContact: string; // Attorney ID
  headline: string;
  expertise: string[];
  relatedPracticeAreas: string[];
  image?: string;
}

export const industries: Industry[] = [
  {
    id: 'construction',
    name: 'Construction',
    slug: 'construction',
    headline: 'Building Success on Every Project',
    description: 'Our Construction practice represents owners, developers, general contractors, subcontractors, and design professionals in all aspects of construction law. From project formation through completion and dispute resolution, we provide comprehensive legal counsel that keeps projects on track and budgets intact. Our attorneys have extensive experience with public and private projects, including design-build, construction management, and traditional design-bid-build delivery methods.',
    keyContact: 'attorney-1', // Sarah M. Thompson
    expertise: [
      'Construction contract drafting and negotiation',
      'Construction defect litigation and defense',
      'Delay and disruption claims',
      'Mechanic\'s liens and bond claims',
      'Public-private partnerships (P3)',
      'Payment and performance bond disputes',
      'Design professional liability',
      'Environmental compliance and remediation',
      'OSHA compliance and safety matters',
      'Surety law and bond claims',
    ],
    relatedPracticeAreas: [
      'Construction Law',
      'Litigation',
      'Public-Private Partnerships',
      'Environmental',
    ],
    image: '/images/industries/construction.jpg',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    slug: 'healthcare',
    headline: 'Navigating the Complexities of Modern Healthcare',
    description: 'Our Healthcare practice serves hospitals, health systems, physician groups, long-term care facilities, and life sciences companies. We understand the regulatory complexity and business challenges facing healthcare providers in today\'s environment. Our team provides strategic counsel on compliance, transactions, litigation, and governance matters, allowing our clients to focus on delivering quality patient care.',
    keyContact: 'attorney-3', // Jennifer L. Rodriguez
    expertise: [
      'Healthcare regulatory compliance and counseling',
      'Fraud and abuse (Stark, Anti-Kickback)',
      'Hospital and physician joint ventures',
      'Health system mergers and affiliations',
      'ACO formation and operation',
      'Medicare and Medicaid reimbursement',
      'Medical staff credentialing and peer review',
      'HIPAA privacy and security compliance',
      'FDA regulatory matters and device approval',
      'Telehealth and digital health counseling',
      'Certificate of Need (CON) applications',
    ],
    relatedPracticeAreas: [
      'Healthcare',
      'Regulatory',
      'Corporate',
      'Litigation',
    ],
    image: '/images/industries/healthcare.jpg',
  },
  {
    id: 'insurance',
    name: 'Insurance',
    slug: 'insurance',
    headline: 'Comprehensive Coverage Counsel',
    description: 'Our Insurance practice represents carriers, reinsurers, and insureds in coverage disputes, bad faith litigation, and regulatory matters. We have deep experience across all lines of coverage, including professional liability, D&O, E&O, general liability, and excess insurance. Our attorneys understand the insurance industry\'s unique challenges and provide practical, business-oriented advice.',
    keyContact: 'attorney-4', // David R. Williams
    expertise: [
      'Coverage analysis and opinions',
      'Bad faith litigation defense',
      'Declaratory judgment actions',
      'Excess and umbrella coverage disputes',
      'Professional liability defense (E&O, D&O)',
      'Subrogation and recovery',
      'Insurance regulatory compliance',
      'Reinsurance disputes',
      'Environmental and toxic tort coverage',
      'Cyber insurance coverage',
    ],
    relatedPracticeAreas: [
      'Insurance Defense',
      'Litigation',
      'Regulatory',
    ],
    image: '/images/industries/insurance.jpg',
  },
  {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    headline: 'Innovation Meets Legal Excellence',
    description: 'Our Technology practice serves software companies, SaaS providers, hardware manufacturers, and technology startups. We provide comprehensive legal counsel from formation through exit, including venture capital financing, M&A, intellectual property protection, commercial contracts, and litigation. Our attorneys understand the technology industry\'s fast-paced environment and deliver practical, business-focused advice.',
    keyContact: 'attorney-2', // Michael J. Chen
    expertise: [
      'Venture capital and growth equity financing',
      'M&A and strategic transactions',
      'Patent prosecution and portfolio development',
      'Trademark registration and enforcement',
      'Open source licensing and compliance',
      'SaaS and software licensing agreements',
      'Data privacy and security (GDPR, CCPA)',
      'Trade secret protection',
      'IP litigation and licensing disputes',
      'Employment agreements and equity compensation',
    ],
    relatedPracticeAreas: [
      'Corporate',
      'Intellectual Property',
      'Mergers & Acquisitions',
      'Technology',
    ],
    image: '/images/industries/technology.jpg',
  },
  {
    id: 'financial-services',
    name: 'Financial Services',
    slug: 'financial-services',
    headline: 'Trusted Counsel for Financial Institutions',
    description: 'Our Financial Services practice represents banks, credit unions, investment advisers, broker-dealers, and fintech companies. We provide regulatory counsel, transactional support, and litigation defense across the full spectrum of financial services matters. Our team stays current on evolving regulations and helps clients navigate compliance challenges while pursuing business opportunities.',
    keyContact: 'attorney-9', // Patricia A. Johnson
    expertise: [
      'Bank regulatory compliance (OCC, FDIC, Fed)',
      'Bank M&A and capital raising',
      'Investment adviser registration and compliance',
      'Broker-dealer regulatory matters (FINRA)',
      'Consumer financial services compliance',
      'Fintech partnerships and licensing',
      'BSA/AML compliance programs',
      'Securities litigation and enforcement',
      'Lending and credit agreements',
      'Payment systems and electronic banking',
    ],
    relatedPracticeAreas: [
      'Corporate',
      'Regulatory',
      'Financial Services',
      'Litigation',
    ],
    image: '/images/industries/financial-services.jpg',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    slug: 'manufacturing',
    headline: 'Supporting American Manufacturing',
    description: 'Our Manufacturing practice serves companies across the manufacturing spectrum, from automotive suppliers to consumer goods manufacturers. We understand the unique legal challenges facing manufacturers, including supply chain issues, product liability, environmental compliance, labor relations, and international trade. Our attorneys provide practical counsel that supports business objectives.',
    keyContact: 'attorney-6', // Robert T. Anderson
    expertise: [
      'Product liability litigation and defense',
      'Supply chain contracts and disputes',
      'Environmental compliance and permitting',
      'Labor relations and union matters',
      'OSHA compliance and workplace safety',
      'Intellectual property protection',
      'International trade and tariff matters',
      'Commercial litigation and arbitration',
      'M&A and corporate transactions',
      'Employment counseling and litigation',
    ],
    relatedPracticeAreas: [
      'Labor & Employment',
      'Litigation',
      'Environmental',
      'Corporate',
    ],
    image: '/images/industries/manufacturing.jpg',
  },
];

/**
 * Get industry by slug
 */
export const getIndustryBySlug = (slug: string): Industry | undefined => {
  return industries.find(industry => industry.slug === slug);
};

/**
 * Get industry by ID
 */
export const getIndustryById = (id: string): Industry | undefined => {
  return industries.find(industry => industry.id === id);
};

/**
 * Get all industry names
 */
export const getIndustryNames = (): string[] => {
  return industries.map(industry => industry.name).sort();
};

/**
 * Get all industry slugs
 */
export const getIndustrySlugs = (): string[] => {
  return industries.map(industry => industry.slug).sort();
};
