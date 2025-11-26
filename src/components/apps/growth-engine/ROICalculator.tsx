import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Gauge, Rocket } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';
import { PRICING_DATA } from '../../../data/labData';

type BundleKey = keyof typeof PRICING_DATA;

interface BundleOption {
  key: BundleKey;
  name: string;
  cost: number;
}

const fontMono = { fontFamily: 'Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' };

const bundleOptions: BundleOption[] = (Object.keys(PRICING_DATA) as BundleKey[])
  .map((key) => ({
    key,
    name: PRICING_DATA[key].name,
    cost: PRICING_DATA[key].salePrice,
  }))
  .sort((a, b) => b.cost - a.cost);

const ROICalculator: React.FC = () => {
  const [reimbursement, setReimbursement] = useState<number>(45);
  const [patientsPerWeek, setPatientsPerWeek] = useState<number>(3);
  const [bundleKey, setBundleKey] = useState<BundleKey>(bundleOptions[0]?.key ?? '2890');
  const [demoMode, setDemoMode] = useState(false);

  const bundle = PRICING_DATA[bundleKey];

  const { weeklyRevenue, monthlyRevenue, breakEvenWeeks, progressPercent } = useMemo(() => {
    const weekly = reimbursement * patientsPerWeek;
    const monthly = weekly * 4;
    const cost = bundle?.salePrice ?? 0;
    const breakEven = weekly > 0 ? Math.ceil(cost / weekly) : 0;
    const percent = breakEven > 0 ? Math.min(100, (1 / breakEven) * 100) : 0;
    return {
      weeklyRevenue: weekly,
      monthlyRevenue: monthly,
      breakEvenWeeks: breakEven,
      progressPercent: percent,
    };
  }, [bundle?.salePrice, patientsPerWeek, reimbursement]);

  const reimbursementHelper =
    reimbursement > 200 ? 'Above market avg' : 'Avg. reimbursement per session';

  const handleReimbursementChange = (next: number) => {
    const clamped = Math.min(Math.max(0, next), 300);
    setReimbursement(clamped);
  };

  const handlePatientsChange = (next: number) => {
    const clamped = Math.min(Math.max(0, next), 100);
    setPatientsPerWeek(clamped);
  };

  const toggleDemo = () => {
    const next = !demoMode;
    setDemoMode(next);
    if (next) {
      handleReimbursementChange(52);
      handlePatientsChange(8);
      setBundleKey('3250'); // Advanced
    }
  };

  return (
    <div className="rounded-2xl border border-brand-teal/20 bg-slate-900/50 backdrop-blur-lg p-6 shadow-lg">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/20 border border-brand-teal/30 text-brand-teal">
            <Calculator size={20} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">Financial HUD</p>
            <h3 className="text-2xl font-semibold text-brand-text">ROI Modeler</h3>
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-brand-muted cursor-pointer select-none">
          <input
            type="checkbox"
            checked={demoMode}
            onChange={toggleDemo}
            className="h-4 w-4 rounded border-brand-teal/60 bg-slate-900 text-brand-teal focus:ring-brand-teal"
            aria-label="Toggle demo data"
          />
          Demo Data
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label className="text-sm text-brand-muted mb-2 block">Avg. Reimbursement per Session ($)</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={300}
                step={1}
                value={reimbursement}
                onChange={(e) => handleReimbursementChange(Number(e.target.value))}
                className="w-full accent-brand-teal"
                aria-describedby="reimbursement-helper"
              />
              <input
                type="number"
                min={0}
                max={300}
                value={reimbursement}
                onChange={(e) => handleReimbursementChange(Number(e.target.value) || 0)}
                className="w-20 rounded-lg border border-brand-teal/30 bg-slate-900/70 px-3 py-2 text-brand-text focus:border-brand-teal focus:outline-none"
                style={fontMono}
                aria-describedby="reimbursement-helper"
              />
            </div>
            <p
              id="reimbursement-helper"
              className={`text-xs mt-1 ${reimbursement > 200 ? 'text-amber-400' : 'text-brand-muted'}`}
            >
              {reimbursementHelper}
            </p>
          </div>

          <div>
            <label className="text-sm text-brand-muted mb-2 block">Graston Sessions per Week</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={patientsPerWeek}
                onChange={(e) => handlePatientsChange(Number(e.target.value))}
                className="w-full accent-brand-teal"
                aria-describedby="patients-helper"
              />
              <input
                type="number"
                min={0}
                max={100}
                value={patientsPerWeek}
                onChange={(e) => handlePatientsChange(Number(e.target.value) || 0)}
                className="w-20 rounded-lg border border-brand-teal/30 bg-slate-900/70 px-3 py-2 text-brand-text focus:border-brand-teal focus:outline-none"
                style={fontMono}
                aria-describedby="patients-helper"
              />
            </div>
            <p id="patients-helper" className="text-xs text-brand-muted mt-1">
              Max 100 sessions/week
            </p>
          </div>

          <div>
            <label className="text-sm text-brand-muted mb-2 block">Bundle Investment</label>
            <select
              value={bundleKey}
              onChange={(e) => setBundleKey(e.target.value as BundleKey)}
              className="w-full rounded-lg border border-brand-teal/30 bg-slate-900/70 px-3 py-2 text-brand-text focus:border-brand-teal focus:outline-none"
            >
              {bundleOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.name} — ${option.cost.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-brand-teal/30 bg-slate-950/60 p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-muted">Weekly Revenue</span>
              <Gauge size={18} className="text-brand-teal" />
            </div>
            <div className="text-4xl font-bold text-brand-text" style={fontMono}>
              <AnimatedNumber value={weeklyRevenue} prefix="$" />
            </div>
            <p className="text-xs text-brand-muted mt-1">Patients/Week × Avg. Reimbursement</p>
          </div>

          <div className="rounded-xl border border-brand-teal/30 bg-slate-950/60 p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-muted">Monthly Revenue</span>
              <Gauge size={18} className="text-brand-teal" />
            </div>
            <div className="text-4xl font-bold text-brand-text" style={fontMono}>
              <AnimatedNumber value={monthlyRevenue} prefix="$" />
            </div>
            <p className="text-xs text-brand-muted mt-1">Based on 4-week cycle</p>
          </div>

          <div className="rounded-xl border border-brand-orange/40 bg-slate-950/60 p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-muted">Time to Profit</span>
              <Rocket size={18} className="text-brand-orange" />
            </div>
            <div className="flex items-end justify-between gap-3">
              <div className="text-3xl font-bold text-brand-text" style={fontMono}>
                <AnimatedNumber value={breakEvenWeeks} suffix=" wks" />
              </div>
              <span className="text-xs text-brand-muted">Recover investment in weeks</span>
            </div>
            <div className="mt-3 h-3 w-full rounded-full bg-slate-800 overflow-hidden border border-brand-orange/30">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-teal to-brand-orange"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Number(progressPercent.toFixed(0))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;
