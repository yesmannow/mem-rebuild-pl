import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2 } from 'lucide-react';

interface AppShellTool {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface AppShellProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  tools: readonly AppShellTool[];
  activeTool: string;
  onToolChange: (toolId: string) => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * AppShell - Unified layout for Lab tools
 * Standardizes the experience across GrowthEngine, MarketingSimulator, etc.
 * Features: Glass-panel header, tool switcher, focus mode, smooth transitions
 */
export const AppShell: React.FC<AppShellProps> = ({
  title,
  description,
  icon,
  tools,
  activeTool,
  onToolChange,
  children,
  className = '',
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <div
      className={`app-shell min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ${className} ${
        isMaximized ? 'fixed inset-0 z-50' : 'relative'
      }`}
    >
      {/* Top Bar - Glass Panel Header */}
      <motion.div
        className="glass-panel border-b border-slate-700/50 px-6 py-4 flex items-center justify-between backdrop-blur-xl bg-slate-900/60"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Icon */}
          {icon && (
            <motion.div
              className="flex-shrink-0"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              {icon}
            </motion.div>
          )}

          {/* Title & Description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-brand-text truncate">{title}</h1>
              {/* System Status Indicator - Pulsing Green Dot */}
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-2 h-2 rounded-full bg-green-500">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
                <span className="text-xs text-slate-400 font-mono">System Ready</span>
              </motion.div>
            </div>
            {description && (
              <p className="text-sm text-slate-400 truncate">{description}</p>
            )}
          </div>

          {/* Tool Switcher */}
          {tools.length > 0 && (
            <div className="flex items-center gap-2 ml-4">
              <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-lg p-1 inline-flex gap-1">
                {tools.map((tool) => (
                  <motion.button
                    key={tool.id}
                    onClick={() => onToolChange(tool.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all relative ${
                      activeTool === tool.id
                        ? 'bg-brand-turquoise/20 text-brand-turquoise border border-brand-turquoise/30'
                        : 'text-slate-400 hover:text-brand-text hover:bg-slate-700/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tool.icon && <span className="flex-shrink-0">{tool.icon}</span>}
                    <span>{tool.label}</span>
                    {activeTool === tool.id && (
                      <motion.div
                        className="absolute inset-0 rounded-md border-2 border-brand-turquoise"
                        layoutId="activeToolIndicator"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Maximize Button */}
          <motion.button
            onClick={() => setIsMaximized(!isMaximized)}
            className="ml-4 p-2 rounded-lg text-slate-400 hover:text-brand-turquoise hover:bg-slate-800/50 transition-colors flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMaximized ? 'Minimize' : 'Maximize'}
          >
            {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Main Stage - Content Area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full overflow-y-auto"
          >
            <div className={isMaximized ? 'p-0' : 'p-6'}>
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppShell;
