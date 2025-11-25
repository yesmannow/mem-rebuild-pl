import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface CompetitorData {
  url: string;
  title: string | null;
  description: string | null;
  h1: string | null;
  metaKeywords: string | null;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  technologies: string[];
  loadTime: number;
  wordCount: number;
  imageCount: number;
  timestamp: string;
}

interface Comparison {
  id: string;
  name: string;
  url: string;
  data: CompetitorData | null;
  loading: boolean;
  error: string | null;
}

const CompetitorIntelligenceHub: React.FC = () => {
  const [competitors, setCompetitors] = useState<Comparison[]>([
    { id: '1', name: 'Competitor 1', url: '', data: null, loading: false, error: null },
  ]);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);

  const handleAddCompetitor = () => {
    setCompetitors([
      ...competitors,
      {
        id: Date.now().toString(),
        name: `Competitor ${competitors.length + 1}`,
        url: '',
        data: null,
        loading: false,
        error: null,
      },
    ]);
  };

  const handleUrlChange = (id: string, url: string) => {
    setCompetitors(
      competitors.map((comp) => (comp.id === id ? { ...comp, url } : comp))
    );
  };

  const handleNameChange = (id: string, name: string) => {
    setCompetitors(
      competitors.map((comp) => (comp.id === id ? { ...comp, name } : comp))
    );
  };

  const handleScrape = async (id: string) => {
    const competitor = competitors.find((c) => c.id === id);
    if (!competitor || !competitor.url) {
      return;
    }

    setCompetitors(
      competitors.map((c) =>
        c.id === id ? { ...c, loading: true, error: null } : c
      )
    );

    try {
      const apiUrl = `/api/competitor-scrape?url=${encodeURIComponent(competitor.url)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to scrape competitor');
      }

      const data: CompetitorData = await response.json();

      setCompetitors(
        competitors.map((c) =>
          c.id === id ? { ...c, data, loading: false, error: null } : c
        )
      );
    } catch (err) {
      setCompetitors(
        competitors.map((c) =>
          c.id === id
            ? {
                ...c,
                loading: false,
                error: err instanceof Error ? err.message : 'Unknown error',
              }
            : c
        )
      );
    }
  };

  const handleRemoveCompetitor = (id: string) => {
    setCompetitors(competitors.filter((c) => c.id !== id));
    if (selectedCompetitor === id) {
      setSelectedCompetitor(null);
    }
  };

  const getCompetitorScore = (data: CompetitorData | null): number => {
    if (!data) return 0;
    let score = 0;
    if (data.title) score += 20;
    if (data.description) score += 20;
    if (data.h1) score += 15;
    if (data.metaKeywords) score += 10;
    if (data.socialLinks.facebook || data.socialLinks.twitter) score += 10;
    if (data.technologies.length > 0) score += 10;
    if (data.loadTime < 2000) score += 15;
    return Math.min(100, score);
  };

  return (
    <div className="min-h-screen bg-brand-dark py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Competitor Intelligence Hub</h1>
          <p className="text-brand-muted text-lg">
            Live competitor analysis with web scraping and visual insights
          </p>
        </motion.div>

        {/* Competitor Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-6 border border-brand-teal/20 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Competitors</h2>
            <button
              onClick={handleAddCompetitor}
              className="px-4 py-2 bg-brand-teal text-brand-dark rounded-lg hover:bg-brand-teal/80 transition-colors font-semibold"
            >
              + Add Competitor
            </button>
          </div>

          <div className="space-y-4">
            {competitors.map((competitor, index) => (
              <motion.div
                key={competitor.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-brand-dark/50 rounded-lg p-4 border border-brand-teal/20"
              >
                <div className="flex gap-4 items-start">
                  <input
                    type="text"
                    value={competitor.name}
                    onChange={(e) => handleNameChange(competitor.id, e.target.value)}
                    placeholder="Competitor name"
                    className="flex-1 px-4 py-2 bg-brand-surface border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
                  />
                  <input
                    type="text"
                    value={competitor.url}
                    onChange={(e) => handleUrlChange(competitor.id, e.target.value)}
                    placeholder="https://competitor.com"
                    className="flex-1 px-4 py-2 bg-brand-surface border border-brand-teal/30 rounded-lg text-white focus:outline-none focus:border-brand-teal"
                  />
                  <button
                    onClick={() => handleScrape(competitor.id)}
                    disabled={competitor.loading || !competitor.url}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                      competitor.loading || !competitor.url
                        ? 'bg-brand-surface/30 text-brand-muted cursor-not-allowed'
                        : 'bg-brand-orange hover:bg-brand-orange/80 text-white'
                    }`}
                  >
                    {competitor.loading ? '⏳ Scraping...' : '🔍 Scrape'}
                  </button>
                  {competitors.length > 1 && (
                    <button
                      onClick={() => handleRemoveCompetitor(competitor.id)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-400 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {competitor.error && (
                  <div className="mt-2 text-sm text-red-400">{competitor.error}</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AnimatePresence>
            {competitors
              .filter((c) => c.data)
              .map((competitor, index) => (
                <CompetitorCard
                  key={competitor.id}
                  competitor={competitor}
                  index={index}
                  score={getCompetitorScore(competitor.data)}
                  onClick={() =>
                    setSelectedCompetitor(
                      selectedCompetitor === competitor.id ? null : competitor.id
                    )
                  }
                  isSelected={selectedCompetitor === competitor.id}
                />
              ))}
          </AnimatePresence>
        </div>

        {/* Detailed View */}
        {selectedCompetitor && (
          <AnimatePresence>
            {competitors
              .filter((c) => c.id === selectedCompetitor && c.data)
              .map((competitor) => (
                <CompetitorDetailView
                  key={competitor.id}
                  competitor={competitor}
                  onClose={() => setSelectedCompetitor(null)}
                />
              ))}
          </AnimatePresence>
        )}

        {/* Comparison Table */}
        {competitors.filter((c) => c.data).length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-8 border border-brand-teal/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Side-by-Side Comparison</h2>
            <ComparisonTable competitors={competitors.filter((c) => c.data)} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

// 3D Competitor Card Component
const CompetitorCard: React.FC<{
  competitor: Comparison;
  index: number;
  score: number;
  onClick: () => void;
  isSelected: boolean;
}> = ({ competitor, index, score, onClick, isSelected }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const data = competitor.data!;
  const scoreColor = score >= 70 ? '#00FF88' : score >= 40 ? '#FFA500' : '#FF6B9D';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`bg-brand-surface/50 backdrop-blur-md rounded-2xl p-6 border-2 cursor-pointer transition-all ${
        isSelected
          ? 'border-brand-teal shadow-lg shadow-brand-teal/50'
          : 'border-brand-teal/20 hover:border-brand-teal/50'
      }`}
      whileHover={{ scale: 1.05, z: 50 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{competitor.name}</h3>
          <div className="text-sm text-brand-muted truncate max-w-[200px]">{data.url}</div>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-semibold border"
          style={{
            backgroundColor: `${scoreColor}20`,
            color: scoreColor,
            borderColor: `${scoreColor}50`,
          }}
        >
          {score}/100
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {data.title && (
          <div className="text-sm">
            <span className="text-brand-muted">Title:</span>{' '}
            <span className="text-white line-clamp-1">{data.title}</span>
          </div>
        )}
        {data.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {data.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-brand-teal/20 text-brand-teal text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-brand-muted">
        <span>⚡ {data.loadTime}ms</span>
        <span>📝 {data.wordCount.toLocaleString()} words</span>
        <span>🖼️ {data.imageCount} images</span>
      </div>
    </motion.div>
  );
};

// Detailed Competitor View
const CompetitorDetailView: React.FC<{
  competitor: Comparison;
  onClose: () => void;
}> = ({ competitor, onClose }) => {
  const data = competitor.data!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-8 border border-brand-teal/20 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{competitor.name} - Detailed Analysis</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-brand-orange/20 hover:bg-brand-orange/30 border border-brand-orange/50 rounded-lg text-brand-orange transition-colors"
        >
          ✕ Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">SEO Metadata</h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-brand-muted mb-1">Title</div>
              <div className="text-white">{data.title || 'Not found'}</div>
            </div>
            <div>
              <div className="text-sm text-brand-muted mb-1">Meta Description</div>
              <div className="text-white">{data.description || 'Not found'}</div>
            </div>
            <div>
              <div className="text-sm text-brand-muted mb-1">H1 Tag</div>
              <div className="text-white">{data.h1 || 'Not found'}</div>
            </div>
            {data.metaKeywords && (
              <div>
                <div className="text-sm text-brand-muted mb-1">Keywords</div>
                <div className="text-white">{data.metaKeywords}</div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Technical Details</h3>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-brand-muted mb-1">Technologies</div>
              <div className="flex flex-wrap gap-2">
                {data.technologies.length > 0 ? (
                  data.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-brand-teal/20 text-brand-teal rounded-lg text-sm"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-brand-muted">None detected</span>
                )}
              </div>
            </div>
            <div>
              <div className="text-sm text-brand-muted mb-1">Performance</div>
              <div className="text-white">Load Time: {data.loadTime}ms</div>
              <div className="text-white">Word Count: {data.wordCount.toLocaleString()}</div>
              <div className="text-white">Images: {data.imageCount}</div>
            </div>
            {Object.keys(data.socialLinks).length > 0 && (
              <div>
                <div className="text-sm text-brand-muted mb-1">Social Links</div>
                <div className="flex flex-wrap gap-2">
                  {data.socialLinks.facebook && (
                    <a
                      href={data.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-teal hover:underline"
                    >
                      Facebook
                    </a>
                  )}
                  {data.socialLinks.twitter && (
                    <a
                      href={data.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-teal hover:underline"
                    >
                      Twitter
                    </a>
                  )}
                  {data.socialLinks.linkedin && (
                    <a
                      href={data.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-teal hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                  {data.socialLinks.instagram && (
                    <a
                      href={data.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-teal hover:underline"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Comparison Table Component
const ComparisonTable: React.FC<{ competitors: Comparison[] }> = ({ competitors }) => {
  const comparisonFields = [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'h1', label: 'H1 Tag' },
    { key: 'loadTime', label: 'Load Time (ms)' },
    { key: 'wordCount', label: 'Word Count' },
    { key: 'imageCount', label: 'Images' },
    { key: 'technologies', label: 'Technologies' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-brand-teal/20">
            <th className="text-left py-3 px-4 text-brand-muted font-semibold">Metric</th>
            {competitors.map((comp) => (
              <th key={comp.id} className="text-left py-3 px-4 text-white font-semibold">
                {comp.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonFields.map((field) => (
            <tr key={field.key} className="border-b border-brand-teal/10">
              <td className="py-3 px-4 text-brand-muted">{field.label}</td>
              {competitors.map((comp) => {
                const data = comp.data!;
                let value: string | number = 'N/A';
                if (field.key === 'technologies') {
                  value = data.technologies.join(', ') || 'None';
                } else {
                  value = (data as any)[field.key] || 'N/A';
                }
                return (
                  <td key={comp.id} className="py-3 px-4 text-white">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitorIntelligenceHub;

