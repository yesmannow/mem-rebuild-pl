import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Eye, FileText, User, Zap, Clock } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface LogEntry {
  id: string;
  type: 'view' | 'action' | 'system' | 'user';
  message: string;
  timestamp: Date;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const generateLogEntry = (location: string): LogEntry | null => {
  const now = new Date();
  const path = location.split('/').filter(Boolean);
  const page = path[path.length - 1] || 'home';

  // Map routes to log messages
  const logMessages: Record<string, { message: string; type: LogEntry['type']; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
    '': { message: 'User accessed homepage', type: 'view', icon: Eye },
    'about': { message: 'User viewed bio page', type: 'view', icon: User },
    'case-studies': { message: 'User browsed case studies', type: 'view', icon: FileText },
    'services': { message: 'User viewed services', type: 'view', icon: Activity },
    'tools': { message: 'User accessed tools page', type: 'view', icon: Zap },
    'war-room': { message: 'User entered War Room', type: 'system', icon: Activity },
    'contact': { message: 'User viewed contact page', type: 'action', icon: User },
  };

  const logData = logMessages[page];
  if (!logData) return null;

  return {
    id: `${now.getTime()}-${Math.random()}`,
    type: logData.type,
    message: logData.message,
    timestamp: now,
    icon: logData.icon,
  };
};

interface SystemLogProps {
  maxEntries?: number;
  className?: string;
}

export default function SystemLog({ maxEntries = 5, className = '' }: SystemLogProps) {
  const location = useLocation();
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const newEntry = generateLogEntry(location.pathname);
    if (newEntry) {
      setLogs(prev => {
        const updated = [newEntry, ...prev].slice(0, maxEntries);
        return updated;
      });
    }
  }, [location.pathname, maxEntries]);

  const getTypeColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'view':
        return 'text-blue-400';
      case 'action':
        return 'text-green-400';
      case 'system':
        return 'text-yellow-400';
      case 'user':
        return 'text-brand-teal';
      default:
        return 'text-[var(--parchment-050)]/60';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className={`bg-[var(--ink-700)]/30 backdrop-blur-sm border border-[var(--ink-700)] rounded-lg p-4 font-mono text-xs ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <Activity size={14} className="text-[var(--signal-500)]" />
        <h3 className="text-sm font-semibold text-[var(--parchment-050)]">System Log</h3>
        <span className="ml-auto text-[var(--parchment-050)]/40 text-[10px]">
          Live
        </span>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {logs.map((log, idx) => {
            const Icon = log.icon;
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex items-start gap-2 text-[var(--parchment-050)]/70 hover:text-[var(--parchment-050)] transition-colors"
              >
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Icon size={12} className={getTypeColor(log.type)} />
                  <span className="text-[var(--parchment-050)]/40 text-[10px]">
                    {formatTime(log.timestamp)}
                  </span>
                </div>
                <span className="flex-1 text-[11px] leading-relaxed">
                  {log.message}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {logs.length === 0 && (
          <div className="text-[var(--parchment-050)]/40 text-[11px] text-center py-4">
            No activity yet...
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-[var(--ink-700)] flex items-center justify-between text-[10px] text-[var(--parchment-050)]/40">
        <span>{logs.length} entries</span>
        <div className="flex items-center gap-1">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>Active</span>
        </div>
      </div>
    </div>
  );
}

