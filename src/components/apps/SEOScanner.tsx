import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, ImageIcon, LinkIcon, Loader2, ShieldCheck } from 'lucide-react';
import SEOHead from '../seo/SEOHead';

interface AuditResult {
  title: string;
  description: string;
  h1: string;
  ogImage: string;
}

type CardStatus = 'pass' | 'warn' | 'fail';

const statusClasses: Record<CardStatus, string> = {
  pass: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
  warn: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  fail: 'border-rose-400/40 bg-rose-400/10 text-rose-200',
};

const normalizeUrl = (raw: string): string => {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `https://${trimmed}`;
};

const SeoScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const evaluateTitle = (title: string): CardStatus => {
    if (!title) return 'fail';
    if (title.length > 60) return 'warn';
    return 'pass';
  };

  const evaluateDescription = (description: string): CardStatus => {
    if (!description) return 'fail';
    return 'pass';
  };

  const evaluateH1 = (h1: string): CardStatus => (h1 ? 'pass' : 'fail');

  const cards = useMemo(() => {
    if (!result) return [];
    return [
      {
        label: 'Title Tag',
        value: result.title || 'Missing title tag',
        status: evaluateTitle(result.title),
        helper:
          result.title && result.title.length > 60
            ? 'Consider trimming to 60 characters.'
            : result.title
            ? `${result.title.length} characters`
            : 'Add a concise, keyword-led title.',
      },
      {
        label: 'Meta Description',
        value: result.description || 'Meta description is missing.',
        status: evaluateDescription(result.description),
        helper: result.description
          ? `${result.description.length} characters`
          : 'Add a compelling, 150–160 character summary.',
      },
      {
        label: 'H1',
        value: result.h1 || 'H1 not found.',
        status: evaluateH1(result.h1),
        helper: result.h1 ? 'Single primary heading detected.' : 'Add one clear H1 per page.',
      },
      {
        label: 'Open Graph Image',
        value: result.ogImage || 'og:image not detected.',
        status: result.ogImage ? 'pass' : ('warn' as CardStatus),
        helper: result.ogImage ? 'Preview ready for social shares.' : 'Add an og:image for rich cards.',
      },
    ];
  }, [result]);

  const handleScan = async () => {
    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) {
      setError('Enter a valid URL first.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/audit-url?url=${encodeURIComponent(normalizedUrl)}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Could not scan target');
      }
      const data: AuditResult = await response.json();
      setResult(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="SEO Scanner | The Lab" description="Edge-powered SEO metadata scanner." />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-brand-text">
        <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 space-y-2 text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">Edge Scanner</p>
            <h1 className="text-4xl md:text-5xl font-bold">SEO Scanner</h1>
            <p className="text-brand-muted">
              Cloudflare Edge HTMLRewriter + Ocean Pearl UI. Paste a URL to get a quick metadata verdict.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-4 shadow-soft-dark"
          >
            <label className="text-sm text-brand-muted mb-2 block font-semibold">Target URL</label>
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex-1 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-inner">
                <div className="flex items-center gap-2 text-brand-muted text-xs font-mono uppercase tracking-[0.2em]">
                  <LinkIcon size={14} className="text-brand-teal" />
                  Address Bar
                </div>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && handleScan()}
                  placeholder="https://example.com"
                  className="mt-1 w-full bg-transparent text-brand-text font-mono text-sm focus:outline-none placeholder:text-slate-500"
                  aria-label="URL to scan"
                />
              </div>
              <button
                type="button"
                onClick={handleScan}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-xl bg-brand-teal px-6 py-3 font-semibold text-slate-900 shadow-accent transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    Scanning...
                  </span>
                ) : (
                  'Run Audit'
                )}
              </button>
            </div>

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-4 rounded-lg border border-brand-teal/30 bg-brand-teal/5 p-3"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-brand-muted">
                    <span>Scanning Edge</span>
                    <span>HTMLRewriter Pass</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      className="h-full bg-brand-teal"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-100"
            >
              <div className="flex items-center gap-2 font-semibold">
                <AlertTriangle size={16} />
                {error}
              </div>
              <p className="text-sm text-rose-200/80 mt-1">
                Make sure the URL is reachable from the public internet.
              </p>
            </motion.div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-6 space-y-4"
              >
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">Result</p>
                      <h2 className="text-2xl font-semibold">Scan Summary</h2>
                      <p className="text-brand-muted text-sm">
                        Title length warning triggers at 60+ characters. Missing description is a hard fail.
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                        evaluateDescription(result.description) === 'fail'
                          ? statusClasses.fail
                          : evaluateTitle(result.title) === 'warn'
                          ? statusClasses.warn
                          : statusClasses.pass
                      }`}
                    >
                      <ShieldCheck size={16} />
                      Edge Verified
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {cards.map((card) => (
                      <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="rounded-xl border border-white/10 bg-slate-950/60 p-4 shadow-soft-dark"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">{card.label}</p>
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold border ${statusClasses[card.status]}`}
                          >
                            {card.status === 'pass'
                              ? 'Pass'
                              : card.status === 'warn'
                              ? 'Warning'
                              : 'Fail'}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-brand-muted line-clamp-3">{card.value}</p>
                        <p className="mt-3 text-xs text-slate-400">{card.helper}</p>
                        {card.label === 'Open Graph Image' && card.status === 'pass' && result.ogImage && (
                          <div className="mt-3 overflow-hidden rounded-lg border border-white/10 bg-slate-900">
                            <div className="relative aspect-video">
                              <img
                                src={result.ogImage}
                                alt="Open Graph preview"
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 to-slate-900/60" />
                              <div className="absolute bottom-2 left-2 flex items-center gap-2 rounded-md bg-slate-900/70 px-2 py-1 text-[11px] text-brand-text">
                                <ImageIcon size={12} />
                                og:image
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!result && !loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-xl border border-dashed border-brand-teal/40 bg-brand-teal/5 p-5 text-center"
            >
              <p className="text-sm text-brand-muted">
                Paste a live URL to pull Title, Meta Description, first H1, and og:image directly from the edge.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
};

export default SeoScanner;
