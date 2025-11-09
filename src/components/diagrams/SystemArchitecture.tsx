import React from 'react';
import { motion } from 'framer-motion';
import './SystemArchitecture.css';

interface Node {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  color?: string;
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

interface SystemArchitectureProps {
  nodes: Node[];
  connections: Connection[];
  title?: string;
  description?: string;
}

const SystemArchitecture: React.FC<SystemArchitectureProps> = ({
  nodes,
  connections,
  title,
  description,
}) => {
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);

  const getNodeById = (id: string) => nodes.find(n => n.id === id);

  return (
    <div className="system-architecture">
      {title && <h3 className="diagram-title">{title}</h3>}
      {description && <p className="diagram-description">{description}</p>}

      <div className="architecture-canvas">
        <svg viewBox="0 0 800 600" className="architecture-svg" xmlns="http://www.w3.org/2000/svg">
          {/* Define gradients and markers */}
          <defs>
            <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary-blue)" />
              <stop offset="100%" stopColor="var(--color-primary-dark)" />
            </linearGradient>

            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="var(--color-primary-blue)" opacity="0.6" />
            </marker>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Draw connections */}
          {connections.map((connection, index) => {
            const fromNode = getNodeById(connection.from);
            const toNode = getNodeById(connection.to);

            if (!fromNode || !toNode) return null;

            const isHovered = hoveredNode === connection.from || hoveredNode === connection.to;

            return (
              <g key={index}>
                <motion.line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="var(--color-primary-blue)"
                  strokeWidth={isHovered ? '3' : '2'}
                  strokeDasharray={connection.animated ? '5,5' : 'none'}
                  markerEnd="url(#arrowhead)"
                  opacity={isHovered ? 0.9 : 0.4}
                  className="connection-line"
                  animate={
                    connection.animated
                      ? {
                          strokeDashoffset: [0, -10],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                {connection.label && (
                  <text
                    x={(fromNode.x + toNode.x) / 2}
                    y={(fromNode.y + toNode.y) / 2 - 5}
                    fill="var(--color-text-muted)"
                    fontSize="11"
                    textAnchor="middle"
                    className="connection-label"
                  >
                    {connection.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Draw nodes */}
          {nodes.map(node => {
            const isHovered = hoveredNode === node.id;

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="architecture-node"
              >
                <motion.rect
                  x={node.x - 80}
                  y={node.y - 40}
                  width="160"
                  height="80"
                  rx="12"
                  fill={node.color || 'var(--color-bg-card)'}
                  stroke="var(--color-border-hover)"
                  strokeWidth={isHovered ? '3' : '2'}
                  filter={isHovered ? 'url(#glow)' : 'none'}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="node-rect"
                />

                {node.icon && (
                  <text x={node.x} y={node.y - 8} fontSize="24" textAnchor="middle">
                    {node.icon}
                  </text>
                )}

                <text
                  x={node.x}
                  y={node.y + (node.icon ? 18 : 5)}
                  fill="var(--color-text-primary)"
                  fontSize="14"
                  fontWeight="700"
                  textAnchor="middle"
                  className="node-label"
                >
                  {node.label}
                </text>

                {node.sublabel && (
                  <text
                    x={node.x}
                    y={node.y + (node.icon ? 34 : 21)}
                    fill="var(--color-text-muted)"
                    fontSize="11"
                    textAnchor="middle"
                    className="node-sublabel"
                  >
                    {node.sublabel}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="diagram-legend">
        <div className="legend-item">
          <div className="legend-icon animated-line"></div>
          <span>Automated Data Flow</span>
        </div>
        <div className="legend-item">
          <div className="legend-icon static-line"></div>
          <span>API Connection</span>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;
