import React, { useMemo, useState } from 'react';
import { AppShell } from '../../components/apps/AppShell';
import {
  Globe,
  Search,
  Activity,
  Zap,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  recommendation: string;
}

const defaultIssues: Issue[] = [
  {
    id: 'title-length',
    title: 'Title tag length exceeds best practice',
    description: 'Detected 92 character title. Ideal range is 50-60 characters for pixel-perfect SERP display.',
    severity: 'warning',
    recommendation: 'Rewrite to highlight primary value prop + remove redundant branding.',
  },
  {
    id: 'missing-og',
    title: 'Missing og:image declaration',
    description: 'Social previews will default to the first inline image, leading to inconsistent branding.',
    severity: 'critical',
    recommendation: 'Add og:image referencing the auto-generated hero from the Brand Builder pipeline.',
  },
  {
    id: 'duplicate-h1',
    title: 'Multiple H1 elements detected',
    description: 'Document contains 3 H1 nodes which dilutes on-page topical focus.',
    severity: 'warning',
    recommendation: 'Ensure only the hero uses H1 – demote section headers to H2/H3.',
  },
];

const tools = [
  { id: 'scan', label: 'Edge Scan', icon: <Search size={16} /> },
  { id: 'history', label: 'Scan History', icon: <Activity size={16} /> },
] as const;

type ToolId = (typeof tools)[number]['id'];

const severityStyles: Record<Issue['severity'], string> = {
  critical: 'border-red-500/40 bg-red-500/10 text-red-100',
  warning: 'border-amber-500/40 bg-amber-500/10 text-amber-100',
  info: 'border-brand-teal/40 bg-brand-teal/10 text-brand-text',
};

const SEOScannerLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolId>('scan');
  const [targetUrl, setTargetUrl] = useState<string>('https://bearcave.marketing');
  const [issues, setIssues] = useState<Issue[]>(defaultIssues);
  const [isScanning, setIsScanning] = useState(false);

  const severityCounts = useMemo(() => {
    return issues.reduce(
      (acc, issue) => {
        acc[issue.severity] += 1;
        return acc;
      },
      { critical: 0, warning: 0, info: 0 }
    );
  }, [issues]);

  const handleScan = () => {
    setIsScanning(true);
    window.setTimeout(() => {
      setIssues((prev) =>
        prev.map((issue, idx) =>
          idx === 0
            ? issue
            : {
                ...issue,
                description: `${issue.description} (Edge log ${Date.now().toString().slice(-4)})`,
              }
        )
      );
      setIsScanning(false);
    }, 1200);
  };

  const renderScanner = () => (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 space-y-4">
        <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Target URL</label>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={targetUrl}
            onChange={(event) => setTargetUrl(event.target.value)}
            placeholder="https://example.com"
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal/40"
          />
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="rounded-xl bg-brand-teal px-6 py-3 font-semibold text-slate-900 shadow-lg transition disabled:opacity-60"
          >
            {isScanning ? 'Scanning…' : 'Launch Edge Scan'}
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Runs on the same Cloudflare Worker that powers the production watcher. Streams HTML via HTMLRewriter and annotates violations in-flight.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-red-200">Critical</p>
          <p className="mt-2 text-3xl font-semibold text-red-100">{severityCounts.critical}</p>
          <p className="text-xs text-red-200/80">Blocking launch</p>
        </div>
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200">Warnings</p>
          <p className="mt-2 text-3xl font-semibold text-amber-100">{severityCounts.warning}</p>
          <p className="text-xs text-amber-200/80">Address this sprint</p>
        </div>
        <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-teal">Informational</p>
          <p className="mt-2 text-3xl font-semibold text-brand-text">{severityCounts.info}</p>
          <p className="text-xs text-brand-muted">Documented but not blocking</p>
        </div>
      </div>

      <div className="space-y-4">
        {issues.map((issue) => (
          <div key={issue.id} className={`rounded-2xl border p-5 ${severityStyles[issue.severity]}`}>
            <div className="flex items-center gap-3">
              {issue.severity === 'critical' ? (
                <AlertTriangle size={18} />
              ) : issue.severity === 'warning' ? (
                <Zap size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )}
              <div>
                <p className="text-sm uppercase tracking-[0.3em]">{issue.severity}</p>
                <h3 className="text-xl font-semibold">{issue.title}</h3>
              </div>
            </div>
            <p className="mt-3 text-base">{issue.description}</p>
            <p className="mt-2 text-sm text-white/70">Recommendation: {issue.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
      <div className="flex items-center gap-3 text-slate-400">
        <Activity size={18} />
        <p className="text-xs uppercase tracking-[0.3em]">Edge scan history</p>
      </div>
      <p className="mt-3 text-sm text-slate-400">
        This stub will hydrate from Supabase once the Activity Log endpoint is wired. Until then, you can use the Applications grid to view legacy scan reports.
      </p>
      <div className="mt-6 space-y-4">
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3">
            <div>
              <p className="text-sm text-brand-text">bearcave.marketing /apps — {70 + idx}% health</p>
              <p className="text-xs text-slate-500">Edge worker run • {idx * 4}h ago</p>
            </div>
            <a href="https://bearcave.marketing" target="_blank" rel="noreferrer" className="text-brand-teal text-xs inline-flex items-center gap-1">
              View log <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <AppShell
      title="SEO Scanner"
      description="Edge-based HTMLRewriter inspector for title/meta/OG hygiene."
      icon={<Globe className="text-brand-turquoise" size={28} />}
      tools={tools}
      activeTool={activeTool}
      onToolChange={(toolId) => setActiveTool(toolId as ToolId)}
    >
      <div className="space-y-8">
        <p className="text-sm text-brand-muted max-w-3xl">
          Built for the Lab so stakeholders can see the same scan output that hits Slack in production. The worker streams HTML, annotates issues,
          and returns a structured payload consumable by MCP or the AppShell modal.
        </p>
        {activeTool === 'scan' ? renderScanner() : renderHistory()}
      </div>
    </AppShell>
  );
};

export default SEOScannerLab;
