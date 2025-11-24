import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, ExternalLink, Clock, GitBranch, Package } from 'lucide-react';

interface HealthStatus {
  status: string;
  timestamp: string;
  version: string;
  branch: string;
  env: string;
  checks?: Record<string, string>;
}

const DeploymentStatus: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/health');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      setHealth(data);
      setError(null);
      setLastChecked(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch health status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const StatusBadge = ({ status }: { status: string }) => {
    const isOk = status === 'ok' || status === 'healthy';
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
        isOk ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {isOk ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Deployment Status
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Real-time monitoring of production deployment health and build status
          </p>
        </motion.div>

        {/* Health Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Health Status
            </h2>
            <button
              onClick={fetchHealth}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Refresh'}
            </button>
          </div>

          {error ? (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <div>
                <p className="font-medium text-red-900 dark:text-red-200">Health check failed</p>
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          ) : health ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Status</span>
                  <StatusBadge status={health.status} />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Version
                  </span>
                  <code className="text-sm font-mono text-slate-900 dark:text-white">{health.version}</code>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <GitBranch className="w-4 h-4" />
                    Branch
                  </span>
                  <code className="text-sm font-mono text-slate-900 dark:text-white">{health.branch}</code>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <span className="text-slate-600 dark:text-slate-400">Environment</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white capitalize">
                    {health.env}
                  </span>
                </div>
              </div>

              {health.checks && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    System Checks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.entries(health.checks).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg"
                      >
                        <span className="text-slate-600 dark:text-slate-400 capitalize">{key}</span>
                        <StatusBadge status={value} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-600">
                <Clock className="w-4 h-4" />
                <span>Last checked: {lastChecked.toLocaleTimeString()}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              Loading health status...
            </div>
          )}
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        >
          <a
            href="https://dash.cloudflare.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                Cloudflare Dashboard
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                View deployment history and settings
              </p>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400" />
          </a>

          <a
            href="https://github.com/yesmannow/mem-rebuild-pl/actions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                GitHub Actions
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                View CI/CD workflow runs
              </p>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400" />
          </a>
        </motion.div>

        {/* Local Commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Local Development Commands
          </h2>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Lint code</p>
              <code className="text-sm font-mono text-slate-900 dark:text-white">npm run lint</code>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Type check</p>
              <code className="text-sm font-mono text-slate-900 dark:text-white">npm run typecheck</code>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Build for production</p>
              <code className="text-sm font-mono text-slate-900 dark:text-white">npm run build</code>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Validate assets</p>
              <code className="text-sm font-mono text-slate-900 dark:text-white">npm run assets:validate</code>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Check deployment health</p>
              <code className="text-sm font-mono text-slate-900 dark:text-white">node scripts/check-health.js</code>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DeploymentStatus;
