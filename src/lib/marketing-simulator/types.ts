export type TimeHorizon = '1-year' | '3-year' | '5-year';
export type Industry = 'healthcare' | 'legal' | 'ecommerce' | 'saas' | 'manufacturing';
export type CompanySize = 'startup' | 'smb' | 'enterprise';
export type MarketLandscape = 'disruptor' | 'crowded' | 'frontier';
export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export type GamePhase = 'setup' | 'q1' | 'q2' | 'q3' | 'q4' | 'debrief';

export interface CompanySetup {
  companyName: string;
  industry: Industry;
  companySize: CompanySize;
  marketLandscape: MarketLandscape;
  timeHorizon: TimeHorizon;
  budgetAllocation: {
    brandAwareness: number;
    leadGeneration: number;
    conversionOptimization: number;
  };
  totalBudget: number;
}

export interface Tactic {
  id: string;
  name: string;
  category: 'seo' | 'paid-ads' | 'content' | 'social' | 'events' | 'pr' | 'email' | 'partnerships';
  baseCost: number;
  teamHours: number;
  baseROI: number;
  compounding: boolean;
  industryMultipliers: Record<Industry, number>;
  sizeMultipliers: Record<CompanySize, number>;
  description: string;
  isRecurring: boolean;
}

export interface WildcardEvent {
  id: string;
  type: 'competitive' | 'market-shift' | 'internal-crisis' | 'regulatory' | 'opportunity';
  title: string;
  description: string;
  industry?: Industry[];
  options: WildcardOption[];
}

export interface WildcardOption {
  id: string;
  text: string;
  cost: number;
  moraleImpact: number;
  brandEquityImpact: number;
  revenueImpact: number;
  outcome: string;
}

export interface QuarterState {
  quarter: Quarter;
  selectedTactics: SelectedTactic[];
  wildcardEvent?: WildcardEvent;
  wildcardResponse?: WildcardOption;
  talentHired: TalentHire[];
  bigBet?: BigBet;
  budgetSpent: number;
  teamHoursUsed: number;
  results: QuarterResults;
}

export interface SelectedTactic {
  tacticId: string;
  spend: number;
  timeInvested: number;
}

export interface TalentHire {
  role: string;
  specialty: string;
  salary: number;
  bonus: number;
  skillBoost: string;
}

export interface BigBet {
  name: string;
  cost: number;
  potentialUpside: number;
  risk: number;
  outcome: 'success' | 'failure' | 'partial';
}

export interface QuarterResults {
  revenue: number;
  profit: number;
  marketShare: number;
  customerSatisfaction: number;
  brandAwareness: number;
  trafficSources: {
    organic: number;
    paid: number;
    social: number;
    referral: number;
    email: number;
  };
  hiddenMetrics?: {
    brandEquity: number;
    teamMorale: number;
  };
  insights?: string[];
}

export interface HiddenMetrics {
  brandEquity: number;
  teamMorale: number;
  competitorAggression: number;
  marketSaturation: number;
}

export interface GameState {
  quarters: QuarterState[];
  totalBudgetSpent: number;
  hiddenMetrics: {
    brandEquity: number;
    teamMorale: number;
  };
  cumulativeResults: {
    revenue: number;
    profit: number;
  };
}

export interface FullGameState {
  setup: CompanySetup;
  currentPhase: GamePhase;
  quarters: QuarterState[];
  hiddenMetrics: HiddenMetrics;
  totalRevenue: number;
  totalProfit: number;
  finalScore: number;
  grade: string;
  percentile: number;
}

export interface FinalScore {
  strategyScore: number;
  breakdown: {
    marketShareScore: number;
    roiScore: number;
    brandEquityScore: number;
  };
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  percentile: number;
  finalKPIs: {
    revenue: number;
    profit: number;
    marketShare: number;
    customerSatisfaction: number;
    brandAwareness: number;
    roi: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface ScoreBreakdown {
  revenueScore: number;
  profitabilityScore: number;
  marketShareScore: number;
  efficiencyScore: number;
  strategyScore: number;
  totalScore: number;
  grade: string;
  percentile: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface ABTestChallenge {
  id: string;
  industry: Industry;
  context: string;
  adA: {
    headline: string;
    body: string;
    cta: string;
    approach: string;
  };
  adB: {
    headline: string;
    body: string;
    cta: string;
    approach: string;
  };
  correctAnswer: 'A' | 'B';
  explanation: string;
  educationalInsight: string;
  impactOnCampaign: {
    winner: { cpaReduction: number; conversionBoost: number };
    loser: { cpaIncrease: number; conversionPenalty: number };
  };
}
