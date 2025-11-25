import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  icon: string;
  position: { x: number; y: number };
}

const nodes: Node[] = [
  { id: 'woocommerce', label: 'WooCommerce', icon: '🛒', position: { x: 0, y: 100 } },
  { id: 'automator', label: 'Uncanny Automator', icon: '⚙️', position: { x: 200, y: 100 } },
  { id: 'wp-fusion', label: 'WP Fusion', icon: '🔗', position: { x: 400, y: 100 } },
  { id: 'fluentcrm', label: 'FluentCRM', icon: '📧', position: { x: 600, y: 100 } },
  { id: 'learndash', label: 'LearnDash', icon: '📚', position: { x: 100, y: 0 } },
];

const connections = [
  { from: 'woocommerce', to: 'automator', label: 'Purchase Event' },
  { from: 'automator', to: 'wp-fusion', label: 'Tag Sync' },
  { from: 'wp-fusion', to: 'fluentcrm', label: 'Contact Sync' },
  { from: 'learndash', to: 'automator', label: 'Enrollment' },
];

interface DataPacket {
  id: string;
  path: string;
  progress: number;
}

const SystemSchematic: React.FC = () => {
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly trigger a data flow
      const randomConnection = connections[Math.floor(Math.random() * connections.length)];
      const fromNode = nodes.find(n => n.id === randomConnection.from);
      const toNode = nodes.find(n => n.id === randomConnection.to);

      if (fromNode && toNode) {
        const newPacket: DataPacket = {
          id: `packet-${Date.now()}-${Math.random()}`,
          path: `${randomConnection.from}-${randomConnection.to}`,
          progress: 0,
        };

        setDataPackets(prev => [...prev, newPacket]);

        // Animate packet progress
        const progressInterval = setInterval(() => {
          setDataPackets(prev =>
            prev.map(p =>
              p.id === newPacket.id
                ? { ...p, progress: Math.min(p.progress + 2, 100) }
                : p
            )
          );
        }, 50);

        // Remove packet after animation
        setTimeout(() => {
          setDataPackets(prev => prev.filter(p => p.id !== newPacket.id));
          clearInterval(progressInterval);
        }, 2500);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getPath = (fromId: string, toId: string) => {
    const from = nodes.find(n => n.id === fromId);
    const to = nodes.find(n => n.id === toId);
    if (!from || !to) return '';

    const fromX = from.position.x + 60;
    const fromY = from.position.y + 40;
    const toX = to.position.x + 60;
    const toY = to.position.y + 40;

    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  };

  const getPacketPosition = (packet: DataPacket) => {
    const [fromId, toId] = packet.path.split('-');
    const from = nodes.find(n => n.id === fromId);
    const to = nodes.find(n => n.id === toId);
    if (!from || !to) return { x: 0, y: 0 };

    const fromX = from.position.x + 60;
    const fromY = from.position.y + 40;
    const toX = to.position.x + 60;
    const toY = to.position.y + 40;

    const progress = packet.progress / 100;
    return {
      x: fromX + (toX - fromX) * progress,
      y: fromY + (toY - fromY) * progress,
    };
  };

  return (
    <div className="p-8 bg-brand-surface/80 border border-brand-teal/20 rounded-2xl backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-brand-teal mb-2">System Architecture</h3>
        <p className="text-brand-muted text-sm">Real-time data flow visualization</p>
      </div>
      <div className="bg-[#0a0a0a] rounded-xl p-8 overflow-visible shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <svg
          viewBox="0 0 800 200"
          className="w-full h-auto overflow-visible"
        >
          {/* Connection lines */}
          {connections.map(conn => {
            const path = getPath(conn.from, conn.to);
            const from = nodes.find(n => n.id === conn.from);
            const to = nodes.find(n => n.id === conn.to);
            if (!from || !to) return null;

            const midX = (from.position.x + to.position.x) / 2 + 60;
            const midY = (from.position.y + to.position.y) / 2 + 40;

            return (
              <g key={`${conn.from}-${conn.to}`}>
                <path
                  d={path}
                  fill="none"
                  stroke="rgba(64, 224, 208, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <text
                  x={midX}
                  y={midY - 10}
                  textAnchor="middle"
                  fontSize="10"
                  fill="rgba(64, 224, 208, 0.6)"
                  className="font-mono"
                >
                  {conn.label}
                </text>
              </g>
            );
          })}

          {/* Data packets */}
          <AnimatePresence>
            {dataPackets.map(packet => {
              const pos = getPacketPosition(packet);
              return (
                <motion.circle
                  key={packet.id}
                  cx={pos.x}
                  cy={pos.y}
                  r="4"
                  fill="#40E0D0"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  style={{
                    filter: 'drop-shadow(0 0 4px #40E0D0)',
                  }}
                />
              );
            })}
          </AnimatePresence>

          {/* Nodes */}
          {nodes.map(node => (
            <g key={node.id} transform={`translate(${node.position.x}, ${node.position.y})`}>
              <motion.rect
                x="0"
                y="0"
                width="120"
                height="80"
                rx="12"
                fill="rgba(30, 41, 59, 0.5)"
                stroke="rgba(64, 224, 208, 0.3)"
                strokeWidth="1"
                whileHover={{
                  stroke: '#40E0D0',
                  strokeWidth: '2',
                }}
                transition={{ duration: 0.3 }}
              />
              <text
                x="60"
                y="35"
                textAnchor="middle"
                fontSize="24"
                fill="#40E0D0"
              >
                {node.icon}
              </text>
              <text
                x="60"
                y="60"
                textAnchor="middle"
                fontSize="12"
                fill="rgba(248, 250, 252, 0.9)"
                fontWeight="500"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-brand-muted">
          Watch data packets flow through the system in real-time
        </p>
      </div>
    </div>
  );
};

export default SystemSchematic;

