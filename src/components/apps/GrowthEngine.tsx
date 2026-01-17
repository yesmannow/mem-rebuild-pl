import React, { useState } from 'react';
import { TrendingUp, Activity, Cpu } from 'lucide-react';
import ROICalculator from './growth-engine/ROICalculator';
import SmartQuote from './growth-engine/SmartQuote';
import AppShell from './AppShell';

type ActiveTab = 'roi' | 'quote';

const GrowthEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('roi');

  const tools = [
    { id: 'roi', label: 'ROI Modeler', icon: <TrendingUp size={16} /> },
    { id: 'quote', label: 'Smart Quote', icon: <Cpu size={16} /> },
  ];

  return (
    <AppShell
      title="Growth Engine"
      description="Interactive ROI modeler & CPQ system built on the Ocean Pearl design language"
      icon={<Activity className="w-6 h-6 text-brand-turquoise" />}
      tools={tools}
      activeTool={activeTab}
      onToolChange={(toolId) => setActiveTab(toolId as ActiveTab)}
    >
      <div className="max-w-7xl mx-auto">
        {activeTab === 'roi' ? <ROICalculator /> : <SmartQuote />}
      </div>
    </AppShell>
  );
};

export default GrowthEngine;

