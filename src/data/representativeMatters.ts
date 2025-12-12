/**
 * Representative Matters Data
 * 
 * Sample data for law firm "proof" through wins for Fortune 100 corporate clients.
 * Based on competitive research from Barnes & Thornburg, Lewis Wagner, 
 * and Due Doyle Fanning & Alderfer.
 */

export interface RepresentativeMatter {
  id: string;
  title: string;
  result: string;
  industry: string;
  category: string;
  description: string;
  client?: string; // Optional - can be "Confidential Client" for privacy
  year?: number;
  tags?: string[];
}

export const representativeMatters: RepresentativeMatter[] = [
  // Construction Matters
  {
    id: 'construction-1',
    title: 'Multi-Million Dollar Construction Defect Defense',
    result: 'Successfully defended Fortune 500 general contractor against $15M construction defect claims, achieving dismissal of all claims with prejudice',
    industry: 'Construction',
    category: 'Construction',
    description: 'Defended major general contractor in complex multi-party construction defect litigation involving commercial development. Secured complete dismissal through strategic motion practice and expert witness coordination.',
    client: 'Fortune 500 General Contractor',
    year: 2024,
    tags: ['Construction Defect', 'Litigation', 'Fortune 500'],
  },
  {
    id: 'construction-2',
    title: 'Public-Private Partnership Infrastructure Project',
    result: 'Negotiated and closed $250M P3 deal for municipal infrastructure modernization',
    industry: 'Construction',
    category: 'Construction',
    description: 'Represented municipality in structuring and negotiating comprehensive public-private partnership for water treatment facility modernization. Achieved favorable financing terms and risk allocation.',
    client: 'Major Midwest Municipality',
    year: 2023,
    tags: ['P3', 'Infrastructure', 'Municipal'],
  },
  {
    id: 'construction-3',
    title: 'Environmental Remediation and Regulatory Compliance',
    result: 'Secured EPA approval for innovative remediation plan, saving client $12M in projected costs',
    industry: 'Construction',
    category: 'Construction',
    description: 'Advised industrial client on environmental compliance and remediation strategy for contaminated brownfield site. Negotiated consent decree with EPA and state regulators.',
    client: 'Industrial Developer',
    year: 2024,
    tags: ['Environmental', 'Regulatory', 'EPA'],
  },

  // Litigation Matters
  {
    id: 'litigation-1',
    title: 'Trade Secret Misappropriation Defense',
    result: 'Defeated $50M trade secret claim through summary judgment; plaintiff ordered to pay defendant\'s attorney fees',
    industry: 'Technology',
    category: 'Litigation',
    description: 'Defended technology company against allegations of trade secret theft by former business partner. Demonstrated through discovery that plaintiff\'s alleged secrets were publicly available information.',
    client: 'Technology Startup',
    year: 2024,
    tags: ['Trade Secrets', 'IP Litigation', 'Summary Judgment'],
  },
  {
    id: 'litigation-2',
    title: 'Class Action Employment Defense',
    result: 'Achieved class decertification and favorable settlement for less than 5% of claimed damages',
    industry: 'Healthcare',
    category: 'Litigation',
    description: 'Represented healthcare provider in wage-and-hour class action involving 2,000+ employees. Successfully decertified class through targeted discovery and expert testimony.',
    client: 'Regional Healthcare System',
    year: 2023,
    tags: ['Class Action', 'Employment', 'Healthcare'],
  },
  {
    id: 'litigation-3',
    title: 'Breach of Contract and Business Tort Claims',
    result: 'Secured $8.5M jury verdict for client in business dispute',
    industry: 'Manufacturing',
    category: 'Litigation',
    description: 'Represented manufacturer in complex commercial litigation involving breach of exclusive distribution agreement. Achieved favorable jury verdict including punitive damages.',
    client: 'Manufacturing Client',
    year: 2024,
    tags: ['Commercial Litigation', 'Jury Trial', 'Damages'],
  },

  // Corporate/Transactional Matters
  {
    id: 'corporate-1',
    title: 'Fortune 100 Merger & Acquisition',
    result: 'Closed $500M acquisition with favorable tax treatment and regulatory approvals in record time',
    industry: 'Financial Services',
    category: 'Corporate',
    description: 'Served as lead counsel for Fortune 100 financial services company in strategic acquisition of regional competitor. Coordinated regulatory filings, due diligence, and integration planning.',
    client: 'Confidential Financial Services Client',
    year: 2024,
    tags: ['M&A', 'Fortune 100', 'Financial Services'],
  },
  {
    id: 'corporate-2',
    title: 'Private Equity Platform Investment',
    result: 'Structured and closed $150M platform investment with management rollover',
    industry: 'Healthcare',
    category: 'Corporate',
    description: 'Represented private equity fund in platform acquisition of healthcare services provider. Negotiated management incentive equity and favorable governance terms.',
    client: 'Private Equity Fund',
    year: 2023,
    tags: ['Private Equity', 'Healthcare', 'Platform'],
  },
  {
    id: 'corporate-3',
    title: 'Series B Venture Capital Financing',
    result: 'Closed $75M Series B round with unicorn valuation for SaaS client',
    industry: 'Technology',
    category: 'Corporate',
    description: 'Represented high-growth SaaS company in oversubscribed Series B financing round. Negotiated favorable valuation and governance terms with multiple institutional investors.',
    client: 'SaaS Technology Company',
    year: 2024,
    tags: ['Venture Capital', 'SaaS', 'Technology'],
  },

  // Healthcare/Life Sciences Matters
  {
    id: 'healthcare-1',
    title: 'FDA Approval and Regulatory Strategy',
    result: 'Secured FDA 510(k) clearance for novel medical device in 4 months',
    industry: 'Healthcare',
    category: 'Healthcare',
    description: 'Advised medical device manufacturer on FDA regulatory pathway and submission strategy. Achieved rapid clearance through predicate device analysis and clinical data presentation.',
    client: 'Medical Device Manufacturer',
    year: 2024,
    tags: ['FDA', 'Medical Device', 'Regulatory'],
  },
  {
    id: 'healthcare-2',
    title: 'Health System Affiliation and Joint Venture',
    result: 'Structured tax-exempt joint venture between competing health systems, creating regional care network',
    industry: 'Healthcare',
    category: 'Healthcare',
    description: 'Represented academic medical center in forming clinical affiliation and joint venture with community hospital system. Navigated CON requirements and antitrust review.',
    client: 'Academic Medical Center',
    year: 2023,
    tags: ['Joint Venture', 'Tax-Exempt', 'Healthcare'],
  },

  // Insurance Matters
  {
    id: 'insurance-1',
    title: 'Bad Faith Insurance Litigation Defense',
    result: 'Achieved complete defense verdict in $25M bad faith case after 3-week trial',
    industry: 'Insurance',
    category: 'Insurance',
    description: 'Defended national insurance carrier against allegations of bad faith claims handling. Demonstrated reasonable investigation and claims handling practices through detailed claims file analysis.',
    client: 'National Insurance Carrier',
    year: 2024,
    tags: ['Bad Faith', 'Insurance Defense', 'Trial'],
  },
  {
    id: 'insurance-2',
    title: 'Coverage Opinion and Declaratory Judgment',
    result: 'Obtained declaratory judgment establishing no coverage for underlying $100M environmental claim',
    industry: 'Insurance',
    category: 'Insurance',
    description: 'Represented excess insurers in coverage dispute involving long-tail environmental contamination. Established policy exclusions applied through summary judgment.',
    client: 'Excess Insurance Carriers',
    year: 2023,
    tags: ['Coverage', 'Environmental', 'Declaratory Judgment'],
  },

  // Intellectual Property Matters
  {
    id: 'ip-1',
    title: 'Patent Portfolio Development and Licensing',
    result: 'Built 50-patent portfolio and negotiated $20M licensing deal with Fortune 500 manufacturer',
    industry: 'Technology',
    category: 'Intellectual Property',
    description: 'Developed comprehensive patent strategy for technology innovator, securing key patents and negotiating favorable licensing terms with industry leader.',
    client: 'Technology Innovator',
    year: 2024,
    tags: ['Patents', 'Licensing', 'IP Strategy'],
  },
  {
    id: 'ip-2',
    title: 'Trademark Enforcement and Brand Protection',
    result: 'Stopped counterfeit goods operation and secured $5M in damages and injunctive relief',
    industry: 'Consumer Goods',
    category: 'Intellectual Property',
    description: 'Represented consumer brand in trademark infringement action against counterfeit goods distributor. Obtained preliminary injunction and favorable settlement.',
    client: 'Consumer Brand',
    year: 2023,
    tags: ['Trademark', 'Counterfeiting', 'Injunction'],
  },

  // Labor & Employment Matters
  {
    id: 'employment-1',
    title: 'Executive Compensation and Equity Plan Design',
    result: 'Designed tax-advantaged executive compensation program with performance-based equity incentives',
    industry: 'Technology',
    category: 'Employment',
    description: 'Advised publicly-traded technology company on executive compensation strategy, including performance stock units, deferred compensation, and change-in-control provisions.',
    client: 'Public Technology Company',
    year: 2024,
    tags: ['Executive Compensation', 'Equity', 'Tax'],
  },
  {
    id: 'employment-2',
    title: 'Union Organizing Campaign Defense',
    result: 'Successfully defended against union organizing efforts at three facilities',
    industry: 'Manufacturing',
    category: 'Employment',
    description: 'Advised manufacturer on NLRB compliance during union organizing campaigns. Conducted legal training for management and developed employee communication strategy.',
    client: 'Manufacturing Company',
    year: 2023,
    tags: ['Labor Relations', 'Union', 'NLRB'],
  },
];

/**
 * Get all unique categories from representative matters
 */
export const getCategories = (): string[] => {
  const categories = new Set<string>();
  representativeMatters.forEach(matter => {
    categories.add(matter.category);
  });
  return ['All', ...Array.from(categories).sort()];
};

/**
 * Get all unique industries from representative matters
 */
export const getIndustries = (): string[] => {
  const industries = new Set<string>();
  representativeMatters.forEach(matter => {
    industries.add(matter.industry);
  });
  return Array.from(industries).sort();
};

/**
 * Filter representative matters by category
 */
export const filterByCategory = (category: string): RepresentativeMatter[] => {
  if (category === 'All') {
    return representativeMatters;
  }
  return representativeMatters.filter(matter => matter.category === category);
};

/**
 * Filter representative matters by industry
 */
export const filterByIndustry = (industry: string): RepresentativeMatter[] => {
  return representativeMatters.filter(matter => matter.industry === industry);
};
