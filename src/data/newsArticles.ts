/**
 * News/Blog Articles Data
 * 
 * Sample news articles and blog posts for law firm demonstration.
 * Used in IndustryHubLayout to show related content.
 */

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  author: string; // Attorney ID
  date: string;
  categories: string[];
  industries: string[];
  slug: string;
  image?: string;
  readTime?: number; // in minutes
}

export const newsArticles: NewsArticle[] = [
  // Construction Articles
  {
    id: 'news-1',
    title: 'New Indiana Construction Lien Law: What Contractors Need to Know',
    excerpt: 'Recent amendments to Indiana\'s mechanic\'s lien statute create new notice requirements for contractors and subcontractors. Here\'s what you need to know to protect your payment rights.',
    author: 'attorney-1',
    date: '2024-11-15',
    categories: ['Construction', 'Legal Updates'],
    industries: ['Construction'],
    slug: 'indiana-construction-lien-law-update',
    readTime: 5,
  },
  {
    id: 'news-2',
    title: 'Managing Delays and Disruptions in Public Construction Projects',
    excerpt: 'Delay claims are among the most contentious issues in construction litigation. This article examines strategies for documenting and recovering delay-related costs on public projects.',
    author: 'attorney-7',
    date: '2024-10-22',
    categories: ['Construction', 'Best Practices'],
    industries: ['Construction', 'Infrastructure'],
    slug: 'managing-construction-delays',
    readTime: 8,
  },
  
  // Healthcare Articles
  {
    id: 'news-3',
    title: 'CMS Final Rule on Price Transparency: Compliance Strategies for Hospitals',
    excerpt: 'The Centers for Medicare & Medicaid Services has finalized regulations requiring hospitals to publish pricing information. Learn how to ensure compliance while protecting competitive position.',
    author: 'attorney-3',
    date: '2024-11-01',
    categories: ['Healthcare', 'Regulatory'],
    industries: ['Healthcare'],
    slug: 'cms-price-transparency-compliance',
    readTime: 6,
  },
  {
    id: 'news-4',
    title: 'Navigating Stark Law Exceptions in Value-Based Arrangements',
    excerpt: 'Recent regulatory changes provide new flexibility for healthcare providers entering value-based care arrangements. Here\'s how to structure compliant financial relationships.',
    author: 'attorney-8',
    date: '2024-10-10',
    categories: ['Healthcare', 'Compliance'],
    industries: ['Healthcare'],
    slug: 'stark-law-value-based-care',
    readTime: 7,
  },
  
  // Insurance Articles
  {
    id: 'news-5',
    title: 'Cyber Insurance Coverage Disputes: Emerging Trends',
    excerpt: 'As cyber attacks increase, so do coverage disputes over cyber insurance policies. This article examines recent case law and best practices for both carriers and policyholders.',
    author: 'attorney-4',
    date: '2024-11-05',
    categories: ['Insurance', 'Technology'],
    industries: ['Insurance', 'Technology'],
    slug: 'cyber-insurance-coverage-trends',
    readTime: 6,
  },
  {
    id: 'news-6',
    title: 'Bad Faith Claims: Recent Indiana Supreme Court Decision',
    excerpt: 'The Indiana Supreme Court\'s recent ruling in [Case Name] clarifies the standard for bad faith insurance claims. Here\'s what carriers and policyholders need to know.',
    author: 'attorney-4',
    date: '2024-09-28',
    categories: ['Insurance', 'Case Law'],
    industries: ['Insurance'],
    slug: 'bad-faith-indiana-supreme-court',
    readTime: 5,
  },
  
  // Technology Articles
  {
    id: 'news-7',
    title: 'Term Sheet Negotiation Tips for SaaS Companies',
    excerpt: 'Raising venture capital? Understanding key term sheet provisions can make or break your financing round. Here are the most important terms to negotiate.',
    author: 'attorney-2',
    date: '2024-10-30',
    categories: ['Corporate', 'Technology'],
    industries: ['Technology', 'Financial Services'],
    slug: 'saas-term-sheet-negotiation',
    readTime: 9,
  },
  {
    id: 'news-8',
    title: 'AI and IP: Protecting Your Machine Learning Innovations',
    excerpt: 'Artificial intelligence raises unique intellectual property challenges. Learn strategies for protecting your AI innovations through patents, trade secrets, and copyrights.',
    author: 'attorney-5',
    date: '2024-11-12',
    categories: ['Intellectual Property', 'Technology'],
    industries: ['Technology'],
    slug: 'ai-ip-protection-strategies',
    readTime: 7,
  },
  
  // Manufacturing Articles
  {
    id: 'news-9',
    title: 'NLRB Joint Employer Standard: Impact on Manufacturers',
    excerpt: 'The National Labor Relations Board\'s revised joint employer standard could significantly impact manufacturers using staffing agencies and contractors. Here\'s what to know.',
    author: 'attorney-6',
    date: '2024-10-18',
    categories: ['Labor & Employment', 'Regulatory'],
    industries: ['Manufacturing'],
    slug: 'nlrb-joint-employer-manufacturing',
    readTime: 6,
  },
  {
    id: 'news-10',
    title: 'Product Liability Risk Management for Consumer Goods Manufacturers',
    excerpt: 'With increasing product liability claims, manufacturers must implement comprehensive risk management strategies. This article covers best practices for minimizing exposure.',
    author: 'attorney-10',
    date: '2024-09-15',
    categories: ['Product Liability', 'Best Practices'],
    industries: ['Manufacturing', 'Consumer Goods'],
    slug: 'product-liability-risk-management',
    readTime: 8,
  },
  
  // Financial Services Articles
  {
    id: 'news-11',
    title: 'Fintech Partnerships: Regulatory Considerations for Banks',
    excerpt: 'Banks partnering with fintech companies face unique regulatory challenges. Learn how to structure compliant fintech partnerships that satisfy your regulators.',
    author: 'attorney-9',
    date: '2024-11-08',
    categories: ['Financial Services', 'Regulatory'],
    industries: ['Financial Services', 'Technology'],
    slug: 'bank-fintech-partnerships',
    readTime: 7,
  },
  {
    id: 'news-12',
    title: 'Investment Adviser Compliance: 2024 SEC Examination Priorities',
    excerpt: 'The SEC has announced its examination priorities for 2024. Here\'s what investment advisers should focus on to prepare for potential examinations.',
    author: 'attorney-9',
    date: '2024-10-05',
    categories: ['Financial Services', 'Compliance'],
    industries: ['Financial Services'],
    slug: 'sec-examination-priorities-2024',
    readTime: 6,
  },
];

/**
 * Filter news articles by industry
 */
export const filterByIndustry = (industry: string): NewsArticle[] => {
  return newsArticles.filter(article => 
    article.industries.includes(industry)
  );
};

/**
 * Filter news articles by category
 */
export const filterByCategory = (category: string): NewsArticle[] => {
  return newsArticles.filter(article => 
    article.categories.includes(category)
  );
};

/**
 * Get recent articles (last N articles)
 */
export const getRecentArticles = (count: number = 5): NewsArticle[] => {
  return newsArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

/**
 * Get articles by author
 */
export const getArticlesByAuthor = (authorId: string): NewsArticle[] => {
  return newsArticles.filter(article => article.author === authorId);
};

/**
 * Get article by slug
 */
export const getArticleBySlug = (slug: string): NewsArticle | undefined => {
  return newsArticles.find(article => article.slug === slug);
};
