/**
 * AI Knowledge Base
 * Portfolio context for the Portfolio Concierge (Marketing OS Assistant)
 * Contains structured information about Jacob Darling's background, skills, and availability
 */

export interface PortfolioContext {
  bio: string;
  skills: string[];
  availability: string;
  contact: string;
  rates: string;
}

export const PORTFOLIO_CONTEXT: PortfolioContext = {
  bio: 'Jacob Darling is a Marketing Strategist & Systems Architect with 15+ years of experience building revenue-driving marketing infrastructure for global healthcare brands. He bridges the gap between creative marketing vision and technical implementation, delivering systems that scale while driving measurable ROI. His expertise spans marketing automation, CRM architecture, web development, and revenue operations.',

  skills: [
    'Marketing Automation',
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'Python',
    'HubSpot',
    'Salesforce',
    'Marketo',
    'Tailwind CSS',
    'Framer Motion',
    'Docker',
    'AWS',
    'CI/CD',
    'GitHub Actions',
    'Vercel',
    'Figma',
    'UI/UX Design',
    'SEO',
    'Google Analytics',
    'GraphQL',
    'REST APIs',
    'Express',
    'FastAPI',
  ],

  availability: 'Currently accepting new projects for Q1 2026. Available for fractional CMO engagements, full-time opportunities, consulting projects, and speaking engagements.',

  contact: 'You can reach me at hoosierdarling@gmail.com or book a call on the Contact page. Also available on LinkedIn (linkedin.com/in/jacobdarling) and GitHub (github.com/yesmannow).',

  rates: 'Project-based pricing starting at $5k. Retainers available for ongoing engagements. Hourly consulting rates typically range from $150-200/hour, varying by project scope and duration. For full-time opportunities or long-term engagements, rates are negotiable.',
};

/**
 * findAnswer
 * Simple keyword-based answer finder for the Portfolio Concierge
 * Checks query for keywords and returns relevant information from PORTFOLIO_CONTEXT
 *
 * @param query - User's question/query
 * @returns Relevant answer string or null if no match found
 */
export function findAnswer(query: string): string | null {
  const lowerQuery = query.toLowerCase().trim();

  // Rate/Cost questions
  if (
    lowerQuery.includes('rate') ||
    lowerQuery.includes('cost') ||
    lowerQuery.includes('price') ||
    lowerQuery.includes('pricing') ||
    lowerQuery.includes('hourly') ||
    lowerQuery.includes('fee') ||
    lowerQuery.includes('budget')
  ) {
    return PORTFOLIO_CONTEXT.rates;
  }

  // Contact questions
  if (
    lowerQuery.includes('contact') ||
    lowerQuery.includes('email') ||
    lowerQuery.includes('reach') ||
    lowerQuery.includes('get in touch') ||
    lowerQuery.includes('linkedin') ||
    lowerQuery.includes('github') ||
    lowerQuery.includes('connect')
  ) {
    return PORTFOLIO_CONTEXT.contact;
  }

  // Availability questions
  if (
    lowerQuery.includes('available') ||
    lowerQuery.includes('availability') ||
    lowerQuery.includes('hire') ||
    lowerQuery.includes('opportunity') ||
    lowerQuery.includes('open') ||
    lowerQuery.includes('accepting') ||
    lowerQuery.includes('taking on')
  ) {
    return PORTFOLIO_CONTEXT.availability;
  }

  // Skills/Experience questions
  if (
    lowerQuery.includes('skill') ||
    lowerQuery.includes('expertise') ||
    lowerQuery.includes('experience') ||
    lowerQuery.includes('know') ||
    lowerQuery.includes('can you') ||
    lowerQuery.includes('do you') ||
    lowerQuery.includes('proficient') ||
    lowerQuery.includes('technologies') ||
    lowerQuery.includes('tech stack')
  ) {
    return `Jacob has expertise in: ${PORTFOLIO_CONTEXT.skills.slice(0, 10).join(', ')}, and more. ${PORTFOLIO_CONTEXT.bio}`;
  }

  // Bio/Background questions
  if (
    lowerQuery.includes('who') ||
    lowerQuery.includes('background') ||
    lowerQuery.includes('about') ||
    lowerQuery.includes('tell me') ||
    lowerQuery.includes('introduce') ||
    lowerQuery.includes('summary')
  ) {
    return PORTFOLIO_CONTEXT.bio;
  }

  // No match found
  return null;
}

/**
 * getSkillsByCategory
 * Helper to get skills organized by category
 */
export function getSkillsByCategory() {
  return {
    frontend: PORTFOLIO_CONTEXT.skills.filter(skill =>
      ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'].some(tech => skill.includes(tech))
    ),
    backend: PORTFOLIO_CONTEXT.skills.filter(skill =>
      ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL', 'REST APIs'].some(tech => skill.includes(tech))
    ),
    marketing: PORTFOLIO_CONTEXT.skills.filter(skill =>
      ['Marketing Automation', 'HubSpot', 'Salesforce', 'Marketo', 'SEO', 'Google Analytics'].some(tech => skill.includes(tech))
    ),
    devops: PORTFOLIO_CONTEXT.skills.filter(skill =>
      ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Vercel'].some(tech => skill.includes(tech))
    ),
    design: PORTFOLIO_CONTEXT.skills.filter(skill =>
      ['Figma', 'UI/UX Design'].some(tech => skill.includes(tech))
    ),
  };
}
