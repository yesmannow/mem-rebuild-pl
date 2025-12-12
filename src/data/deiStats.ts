/**
 * DEI (Diversity, Equity & Inclusion) Statistics Data
 * 
 * Firm statistics for DEI/Culture page.
 * Critical for Fortune 500 RFPs that mandate DEI standards.
 */

export interface DEIStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
  category: 'diversity' | 'experience' | 'culture' | 'recognition';
  icon?: string;
}

export const deiStats: DEIStat[] = [
  // Diversity Statistics
  {
    id: 'women-partners',
    label: 'Women Partners',
    value: 40,
    suffix: '%',
    description: 'Percentage of partnership positions held by women attorneys',
    category: 'diversity',
    icon: '👩‍⚖️',
  },
  {
    id: 'diverse-attorneys',
    label: 'Diverse Attorneys',
    value: 35,
    suffix: '%',
    description: 'Percentage of attorneys from underrepresented communities',
    category: 'diversity',
    icon: '🌍',
  },
  {
    id: 'women-leadership',
    label: 'Women in Leadership',
    value: 45,
    suffix: '%',
    description: 'Women in management committee and practice group leadership roles',
    category: 'diversity',
    icon: '⭐',
  },
  
  // Experience Statistics
  {
    id: 'avg-experience',
    label: 'Average Years Experience',
    value: 18,
    suffix: '+',
    description: 'Average years of legal experience across all attorneys',
    category: 'experience',
    icon: '📚',
  },
  {
    id: 'partner-experience',
    label: 'Partner Experience',
    value: 22,
    suffix: ' Years',
    description: 'Average years of experience among firm partners',
    category: 'experience',
    icon: '🎓',
  },
  {
    id: 'board-certified',
    label: 'Board Certified Specialists',
    value: 12,
    description: 'Number of attorneys with board certifications in specialty areas',
    category: 'experience',
    icon: '🏆',
  },
  
  // Culture Statistics
  {
    id: 'pro-bono',
    label: 'Pro Bono Hours',
    value: 5000,
    suffix: '+',
    description: 'Annual pro bono hours contributed by firm attorneys',
    category: 'culture',
    icon: '❤️',
  },
  {
    id: 'retention-rate',
    label: 'Attorney Retention',
    value: 92,
    suffix: '%',
    description: 'Attorney retention rate over the past 3 years',
    category: 'culture',
    icon: '🤝',
  },
  {
    id: 'community-orgs',
    label: 'Community Organizations',
    value: 25,
    suffix: '+',
    description: 'Number of nonprofit and community organizations where attorneys serve on boards',
    category: 'culture',
    icon: '🌟',
  },
  
  // Recognition Statistics
  {
    id: 'best-lawyers',
    label: 'Best Lawyers® Honorees',
    value: 15,
    description: 'Attorneys recognized in The Best Lawyers in America®',
    category: 'recognition',
    icon: '⚖️',
  },
  {
    id: 'super-lawyers',
    label: 'Super Lawyers®',
    value: 18,
    description: 'Attorneys selected as Super Lawyers® or Rising Stars',
    category: 'recognition',
    icon: '🌠',
  },
  {
    id: 'industry-awards',
    label: 'Industry Awards',
    value: 30,
    suffix: '+',
    description: 'Industry awards and recognitions received in the past year',
    category: 'recognition',
    icon: '🏅',
  },
];

/**
 * Get DEI stats by category
 */
export const getStatsByCategory = (category: DEIStat['category']): DEIStat[] => {
  return deiStats.filter(stat => stat.category === category);
};

/**
 * Get diversity statistics specifically
 */
export const getDiversityStats = (): DEIStat[] => {
  return getStatsByCategory('diversity');
};

/**
 * Get experience statistics
 */
export const getExperienceStats = (): DEIStat[] => {
  return getStatsByCategory('experience');
};

/**
 * Get culture statistics
 */
export const getCultureStats = (): DEIStat[] => {
  return getStatsByCategory('culture');
};

/**
 * Get recognition statistics
 */
export const getRecognitionStats = (): DEIStat[] => {
  return getStatsByCategory('recognition');
};

/**
 * Get all categories
 */
export const getCategories = (): DEIStat['category'][] => {
  return ['diversity', 'experience', 'culture', 'recognition'];
};
