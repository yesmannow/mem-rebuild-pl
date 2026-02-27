import React, { useMemo, useState } from 'react';
import { Compass, Stethoscope, ListChecks } from 'lucide-react';
import { AppShell } from '../../components/apps/AppShell';
import { protocolData, instrumentData, type RegionData, type PathologyData } from '../../data/protocolData';

const tools = [{ id: 'wizard', label: 'Protocol Wizard', icon: <ListChecks size={16} /> }] as const;
type ToolId = (typeof tools)[number]['id'];

type RegionKey = keyof typeof protocolData;

const ClinicalCompassLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId>('wizard');
  const [regionKey, setRegionKey] = useState<RegionKey>('cervicalSpine');
  const [pathologyKey, setPathologyKey] = useState<string>('general');

  const regionEntries = useMemo(() => Object.entries(protocolData) as [RegionKey, RegionData][], []);

  const currentRegion = useMemo(() => protocolData[regionKey], [regionKey]);

  const pathologyEntries = useMemo(
    () => Object.entries(currentRegion.pathologies) as [string, PathologyData][],
    [currentRegion.pathologies]
  );

  const currentPathology = useMemo(() => currentRegion.pathologies[pathologyKey] ?? pathologyEntries[0]?.[1], [
    currentRegion.pathologies,
    pathologyEntries,
    pathologyKey,
  ]);

  return (
    <AppShell
      title="Clinical Compass"
      description="Evidence-based protocol wizard running on the same data that powers the production companion app."
      icon={<Compass className="text-brand-turquoise" size={28} />}
      tools={tools}
      activeTool={activeTool}
      onToolChange={(toolId) => setActiveTool(toolId as ToolId)}
    >
      <div className="space-y-8">
        <p className="text-sm text-brand-muted max-w-3xl">
          Choose a region + pathology to preview the generated treatment protocol. The wizard uses the hierarchical protocolData + instrument
          knowledge base extracted from the legacy Clinical Compass app.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Region</label>
            <select
              value={regionKey}
              onChange={(event) => {
                const nextRegion = event.target.value as RegionKey;
                setRegionKey(nextRegion);
                setPathologyKey(Object.keys(protocolData[nextRegion].pathologies)[0]);
              }}
              className="mt-2 w-full rounded-xl border border-slate-800 bg-transparent px-3 py-2 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
            >
              {regionEntries.map(([key, region]) => (
                <option key={key} value={key} className="bg-slate-900">
                  {region.displayName}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Pathology</label>
            <select
              value={pathologyKey}
              onChange={(event) => setPathologyKey(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-800 bg-transparent px-3 py-2 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
            >
              {pathologyEntries.map(([key, pathology]) => (
                <option key={key} value={key} className="bg-slate-900">
                  {pathology.displayName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {currentPathology && (
          <div className="rounded-2xl border border-brand-teal/20 bg-slate-950/60 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Stethoscope className="text-brand-teal" size={20} />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Base Protocol</p>
                <h3 className="text-2xl font-semibold text-brand-text">{currentPathology.displayName}</h3>
              </div>
            </div>

            <ol className="space-y-3">
              {currentPathology.baseProtocol.map((step, idx) => (
                <li key={`${step.area}-${idx}`} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Step {idx + 1}</p>
                  <h4 className="text-lg font-semibold text-brand-text">{step.area}</h4>
                  <p className="text-sm text-slate-400">Stroke: {step.stroke}</p>
                  <p className="text-sm text-slate-400">Instruments: {step.instruments}</p>
                </li>
              ))}
            </ol>

            <div className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-200">Adjunctive Care</p>
              <p className="mt-2 text-sm text-purple-50">{currentPathology.adjunctiveCare}</p>
            </div>

            {currentPathology.findings && (
              <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Clinical modifiers</p>
                <ul className="mt-2 space-y-2">
                  {Object.entries(currentPathology.findings).map(([key, value]) => (
                    <li key={key} className="text-sm text-amber-100">
                      <span className="font-semibold uppercase tracking-wide text-amber-200">{key}:</span> {value.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Instrument knowledge base</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {Object.entries(instrumentData).slice(0, 4).map(([key, instrument]) => (
              <div key={key} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{instrument.name}</p>
                <p className="mt-2 text-sm text-slate-400">{instrument.rationale}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Full catalog will hydrate from COMPASS_DATA when the Production CMS endpoint is ready.
          </p>
        </div>
      </div>
    </AppShell>
  );
};

export default ClinicalCompassLab;
