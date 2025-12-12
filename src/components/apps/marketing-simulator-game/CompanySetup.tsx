import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CompanySetup as CompanySetupType, Industry, CompanySize, MarketLandscape, TimeHorizon } from '@/lib/marketing-simulator/types';
import { Building2, TrendingUp, Clock, DollarSign, Target } from 'lucide-react';

interface Props {
  onComplete: (setup: CompanySetupType) => void;
}

const CompanySetup: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState<Industry>('saas');
  const [companySize, setCompanySize] = useState<CompanySize>('smb');
  const [marketLandscape, setMarketLandscape] = useState<MarketLandscape>('crowded');
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('1-year');
  const [totalBudget, setTotalBudget] = useState(100000);
  const [brandAwareness, setBrandAwareness] = useState(30);
  const [leadGeneration, setLeadGeneration] = useState(50);
  const [conversionOptimization, setConversionOptimization] = useState(20);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      onComplete({
        companyName,
        industry,
        companySize,
        marketLandscape,
        timeHorizon,
        budgetAllocation: {
          brandAwareness,
          leadGeneration,
          conversionOptimization,
        },
        totalBudget,
      });
    }
  };

  const isStep1Valid = companyName.length >= 2;
  const isStep2Valid = true;
  const isStep3Valid = brandAwareness + leadGeneration + conversionOptimization === 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  s === step
                    ? 'bg-brand-teal text-brand-dark shadow-[0_0_20px_rgba(64,224,208,0.5)]'
                    : s < step
                    ? 'bg-brand-teal/50 text-brand-text'
                    : 'bg-slate-800 text-brand-muted'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-1 w-16 md:w-32 ml-2 transition-all ${
                    s < step ? 'bg-brand-teal' : 'bg-slate-800'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-brand-muted px-2">
          <span>Company Info</span>
          <span>Market Context</span>
          <span>Budget Setup</span>
        </div>
      </div>

      {/* Step 1: Company Basics */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-brand-text mb-6 flex items-center gap-2">
            <Building2 className="text-brand-teal" />
            Company Basics
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-brand-text mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g., TechStart Solutions"
                className="w-full px-4 py-3 bg-slate-800/60 border border-brand-teal/30 rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-text mb-3">
                Industry
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: 'healthcare', label: 'Healthcare', desc: 'High trust, long sales cycles' },
                  { value: 'legal', label: 'Legal Services', desc: 'Referral-driven, reputation-sensitive' },
                  { value: 'ecommerce', label: 'E-commerce', desc: 'Fast iterations, high competition' },
                  { value: 'saas', label: 'SaaS', desc: 'Product-led growth, retention focus' },
                  { value: 'manufacturing', label: 'Manufacturing', desc: 'Relationship-based, long contracts' },
                ].map(ind => (
                  <button
                    key={ind.value}
                    onClick={() => setIndustry(ind.value as Industry)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      industry === ind.value
                        ? 'border-brand-teal bg-brand-teal/10 shadow-[0_0_20px_rgba(64,224,208,0.2)]'
                        : 'border-slate-700 hover:border-brand-teal/50'
                    }`}
                  >
                    <div className="font-semibold text-brand-text">{ind.label}</div>
                    <div className="text-xs text-brand-muted mt-1">{ind.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-text mb-3">
                Company Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'startup', label: 'Startup', desc: '$1-10M ARR' },
                  { value: 'smb', label: 'SMB', desc: '$10-50M ARR' },
                  { value: 'enterprise', label: 'Enterprise', desc: '$50M+ ARR' },
                ].map(size => (
                  <button
                    key={size.value}
                    onClick={() => setCompanySize(size.value as CompanySize)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      companySize === size.value
                        ? 'border-brand-teal bg-brand-teal/10'
                        : 'border-slate-700 hover:border-brand-teal/50'
                    }`}
                  >
                    <div className="font-semibold text-brand-text text-sm">{size.label}</div>
                    <div className="text-xs text-brand-muted mt-1">{size.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2: Market Context */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-brand-text mb-6 flex items-center gap-2">
            <TrendingUp className="text-brand-teal" />
            Market Context
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-brand-text mb-3">
                Market Landscape
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { value: 'disruptor', label: 'Disruptor', desc: 'Challenging incumbents, high risk' },
                  { value: 'crowded', label: 'Crowded Field', desc: 'Many competitors, differentiation key' },
                  { value: 'frontier', label: 'Open Frontier', desc: 'New market, education needed' },
                ].map(landscape => (
                  <button
                    key={landscape.value}
                    onClick={() => setMarketLandscape(landscape.value as MarketLandscape)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      marketLandscape === landscape.value
                        ? 'border-brand-teal bg-brand-teal/10'
                        : 'border-slate-700 hover:border-brand-teal/50'
                    }`}
                  >
                    <div className="font-semibold text-brand-text text-sm">{landscape.label}</div>
                    <div className="text-xs text-brand-muted mt-1">{landscape.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-text mb-3">
                Time Horizon
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '1-year', label: '1 Year', desc: 'Quick wins focus' },
                  { value: '3-year', label: '3 Years', desc: 'Balanced approach' },
                  { value: '5-year', label: '5 Years', desc: 'Long-term strategy' },
                ].map(horizon => (
                  <button
                    key={horizon.value}
                    onClick={() => setTimeHorizon(horizon.value as TimeHorizon)}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      timeHorizon === horizon.value
                        ? 'border-brand-teal bg-brand-teal/10'
                        : 'border-slate-700 hover:border-brand-teal/50'
                    }`}
                  >
                    <div className="font-semibold text-brand-text text-sm">{horizon.label}</div>
                    <div className="text-xs text-brand-muted mt-1">{horizon.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-text mb-3">
                Annual Marketing Budget
              </label>
              <input
                type="range"
                min="25000"
                max="500000"
                step="25000"
                value={totalBudget}
                onChange={e => setTotalBudget(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-2">
                <span className="text-2xl font-bold text-brand-teal">
                  ${totalBudget.toLocaleString()}
                </span>
                <span className="text-sm text-brand-muted ml-2">/ year</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Budget Allocation */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900/70 backdrop-blur-lg border border-brand-teal/20 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-brand-text mb-6 flex items-center gap-2">
            <Target className="text-brand-teal" />
            Budget Allocation Strategy
          </h2>

          <p className="text-brand-muted mb-6">
            Allocate your budget across three key areas. Total must equal 100%.
          </p>

          <div className="space-y-6">
            {[
              {
                label: 'Brand Awareness',
                value: brandAwareness,
                setValue: setBrandAwareness,
                desc: 'Top of funnel: PR, content, social media',
              },
              {
                label: 'Lead Generation',
                value: leadGeneration,
                setValue: setLeadGeneration,
                desc: 'Middle funnel: Paid ads, SEO, webinars',
              },
              {
                label: 'Conversion Optimization',
                value: conversionOptimization,
                setValue: setConversionOptimization,
                desc: 'Bottom funnel: Email, retargeting, sales enablement',
              },
            ].map(allocation => (
              <div key={allocation.label}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-semibold text-brand-text">{allocation.label}</div>
                    <div className="text-xs text-brand-muted">{allocation.desc}</div>
                  </div>
                  <div className="text-2xl font-bold text-brand-teal">{allocation.value}%</div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={allocation.value}
                  onChange={e => {
                    const newValue = Number(e.target.value);
                    const otherTotal = 100 - newValue;
                    const otherValues = [brandAwareness, leadGeneration, conversionOptimization].filter(
                      (_, i) =>
                        [brandAwareness, leadGeneration, conversionOptimization].indexOf(allocation.value) !== i
                    );
                    allocation.setValue(newValue);
                  }}
                  className="w-full"
                />
              </div>
            ))}

            <div
              className={`p-4 rounded-lg border-2 text-center ${
                isStep3Valid
                  ? 'border-green-500/50 bg-green-500/10'
                  : 'border-red-500/50 bg-red-500/10'
              }`}
            >
              <div className="font-semibold">
                Total: {brandAwareness + leadGeneration + conversionOptimization}%
              </div>
              {!isStep3Valid && (
                <div className="text-xs text-red-400 mt-1">Must equal exactly 100%</div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className="px-6 py-3 rounded-lg bg-slate-800 text-brand-text font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-all"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={
            (step === 1 && !isStep1Valid) ||
            (step === 2 && !isStep2Valid) ||
            (step === 3 && !isStep3Valid)
          }
          className="px-8 py-3 rounded-lg bg-brand-teal text-brand-dark font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(64,224,208,0.4)] transition-all"
        >
          {step === 3 ? 'Start Campaign' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default CompanySetup;
