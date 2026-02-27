import React, { useMemo, useState } from 'react';
import {
  BarChart2,
  Users,
  Activity,
  Wallet,
  LineChart,
  FlaskConical,
} from 'lucide-react';
import { AppShell } from '../../components/apps/AppShell';
import BudgetPlanner from '../../components/apps/marketing-simulator/BudgetPlanner';
import HeadcountModeler from '../../components/apps/marketing-simulator/HeadcountModeler';
import MediaMixOptimizer from '../../components/apps/marketing-simulator/MediaMixOptimizer';
import ExperimentationBudget from '../../components/apps/marketing-simulator/ExperimentationBudget';
import PipelineVisualizer from '../../components/apps/marketing-simulator/PipelineVisualizer';
import BurnRateCalculator from '../../components/apps/marketing-simulator/BurnRateCalculator';

const tools = [
  { id: 'budget', label: 'Budget Planner', icon: <Wallet size={16} /> },
  { id: 'headcount', label: 'Headcount Model', icon: <Users size={16} /> },
  { id: 'media-mix', label: 'Media Mix', icon: <BarChart2 size={16} /> },
  { id: 'experiments', label: 'Experimentation', icon: <FlaskConical size={16} /> },
  { id: 'pipeline', label: 'Pipeline', icon: <Activity size={16} /> },
  { id: 'burn', label: 'Burn + Runway', icon: <LineChart size={16} /> },
] as const;

type ToolId = (typeof tools)[number]['id'];

const MarketingSimulatorLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId>('budget');

  const heroCopy = useMemo(
    () =>
      ({
        budget: 'Allocate $5M+ marketing budgets with confidence using scenario-aware guardrails.',
        headcount: 'Model hiring plans with comp bands, productivity ramps, and channel dependencies.',
        'media-mix': 'Blend paid, owned, and earned media spends with incrementality baked in.',
        experiments: 'Ringfence R&D budgets and enforce statistical rigor for every test.',
        pipeline: 'Pressure test pipeline coverage versus quota across every segment.',
        burn: 'Forecast runway using dynamic CAC, LTV, and growth curves.',
      } as Record<ToolId, string>)[activeTool],
    [activeTool]
  );

  return (
    <AppShell
      title="Marketing Simulator"
      description="Six interlocked planning modules for CMOs, Finance partners, and RevOps."
      icon={<BarChart2 className="text-brand-turquoise" size={28} />}
      tools={tools}
      activeTool={activeTool}
      onToolChange={(toolId) => setActiveTool(toolId as ToolId)}
    >
      <div className="space-y-8">
        <p className="text-sm text-brand-muted max-w-3xl">{heroCopy}</p>

        {activeTool === 'budget' && <BudgetPlanner />}
        {activeTool === 'headcount' && <HeadcountModeler />}
        {activeTool === 'media-mix' && <MediaMixOptimizer />}
        {activeTool === 'experiments' && <ExperimentationBudget />}
        {activeTool === 'pipeline' && <PipelineVisualizer />}
        {activeTool === 'burn' && <BurnRateCalculator />}
      </div>
    </AppShell>
  );
};

export default MarketingSimulatorLab;
