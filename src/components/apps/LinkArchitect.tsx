import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface UTMParams {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
}

interface Preset {
  name: string;
  source: string;
  medium: string;
  campaign: string;
}

const PRESETS: Preset[] = [
  { name: 'LinkedIn Organic', source: 'linkedin', medium: 'social', campaign: 'organic' },
  { name: 'LinkedIn Paid', source: 'linkedin', medium: 'social', campaign: 'paid' },
  { name: 'Google CPC', source: 'google', medium: 'cpc', campaign: 'search' },
  { name: 'Google Organic', source: 'google', medium: 'organic', campaign: 'seo' },
  { name: 'Email Newsletter', source: 'email', medium: 'email', campaign: 'newsletter' },
  { name: 'Facebook Ads', source: 'facebook', medium: 'social', campaign: 'paid' },
  { name: 'Twitter Organic', source: 'twitter', medium: 'social', campaign: 'organic' },
  { name: 'Direct Referral', source: 'referral', medium: 'referral', campaign: 'direct' },
];

const LinkArchitect: React.FC = () => {
  const [params, setParams] = useState<UTMParams>({
    url: '',
    source: '',
    medium: '',
    campaign: '',
    content: '',
    term: '',
  });
  const [builtUrl, setBuiltUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);

  // Normalize input: lowercase, replace spaces with hyphens, strip illegal chars
  const normalizeInput = (value: string): string => {
    return value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-_]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Build UTM URL
  useEffect(() => {
    const warningsList: string[] = [];

    if (!params.url) {
      setBuiltUrl('');
      return;
    }

    if (!params.source) {
      warningsList.push('Source is required for proper tracking');
    }
    if (!params.medium) {
      warningsList.push('Medium is required for proper tracking');
    }

    setWarnings(warningsList);

    const urlObj = new URL(params.url.startsWith('http') ? params.url : `https://${params.url}`);
    const searchParams = new URLSearchParams();

    if (params.source) searchParams.append('utm_source', normalizeInput(params.source));
    if (params.medium) searchParams.append('utm_medium', normalizeInput(params.medium));
    if (params.campaign) searchParams.append('utm_campaign', normalizeInput(params.campaign));
    if (params.content) searchParams.append('utm_content', normalizeInput(params.content));
    if (params.term) searchParams.append('utm_term', normalizeInput(params.term));

    urlObj.search = searchParams.toString();
    setBuiltUrl(urlObj.toString());
  }, [params]);

  const handleInputChange = (key: keyof UTMParams, value: string) => {
    if (key === 'url') {
      setParams((prev) => ({ ...prev, [key]: value }));
    } else {
      setParams((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handlePresetSelect = (preset: Preset) => {
    setParams((prev) => ({
      ...prev,
      source: preset.source,
      medium: preset.medium,
      campaign: preset.campaign,
    }));
  };

  const copyToClipboard = async () => {
    if (!builtUrl || typeof window === 'undefined') return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(builtUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = builtUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetForm = () => {
    setParams({
      url: '',
      source: '',
      medium: '',
      campaign: '',
      content: '',
      term: '',
    });
    setWarnings([]);
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
          <h1 className="text-4xl font-bold text-white mb-4">Link Architect</h1>
          <p className="text-brand-muted text-lg">
            Director-grade tracking URL builder with data governance enforcement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-6 border border-brand-teal/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Build Tracking URL</h2>

            {/* Presets */}
            <div className="mb-6">
              <label className="block text-sm text-brand-muted mb-2">Quick Presets</label>
              <select
                onChange={(e) => {
                  const preset = PRESETS.find((p) => p.name === e.target.value);
                  if (preset) handlePresetSelect(preset);
                }}
                className="w-full px-4 py-2 bg-brand-dark border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
              >
                <option value="">Select a preset...</option>
                {PRESETS.map((preset) => (
                  <option key={preset.name} value={preset.name}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </div>

            {/* URL Input */}
            <div className="mb-4">
              <label className="block text-sm text-brand-muted mb-2">
                Base URL <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={params.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="example.com or https://example.com"
                className="w-full px-4 py-2 bg-brand-dark border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
              />
            </div>

            {/* UTM Parameters */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-brand-muted mb-2">
                  Source (utm_source) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={params.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  placeholder="google, linkedin, email"
                  className="w-full px-4 py-2 bg-brand-dark border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
                />
                <p className="text-xs text-brand-muted mt-1">
                  Auto-converted to lowercase with hyphens
                </p>
              </div>

              <div>
                <label className="block text-sm text-brand-muted mb-2">
                  Medium (utm_medium) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={params.medium}
                  onChange={(e) => handleInputChange('medium', e.target.value)}
                  placeholder="cpc, email, social, organic"
                  className="w-full px-4 py-2 bg-brand-dark border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div>
                <label className="block text-sm text-brand-muted mb-2">
                  Campaign (utm_campaign)
                </label>
                <input
                  type="text"
                  value={params.campaign}
                  onChange={(e) => handleInputChange('campaign', e.target.value)}
                  placeholder="summer-sale, product-launch"
                  className="w-full px-4 py-2 bg-brand-dark border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div>
                <label className="block text-sm text-brand-muted mb-2">
                  Content (utm_content)
                </label>
                <input
                  type="text"
                  value={params.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="logolink, textlink, banner"
                  className="w-full px-4 py-2 bg-brand-dark border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div>
                <label className="block text-sm text-brand-muted mb-2">Term (utm_term)</label>
                <input
                  type="text"
                  value={params.term}
                  onChange={(e) => handleInputChange('term', e.target.value)}
                  placeholder="keyword, ad-group"
                  className="w-full px-4 py-2 bg-brand-dark border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
                />
              </div>
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="mt-4 space-y-2">
                {warnings.map((warning, idx) => (
                  <div
                    key={idx}
                    className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 text-yellow-300 text-sm"
                  >
                    ⚠️ {warning}
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={resetForm}
              className="mt-6 w-full px-4 py-2 bg-brand-orange/20 hover:bg-brand-orange/30 border border-brand-orange/50 rounded-lg text-white transition-colors font-semibold"
            >
              Reset Form
            </button>
          </motion.div>

          {/* Right: Preview & Copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-6 border border-brand-teal/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Live Preview</h2>

            {/* Built URL Display */}
            <div className="mb-6">
              <label className="block text-sm text-brand-muted mb-2">Generated URL</label>
              <div className="relative">
                <div className="bg-brand-dark rounded-lg p-4 border-2 border-brand-teal/50 font-mono text-sm text-white break-all">
                  {builtUrl || (
                    <span className="text-brand-muted">Enter a URL and parameters to generate...</span>
                  )}
                </div>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              disabled={!builtUrl}
              className={`w-full px-4 py-3 rounded-lg font-semibold transition-all ${
                builtUrl
                  ? 'bg-brand-teal hover:bg-brand-teal/80 text-brand-dark'
                  : 'bg-brand-surface/30 text-brand-muted cursor-not-allowed'
              }`}
            >
              {copied ? (
                <span className="flex items-center justify-center gap-2">
                  <span>✓</span> Copied to Clipboard!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>📋</span> Copy URL
                </span>
              )}
            </button>

            {/* URL Breakdown */}
            {builtUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-3">URL Breakdown</h3>
                <div className="bg-brand-dark/50 rounded-lg p-4 space-y-2 text-sm">
                  {params.url && (
                    <div>
                      <span className="text-brand-muted">Base URL:</span>{' '}
                      <span className="text-white">{params.url}</span>
                    </div>
                  )}
                  {params.source && (
                    <div>
                      <span className="text-brand-muted">Source:</span>{' '}
                      <span className="text-brand-teal">{normalizeInput(params.source)}</span>
                    </div>
                  )}
                  {params.medium && (
                    <div>
                      <span className="text-brand-muted">Medium:</span>{' '}
                      <span className="text-brand-teal">{normalizeInput(params.medium)}</span>
                    </div>
                  )}
                  {params.campaign && (
                    <div>
                      <span className="text-brand-muted">Campaign:</span>{' '}
                      <span className="text-brand-teal">{normalizeInput(params.campaign)}</span>
                    </div>
                  )}
                  {params.content && (
                    <div>
                      <span className="text-brand-muted">Content:</span>{' '}
                      <span className="text-brand-teal">{normalizeInput(params.content)}</span>
                    </div>
                  )}
                  {params.term && (
                    <div>
                      <span className="text-brand-muted">Term:</span>{' '}
                      <span className="text-brand-teal">{normalizeInput(params.term)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 bg-brand-teal/10 border border-brand-teal/30 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-brand-teal mb-2">Data Governance</h4>
              <ul className="text-xs text-brand-muted space-y-1">
                <li>• All inputs auto-converted to lowercase</li>
                <li>• Spaces replaced with hyphens</li>
                <li>• Illegal characters stripped</li>
                <li>• Source & Medium required for tracking</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LinkArchitect;

