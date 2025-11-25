import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SEOAuditResult {
  url: string;
  title: string | null;
  titleLength: number;
  metaDescription: string | null;
  metaDescriptionLength: number;
  h1Count: number;
  h1Text: string[];
  healthScore: number;
  issues: string[];
  timestamp: string;
}

const SEOScanner: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SEOAuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Call the Cloudflare Pages function
      const apiUrl = `/api/audit-url?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to scan URL');
      }

      const data: SEOAuditResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleScan();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/20 border-green-500/50';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/50';
    return 'bg-red-500/20 border-red-500/50';
  };

  const getBadgeColor = (isGood: boolean) => {
    return isGood
      ? 'bg-green-500/20 border-green-500/50 text-green-400'
      : 'bg-red-500/20 border-red-500/50 text-red-400';
  };

  return (
    <div className="min-h-screen bg-brand-dark py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">SEO Scanner</h1>
          <p className="text-brand-muted text-lg">
            Edge audit tool for technical SEO analysis
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-6 border border-brand-teal/20 mb-6"
        >
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter URL to scan (e.g., example.com or https://example.com)"
                className="w-full px-4 py-3 bg-brand-dark border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleScan}
              disabled={loading || !url.trim()}
              className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                loading || !url.trim()
                  ? 'bg-brand-surface/30 text-brand-muted cursor-not-allowed'
                  : 'bg-brand-teal hover:bg-brand-teal/80 text-brand-dark'
              }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>🔍</span>
                  <span>Scan</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-400 mb-6"
          >
            <strong>Error:</strong> {error}
          </motion.div>
        )}

        {/* Results Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-6 border border-brand-teal/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">SEO Report Card</h2>

            {/* Health Score */}
            <div className={`mb-6 p-6 rounded-lg border-2 ${getScoreBgColor(result.healthScore)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-brand-muted">Health Score</span>
                <span className={`text-4xl font-bold ${getScoreColor(result.healthScore)}`}>
                  {result.healthScore}
                </span>
              </div>
              <div className="w-full bg-brand-dark/50 rounded-full h-3 mt-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.healthScore}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-3 rounded-full ${
                    result.healthScore >= 80
                      ? 'bg-green-500'
                      : result.healthScore >= 60
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                />
              </div>
            </div>

            {/* Report Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Title Check */}
              <div className="bg-brand-dark/50 rounded-lg p-4 border border-brand-teal/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Title Tag</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      result.title && result.titleLength >= 30 && result.titleLength <= 60
                        ? getBadgeColor(true)
                        : getBadgeColor(false)
                    }`}
                  >
                    {result.title && result.titleLength >= 30 && result.titleLength <= 60
                      ? '✓ Good'
                      : '✗ Issue'}
                  </span>
                </div>
                {result.title ? (
                  <div className="text-sm text-brand-muted mt-2">
                    <div className="text-white mb-1 line-clamp-2">{result.title}</div>
                    <div className="text-xs">
                      {result.titleLength} characters
                      {result.titleLength < 30 && ' (too short)'}
                      {result.titleLength > 60 && ' (too long)'}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-red-400 mt-2">Missing</div>
                )}
              </div>

              {/* Meta Description Check */}
              <div className="bg-brand-dark/50 rounded-lg p-4 border border-brand-teal/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Meta Description</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      result.metaDescription &&
                      result.metaDescriptionLength >= 120 &&
                      result.metaDescriptionLength <= 160
                        ? getBadgeColor(true)
                        : getBadgeColor(false)
                    }`}
                  >
                    {result.metaDescription &&
                    result.metaDescriptionLength >= 120 &&
                    result.metaDescriptionLength <= 160
                      ? '✓ Good'
                      : '✗ Issue'}
                  </span>
                </div>
                {result.metaDescription ? (
                  <div className="text-sm text-brand-muted mt-2">
                    <div className="text-white mb-1 line-clamp-2">{result.metaDescription}</div>
                    <div className="text-xs">
                      {result.metaDescriptionLength} characters
                      {result.metaDescriptionLength < 120 && ' (too short)'}
                      {result.metaDescriptionLength > 160 && ' (too long)'}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-red-400 mt-2">Missing</div>
                )}
              </div>

              {/* H1 Check */}
              <div className="bg-brand-dark/50 rounded-lg p-4 border border-brand-teal/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">H1 Tag</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                      result.h1Count === 1 ? getBadgeColor(true) : getBadgeColor(false)
                    }`}
                  >
                    {result.h1Count === 1 ? '✓ Good' : '✗ Issue'}
                  </span>
                </div>
                <div className="text-sm text-brand-muted mt-2">
                  {result.h1Count > 0 ? (
                    <>
                      <div className="text-white mb-1">
                        {result.h1Count} {result.h1Count === 1 ? 'tag found' : 'tags found'}
                      </div>
                      {result.h1Text.length > 0 && (
                        <div className="text-xs text-white line-clamp-2">
                          {result.h1Text[0]}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-red-400">Missing</div>
                  )}
                </div>
              </div>
            </div>

            {/* Issues List */}
            {result.issues.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Issues Found</h3>
                <div className="space-y-2">
                  {result.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm"
                    >
                      ⚠️ {issue}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Raw Data */}
            <details className="mt-6">
              <summary className="text-brand-muted cursor-pointer hover:text-white">
                View Raw Data
              </summary>
              <pre className="mt-4 bg-brand-dark rounded-lg p-4 text-xs text-brand-muted overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </motion.div>
        )}

        {/* Info Box */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-brand-teal/10 border border-brand-teal/30 rounded-lg p-6 text-center"
          >
            <p className="text-brand-muted">
              Enter a URL above to scan for SEO metadata, title tags, meta descriptions, and H1
              tags.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SEOScanner;

