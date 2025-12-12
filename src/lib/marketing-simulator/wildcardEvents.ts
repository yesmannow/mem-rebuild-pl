import { WildcardEvent, Industry } from './types';

export const WILDCARD_EVENTS: WildcardEvent[] = [
  // Competitive Events
  {
    id: 'competitor-price-war',
    type: 'competitive',
    title: 'Competitor Launches Price War',
    description: 'Your main competitor just slashed prices by 30% and is running aggressive ads highlighting their lower costs. Customers are asking why you\'re more expensive.',
    options: [
      {
        id: 'match-price',
        text: 'Match their pricing (-20% profit margin)',
        cost: 0,
        moraleImpact: -10,
        brandEquityImpact: -5,
        revenueImpact: 0.9,
        outcome: 'You maintained market share but sacrificed profitability. Team morale dropped due to pressure.',
      },
      {
        id: 'value-messaging',
        text: 'Double down on value messaging ($8K campaign)',
        cost: 8000,
        moraleImpact: 5,
        brandEquityImpact: 10,
        revenueImpact: 1.05,
        outcome: 'Premium positioning defended. Some price-sensitive customers lost but brand strengthened.',
      },
      {
        id: 'ignore',
        text: 'Ignore and stay the course',
        cost: 0,
        moraleImpact: 0,
        brandEquityImpact: -10,
        revenueImpact: 0.85,
        outcome: 'Lost 15% market share to competitor. Team questioned leadership\'s awareness.',
      },
    ],
  },
  
  {
    id: 'competitor-viral-campaign',
    type: 'competitive',
    title: 'Competitor\'s Campaign Goes Viral',
    description: 'A competitor\'s creative campaign has gone viral on social media, generating millions of impressions and significant brand buzz. They\'re dominating the conversation in your industry.',
    industry: ['ecommerce', 'saas'],
    options: [
      {
        id: 'quick-response',
        text: 'Launch rapid response campaign ($12K)',
        cost: 12000,
        moraleImpact: 10,
        brandEquityImpact: 5,
        revenueImpact: 1.1,
        outcome: 'Your timely, clever response earned respect and showed agility. Captured some viral momentum.',
      },
      {
        id: 'focus-substance',
        text: 'Focus on substance over virality',
        cost: 0,
        moraleImpact: -5,
        brandEquityImpact: 8,
        revenueImpact: 1.0,
        outcome: 'Viral moment passed, but you reinforced commitment to quality over hype. Long-term brand building.',
      },
      {
        id: 'copycat',
        text: 'Try to recreate their viral success ($10K)',
        cost: 10000,
        moraleImpact: -15,
        brandEquityImpact: -12,
        revenueImpact: 0.95,
        outcome: 'Seen as derivative and desperate. Failed to capture lightning in a bottle. Brand damaged.',
      },
    ],
  },
  
  // Market Shift Events
  {
    id: 'economic-recession',
    type: 'market-shift',
    title: 'Economic Downturn Hits',
    description: 'Economic indicators are down. Businesses are cutting budgets, consumers are tightening wallets. Your industry is facing headwinds.',
    options: [
      {
        id: 'aggressive-acquisition',
        text: 'Get aggressive - capture market share while competitors retreat ($15K)',
        cost: 15000,
        moraleImpact: 10,
        brandEquityImpact: 12,
        revenueImpact: 1.25,
        outcome: 'Bold move paid off. Gained significant market share while competitors froze. Positioned for recovery.',
      },
      {
        id: 'conservative-pullback',
        text: 'Pull back marketing spend, preserve cash',
        cost: 0,
        moraleImpact: -15,
        brandEquityImpact: -8,
        revenueImpact: 0.75,
        outcome: 'Conserved cash but lost visibility and momentum. Hard to restart after pullback.',
      },
      {
        id: 'value-messaging-shift',
        text: 'Shift messaging to ROI/value ($6K repositioning)',
        cost: 6000,
        moraleImpact: 5,
        brandEquityImpact: 5,
        revenueImpact: 1.1,
        outcome: 'Smart pivot. Resonated with budget-conscious buyers. Maintained revenue despite downturn.',
      },
    ],
  },
  
  {
    id: 'trending-category',
    type: 'market-shift',
    title: 'Your Category is Suddenly Trending',
    description: 'Industry news, celebrity endorsement, or cultural moment has put your product category in the spotlight. Search volume is up 300%.',
    industry: ['ecommerce', 'saas', 'healthcare'],
    options: [
      {
        id: 'capitalize-big',
        text: 'Go all-in: maximize exposure ($20K surge spend)',
        cost: 20000,
        moraleImpact: 15,
        brandEquityImpact: 20,
        revenueImpact: 1.6,
        outcome: 'Captured the wave! Became category leader in customers\' minds. Explosive growth.',
      },
      {
        id: 'steady-approach',
        text: 'Maintain strategy, let trend play out naturally',
        cost: 0,
        moraleImpact: 0,
        brandEquityImpact: 5,
        revenueImpact: 1.15,
        outcome: 'Benefited from trend but missed opportunity to dominate. Modest gains.',
      },
      {
        id: 'cautious',
        text: 'Be cautious - trends can be fleeting',
        cost: 0,
        moraleImpact: -10,
        brandEquityImpact: -5,
        revenueImpact: 1.05,
        outcome: 'Trend faded but you weren\'t overexposed. Competitors who went big won long-term customers.',
      },
    ],
  },
  
  // Regulatory Events
  {
    id: 'gdpr-compliance',
    type: 'regulatory',
    title: 'New Data Privacy Regulations',
    description: 'Major new data privacy laws are being enforced. Email lists must be re-permissioned, tracking cookies require consent, and penalties for non-compliance are severe.',
    industry: ['ecommerce', 'saas', 'healthcare'],
    options: [
      {
        id: 'full-compliance',
        text: 'Full compliance overhaul ($14K + lawyer fees)',
        cost: 14000,
        moraleImpact: 5,
        brandEquityImpact: 15,
        revenueImpact: 0.9,
        outcome: 'Compliant and trusted. Lost some email list but gained reputation as privacy-conscious brand.',
      },
      {
        id: 'minimal-compliance',
        text: 'Minimum viable compliance ($5K)',
        cost: 5000,
        moraleImpact: -5,
        brandEquityImpact: 0,
        revenueImpact: 0.95,
        outcome: 'Squeaked by compliance but took shortcuts. Living on edge of penalties.',
      },
      {
        id: 'delay-compliance',
        text: 'Delay and hope for extended deadline',
        cost: 0,
        moraleImpact: -15,
        brandEquityImpact: -20,
        revenueImpact: 0.7,
        outcome: 'HIT WITH $50K FINE. Devastating PR. Customers lost trust. Major setback.',
      },
    ],
  },
  
  {
    id: 'hipaa-changes',
    type: 'regulatory',
    title: 'HIPAA Enforcement Intensifies',
    description: 'Healthcare regulators are cracking down on marketing compliance. Your current email practices and tracking may violate patient privacy rules.',
    industry: ['healthcare'],
    options: [
      {
        id: 'audit-overhaul',
        text: 'Hire compliance consultant, audit all marketing ($12K)',
        cost: 12000,
        moraleImpact: 10,
        brandEquityImpact: 18,
        revenueImpact: 0.95,
        outcome: 'Clean bill of health. Positioned as trusted, compliant provider. Worth the investment.',
      },
      {
        id: 'self-audit',
        text: 'Internal audit and fixes ($4K)',
        cost: 4000,
        moraleImpact: 0,
        brandEquityImpact: 5,
        revenueImpact: 1.0,
        outcome: 'Identified most issues but may have missed some. Reasonable approach.',
      },
      {
        id: 'wait-and-see',
        text: 'Monitor situation, no immediate action',
        cost: 0,
        moraleImpact: -20,
        brandEquityImpact: -25,
        revenueImpact: 0.6,
        outcome: 'HIPAA VIOLATION FINE: $75K. Severe reputation damage. Patients lost trust.',
      },
    ],
  },
  
  // Internal Crisis Events
  {
    id: 'key-resignation',
    type: 'internal-crisis',
    title: 'Marketing Director Quits',
    description: 'Your marketing director has resigned, taking their knowledge of campaigns, relationships, and strategy with them. The team is shaken.',
    options: [
      {
        id: 'hire-expensive-replacement',
        text: 'Hire experienced replacement ASAP ($85K + recruiting)',
        cost: 15000,
        moraleImpact: 10,
        brandEquityImpact: 0,
        revenueImpact: 1.05,
        outcome: 'Quick hire maintained momentum. New perspective brought fresh ideas. Team stabilized.',
      },
      {
        id: 'promote-internal',
        text: 'Promote from within ($10K salary increase)',
        cost: 2500,
        moraleImpact: 20,
        brandEquityImpact: 5,
        revenueImpact: 1.0,
        outcome: 'Team morale soared. Cultural continuity maintained. Small learning curve but strong buy-in.',
      },
      {
        id: 'delay-hire',
        text: 'Delay hiring, distribute responsibilities',
        cost: 0,
        moraleImpact: -25,
        brandEquityImpact: -10,
        revenueImpact: 0.8,
        outcome: 'Team burned out. Strategy drift. Campaigns suffered without leadership. Revenue declined.',
      },
    ],
  },
  
  {
    id: 'website-outage',
    type: 'internal-crisis',
    title: 'Website Crashes During Campaign',
    description: 'Your website went down during a major paid ad campaign. Hours of traffic sent to a dead site. Revenue lost, ad spend wasted.',
    options: [
      {
        id: 'emergency-hosting-upgrade',
        text: 'Emergency hosting upgrade + extended campaign ($18K)',
        cost: 18000,
        moraleImpact: -5,
        brandEquityImpact: -8,
        revenueImpact: 1.15,
        outcome: 'Recovered quickly. Extended campaign to make up for lost time. Expensive but salvaged situation.',
      },
      {
        id: 'apologize-discount',
        text: 'Public apology + discount code ($8K in discounts)',
        cost: 8000,
        moraleImpact: 5,
        brandEquityImpact: 10,
        revenueImpact: 1.05,
        outcome: 'Transparency appreciated. Discount brought customers back. Turned negative into loyalty builder.',
      },
      {
        id: 'move-on',
        text: 'Fix site, move on without addressing',
        cost: 0,
        moraleImpact: -10,
        brandEquityImpact: -15,
        revenueImpact: 0.85,
        outcome: 'Frustrated customers left negative reviews. Trust damaged. Hard to recover momentum.',
      },
    ],
  },
  
  // Opportunity Events
  {
    id: 'partnership-offer',
    type: 'opportunity',
    title: 'Major Partnership Opportunity',
    description: 'A well-known brand in an adjacent market wants to co-market with you. Could open doors but requires resource commitment.',
    options: [
      {
        id: 'full-partnership',
        text: 'Go all-in on partnership ($16K co-marketing)',
        cost: 16000,
        moraleImpact: 15,
        brandEquityImpact: 25,
        revenueImpact: 1.4,
        outcome: 'Partnership exceeded expectations. Access to new audience. Credibility boost. Win-win.',
      },
      {
        id: 'test-partnership',
        text: 'Test with small pilot program ($6K)',
        cost: 6000,
        moraleImpact: 5,
        brandEquityImpact: 8,
        revenueImpact: 1.1,
        outcome: 'Smart risk management. Pilot showed promise. Positioned for bigger collaboration later.',
      },
      {
        id: 'decline',
        text: 'Decline - stay focused on core strategy',
        cost: 0,
        moraleImpact: 0,
        brandEquityImpact: 0,
        revenueImpact: 1.0,
        outcome: 'Maintained focus but missed upside. Partner approached competitor instead.',
      },
    ],
  },
  
  {
    id: 'media-opportunity',
    type: 'opportunity',
    title: 'PR Opportunity: Industry Publication Feature',
    description: 'Top industry publication wants to feature your company in a cover story. Requires executive time and potential sponsored content purchase.',
    industry: ['legal', 'saas', 'manufacturing', 'healthcare'],
    options: [
      {
        id: 'sponsored-feature',
        text: 'Purchase sponsored placement + PR support ($11K)',
        cost: 11000,
        moraleImpact: 10,
        brandEquityImpact: 20,
        revenueImpact: 1.3,
        outcome: 'Premium placement drove significant leads. Positioned as industry leader. High ROI.',
      },
      {
        id: 'earned-only',
        text: 'Participate in earned coverage only (time investment)',
        cost: 0,
        moraleImpact: 5,
        brandEquityImpact: 12,
        revenueImpact: 1.15,
        outcome: 'Good coverage but less prominent. Still valuable brand building without financial cost.',
      },
      {
        id: 'pass',
        text: 'Pass - too busy with current initiatives',
        cost: 0,
        moraleImpact: -5,
        brandEquityImpact: -8,
        revenueImpact: 1.0,
        outcome: 'Missed high-visibility opportunity. Competitor featured instead and gained thought leadership position.',
      },
    ],
  },
];

export const getRandomWildcardEvent = (
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4',
  industry: Industry
): WildcardEvent | null => {
  // No wildcard in Q1 to let players learn
  if (quarter === 'Q1') return null;
  
  // 75% chance of wildcard in Q2-Q4
  if (Math.random() > 0.75) return null;
  
  // Filter by industry if specified
  const eligibleEvents = WILDCARD_EVENTS.filter(event => 
    !event.industry || event.industry.includes(industry)
  );
  
  if (eligibleEvents.length === 0) return null;
  
  return eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
};
