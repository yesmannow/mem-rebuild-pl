import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ToolboxEcosystem.css';

interface ToolNode {
  id: string;
  name: string;
  icon: string;
  category: string;
  connections: string[];
  description: string;
  integrations: string[];
}

const tools: ToolNode[] = [
  {
    id: 'crm',
    name: 'CRM',
    icon: '👥',
    category: 'Customer Data',
    connections: ['automation', 'analytics', 'web'],
    description: 'Central customer database and relationship management',
    integrations: ['HubSpot', 'Salesforce', 'ActiveCampaign'],
  },
  {
    id: 'web',
    name: 'Website',
    icon: '🌐',
    category: 'Digital Presence',
    connections: ['crm', 'analytics', 'automation'],
    description: 'Content delivery and conversion optimization',
    integrations: ['WordPress', 'React', 'Custom Development'],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: '📊',
    category: 'Data & Insights',
    connections: ['crm', 'web', 'automation'],
    description: 'Performance tracking and decision intelligence',
    integrations: ['Google Analytics', 'Mixpanel', 'Custom Dashboards'],
  },
  {
    id: 'automation',
    name: 'Automation',
    icon: '⚡',
    category: 'Workflow Engine',
    connections: ['crm', 'web', 'analytics'],
    description: 'Workflow automation and process orchestration',
    integrations: ['Zapier', 'Make', 'Custom Scripts'],
  },
];

const ToolboxEcosystem: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodePosition = (id: string): { x: number; y: number } => {
    const positions: { [key: string]: { x: number; y: number } } = {
      crm: { x: 150, y: 100 },
      web: { x: 450, y: 100 },
      analytics: { x: 150, y: 300 },
      automation: { x: 450, y: 300 },
    };
    return positions[id];
  };

  const isConnectionActive = (fromId: string, toId: string): boolean => {
    if (!hoveredNode && !activeNode) return true;
    const currentNode = activeNode || hoveredNode;
    if (!currentNode) return true;

    return currentNode === fromId || currentNode === toId;
  };

  const activeTool = activeNode ? tools.find(t => t.id === activeNode) : null;

  return (
    <section className="toolbox-ecosystem-section">
      <motion.div
        className="ecosystem-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>The Integrated Ecosystem</h2>
        <p>Not just tools—a connected system where every piece amplifies the others</p>
      </motion.div>

      <div className="ecosystem-container">
        <svg className="ecosystem-svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#88ABF2" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#B8D0D9" stopOpacity="0.6" />
            </linearGradient>
            <filter id="connectionGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection Lines */}
          {tools.map(tool => {
            const fromPos = getNodePosition(tool.id);
            return tool.connections.map(connId => {
              const toPos = getNodePosition(connId);
              const isActive = isConnectionActive(tool.id, connId);

              return (
                <motion.line
                  key={`${tool.id}-${connId}`}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke="url(#connectionGradient)"
                  strokeWidth={isActive ? '4' : '2'}
                  filter={isActive ? 'url(#connectionGlow)' : 'none'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: isActive ? 0.8 : 0.3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                />
              );
            });
          })}

          {/* Data Flow Animation (Particles) */}
          {(hoveredNode || activeNode) &&
            tools.map(tool => {
              const currentNode = activeNode || hoveredNode;
              if (currentNode !== tool.id) return null;

              const fromPos = getNodePosition(tool.id);
              return tool.connections.map((connId, idx) => {
                const toPos = getNodePosition(connId);

                return (
                  <motion.circle
                    key={`particle-${tool.id}-${connId}-${idx}`}
                    r="4"
                    fill="#88ABF2"
                    filter="url(#connectionGlow)"
                    initial={{ x: fromPos.x, y: fromPos.y, opacity: 0 }}
                    animate={{
                      x: [fromPos.x, toPos.x],
                      y: [fromPos.y, toPos.y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3,
                      ease: 'linear',
                    }}
                  />
                );
              });
            })}
        </svg>

        {/* Tool Nodes */}
        <div className="ecosystem-nodes">
          {tools.map((tool, index) => {
            const pos = getNodePosition(tool.id);
            const isActive = activeNode === tool.id || hoveredNode === tool.id;

            return (
              <motion.div
                key={tool.id}
                className={`tool-node ${isActive ? 'active' : ''}`}
                style={{
                  left: `${(pos.x / 600) * 100}%`,
                  top: `${(pos.y / 400) * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3 }}
                onClick={() => setActiveNode(activeNode === tool.id ? null : tool.id)}
                onMouseEnter={() => setHoveredNode(tool.id)}
                onMouseLeave={() => setHoveredNode(null)}
                whileHover={{ scale: 1.1 }}
              >
                <div className="node-icon">{tool.icon}</div>
                <div className="node-name">{tool.name}</div>
                <div className="node-pulse"></div>
              </motion.div>
            );
          })}
        </div>

        {/* Center Hub Label */}
        <motion.div
          className="ecosystem-hub"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="hub-icon">🔄</div>
          <div className="hub-label">Unified System</div>
        </motion.div>
      </div>

      {/* Tool Details Panel */}
      <AnimatePresence mode="wait">
        {activeTool && (
          <motion.div
            className="tool-details"
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="details-header">
              <div className="details-icon">{activeTool.icon}</div>
              <div>
                <h3>{activeTool.name}</h3>
                <span className="details-category">{activeTool.category}</span>
              </div>
              <button className="details-close" onClick={() => setActiveNode(null)}>
                ✕
              </button>
            </div>

            <p className="details-description">{activeTool.description}</p>

            <div className="details-section">
              <h4>Connected To:</h4>
              <div className="connection-tags">
                {activeTool.connections.map(connId => {
                  const connTool = tools.find(t => t.id === connId);
                  return connTool ? (
                    <span
                      key={connId}
                      className="connection-tag"
                      onClick={() => setActiveNode(connId)}
                    >
                      {connTool.icon} {connTool.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>

            <div className="details-section">
              <h4>Platform Examples:</h4>
              <div className="integration-tags">
                {activeTool.integrations.map(int => (
                  <span key={int} className="integration-tag">
                    {int}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!activeNode && (
        <motion.div
          className="ecosystem-instructions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>💡 Click any node to explore integrations and data flows</p>
        </motion.div>
      )}

      {/* Key Benefits */}
      <motion.div
        className="ecosystem-benefits"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >
        <h3>Why Integration Matters</h3>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">🔄</div>
            <h4>Seamless Data Flow</h4>
            <p>Information moves automatically between systems without manual transfer</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">⚡</div>
            <h4>Real-Time Insights</h4>
            <p>Live data enables instant decisions and rapid response to opportunities</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🎯</div>
            <h4>Unified View</h4>
            <p>Complete customer journey visibility across all touchpoints and channels</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ToolboxEcosystem;
