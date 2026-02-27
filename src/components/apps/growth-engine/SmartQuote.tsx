import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, SlidersHorizontal } from 'lucide-react';
import { PRICING_DATA } from '../../../data/labData';
import AnimatedNumber from './AnimatedNumber';

type BundleKey = keyof typeof PRICING_DATA;
type CustomerType = 'retail' | 'corporate';

interface QuoteLine {
  label: string;
  value: number;
}

const PRICING_CONFIG = {
  discounts: {
    retail: 1,
    corporate: 0.9,
  } as Record<CustomerType, number>,
  implementationRate: 0.12,
};

const fontMono = { fontFamily: 'Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' };

const SmartQuote: React.FC = () => {
  const [bundleKey, setBundleKey] = useState<BundleKey>('2890');
  const [customerType, setCustomerType] = useState<CustomerType>('retail');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [repEmail, setRepEmail] = useState('');

  const bundle = PRICING_DATA[bundleKey];

  const price = useMemo(() => {
    if (!bundle) return 0;
    const multiplier = PRICING_CONFIG.discounts[customerType] ?? 1;
    return Math.round(bundle.salePrice * multiplier);
  }, [bundle, customerType]);

  const quoteLines: QuoteLine[] = useMemo(
    () => [
      { label: bundle?.name ?? 'Bundle', value: price },
      { label: 'Implementation Sprint', value: Math.round(price * PRICING_CONFIG.implementationRate) },
    ],
    [bundle?.name, price]
  );

  const total = useMemo(() => quoteLines.reduce((sum, line) => sum + line.value, 0), [quoteLines]);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Quote: ${bundle?.name ?? 'Growth Engine Bundle'}`);
    const body = encodeURIComponent(
      `Customer: ${customerName || 'Prospect'}\nCustomer Type: ${customerType}\n\n` +
        quoteLines.map((l) => `${l.label}: $${l.value.toLocaleString()}`).join('\n') +
        `\n\nTotal: $${total.toLocaleString()}\n\nReply to confirm and we'll initiate onboarding.`
    );
    const toField =
      customerEmail && customerName
        ? encodeURIComponent(`${customerName} <${customerEmail}>`)
        : customerEmail
        ? encodeURIComponent(customerEmail)
        : '';
    const cc = repEmail ? `&cc=${encodeURIComponent(repEmail)}` : '';
    return `mailto:${toField}?subject=${subject}&body=${body}${cc}`;
  }, [bundle?.name, customerEmail, customerName, customerType, quoteLines, repEmail, total]);

  const handleGenerate = () => {
    window.location.href = mailto;
    window.alert('Quote generated! Check your email draft.');
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/20 border border-brand-orange/30 text-brand-orange">
          <SlidersHorizontal size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">Configurator</p>
          <h3 className="text-2xl font-semibold text-brand-text">Smart Quote</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-sm text-brand-muted mb-2 block">Bundle Type</label>
              <select
                value={bundleKey}
                onChange={(e) => setBundleKey(e.target.value as BundleKey)}
                className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2 text-brand-text focus:border-cyan-400 focus:outline-none"
              >
                {(Object.keys(PRICING_DATA) as BundleKey[]).map((key) => (
                  <option key={key} value={key}>
                    {PRICING_DATA[key].name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-brand-muted mb-2 block">Customer Type</label>
              <div className="flex gap-2">
                {(['retail', 'corporate'] as CustomerType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setCustomerType(type)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                      customerType === type
                        ? 'border-cyan-400 bg-cyan-400/20 text-brand-text'
                        : 'border-white/10 bg-white/5 backdrop-blur-xl text-brand-muted hover:border-cyan-400/40'
                    }`}
                  >
                    {type === 'retail' ? 'Retail' : 'Corporate'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-brand-muted mb-2 block">Rep Email (CC)</label>
              <input
                type="email"
                value={repEmail}
                onChange={(e) => setRepEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2 text-brand-text focus:border-cyan-400 focus:outline-none"
                placeholder="rep@team.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-brand-muted mb-2 block">Customer Name (optional)</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2 text-brand-text focus:border-cyan-400 focus:outline-none"
              placeholder="Jordan Smith"
              aria-label="Customer name"
            />
          </div>

          <div>
            <label className="text-sm text-brand-muted mb-2 block">Customer Email (optional)</label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2 text-brand-text focus:border-cyan-400 focus:outline-none"
              placeholder="client@email.com"
              aria-label="Customer email"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-muted">Quote Preview</span>
              <Mail size={18} className="text-brand-orange" />
            </div>
            <div className="mt-3 space-y-2">
              {quoteLines.map((line) => (
                <div key={line.label} className="flex items-center justify-between text-brand-text">
                  <span className="text-sm text-brand-muted">{line.label}</span>
                  <span className="text-lg font-semibold" style={fontMono}>
                    <AnimatedNumber value={line.value} prefix="$" />
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-brand-orange/20 pt-3 flex items-center justify-between">
              <span className="text-sm text-brand-muted uppercase tracking-[0.2em]">Total</span>
              <span className="text-2xl font-bold text-brand-orange" style={fontMono}>
                <AnimatedNumber value={total} prefix="$" />
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange text-brand-dark px-4 py-3 font-semibold shadow-[0_10px_30px_rgba(255,165,0,0.35)] transition-colors hover:bg-brand-orange/90 w-full"
          >
            <Mail size={18} />
            Generate Quote
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SmartQuote;
