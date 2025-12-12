/**
 * Attorneys Data
 * 
 * Sample attorney profiles for law firm demonstration.
 * Based on competitive research from leading law firms.
 */

export interface Attorney {
  id: string;
  name: string;
  title: string;
  practiceAreas: string[];
  industries: string[];
  bio: string;
  email: string;
  phone: string;
  image?: string;
  education: string[];
  barAdmissions: string[];
  isPartner?: boolean;
  yearsOfExperience?: number;
}

export const attorneys: Attorney[] = [
  {
    id: 'attorney-1',
    name: 'Sarah M. Thompson',
    title: 'Partner',
    practiceAreas: ['Construction Law', 'Litigation'],
    industries: ['Construction', 'Real Estate', 'Infrastructure'],
    bio: 'Sarah Thompson is a Partner in the Construction and Real Estate practice groups. She represents owners, developers, and contractors in complex construction disputes and transactional matters. Sarah has over 20 years of experience handling construction defect litigation, delay claims, and mechanic\'s lien disputes.',
    email: 'sthompson@lawfirm.com',
    phone: '(555) 123-4567',
    education: ['J.D., Indiana University Maurer School of Law', 'B.S., Purdue University'],
    barAdmissions: ['Indiana', 'Illinois'],
    isPartner: true,
    yearsOfExperience: 22,
  },
  {
    id: 'attorney-2',
    name: 'Michael J. Chen',
    title: 'Partner',
    practiceAreas: ['Corporate', 'Mergers & Acquisitions'],
    industries: ['Financial Services', 'Technology', 'Healthcare'],
    bio: 'Michael Chen leads the firm\'s Corporate practice and has extensive experience representing public and private companies in M&A transactions, private equity investments, and corporate governance matters. He has closed over $5 billion in transactions during his career.',
    email: 'mchen@lawfirm.com',
    phone: '(555) 123-4568',
    education: ['J.D., University of Michigan Law School', 'B.A., Northwestern University'],
    barAdmissions: ['Indiana', 'New York'],
    isPartner: true,
    yearsOfExperience: 18,
  },
  {
    id: 'attorney-3',
    name: 'Jennifer L. Rodriguez',
    title: 'Partner',
    practiceAreas: ['Healthcare', 'Regulatory'],
    industries: ['Healthcare', 'Life Sciences'],
    bio: 'Jennifer Rodriguez focuses her practice on healthcare regulatory and transactional matters. She advises hospitals, health systems, and physician groups on compliance, joint ventures, affiliations, and fraud and abuse issues. Jennifer previously served as in-house counsel for a major health system.',
    email: 'jrodriguez@lawfirm.com',
    phone: '(555) 123-4569',
    education: ['J.D., Georgetown University Law Center', 'B.S., Duke University'],
    barAdmissions: ['Indiana', 'District of Columbia'],
    isPartner: true,
    yearsOfExperience: 16,
  },
  {
    id: 'attorney-4',
    name: 'David R. Williams',
    title: 'Partner',
    practiceAreas: ['Insurance Defense', 'Litigation'],
    industries: ['Insurance', 'Healthcare', 'Construction'],
    bio: 'David Williams represents insurance carriers and their insureds in complex coverage disputes and bad faith litigation. He has tried over 50 cases to verdict and handles matters involving professional liability, D&O, E&O, and general liability coverage.',
    email: 'dwilliams@lawfirm.com',
    phone: '(555) 123-4570',
    education: ['J.D., Notre Dame Law School', 'B.A., Indiana University'],
    barAdmissions: ['Indiana', 'Ohio'],
    isPartner: true,
    yearsOfExperience: 24,
  },
  {
    id: 'attorney-5',
    name: 'Emily K. Patel',
    title: 'Associate',
    practiceAreas: ['Intellectual Property', 'Technology'],
    industries: ['Technology', 'Manufacturing', 'Consumer Goods'],
    bio: 'Emily Patel assists clients with patent prosecution, trademark registration, and IP litigation. She has a technical background in computer science and advises technology companies on patent portfolio development and licensing strategies.',
    email: 'epatel@lawfirm.com',
    phone: '(555) 123-4571',
    education: ['J.D., Stanford Law School', 'B.S., Computer Science, MIT'],
    barAdmissions: ['Indiana', 'California'],
    isPartner: false,
    yearsOfExperience: 6,
  },
  {
    id: 'attorney-6',
    name: 'Robert T. Anderson',
    title: 'Partner',
    practiceAreas: ['Labor & Employment'],
    industries: ['Manufacturing', 'Healthcare', 'Technology'],
    bio: 'Robert Anderson represents employers in all aspects of labor and employment law, including union relations, discrimination claims, wage-and-hour disputes, and executive compensation. He regularly conducts workplace investigations and provides preventive counseling.',
    email: 'randerson@lawfirm.com',
    phone: '(555) 123-4572',
    education: ['J.D., University of Chicago Law School', 'B.A., University of Illinois'],
    barAdmissions: ['Indiana', 'Illinois'],
    isPartner: true,
    yearsOfExperience: 19,
  },
  {
    id: 'attorney-7',
    name: 'Lisa M. Foster',
    title: 'Partner',
    practiceAreas: ['Construction Law', 'Public-Private Partnerships'],
    industries: ['Construction', 'Infrastructure', 'Government'],
    bio: 'Lisa Foster specializes in public construction projects and P3 transactions. She represents municipalities, developers, and contractors in infrastructure projects, including roads, water systems, and public buildings. Lisa has experience with design-build and construction management delivery methods.',
    email: 'lfoster@lawfirm.com',
    phone: '(555) 123-4573',
    education: ['J.D., Indiana University Maurer School of Law', 'B.S., Rose-Hulman Institute of Technology'],
    barAdmissions: ['Indiana'],
    isPartner: true,
    yearsOfExperience: 15,
  },
  {
    id: 'attorney-8',
    name: 'James H. Martinez',
    title: 'Associate',
    practiceAreas: ['Healthcare', 'Litigation'],
    industries: ['Healthcare', 'Insurance'],
    bio: 'James Martinez represents healthcare providers in medical malpractice defense and regulatory enforcement matters. He also handles Medicare and Medicaid reimbursement disputes and fraud and abuse investigations.',
    email: 'jmartinez@lawfirm.com',
    phone: '(555) 123-4574',
    education: ['J.D., Northwestern Pritzker School of Law', 'B.A., University of Notre Dame'],
    barAdmissions: ['Indiana', 'Illinois'],
    isPartner: false,
    yearsOfExperience: 8,
  },
  {
    id: 'attorney-9',
    name: 'Patricia A. Johnson',
    title: 'Partner',
    practiceAreas: ['Corporate', 'Private Equity'],
    industries: ['Financial Services', 'Technology', 'Healthcare'],
    bio: 'Patricia Johnson represents private equity funds and portfolio companies in buyouts, growth equity investments, and exits. She has particular expertise in healthcare services, technology, and business services transactions.',
    email: 'pjohnson@lawfirm.com',
    phone: '(555) 123-4575',
    education: ['J.D., Harvard Law School', 'B.A., Yale University'],
    barAdmissions: ['Indiana', 'New York'],
    isPartner: true,
    yearsOfExperience: 21,
  },
  {
    id: 'attorney-10',
    name: 'Christopher D. Lee',
    title: 'Partner',
    practiceAreas: ['Litigation', 'Commercial Disputes'],
    industries: ['Manufacturing', 'Technology', 'Financial Services'],
    bio: 'Christopher Lee is a trial lawyer who handles complex commercial litigation, including breach of contract, business torts, and shareholder disputes. He has successfully tried cases in state and federal courts and has significant experience with alternative dispute resolution.',
    email: 'clee@lawfirm.com',
    phone: '(555) 123-4576',
    education: ['J.D., University of Virginia School of Law', 'B.A., Princeton University'],
    barAdmissions: ['Indiana', 'Illinois', 'New York'],
    isPartner: true,
    yearsOfExperience: 17,
  },
];

/**
 * Filter attorneys by practice area
 */
export const filterByPracticeArea = (practiceArea: string): Attorney[] => {
  return attorneys.filter(attorney => 
    attorney.practiceAreas.includes(practiceArea)
  );
};

/**
 * Filter attorneys by industry
 */
export const filterByIndustry = (industry: string): Attorney[] => {
  return attorneys.filter(attorney => 
    attorney.industries.includes(industry)
  );
};

/**
 * Get partners only
 */
export const getPartners = (): Attorney[] => {
  return attorneys.filter(attorney => attorney.isPartner === true);
};

/**
 * Get all unique practice areas
 */
export const getPracticeAreas = (): string[] => {
  const areas = new Set<string>();
  attorneys.forEach(attorney => {
    attorney.practiceAreas.forEach(area => areas.add(area));
  });
  return Array.from(areas).sort();
};

/**
 * Get all unique industries
 */
export const getIndustries = (): string[] => {
  const industries = new Set<string>();
  attorneys.forEach(attorney => {
    attorney.industries.forEach(industry => industries.add(industry));
  });
  return Array.from(industries).sort();
};

/**
 * Get attorney by ID
 */
export const getAttorneyById = (id: string): Attorney | undefined => {
  return attorneys.find(attorney => attorney.id === id);
};
