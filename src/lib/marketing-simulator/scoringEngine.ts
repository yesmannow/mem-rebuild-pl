import {
  CompanySetup,
  QuarterState,
  HiddenMetrics,
  ScoreBreakdown,
  SelectedTactic,
  Quarter,
  QuarterResults,
  FinalScore,
  GameState,
} from './types';
import { INDUSTRY_PROFILES, getIndustryMultiplier, getSizeMultiplier } from './industryProfiles';
import { getTacticById } from './tacticsLibrary';

export class ScoringEngine {
  private setup: CompanySetup;
  private quarters: QuarterState[];
  private hiddenMetrics: HiddenMetrics;
  private seoCompoundingHistory: Map<string, number> = new Map();
  private paidAdsSaturation: Map<string, number> = new Map();

  constructor(setup: CompanySetup, quarters: QuarterState[], hiddenMetrics: HiddenMetrics) {
    this.setup = setup;
    this.quarters = quarters;
    this.hiddenMetrics = hiddenMetrics;
  }

  /**
   * Calculate revenue for a single tactic in a quarter
   */
  calculateTacticRevenue(
    tacticId: string,
    spend: number,
    quarterNumber: number,
    previousQuarters: QuarterState[]
  ): number {
    const tactic = getTacticById(tacticId);
    if (!tactic) return 0;

    const industryProfile = INDUSTRY_PROFILES[this.setup.industry];
    const dealSize = industryProfile.avgDealSize[this.setup.companySize];

    // Base calculation
    let roi = tactic.baseROI;

    // Apply industry multiplier
    roi *= getIndustryMultiplier(this.setup.industry, tactic.category);

    // Apply company size multiplier
    roi *= getSizeMultiplier(this.setup.companySize, tactic.category);

    // Apply hidden metrics boost
    const brandEquityBoost = 1 + this.hiddenMetrics.brandEquity / 200; // 0% to 50% boost
    const moraleBoost = 1 + this.hiddenMetrics.teamMorale / 300; // 0% to 33% boost
    roi *= brandEquityBoost * moraleBoost;

    // SEO/Content compounding effects
    if (tactic.compounding && tactic.category === 'seo') {
      const compoundingRate = 1.15; // 15% growth per quarter
      const previousInvestments = previousQuarters.filter(q =>
        q.selectedTactics.some(st => st.tacticId === tacticId)
      ).length;
      const compoundingMultiplier = Math.pow(compoundingRate, previousInvestments);
      roi *= compoundingMultiplier;
      this.seoCompoundingHistory.set(tacticId, compoundingMultiplier);
    }

    // Content marketing compounding (12% per quarter)
    if (tactic.compounding && tactic.category === 'content') {
      const compoundingRate = 1.12;
      const previousInvestments = previousQuarters.filter(q =>
        q.selectedTactics.some(st => st.tacticId === tacticId)
      ).length;
      roi *= Math.pow(compoundingRate, previousInvestments);
    }

    // Email/Partnerships compounding (10-14% per quarter)
    if (
      tactic.compounding &&
      (tactic.category === 'email' || tactic.category === 'partnerships')
    ) {
      const compoundingRate = tactic.category === 'partnerships' ? 1.14 : 1.1;
      const previousInvestments = previousQuarters.filter(q =>
        q.selectedTactics.some(st => st.tacticId === tacticId)
      ).length;
      roi *= Math.pow(compoundingRate, previousInvestments);
    }

    // Paid ads diminishing returns
    if (tactic.category === 'paid-ads') {
      const previousAdInvestments = previousQuarters.filter(q =>
        q.selectedTactics.some(st => {
          const t = getTacticById(st.tacticId);
          return t?.category === 'paid-ads';
        })
      ).length;

      // Saturation kicks in after Q2, worsens in Q3-Q4
      const saturationPenalty =
        previousAdInvestments >= 3 ? 0.6 : previousAdInvestments >= 2 ? 0.75 : 1.0;
      roi *= saturationPenalty;
      this.paidAdsSaturation.set(tacticId, saturationPenalty);
    }

    // Market saturation penalty
    roi *= 1 - this.hiddenMetrics.marketSaturation * 0.3;

    // Calculate revenue
    const revenue = spend * roi;
    return revenue;
  }

  /**
   * Calculate quarterly results
   */
  calculateQuarterResults(
    quarterNumber: number,
    selectedTactics: SelectedTactic[],
    previousQuarters: QuarterState[]
  ): QuarterState['results'] {
    let totalRevenue = 0;
    let totalSpend = 0;

    const trafficSources = {
      organic: 0,
      paid: 0,
      social: 0,
      referral: 0,
      email: 0,
    };

    // Calculate revenue from each tactic
    selectedTactics.forEach(st => {
      const tacticRevenue = this.calculateTacticRevenue(
        st.tacticId,
        st.spend,
        quarterNumber,
        previousQuarters
      );
      totalRevenue += tacticRevenue;
      totalSpend += st.spend;

      // Attribute traffic sources
      const tactic = getTacticById(st.tacticId);
      if (!tactic) return;

      const trafficShare = tacticRevenue / Math.max(totalRevenue, 1);
      if (tactic.category === 'seo' || tactic.category === 'content') {
        trafficSources.organic += trafficShare * 100;
      } else if (tactic.category === 'paid-ads') {
        trafficSources.paid += trafficShare * 100;
      } else if (tactic.category === 'social') {
        trafficSources.social += trafficShare * 100;
      } else if (tactic.category === 'partnerships') {
        trafficSources.referral += trafficShare * 100;
      } else if (tactic.category === 'email') {
        trafficSources.email += trafficShare * 100;
      }
    });

    const profit = totalRevenue - totalSpend;

    // Market share calculation (Share of Voice model)
    const competitorSpend = this.setup.totalBudget * 1.2; // Assume competitors spend 20% more
    const marketShare =
      (totalSpend / (totalSpend + competitorSpend)) * 100 * (1 + this.hiddenMetrics.brandEquity / 150);

    // Customer satisfaction (influenced by balanced strategy)
    const tacticsCount = selectedTactics.length;
    const categoryDiversity = new Set(
      selectedTactics.map(st => getTacticById(st.tacticId)?.category)
    ).size;
    const customerSatisfaction = Math.min(
      100,
      60 + categoryDiversity * 5 + this.hiddenMetrics.brandEquity / 5
    );

    // Brand awareness (cumulative from PR, content, events, social)
    const brandAwarenessBoost = selectedTactics.reduce((acc, st) => {
      const tactic = getTacticById(st.tacticId);
      if (
        tactic?.category === 'pr' ||
        tactic?.category === 'content' ||
        tactic?.category === 'events' ||
        tactic?.category === 'social'
      ) {
        return acc + 5;
      }
      return acc;
    }, 0);
    const brandAwareness = Math.min(100, 40 + brandAwarenessBoost + this.hiddenMetrics.brandEquity / 3);

    return {
      revenue: Math.round(totalRevenue),
      profit: Math.round(profit),
      marketShare: parseFloat(marketShare.toFixed(2)),
      customerSatisfaction: Math.round(customerSatisfaction),
      brandAwareness: Math.round(brandAwareness),
      trafficSources,
    };
  }

  /**
   * Calculate final score and grade
   */
  calculateFinalScore(quarters: QuarterState[]): ScoreBreakdown {
    const totalRevenue = quarters.reduce((sum, q) => sum + q.results.revenue, 0);
    const totalProfit = quarters.reduce((sum, q) => sum + q.results.profit, 0);
    const totalSpent = quarters.reduce((sum, q) => sum + q.budgetSpent, 0);
    const avgMarketShare =
      quarters.reduce((sum, q) => sum + q.results.marketShare, 0) / quarters.length;
    const finalBrandAwareness = quarters[quarters.length - 1]?.results.brandAwareness || 0;

    // Revenue score (0-25 points) - based on revenue growth
    const revenueGrowth = totalRevenue / this.setup.totalBudget;
    const revenueScore = Math.min(25, revenueGrowth * 5);

    // Profitability score (0-30 points) - ROI focus
    const roi = totalProfit / totalSpent;
    const profitabilityScore = Math.min(30, roi * 15);

    // Market share score (0-20 points)
    const marketShareScore = Math.min(20, avgMarketShare * 2);

    // Efficiency score (0-15 points) - budget utilization
    const budgetUtilization = totalSpent / this.setup.totalBudget;
    const efficiencyScore = budgetUtilization > 0.85 && budgetUtilization <= 1.0 ? 15 : budgetUtilization * 12;

    // Strategy score (0-10 points) - diversity, compounding tactics
    const tacticsUsed = new Set(quarters.flatMap(q => q.selectedTactics.map(st => st.tacticId)));
    const compoundingTacticsCount = Array.from(tacticsUsed).filter(id => {
      const tactic = getTacticById(id);
      return tactic?.compounding;
    }).length;
    const strategyScore = Math.min(10, tacticsUsed.size + compoundingTacticsCount);

    const totalScore = revenueScore + profitabilityScore + marketShareScore + efficiencyScore + strategyScore;

    // Determine grade
    let grade = 'F';
    if (totalScore >= 90) grade = 'A+';
    else if (totalScore >= 85) grade = 'A';
    else if (totalScore >= 80) grade = 'A-';
    else if (totalScore >= 75) grade = 'B+';
    else if (totalScore >= 70) grade = 'B';
    else if (totalScore >= 65) grade = 'B-';
    else if (totalScore >= 60) grade = 'C+';
    else if (totalScore >= 55) grade = 'C';
    else if (totalScore >= 50) grade = 'C-';
    else if (totalScore >= 45) grade = 'D';

    // Percentile (simplified - assume normal distribution)
    const percentile = Math.round(Math.min(99, (totalScore / 100) * 100));

    // Generate insights
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendations: string[] = [];

    if (revenueScore >= 20) strengths.push('Strong revenue generation');
    else weaknesses.push('Revenue growth below target');

    if (profitabilityScore >= 24) strengths.push('Excellent ROI and profitability');
    else if (profitabilityScore < 15) weaknesses.push('Low profitability - overspending or ineffective tactics');

    if (marketShareScore >= 15) strengths.push('Significant market share capture');
    else weaknesses.push('Limited market presence');

    if (compoundingTacticsCount >= 3) strengths.push('Smart use of compounding strategies (SEO, content)');
    else recommendations.push('Invest more in compounding tactics like SEO and content marketing');

    if (tacticsUsed.size >= 8) strengths.push('Diversified marketing mix');
    else recommendations.push('Diversify tactics to reduce risk and reach more channels');

    if (budgetUtilization < 0.75) recommendations.push('Utilize more of your budget - you left money on the table');
    if (budgetUtilization > 1.05) recommendations.push('Overspent budget - improve financial discipline');

    if (avgMarketShare < 8) recommendations.push('Increase Share of Voice to capture more market share');

    if (this.hiddenMetrics.brandEquity < 50) {
      recommendations.push('Invest in brand-building activities (PR, content, events)');
    }

    return {
      revenueScore,
      profitabilityScore,
      marketShareScore,
      efficiencyScore,
      strategyScore,
      totalScore,
      grade,
      percentile,
      strengths,
      weaknesses,
      recommendations,
    };
  }
}

/**
 * Helper function to calculate quarter results
 */
export function calculateQuarterResults(
  companySetup: CompanySetup,
  selectedTactics: SelectedTactic[],
  quarter: Quarter,
  hiddenMetrics: { brandEquity: number; teamMorale: number },
  previousResults?: QuarterResults
): QuarterResults {
  const fullHiddenMetrics: HiddenMetrics = {
    ...hiddenMetrics,
    competitorAggression: 50,
    marketSaturation: 0.3,
  };

  const engine = new ScoringEngine(companySetup, [], fullHiddenMetrics);
  const quarterIndex = ['Q1', 'Q2', 'Q3', 'Q4'].indexOf(quarter) + 1;
  
  const results = engine.calculateQuarterResults(quarterIndex, selectedTactics, []);
  
  // Add insights
  const insights: string[] = [];
  if (results.revenue > 100000) insights.push('Strong revenue performance this quarter!');
  if (results.profit < 0) insights.push('Negative profit - consider optimizing spend allocation');
  if (results.marketShare > 15) insights.push('Excellent market share growth');
  
  // Update hidden metrics based on performance
  const updatedBrandEquity = Math.min(100, hiddenMetrics.brandEquity + (results.brandAwareness > 70 ? 5 : 2));
  const updatedTeamMorale = Math.min(100, hiddenMetrics.teamMorale + (results.profit > 0 ? 3 : -2));

  return {
    ...results,
    hiddenMetrics: {
      brandEquity: updatedBrandEquity,
      teamMorale: updatedTeamMorale,
    },
    insights,
  };
}

/**
 * Helper function to calculate final score
 */
export function calculateFinalScore(
  companySetup: CompanySetup,
  gameState: GameState
): FinalScore {
  const fullHiddenMetrics: HiddenMetrics = {
    ...gameState.hiddenMetrics,
    competitorAggression: 50,
    marketSaturation: 0.3,
  };

  const engine = new ScoringEngine(companySetup, gameState.quarters, fullHiddenMetrics);
  const scoreBreakdown = engine.calculateFinalScore(gameState.quarters);

  const lastQuarter = gameState.quarters[gameState.quarters.length - 1];
  const totalRevenue = gameState.cumulativeResults.revenue;
  const totalProfit = gameState.cumulativeResults.profit;
  const roi = (totalProfit / companySetup.totalBudget) * 100;

  // Map the old grade format to the new format
  const gradeMap: Record<string, 'A+' | 'A' | 'B' | 'C' | 'D' | 'F'> = {
    'A+': 'A+',
    'A': 'A',
    'A-': 'A',
    'B+': 'B',
    'B': 'B',
    'B-': 'B',
    'C+': 'C',
    'C': 'C',
    'C-': 'C',
    'D': 'D',
    'F': 'F',
  };

  return {
    strategyScore: Math.round(scoreBreakdown.totalScore * 100),
    breakdown: {
      marketShareScore: scoreBreakdown.marketShareScore * 100,
      roiScore: scoreBreakdown.profitabilityScore * 100,
      brandEquityScore: scoreBreakdown.strategyScore * 100,
    },
    grade: gradeMap[scoreBreakdown.grade] || 'C',
    percentile: scoreBreakdown.percentile,
    finalKPIs: {
      revenue: totalRevenue,
      profit: totalProfit,
      marketShare: lastQuarter?.results.marketShare || 0,
      customerSatisfaction: lastQuarter?.results.customerSatisfaction || 0,
      brandAwareness: lastQuarter?.results.brandAwareness || 0,
      roi,
    },
    strengths: scoreBreakdown.strengths,
    weaknesses: scoreBreakdown.weaknesses,
    recommendations: scoreBreakdown.recommendations,
  };
}
