import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PRICING_DATA } from '../../data/pricingData';

interface BundleData {
  name: string;
  features: string[];
  regularPrice: number;
  salePrice: number;
}

const ROICalculator: React.FC = () => {
  const [reimbursement, setReimbursement] = useState(45);
  const [patients, setPatients] = useState(3);
  const [selectedBundle, setSelectedBundle] = useState<string>('2890');
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [breakEvenWeeks, setBreakEvenWeeks] = useState(0);

  const bundle = PRICING_DATA[selectedBundle] as BundleData | undefined;

  useEffect(() => {
    const weekly = reimbursement * patients;
    const monthly = weekly * 4;
    const bundleCost = bundle?.salePrice || 0;
    const breakEven = weekly > 0 ? Math.ceil(bundleCost / weekly) : 0;

    setWeeklyRevenue(weekly);
    setMonthlyRevenue(monthly);
    setBreakEvenWeeks(breakEven);
  }, [reimbursement, patients, bundle]);

  const formatCurrency = (value: number): string => {
    return `$${Number(value).toFixed(0)}`;
  };

  const handleReimbursementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setReimbursement(value);
    }
  };

  const handlePatientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 20) {
      setPatients(value);
    }
  };

  const handleReset = () => {
    setReimbursement(45);
    setPatients(3);
    setSelectedBundle('2890');
  };

  const progressPercentage = breakEvenWeeks > 0
    ? Math.min(100, (weeklyRevenue * 12) / (bundle?.salePrice || 1) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-brand-surface rounded-2xl p-8 shadow-lg border border-white/10"
      >
        <h2 className="text-3xl font-bold text-brand-dark mb-8 text-center">
          Investment & ROI Planner
        </h2>

        {/* Section 1: Clinic Numbers */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-brand-dark mb-6">
            1. Enter Your Clinic's Numbers
          </h3>

          <div className="space-y-6">
            {/* Reimbursement Slider */}
            <div>
              <label
                htmlFor="reimbursementSlider"
                className="block text-base font-medium text-brand-dark mb-3"
              >
                Avg. Reimbursement per Session ($)
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <input
                  type="range"
                  id="reimbursementSlider"
                  min="0"
                  max="100"
                  value={reimbursement}
                  onChange={handleReimbursementChange}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-teal min-w-[200px]"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${reimbursement}%, #e1e7ed ${reimbursement}%, #e1e7ed 100%)`,
                  }}
                />
                <input
                  type="text"
                  value={formatCurrency(reimbursement)}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[$,]/g, '');
                    const num = parseFloat(cleaned);
                    if (!isNaN(num) && num >= 0 && num <= 100) {
                      setReimbursement(num);
                    }
                  }}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg text-center font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
            </div>

            {/* Patients Slider */}
            <div>
              <label
                htmlFor="patientsSlider"
                className="block text-base font-medium text-brand-dark mb-3"
              >
                Graston Treatment Sessions per Week
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <input
                  type="range"
                  id="patientsSlider"
                  min="0"
                  max="20"
                  value={patients}
                  onChange={handlePatientsChange}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-teal min-w-[200px]"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(patients / 20) * 100}%, #e1e7ed ${(patients / 20) * 100}%, #e1e7ed 100%)`,
                  }}
                />
                <input
                  type="text"
                  value={patients}
                  onChange={(e) => {
                    const num = parseInt(e.target.value, 10);
                    if (!isNaN(num) && num >= 0 && num <= 20) {
                      setPatients(num);
                    }
                  }}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg text-center font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Bundle Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-brand-dark mb-6">
            2. Choose Your Investment
          </h3>

          <label htmlFor="bundleSelector" className="block text-base font-medium text-brand-dark mb-3">
            Select a Bundle to Calculate:
          </label>
          <select
            id="bundleSelector"
            value={selectedBundle}
            onChange={(e) => setSelectedBundle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-brand-dark font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal appearance-none pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
            }}
          >
            <optgroup label="With Instruments">
              <option value="2890">Essential Practitioner Bundle</option>
              <option value="3250">Advanced Practitioner Bundle</option>
              <option value="3655">Master Practitioner Bundle</option>
            </optgroup>
            <optgroup label="Without Instruments">
              <option value="650">Essential Training Only</option>
              <option value="1370">Advanced Practitioner Bundle (No Instruments)</option>
              <option value="1710">Master Practitioner Bundle (No Instruments)</option>
            </optgroup>
          </select>

          {/* Bundle Details */}
          {bundle && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200"
            >
              <h4 className="text-lg font-semibold text-brand-dark mb-3">{bundle.name}</h4>
              <div className="flex items-baseline gap-3 mb-4">
                {bundle.regularPrice !== bundle.salePrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatCurrency(bundle.regularPrice)}
                  </span>
                )}
                <span className="text-3xl font-bold text-brand-teal">
                  {formatCurrency(bundle.salePrice)}
                </span>
              </div>
              <ul className="space-y-2">
                {bundle.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-brand-dark">
                    <span className="text-brand-teal font-bold">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Section 3: ROI Results */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-brand-dark mb-6">
            3. See Your Projected ROI
          </h3>

          <div className="bg-gray-50 rounded-xl p-8 space-y-6 border border-gray-200">
            <div>
              <div className="text-lg font-medium text-gray-600 mb-2">Added Weekly Revenue</div>
              <motion.div
                key={weeklyRevenue}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-brand-teal"
              >
                {formatCurrency(weeklyRevenue)}
              </motion.div>
            </div>

            <div>
              <div className="text-lg font-medium text-gray-600 mb-2">Added Monthly Revenue</div>
              <motion.div
                key={monthlyRevenue}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-brand-teal"
              >
                {formatCurrency(monthlyRevenue)}
              </motion.div>
            </div>

            <div>
              <div className="text-lg font-medium text-gray-600 mb-2">Break-Even Time</div>
              <motion.div
                key={breakEvenWeeks}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-4xl font-bold text-brand-teal"
              >
                ~{breakEvenWeeks} Weeks
              </motion.div>
            </div>

            {/* Profit Progress Bar */}
            {breakEvenWeeks > 0 && (
              <div className="mt-6">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  Revenue Progress (12 weeks)
                </div>
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-teal to-brand-orange rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, progressPercentage)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset Calculator
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ROICalculator;

