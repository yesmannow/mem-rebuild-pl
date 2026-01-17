import React, { useState } from 'react';
import { TrendingUp, Users, BarChart3, Beaker, GitBranch, DollarSign, FileCode } from 'lucide-react';
import BudgetPlanner from './marketing-simulator/BudgetPlanner';
import HeadcountModeler from './marketing-simulator/HeadcountModeler';
import MediaMixOptimizer from './marketing-simulator/MediaMixOptimizer';
import ExperimentationBudget from './marketing-simulator/ExperimentationBudget';
import PipelineVisualizer from './marketing-simulator/PipelineVisualizer';
import BurnRateCalculator from './marketing-simulator/BurnRateCalculator';
import AppShell from './AppShell';

type ActiveTab = 'budget' | 'headcount' | 'mediamix' | 'experiments' | 'pipeline' | 'burnrate';

const MarketingSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('budget');

  const tools = [
    { id: 'budget', label: 'Budget Planner', icon: <DollarSign size={16} /> },
    { id: 'headcount', label: 'Headcount Model', icon: <Users size={16} /> },
    { id: 'mediamix', label: 'Media Mix', icon: <BarChart3 size={16} /> },
    { id: 'experiments', label: 'Experiments', icon: <Beaker size={16} /> },
    { id: 'pipeline', label: 'Pipeline', icon: <GitBranch size={16} /> },
    { id: 'burnrate', label: 'Burn Rate', icon: <TrendingUp size={16} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'budget':
        return <BudgetPlanner />;
      case 'headcount':
        return <HeadcountModeler />;
      case 'mediamix':
        return <MediaMixOptimizer />;
      case 'experiments':
        return <ExperimentationBudget />;
      case 'pipeline':
        return <PipelineVisualizer />;
      case 'burnrate':
        return <BurnRateCalculator />;
      default:
        return <BudgetPlanner />;
    }
  };

  return (
    <AppShell
      title="Marketing Simulator"
      description="Scenario planning, budget modeling, and pipeline optimization for marketing leaders"
      icon={<FileCode className="w-6 h-6 text-brand-turquoise" />}
      tools={tools}
      activeTool={activeTab}
      onToolChange={(toolId) => setActiveTab(toolId as ActiveTab)}
    >
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </AppShell>
  );
};

export default MarketingSimulator;
