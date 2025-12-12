import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CompanySetup as CompanySetupType, 
  GamePhase, 
  Quarter,
  QuarterState,
  SelectedTactic,
  GameState 
} from '@/lib/marketing-simulator/types';
import { calculateQuarterResults, calculateFinalScore } from '@/lib/marketing-simulator/scoringEngine';
import { getRandomWildcardEvent } from '@/lib/marketing-simulator/wildcardEvents';
import CompanySetup from './CompanySetup';
import QuarterlyPlay from './QuarterlyPlay';
import QuarterResults from './QuarterResults';
import FinalDebrief from './FinalDebrief';
import { Gamepad2, TrendingUp } from 'lucide-react';

const MarketingSimulatorGame: React.FC = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [companySetup, setCompanySetup] = useState<CompanySetupType | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    quarters: [],
    totalBudgetSpent: 0,
    hiddenMetrics: {
      brandEquity: 50,
      teamMorale: 75,
    },
    cumulativeResults: {
      revenue: 0,
      profit: 0,
    },
  });

  const handleSetupComplete = (setup: CompanySetupType) => {
    setCompanySetup(setup);
    setGamePhase('q1');
  };

  const handleQuarterComplete = (selectedTactics: SelectedTactic[]) => {
    if (!companySetup) return;

    const currentQuarter: Quarter = gamePhase as Quarter;
    const quarterIndex = ['q1', 'q2', 'q3', 'q4'].indexOf(gamePhase);
    const previousQuarter = gameState.quarters[quarterIndex - 1];

    // Get random wildcard event
    const wildcardEvent = getRandomWildcardEvent(currentQuarter, companySetup.industry);

    // Calculate results
    const results = calculateQuarterResults(
      companySetup,
      selectedTactics,
      currentQuarter,
      gameState.hiddenMetrics,
      previousQuarter?.results
    );

    const newQuarterState: QuarterState = {
      quarter: currentQuarter,
      selectedTactics,
      wildcardEvent,
      wildcardResponse: undefined, // Would be set if player responds to event
      talentHired: [],
      bigBet: undefined,
      budgetSpent: selectedTactics.reduce((sum, t) => sum + t.spend, 0),
      teamHoursUsed: selectedTactics.reduce((sum, t) => sum + t.timeInvested, 0),
      results,
    };

    setGameState(prev => ({
      ...prev,
      quarters: [...prev.quarters, newQuarterState],
      totalBudgetSpent: prev.totalBudgetSpent + newQuarterState.budgetSpent,
      cumulativeResults: {
        revenue: prev.cumulativeResults.revenue + results.revenue,
        profit: prev.cumulativeResults.profit + results.profit,
      },
      hiddenMetrics: results.hiddenMetrics || prev.hiddenMetrics,
    }));

    // Show results
    setGamePhase(`${currentQuarter}-results` as any);
  };

  const handleResultsContinue = () => {
    const quarterMap: Record<string, GamePhase> = {
      'q1-results': 'q2',
      'q2-results': 'q3',
      'q3-results': 'q4',
      'q4-results': 'debrief',
    };
    
    setGamePhase(quarterMap[gamePhase] || 'debrief');
  };

  const handleRestart = () => {
    setGamePhase('setup');
    setCompanySetup(null);
    setGameState({
      quarters: [],
      totalBudgetSpent: 0,
      hiddenMetrics: {
        brandEquity: 50,
        teamMorale: 75,
      },
      cumulativeResults: {
        revenue: 0,
        profit: 0,
      },
    });
  };

  const getCurrentQuarterIndex = () => {
    return ['q1', 'q2', 'q3', 'q4'].indexOf(gamePhase);
  };

  const availableBudget = companySetup 
    ? companySetup.totalBudget - gameState.totalBudgetSpent
    : 0;

  const finalScore = gamePhase === 'debrief' && companySetup
    ? calculateFinalScore(companySetup, gameState)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-teal/20 border border-brand-teal rounded-full mb-4">
          <Gamepad2 size={16} className="text-brand-teal" />
          <span className="text-xs uppercase tracking-[0.3em] text-brand-teal">
            Interactive Simulation
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-2">
          Marketing Strategy Simulator
        </h1>
        <p className="text-brand-muted text-lg">
          Make strategic decisions, navigate challenges, and build a winning marketing campaign
        </p>
      </motion.div>

      {/* Progress Bar (for gameplay phases) */}
      {gamePhase !== 'setup' && gamePhase !== 'debrief' && !gamePhase.includes('-results') && (
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q, index) => {
              const isActive = index === getCurrentQuarterIndex();
              const isComplete = index < getCurrentQuarterIndex();
              
              return (
                <React.Fragment key={q}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        isActive
                          ? 'bg-brand-teal text-brand-dark shadow-[0_0_20px_rgba(64,224,208,0.5)]'
                          : isComplete
                          ? 'bg-brand-teal/50 text-brand-text'
                          : 'bg-slate-800 text-brand-muted'
                      }`}
                    >
                      {q}
                    </div>
                    <span className="text-xs text-brand-muted mt-2">{q}</span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        isComplete ? 'bg-brand-teal' : 'bg-slate-800'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Game Phases */}
      <AnimatePresence mode="wait">
        {gamePhase === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CompanySetup onComplete={handleSetupComplete} />
          </motion.div>
        )}

        {['q1', 'q2', 'q3', 'q4'].includes(gamePhase) && companySetup && (
          <motion.div
            key={gamePhase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuarterlyPlay
              quarter={gamePhase as Quarter}
              companySetup={companySetup}
              previousResults={gameState.quarters[getCurrentQuarterIndex() - 1]?.results}
              availableBudget={availableBudget}
              onComplete={handleQuarterComplete}
            />
          </motion.div>
        )}

        {gamePhase.includes('-results') && companySetup && (
          <motion.div
            key={gamePhase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuarterResults
              quarter={gamePhase.split('-')[0].toUpperCase() as Quarter}
              results={gameState.quarters[gameState.quarters.length - 1]?.results}
              previousResults={gameState.quarters[gameState.quarters.length - 2]?.results}
              onContinue={handleResultsContinue}
            />
          </motion.div>
        )}

        {gamePhase === 'debrief' && companySetup && finalScore && (
          <motion.div
            key="debrief"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FinalDebrief
              finalScore={finalScore}
              companySetup={companySetup}
              onRestart={handleRestart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketingSimulatorGame;
