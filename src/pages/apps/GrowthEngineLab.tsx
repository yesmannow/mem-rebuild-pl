import React, { useState } from 'react';
import { Rocket, Calculator } from 'lucide-react';
import { AppShell } from '../../components/apps/AppShell';
import SmartQuote from '../../components/apps/growth-engine/SmartQuote';
import ROICalculator from '../../components/apps/growth-engine/ROICalculator';

const tools = [
  { id: 'smart-quote', label: 'Smart Quote', icon: <Rocket size={16} /> },
  { id: 'roi-modeler', label: 'ROI Modeler', icon: <Calculator size={16} /> },
] as const;

type ToolId = (typeof tools)[number]['id'];

const GrowthEngineLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId>('smart-quote');

  return (
    <AppShell
      title="Growth Engine"
      description="Executive-ready revenue intelligence system with live quoting + ROI modeling."
      icon={<Rocket className="text-brand-teal" size={28} />}
      tools={tools}
      activeTool={activeTool}
      onToolChange={(toolId) => setActiveTool(toolId as ToolId)}
    >
      <div className="space-y-8">
        <p className="text-sm text-brand-muted">
          Built for CMOs and RevOps leaders who need instant deal economics. Toggle between live quote generation and
          ROI projections that pull from the same pricing primitives used in production.
        </p>
        {activeTool === 'smart-quote' && <SmartQuote />}
        {activeTool === 'roi-modeler' && <ROICalculator />}
      </div>
    </AppShell>
  );
};

export default GrowthEngineLab;
