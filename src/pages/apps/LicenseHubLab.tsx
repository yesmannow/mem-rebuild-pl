import React, { useMemo, useState } from 'react';
import { MapPin, BellRing, Shield, Search, Activity } from 'lucide-react';
import { AppShell } from '../../components/apps/AppShell';
import type { ProfessionType, StateLicenseData } from '../../data/licenseData';
import { getLicenseData } from '../../data/licenseData';

const tools = [
  { id: 'directory', label: 'State Directory', icon: <MapPin size={16} /> },
  { id: 'alerts', label: 'Compliance Alerts', icon: <BellRing size={16} /> },
] as const;

type ToolId = (typeof tools)[number]['id'];

const professions: { id: ProfessionType; label: string; summary: string }[] = [
  { id: 'pt', label: 'Physical Therapy', summary: '50 states | PT + PTA hour tracking' },
  { id: 'ot', label: 'Occupational Therapy', summary: 'NBCOT alignment + ethics flags' },
  { id: 'dc', label: 'Chiropractic', summary: 'Renewal cadence + jurisprudence' },
  { id: 'at', label: 'Athletic Training', summary: 'BOC + state overlays' },
];

interface StateRow {
  code: string;
  data: StateLicenseData;
}

const LicenseHubLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId>('directory');
  const [profession, setProfession] = useState<ProfessionType>('pt');
  const [query, setQuery] = useState('');

  const states = useMemo<StateRow[]>(() => {
    const dataset = getLicenseData(profession);
    return Object.entries(dataset)
      .map(([code, data]) => ({ code, data }))
      .sort((a, b) => a.data.stateName.localeCompare(b.data.stateName));
  }, [profession]);

  const filteredStates = useMemo(() => {
    if (!query.trim()) return states;
    const needle = query.trim().toLowerCase();
    return states.filter(
      (row) =>
        row.code.toLowerCase().includes(needle) ||
        row.data.stateName.toLowerCase().includes(needle) ||
        (row.data.notes?.toLowerCase().includes(needle) ?? false)
    );
  }, [query, states]);

  const renderDirectory = () => (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {professions.map((item) => (
          <button
            key={item.id}
            onClick={() => setProfession(item.id)}
            className={`rounded-2xl border px-4 py-4 text-left transition-all ${
              profession === item.id
                ? 'border-brand-teal bg-brand-teal/10 text-brand-text shadow-lg'
                : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-brand-teal/40 hover:text-brand-text'
            }`}
          >
            <p className="text-sm font-semibold tracking-wide uppercase text-slate-400">{item.label}</p>
            <p className="text-xs mt-2 text-slate-500">{item.summary}</p>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-3">
          <Search size={16} className="text-brand-teal" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by state, code, or keyword (e.g., ethics, CPR)"
            className="w-full bg-transparent text-brand-text placeholder-slate-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
          <Shield size={14} />
          <span>{filteredStates.length} States</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredStates.map((row) => (
          <div key={row.code} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-inner">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{row.code}</p>
                <h3 className="text-lg font-semibold text-brand-text">{row.data.stateName}</h3>
              </div>
              <MapPin className="text-brand-teal" size={18} />
            </div>
            <p className="mt-3 text-sm text-slate-400">{row.data.boardName}</p>
            <a
              href={row.data.boardUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex text-xs text-brand-teal hover:underline"
            >
              Visit board site →
            </a>
            <dl className="mt-4 space-y-1 text-xs text-slate-400">
              {Object.entries(row.data)
                .filter(([key]) => key.endsWith('Hours') || key === 'notes')
                .map(([key, value]) => (
                  <div key={key}>
                    <dt className="uppercase tracking-[0.2em] text-slate-500">{key}</dt>
                    <dd className="text-brand-text/80">{value}</dd>
                  </div>
                ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-8 text-amber-100">
      <div className="flex items-center gap-3 text-amber-300">
        <BellRing size={18} />
        <p className="text-xs uppercase tracking-[0.3em]">Automation Stub</p>
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-brand-text">Live CEU alerts will appear here.</h3>
      <p className="mt-3 text-sm text-amber-100/80 max-w-2xl">
        This view will subscribe to the same worker that powers production alerts. It will hydrate renewal cadences, CE hour deltas,
        and risk scoring so compliance teams can triage upcoming deadlines from one screen.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3 text-slate-900">
        {[{ label: '90 day horizon', value: '42 licenses' }, { label: 'States with ethics gaps', value: '12' }, { label: 'Risk score > 70', value: '6 accounts' }].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white/90 p-4 shadow-lg">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <AppShell
      title="License Hub"
      description="Unified compliance cockpit for PT/OT/DC/AT CE tracking across every jurisdiction."
      icon={<Shield className="text-brand-turquoise" size={28} />}
      tools={tools}
      activeTool={activeTool}
      onToolChange={(toolId) => setActiveTool(toolId as ToolId)}
    >
      <div className="space-y-8">
        <p className="text-sm text-slate-400 max-w-3xl">
          Pulling from the same normalized dataset that feeds the production platform. Filter by profession, search any state, and capture CE
          nuances (ethics, jurisprudence, CPR) without cracking a spreadsheet.
        </p>

        {activeTool === 'directory' && renderDirectory()}
        {activeTool === 'alerts' && renderAlerts()}
      </div>
    </AppShell>
  );
};

export default LicenseHubLab;
